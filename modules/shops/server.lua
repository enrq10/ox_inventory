if not lib then return end

local Items = require 'modules.items.server'
local Inventory = require 'modules.inventory.server'
local TriggerEventHooks = require 'modules.hooks.server'
local Shops = {}
local locations = shared.target and 'targets' or 'locations'

---@class OxShopItem
---@field slot number
---@field weight number

local function setupShopItems(id, shopType, shopName, groups)
	local shop = id and Shops[shopType][id] or Shops[shopType] --[[@as OxShop]]

	for i = 1, shop.slots do
		local slot = shop.items[i]

		if slot.grade and not groups then
			print(('^1attempted to restrict slot %s (%s) to grade %s, but %s has no job restriction^0'):format(id, slot.name, json.encode(slot.grade), shopName))
			slot.grade = nil
		end

		local Item = Items(slot.name)

		if Item then
			---@type OxShopItem
			slot = {
				name = Item.name,
				slot = i,
				weight = Item.weight,
				count = slot.count,
				price = (server.randomprices and (not slot.currency or slot.currency == 'money')) and (math.ceil(slot.price * (math.random(80, 120)/100))) or slot.price or 0,
				metadata = slot.metadata,
				license = slot.license,
				currency = slot.currency,
				grade = slot.grade
			}

			if slot.metadata then
				slot.weight = Inventory.SlotWeight(Item, slot, true)
			end

			shop.items[i] = slot
		end
	end
end

---@param shopType string
---@param properties OxShop
local function registerShopType(shopType, properties)
	local shopLocations = properties[locations] or properties.locations

	if shopLocations then
		Shops[shopType] = properties
	else
		Shops[shopType] = {
			label = properties.name,
			id = shopType,
			groups = properties.groups or properties.jobs,
			items = properties.inventory,
			slots = #properties.inventory,
			type = 'shop',
		}

		setupShopItems(nil, shopType, properties.name, properties.groups or properties.jobs)
	end
end

---@param shopType string
---@param id number
local function createShop(shopType, id)
	local shop = Shops[shopType]

	if not shop then return end

	local store = (shop[locations] or shop.locations)?[id]

	if not store then return end

	local groups = shop.groups or shop.jobs
    local coords

    if shared.target then
        if store.length then
            local z = store.loc.z + math.abs(store.minZ - store.maxZ) / 2
            coords = vec3(store.loc.x, store.loc.y, z)
        else
            coords = store.coords or store.loc
        end
    else
        coords = store
    end

	shop[id] = {
		label = shop.name,
		id = shopType..' '..id,
		groups = groups,
		items = table.clone(shop.inventory),
		slots = #shop.inventory,
		type = 'shop',
		coords = coords,
		distance = shared.target and shop.targets?[id]?.distance,
	}

	setupShopItems(id, shopType, shop.name, groups)

	return shop[id]
end

for shopType, shopDetails in pairs(lib.load('data.shops') or {}) do
	registerShopType(shopType, shopDetails)
end

---@param shopType string
---@param shopDetails OxShop
exports('RegisterShop', function(shopType, shopDetails)
	registerShopType(shopType, shopDetails)
end)

lib.callback.register('ox_inventory:openShop', function(source, data)
	local playerInv, shop = Inventory(source)

	if not playerInv then return end

	if data then
		shop = Shops[data.type]

		if not shop then return end

		if not shop.items then
			shop = (data.id and shop[data.id] or createShop(data.type, data.id))

			if not shop then return end
		end

		---@cast shop OxShop

		if shop.groups then
			local group = server.hasGroup(playerInv, shop.groups)
			if not group then return end
		end

		if type(shop.coords) == 'vector3' and #(GetEntityCoords(GetPlayerPed(source)) - shop.coords) > 10 then
			return
		end

		local shopType, shopId = shop.id:match('^(.-) (%d+)$')

        local hookPayload = {
            source = source,
            shopId = shopId or shop.id,
			shopType = shopType or shop.id,
            label = shop.label,
            slots = shop.slots,
            items = shop.items,
            groups = shop.groups,
            coords = shop.coords,
            distance = shop.distance
        }

        local hooks <close> = TriggerEventHooks('openShop', hookPayload)

		if not hooks.success then return end

		---@diagnostic disable-next-line: assign-type-mismatch
		playerInv:openInventory(playerInv)
		playerInv.currentShop = shop.id
	end

	return { label = playerInv.label, type = playerInv.type, slots = playerInv.slots, weight = playerInv.weight, maxWeight = playerInv.maxWeight }, shop
end)

-- Returns true if the currency is a framework account (bank, crypto, etc.)
-- rather than an inventory item. Detection: no item definition exists for it.
local function isFrameworkAccount(currency)
	return currency ~= 'money' and not Items(currency)
end

-- Returns the balance of a framework account (bank, crypto, etc.) for a player.
local function getFrameworkAccountBalance(source, currency)
	local qbName = currency == 'bank' and 'bank' or currency
	if GetResourceState('qb-core') == 'started' or GetResourceState('qbx_core') == 'started' then
		local QBCore = exports['qb-core']:GetCoreObject() or exports['qbx_core']:GetCoreObject()
		if QBCore then
			local Player = QBCore.Functions.GetPlayer(source)
			if Player then return Player.Functions.GetMoney(qbName) or 0 end
		end
	elseif GetResourceState('es_extended') == 'started' then
		local ESX = exports['es_extended']:getSharedObject()
		if ESX then
			local xPlayer = ESX.GetPlayerFromId(source)
			if xPlayer then return xPlayer.getAccount(qbName)?.money or 0 end
		end
	elseif GetResourceState('ox_core') == 'started' then
		local player = Ox.GetPlayer(source)
		if player then return player.getAccount(qbName) or 0 end
	end
	return 0
end

-- Deducts from a framework account (bank, crypto, etc.)
local function removeFrameworkAccount(source, currency, amount)
	local qbName = currency == 'bank' and 'bank' or currency
	if GetResourceState('qb-core') == 'started' or GetResourceState('qbx_core') == 'started' then
		local QBCore = exports['qb-core']:GetCoreObject() or exports['qbx_core']:GetCoreObject()
		if QBCore then
			local Player = QBCore.Functions.GetPlayer(source)
			if Player then Player.Functions.RemoveMoney(qbName, amount, 'shop-purchase') end
		end
	elseif GetResourceState('es_extended') == 'started' then
		local ESX = exports['es_extended']:getSharedObject()
		if ESX then
			local xPlayer = ESX.GetPlayerFromId(source)
			if xPlayer then xPlayer.removeAccountMoney(qbName, amount) end
		end
	elseif GetResourceState('ox_core') == 'started' then
		local player = Ox.GetPlayer(source)
		if player then player.removeAccount(qbName, amount) end
	end
end

local function canAffordItem(inv, currency, price)
	local canAfford = price >= 0 and Inventory.GetItemCount(inv, currency) >= price

	return canAfford or {
		type = 'error',
		description = locale('cannot_afford', ('%s%s'):format((currency == 'money' and locale('$') or math.groupdigits(price)), (currency == 'money' and math.groupdigits(price) or ' '..Items(currency).label)))
	}
end

local function removeCurrency(inv, currency, price)
	Inventory.RemoveItem(inv, currency, price)
end

local function isRequiredGrade(grade, rank)
	if type(grade) == "table" then
		for i=1, #grade do
			if grade[i] == rank then
				return true
			end
		end
		return false
	else
		return rank >= grade
	end
end

lib.callback.register('ox_inventory:buyItem', function(source, data)
	if data.toType == 'player' then
		data.count = math.max(1, math.floor(data.count or 1))

		local playerInv = Inventory(source)

		if not playerInv or not playerInv.currentShop then return end

		local shopType, shopId = playerInv.currentShop:match('^(.-) (%d-)$')

		if not shopType then shopType = playerInv.currentShop end

		if shopId then shopId = tonumber(shopId) end

		local shop = shopId and Shops[shopType][shopId] or Shops[shopType]
		local fromData = shop.items[data.fromSlot]
		local toData = playerInv.items[data.toSlot]

		if fromData then
			if fromData.count then
				if fromData.count < 1 then
					return false, false, { type = 'error', description = locale('shop_nostock') }
				elseif data.count > fromData.count then
					data.count = fromData.count
				end
			end

			if fromData.license and server.hasLicense and not server.hasLicense(playerInv, fromData.license) then
				return false, false, { type = 'error', description = locale('item_unlicensed') }
			end

			if fromData.grade then
				local _, rank = server.hasGroup(playerInv, shop.groups)
				if not isRequiredGrade(fromData.grade, rank) then
					return false, false, { type = 'error', description = locale('stash_lowgrade') }
				end
			end

			local currency = fromData.currency or 'money'
			local fromItem = Items(fromData.name)

			local result = fromItem.cb and fromItem.cb('buying', fromItem, playerInv, data.fromSlot, shop)
			if result == false then return false end

			local toItem = toData and Items(toData.name)

			local metadata, count = Items.Metadata(playerInv, fromItem, fromData.metadata and table.clone(fromData.metadata) or {}, data.count)
			local price = count * fromData.price

			if toData == nil or (fromItem.name == toItem?.name and fromItem.stack and table.matches(toData.metadata, metadata)) then
				local newWeight = playerInv.weight + (fromItem.weight + (metadata?.weight or 0)) * count

				if newWeight > playerInv.maxWeight then
					return false, false, { type = 'error', description = locale('cannot_carry') }
				end

				local canAfford = canAffordItem(playerInv, currency, price)

				if canAfford ~= true then
					return false, false, canAfford
				end

				if fromData.count then
					fromData.count -= count
				end

				local hooks <close> = TriggerEventHooks('buyItem', {
					source = source,
					shopType = shopType,
					shopId = shopId,
					toInventory = playerInv.id,
					toSlot = data.toSlot,
					fromSlot = fromData,
					itemName = fromData.name,
					metadata = metadata,
					count = count,
					price = fromData.price,
					totalPrice = price,
					currency = currency,
				})

				if not hooks.success or not Inventory.SetSlot(playerInv, fromItem, count, metadata, data.toSlot) then
					if fromData.count then
						fromData.count += count
					end

					return false
				end

				playerInv.weight = newWeight
				removeCurrency(playerInv, currency, price)

				if server.syncInventory then server.syncInventory(playerInv) end

				local message = locale('purchased_for', count, metadata?.label or fromItem.label, (currency == 'money' and locale('$') or math.groupdigits(price)), (currency == 'money' and math.groupdigits(price) or ' '..Items(currency).label))

				if server.loglevel > 0 then
					if server.loglevel > 1 or fromData.price >= 500 then
						lib.logger(playerInv.owner, 'buyItem', ('"%s" %s'):format(playerInv.label, message:lower()), ('shop:%s'):format(shop.label))
					end
				end

				return true, {data.toSlot, playerInv.items[data.toSlot], shop.items[data.fromSlot].count and shop.items[data.fromSlot], playerInv.weight}, { type = 'success', description = message }
			end

			return false, false, { type = 'error', description = locale('unable_stack_items') }
		end
	end
end)

lib.callback.register('ox_inventory:shopCheckout', function(source, data)
	local playerInv = Inventory(source)
	if not playerInv or not playerInv.currentShop then return false, false, { type = 'error', description = 'No shop open' } end

	local shopType, shopId = playerInv.currentShop:match('^(.-) (%d-)$')
	if not shopType then shopType = playerInv.currentShop end
	if shopId then shopId = tonumber(shopId) end

	local shop = shopId and Shops[shopType][shopId] or Shops[shopType]
	if not shop then return false, false, { type = 'error', description = 'Shop not found' } end

	local defaultCurrency = data.method == 'bank' and 'bank' or 'money'
	local currencyTotals = {}
	local itemsToBuy = {}

	for _, cartItem in ipairs(data.items) do
		local fromData = shop.items[cartItem.slot]
		if not fromData then
			return false, false, { type = 'error', description = locale('shop_nostock') }
		end

		if fromData.count and fromData.count < cartItem.quantity then
			return false, false, { type = 'error', description = locale('shop_nostock') }
		end

		if fromData.license and server.hasLicense and not server.hasLicense(playerInv, fromData.license) then
			return false, false, { type = 'error', description = locale('item_unlicensed') }
		end

		if fromData.grade then
			local _, rank = server.hasGroup(playerInv, shop.groups)
			if not isRequiredGrade(fromData.grade, rank) then
				return false, false, { type = 'error', description = locale('stash_lowgrade') }
			end
		end

		local fromItem = Items(fromData.name)
		if not fromItem then
			return false, false, { type = 'error', description = 'Invalid item' }
		end

		local itemCurrency = (fromData.currency and fromData.currency ~= 'money') and fromData.currency or defaultCurrency

		local metadata, count = Items.Metadata(playerInv, fromItem, fromData.metadata and table.clone(fromData.metadata) or {}, cartItem.quantity)
		local price = count * fromData.price
		currencyTotals[itemCurrency] = (currencyTotals[itemCurrency] or 0) + price

		table.insert(itemsToBuy, {
			fromSlot = cartItem.slot,
			fromData = fromData,
			fromItem = fromItem,
			count = count,
			metadata = metadata,
			price = price,
			currency = itemCurrency,
		})
	end

	for currencyName, total in pairs(currencyTotals) do
		local canAfford
		if isFrameworkAccount(currencyName) then
			local balance = getFrameworkAccountBalance(source, currencyName)
			if balance < total then
				canAfford = {
					type = 'error',
					description = locale('cannot_afford', ('%s%s'):format(locale('$'), math.groupdigits(total)))
				}
			else
				canAfford = true
			end
		else
			canAfford = canAffordItem(playerInv, currencyName, total)
		end

		if canAfford ~= true then
			return false, false, canAfford
		end
	end

	local addedWeight = 0
	for _, item in ipairs(itemsToBuy) do
		addedWeight = addedWeight + (item.fromItem.weight + (item.metadata?.weight or 0)) * item.count
	end

	if playerInv.weight + addedWeight > playerInv.maxWeight then
		return false, false, { type = 'error', description = locale('cannot_carry') }
	end

	local updatedPlayerSlots = {}
	local updatedShopSlots = {}

	for _, item in ipairs(itemsToBuy) do
		local toSlot = nil
		for i = 1, playerInv.slots do
			if not playerInv.items[i] then
				toSlot = i
				break
			elseif playerInv.items[i].name == item.fromItem.name and item.fromItem.stack and table.matches(playerInv.items[i].metadata, item.metadata) then
				toSlot = i
				break
			end
		end

		if not toSlot then
			return false, false, { type = 'error', description = locale('cannot_carry') }
		end

		local hooks <close> = TriggerEventHooks('buyItem', {
			source = source,
			shopType = shopType,
			shopId = shopId,
			toInventory = playerInv.id,
			toSlot = toSlot,
			fromSlot = item.fromData,
			itemName = item.fromData.name,
			metadata = item.metadata,
			count = item.count,
			price = item.fromData.price,
			totalPrice = item.price,
			currency = item.currency,
		})

		if not hooks.success then return false, false, { type = 'error', description = 'Purchase blocked' } end

		Inventory.SetSlot(playerInv, item.fromItem, item.count, item.metadata, toSlot)

		table.insert(updatedPlayerSlots, {
			item = playerInv.items[toSlot],
			inventory = source
		})

		if item.fromData.count then
			shop.items[item.fromSlot].count = item.fromData.count - item.count

			table.insert(updatedShopSlots, {
				item = shop.items[item.fromSlot],
				slot = item.fromSlot
			})
		end
	end

	for currencyName, total in pairs(currencyTotals) do
		if isFrameworkAccount(currencyName) then
			removeFrameworkAccount(source, currencyName, total)
		else
			removeCurrency(playerInv, currencyName, total)
		end
	end

	playerInv.weight = playerInv.weight + addedWeight

	if server.syncInventory then server.syncInventory(playerInv) end

	TriggerClientEvent('ox_inventory:updateSlots', source, updatedPlayerSlots, playerInv.weight)

	local totalPrice = 0
	for _, total in pairs(currencyTotals) do totalPrice = totalPrice + total end
	local primaryCurrency = next(currencyTotals) or 'money'
	local itemDef = not isFrameworkAccount(primaryCurrency) and Items(primaryCurrency)
	local currencyLabel = (primaryCurrency == 'money' or isFrameworkAccount(primaryCurrency)) and locale('$') or (itemDef and ' '..itemDef.label or primaryCurrency)
	local priceFormatted = math.groupdigits(totalPrice)
	local message = locale('purchased_for', #itemsToBuy, 'items', currencyLabel, priceFormatted)

	if server.loglevel > 0 then
		lib.logger(playerInv.owner, 'shopCheckout', ('"%s" purchased %d items for $%s'):format(playerInv.label, #itemsToBuy, priceFormatted), ('shop:%s'):format(shop.label))
	end

	return true, {
		weight = playerInv.weight,
		shopItems = updatedShopSlots
	}, { type = 'success', description = message }
end)

server.shops = Shops
