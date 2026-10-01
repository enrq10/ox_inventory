return {
	['partsweapon'] = {
		label = 'Piezas de arma',
		weight = 200,
		stack = true,
		close = true,
		description = 'Para craftear armas o reparar armas',
		consume = 0,
		-- Sin usetime/anim: la barra de progreso y la animacion las maneja
		-- undeadProfession, que ademas valida el arma ANTES de mostrarlas.
		-- Tenerlas aqui tambien encadenaba dos barras seguidas (~3s).
		client = {
			event = 'initial_profession:client:RepairWeapon',
		}
	},
	['testburger'] = {
		label = 'Test Burger',
		weight = 220,
		degrade = 60,
		client = {
			image = 'burger_chicken.png',
			status = { hunger = 200000 },
			anim = 'eating',
			prop = 'burger',
			usetime = 2500,
			export = 'ox_inventory_examples.testburger'
		},
		server = {
			export = 'ox_inventory_examples.testburger',
			test = 'what an amazingly delicious burger, amirite?'
		},
		buttons = {
			{
				label = 'Lick it',
				action = function(slot)
					print('You licked the burger')
				end
			},
			{
				label = 'Squeeze it',
				action = function(slot)
					print('You squeezed the burger :(')
				end
			},
			{
				label = 'What do you call a vegan burger?',
				group = 'Hamburger Puns',
				action = function(slot)
					print('A misteak.')
				end
			},
			{
				label = 'What do frogs like to eat with their hamburgers?',
				group = 'Hamburger Puns',
				action = function(slot)
					print('French flies.')
				end
			},
			{
				label = 'Why were the burger and fries running?',
				group = 'Hamburger Puns',
				action = function(slot)
					print('Because they\'re fast food.')
				end
			}
		},
		consume = 0.3
	},

	['bandage'] = {
		label = 'Venda',
		weight = 115,
		client = {
			anim = { dict = 'missheistdockssetup1clipboard@idle_a', clip = 'idle_a', flag = 49 },
			prop = { model = `prop_rolled_sock_02`, pos = vec3(-0.14, -0.14, -0.08), rot = vec3(-50.0, -50.0, 0.0) },
			disable = { move = true, car = true, combat = true },
			usetime = 2500,
		}
	},

	['black_money'] = {
		label = 'Dirty Money',
	},

	['burger'] = {
		label = 'Burger',
		weight = 220,
		client = {
			status = { hunger = 200000 },
			anim = 'eating',
			prop = 'burger',
			usetime = 2500,
			notification = 'You ate a delicious burger'
		},
	},

	['sprunk'] = {
		label = 'Sprunk',
		weight = 350,
		client = {
			status = { thirst = 200000 },
			anim = { dict = 'mp_player_intdrink', clip = 'loop_bottle' },
			prop = { model = `prop_ld_can_01`, pos = vec3(0.01, 0.01, 0.06), rot = vec3(5.0, 5.0, -180.5) },
			usetime = 2500
		}
	},

	['parachute'] = {
		label = 'Parachute',
		weight = 8000,
		stack = false,
		client = {
			anim = { dict = 'clothingshirt', clip = 'try_shirt_positive_d' },
			usetime = 1500
		}
	},

	['garbage'] = {
		label = 'Garbage',
	},

	['paperbag'] = {
		label = 'Paper Bag',
		weight = 1,
		stack = false,
		close = false,
		consume = 0
	},

	['identification'] = {
		label = 'Identification',
		client = {
			image = 'card_id.png'
		}
	},
	
	["panties"] = {
		label = "Panties",
		weight = 5,
		stack = true,
		close = true
	},

	['lockpick'] = {
		label = 'Lockpick',
		weight = 160,
	},

	['phone'] = {
		label = 'Phone',
		weight = 190,
		stack = false,
		consume = 0,
		client = {
			add = function(total)
				if total > 0 then
					pcall(function() return exports.npwd:setPhoneDisabled(false) end)
				end
			end,

			remove = function(total)
				if total < 1 then
					pcall(function() return exports.npwd:setPhoneDisabled(true) end)
				end
			end
		}
	},

	['money'] = {
		label = 'Moneda',
		client = {
			image = "moneda_undead.png",
		}
	},

	['mustard'] = {
		label = 'Mustard',
		weight = 500,
		client = {
			status = { hunger = 0, thirst = 0 },
			anim = { dict = 'mp_player_intdrink', clip = 'loop_bottle' },
			prop = { model = `prop_food_mustard`, pos = vec3(0.01, 0.0, -0.07), rot = vec3(1.0, 1.0, -1.5) },
			usetime = 2500,
			notification = 'You.. drank mustard'
		}
	},

	['water'] = {
		label = 'Agua',
		weight = 500,
		client = {
			status = { thirst = 300000 },
			anim = { dict = 'mp_player_intdrink', clip = 'loop_bottle' },
			prop = { model = `prop_ld_flow_bottle`, pos = vec3(0.03, 0.03, 0.02), rot = vec3(0.0, 0.0, -1.5) },
			usetime = 2500,
			cancel = true,
		}
	},

	['radio'] = {
		label = 'Radio',
		weight = 1000,
		stack = false,
		allowArmed = true
	},
	
	['radio_rota'] = {
		label = 'Radio Rota',
		weight = 500,
		stack = false
	},

	['armour'] = {
		label = 'Bulletproof Vest',
		weight = 3000,
		stack = false,
		client = {
			anim = { dict = 'clothingshirt', clip = 'try_shirt_positive_d' },
			usetime = 3500
		}
	},

	['clothing'] = {
		label = 'Clothing',
		consume = 0,
	},

	['mastercard'] = {
		label = 'Fleeca Card',
		stack = false,
		weight = 10,
		client = {
			image = 'card_bank.png'
		}
	},

	["markedbills"] = {
		label = "Marked Money",
		weight = 1000,
		stack = false,
		close = true,
		description = "Money?",
		client = {
			image = "markedbills.png",
		}
	},

	["certificate"] = {
		label = "Certificate",
		weight = 0,
		stack = true,
		close = true,
		description = "Certificate that proves you own certain stuff",
		client = {
			image = "certificate.png",
		}
	},

	["weed_ogkush"] = {
		label = "OGKush 2g",
		weight = 200,
		stack = true,
		close = false,
		description = "A weed bag with 2g OG Kush",
		client = {
			image = "weed_baggy.png",
		}
	},

	["veh_brakes"] = {
		label = "Brakes",
		weight = 1000,
		stack = true,
		close = true,
		description = "Upgrade vehicle brakes",
		client = {
			image = "veh_brakes.png",
		}
	},

	["binoculars"] = {
		label = "Binoculars",
		weight = 600,
		stack = true,
		close = true,
		description = "Sneaky Breaky...",
		client = {
			image = "binoculars.png",
		}
	},

	["pinger"] = {
		label = "Pinger",
		weight = 1000,
		stack = true,
		close = true,
		description = "With a pinger and your phone you can send out your location",
		client = {
			image = "pinger.png",
		}
	},

	["weed_ak47_seed"] = {
		label = "AK47 Seed",
		weight = 0,
		stack = true,
		close = true,
		description = "A weed seed of AK47",
		client = {
			image = "weed_seed.png",
		}
	},

	["screwdriverset"] = {
		label = "Toolkit",
		weight = 1000,
		stack = true,
		close = false,
		description = "Very useful to screw... screws...",
		client = {
			image = "screwdriverset.png",
		}
	},

	["printerdocument"] = {
		label = "Document",
		weight = 500,
		stack = false,
		close = true,
		description = "A nice document",
		client = {
			image = "printerdocument.png",
		}
	},

	["laptop"] = {
		label = "Laptop",
		weight = 4000,
		stack = true,
		close = true,
		description = "Expensive laptop",
		client = {
			image = "laptop.png",
		}
	},

	["electronickit"] = {
		label = "Electronic Kit",
		weight = 100,
		stack = true,
		close = true,
		description = "If you've always wanted to build a robot you can maybe start here. Maybe you'll be the new Elon Musk?",
		client = {
			image = "electronickit.png",
		}
	},

	["precision_muzzle_brake"] = {
		label = "Precision Muzzle Brake",
		weight = 1000,
		stack = true,
		close = true,
		description = "A muzzle brake for a weapon",
		client = {
			image = "precision_muzzle_brake.png",
		}
	},

	["skullcamo_attachment"] = {
		label = "Skull Camo",
		weight = 1000,
		stack = true,
		close = true,
		description = "A skull camo for a weapon",
		client = {
			image = "skullcamo_attachment.png",
		}
	},

	["veh_toolbox"] = {
		label = "Toolbox",
		weight = 1000,
		stack = true,
		close = true,
		description = "Check vehicle status",
		client = {
			image = "veh_toolbox.png",
		}
	},

	["antipatharia_coral"] = {
		label = "Antipatharia",
		weight = 1000,
		stack = true,
		close = true,
		description = "Its also known as black corals or thorn corals",
		client = {
			image = "antipatharia_coral.png",
		}
	},

	["cokebaggy"] = {
		label = "Bag of Coke",
		weight = 0,
		stack = true,
		close = true,
		description = "To get happy real quick",
		client = {
			image = "cocaine_baggy.png",
		}
	},

	["squared_muzzle_brake"] = {
		label = "Squared Muzzle Brake",
		weight = 1000,
		stack = true,
		close = true,
		description = "A muzzle brake for a weapon",
		client = {
			image = "squared_muzzle_brake.png",
		}
	},

	["boomcamo_attachment"] = {
		label = "Boom Camo",
		weight = 1000,
		stack = true,
		close = true,
		description = "A boom camo for a weapon",
		client = {
			image = "boomcamo_attachment.png",
		}
	},

	["coffee"] = {
		label = "Coffee",
		weight = 200,
		stack = true,
		close = true,
		description = "Pump 4 Caffeine",
		client = {
			image = "coffee.png",
		}
	},

	["diving_fill"] = {
		label = "Diving Tube",
		weight = 3000,
		stack = false,
		close = true,
		description = "An oxygen tube and a rebreather",
		client = {
			image = "diving_tube.png",
		}
	},

	["glass"] = {
		label = "Glass",
		weight = 100,
		stack = true,
		close = false,
		description = "It is very fragile, watch out",
		client = {
			image = "glass.png",
		}
	},

	["cryptostick"] = {
		label = "Crypto Stick",
		weight = 200,
		stack = false,
		close = true,
		description = "Why would someone ever buy money that doesn't exist.. How many would it contain..?",
		client = {
			image = "cryptostick.png",
		}
	},

	["weed_brick"] = {
		label = "Weed Brick",
		weight = 1000,
		stack = true,
		close = true,
		description = "1KG Weed Brick to sell to large customers.",
		client = {
			image = "weed_brick.png",
		}
	},

	["barrel_attachment"] = {
		label = "Barrel",
		weight = 1000,
		stack = true,
		close = true,
		description = "A barrel for a weapon",
		client = {
			image = "barrel_attachment.png",
		}
	},

	["newsbmic"] = {
		label = "Boom Microphone",
		weight = 100,
		stack = false,
		close = true,
		description = "A Useable BoomMic",
		client = {
			image = "newsbmic.png",
		}
	},

	["perseuscamo_attachment"] = {
		label = "Perseus Camo",
		weight = 1000,
		stack = true,
		close = true,
		description = "A perseus camo for a weapon",
		client = {
			image = "perseuscamo_attachment.png",
		}
	},

	["leopardcamo_attachment"] = {
		label = "Leopard Camo",
		weight = 1000,
		stack = true,
		close = true,
		description = "A leopard camo for a weapon",
		client = {
			image = "leopardcamo_attachment.png",
		}
	},

	["thermite"] = {
		label = "Thermite",
		weight = 1000,
		stack = true,
		close = true,
		description = "Sometimes you'd wish for everything to burn",
		client = {
			image = "thermite.png",
		}
	},

	["snikkel_candy"] = {
		label = "Snikkel",
		weight = 100,
		stack = true,
		close = true,
		description = "Some delicious candy :O",
		client = {
			image = "snikkel_candy.png",
		}
	},

	["oxy"] = {
		label = "Prescription Oxy",
		weight = 0,
		stack = true,
		close = true,
		description = "The Label Has Been Ripped Off",
		client = {
			image = "oxy.png",
		}
	},

	["empty_evidence_bag"] = {
		label = "Empty Evidence Bag",
		weight = 0,
		stack = true,
		close = false,
		description = "Used a lot to keep DNA from blood, bullet shells and more",
		client = {
			image = "evidence.png",
		}
	},

	["weaponlicense"] = {
		label = "Weapon License",
		weight = 0,
		stack = false,
		close = true,
		description = "Weapon License",
		client = {
			image = "weapon_license.png",
		}
	},

	["medscope_attachment"] = {
		label = "Medium Scope",
		weight = 1000,
		stack = true,
		close = true,
		description = "A medium scope for a weapon",
		client = {
			image = "medscope_attachment.png",
		}
	},

	["luxuryfinish_attachment"] = {
		label = "Luxury Finish",
		weight = 1000,
		stack = true,
		close = true,
		description = "A luxury finish for a weapon",
		client = {
			image = "luxuryfinish_attachment.png",
		}
	},

	["water_bottle"] = {
		label = "Botella de agua vacia",
		weight = 500,
		stack = true,
		close = false,
		consume = 0,
		client = {
			status = { thirst = 0 }
		}
	},

	["rubber"] = {
		label = "Rubber",
		weight = 100,
		stack = true,
		close = false,
		description = "Rubber, I believe you can make your own rubber ducky with it :D",
		client = {
			image = "rubber.png",
		}
	},

	["patriotcamo_attachment"] = {
		label = "Patriot Camo",
		weight = 1000,
		stack = true,
		close = true,
		description = "A patriot camo for a weapon",
		client = {
			image = "patriotcamo_attachment.png",
		}
	},

	["sessantacamo_attachment"] = {
		label = "Sessanta Nove Camo",
		weight = 1000,
		stack = true,
		close = true,
		description = "A sessanta nove camo for a weapon",
		client = {
			image = "sessantacamo_attachment.png",
		}
	},

	["metalscrap"] = {
		label = "Chatarra",
		weight = 200,
		stack = true,
		close = false,
		description = "Probablemente puedas hacer algo con esto",
		client = {
			image = "scrapmetal.png",
		}
	},

	['scrapmetal'] = {
		label = 'Scrap Metal',
		weight = 80,
	},

	["security_card_01"] = {
		label = "Security Card A",
		weight = 0,
		stack = true,
		close = true,
		description = "A security card... I wonder what it goes to",
		client = {
			image = "security_card_01.png",
		}
	},

	["lawyerpass"] = {
		label = "Lawyer Pass",
		weight = 0,
		stack = false,
		close = false,
		description = "Pass exclusive to lawyers to show they can represent a suspect",
		client = {
			image = "lawyerpass.png",
		}
	},

	["weed_purplehaze"] = {
		label = "Purple Haze 2g",
		weight = 200,
		stack = true,
		close = false,
		description = "A weed bag with 2g Purple Haze",
		client = {
			image = "weed_baggy.png",
		}
	},

	["coke_small_brick"] = {
		label = "Coke Package",
		weight = 350,
		stack = false,
		close = true,
		description = "Small package of cocaine, mostly used for deals and takes a lot of space",
		client = {
			image = "coke_small_brick.png",
		}
	},

	["firework2"] = {
		label = "Poppelers",
		weight = 1000,
		stack = true,
		close = true,
		description = "Fireworks",
		client = {
			image = "firework2.png",
		}
	},

	["firstaid"] = {
		label = "First Aid",
		weight = 2500,
		stack = true,
		close = true,
		description = "You can use this First Aid kit to get people back on their feet",
		client = {
			image = "firstaid.png",
		}
	},

	["weed_purplehaze_seed"] = {
		label = "Purple Haze Seed",
		weight = 0,
		stack = true,
		close = true,
		description = "A weed seed of Purple Haze",
		client = {
			image = "weed_seed.png",
		}
	},

	["twerks_candy"] = {
		label = "Twerks",
		weight = 100,
		stack = true,
		close = true,
		description = "Some delicious candy :O",
		client = {
			image = "twerks_candy.png",
		}
	},

	["coke_brick"] = {
		label = "Coke Brick",
		weight = 1000,
		stack = false,
		close = true,
		description = "Heavy package of cocaine, mostly used for deals and takes a lot of space",
		client = {
			image = "coke_brick.png",
		}
	},

	["painkillers"] = {
		label = "Painkillers",
		weight = 0,
		stack = true,
		close = true,
		description = "For pain you can't stand anymore, take this pill that'd make you feel great again",
		client = {
			image = "painkillers.png",
		}
	},

	["bank_card"] = {
		label = "Bank Card",
		weight = 0,
		stack = false,
		close = true,
		description = "Used to access ATM",
		client = {
			image = "bank_card.png",
		}
	},

	["beer"] = {
		label = "Beer",
		weight = 500,
		stack = true,
		close = true,
		description = "Nothing like a good cold beer!",
		client = {
			image = "beer.png",
		}
	},

	["holoscope_attachment"] = {
		label = "Holo Scope",
		weight = 1000,
		stack = true,
		close = true,
		description = "A holo scope for a weapon",
		client = {
			image = "holoscope_attachment.png",
		}
	},

	["slanted_muzzle_brake"] = {
		label = "Slanted Muzzle Brake",
		weight = 1000,
		stack = true,
		close = true,
		description = "A muzzle brake for a weapon",
		client = {
			image = "slanted_muzzle_brake.png",
		}
	},

	["whiskey"] = {
		label = "Whiskey",
		weight = 500,
		stack = true,
		close = true,
		description = "For all the thirsty out there",
		client = {
			status = { thirst = 500000 },
			image = "whiskey.png",
		}
	},

	["veh_plates"] = {
		label = "Plates",
		weight = 1000,
		stack = true,
		close = true,
		description = "Install vehicle plates",
		client = {
			image = "veh_plates.png",
		}
	},

	["grape"] = {
		label = "Grape",
		weight = 100,
		stack = true,
		close = false,
		description = "Mmmmh yummie, grapes",
		client = {
			image = "grape.png",
		}
	},

	["nitrous"] = {
		label = "Nitrous",
		weight = 1000,
		stack = true,
		close = true,
		description = "Speed up, gas pedal! :D",
		client = {
			image = "nitrous.png",
		}
	},

	["firework1"] = {
		label = "2Brothers",
		weight = 1000,
		stack = true,
		close = true,
		description = "Fireworks",
		client = {
			image = "firework1.png",
		}
	},

	["weed_skunk"] = {
		label = "Skunk 2g",
		weight = 200,
		stack = true,
		close = false,
		description = "A weed bag with 2g Skunk",
		client = {
			image = "weed_baggy.png",
		}
	},

	--[[["repairkit"] = {
		label = "Kit de reparacion",
		weight = 2500,
		stack = true,
		close = true,
		description = "Kit para reparar vehiculos",
		client = {
			image = "repairkit.png",
		}
	},]]

	["wine"] = {
		label = "Wine",
		weight = 300,
		stack = true,
		close = false,
		description = "Some good wine to drink on a fine evening",
		client = {
			image = "wine.png",
		}
	},

	["newscam"] = {
		label = "News Camera",
		weight = 100,
		stack = false,
		close = true,
		description = "A camera for the news",
		client = {
			image = "newscam.png",
		}
	},

	["gatecrack"] = {
		label = "Gatecrack",
		weight = 0,
		stack = true,
		close = true,
		description = "Handy software to tear down some fences",
		client = {
			image = "usb_device.png",
		}
	},

	["rolex"] = {
		label = "Golden Watch",
		weight = 1500,
		stack = true,
		close = true,
		description = "A golden watch seems like the jackpot to me!",
		client = {
			image = "rolex.png",
		}
	},

	["flat_muzzle_brake"] = {
		label = "Flat Muzzle Brake",
		weight = 1000,
		stack = true,
		close = true,
		description = "A muzzle brake for a weapon",
		client = {
			image = "flat_muzzle_brake.png",
		}
	},

	["rolling_paper"] = {
		label = "Rolling Paper",
		weight = 0,
		stack = true,
		close = true,
		description = "Paper made specifically for encasing and smoking tobacco or cannabis.",
		client = {
			image = "rolling_paper.png",
		}
	},

	["veh_tint"] = {
		label = "Tints",
		weight = 1000,
		stack = true,
		close = true,
		description = "Install vehicle tint",
		client = {
			image = "veh_tint.png",
		}
	},

	["comp_attachment"] = {
		label = "Compensator",
		weight = 1000,
		stack = true,
		close = true,
		description = "A compensator for a weapon",
		client = {
			image = "comp_attachment.png",
		}
	},

	["diamond"] = {
		label = "Diamond",
		weight = 1000,
		stack = true,
		close = true,
		description = "A diamond seems like the jackpot to me!",
		client = {
			image = "diamond.png",
		}
	},

	["armor"] = {
		label = "Armor",
		weight = 5000,
		stack = true,
		close = true,
		description = "Some protection won't hurt... right?",
		client = {
			image = "armor.png",
		}
	},

	["harness"] = {
		label = "Race Harness",
		weight = 1000,
		stack = false,
		close = true,
		description = "Racing Harness so no matter what you stay in the car",
		client = {
			image = "harness.png",
		}
	},

	["handcuffs"] = {
		label = "Handcuffs",
		weight = 100,
		stack = true,
		close = true,
		description = "Comes in handy when people misbehave. Maybe it can be used for something else?",
		client = {
			image = "handcuffs.png",
		}
	},

	["grapejuice"] = {
		label = "Grape Juice",
		weight = 200,
		stack = true,
		close = false,
		description = "Grape juice is said to be healthy",
		client = {
			image = "grapejuice.png",
		}
	},

	["trojan_usb"] = {
		label = "Trojan USB",
		weight = 0,
		stack = true,
		close = true,
		description = "Handy software to shut down some systems",
		client = {
			image = "usb_device.png",
		}
	},

	["flashlight_attachment"] = {
		label = "Flashlight",
		weight = 1000,
		stack = true,
		close = true,
		description = "A flashlight for a weapon",
		client = {
			image = "flashlight_attachment.png",
		}
	},

	["casinochips"] = {
		label = "Casino Chips",
		weight = 0,
		stack = true,
		close = false,
		description = "Chips For Casino Gambling",
		client = {
			image = "casinochips.png",
		}
	},

	["lighter"] = {
		label = "Lighter",
		weight = 0,
		stack = true,
		close = true,
		description = "On new years eve a nice fire to stand next to",
		client = {
			image = "lighter.png",
		}
	},

	["police_stormram"] = {
		label = "Stormram",
		weight = 18000,
		stack = true,
		close = true,
		description = "A nice tool to break into doors",
		client = {
			image = "police_stormram.png",
		}
	},

	["largescope_attachment"] = {
		label = "Large Scope",
		weight = 1000,
		stack = true,
		close = true,
		description = "A large scope for a weapon",
		client = {
			image = "largescope_attachment.png",
		}
	},

	["radioscanner"] = {
		label = "Radio Scanner",
		weight = 1000,
		stack = true,
		close = true,
		description = "With this you can get some police alerts. Not 100% effective however",
		client = {
			image = "radioscanner.png",
		}
	},

	["stickynote"] = {
		label = "Sticky note",
		weight = 0,
		stack = false,
		close = false,
		description = "Sometimes handy to remember something :)",
		client = {
			image = "stickynote.png",
		}
	},

	["veh_xenons"] = {
		label = "Xenons",
		weight = 1000,
		stack = true,
		close = true,
		description = "Upgrade vehicle xenons",
		client = {
			image = "veh_xenons.png",
		}
	},

	["advancedlockpick"] = {
		label = "Advanced Lockpick",
		weight = 500,
		stack = true,
		close = true,
		description = "If you lose your keys a lot this is very useful... Also useful to open your beers",
		client = {
			image = "advancedlockpick.png",
		}
	},

	["item_bench"] = {
		label = "Workbench",
		weight = 15000,
		stack = false,
		close = false,
		description = "A workbench to craft items.",
		client = {
			image = "workbench.png",
		}
	},

	["veh_armor"] = {
		label = "Armor",
		weight = 1000,
		stack = true,
		close = true,
		description = "Upgrade vehicle armor",
		client = {
			image = "veh_armor.png",
		}
	},

	["diamond_ring"] = {
		label = "Diamond Ring",
		weight = 1500,
		stack = true,
		close = true,
		description = "A diamond ring seems like the jackpot to me!",
		client = {
			image = "diamond_ring.png",
		}
	},

	["meth"] = {
		label = "Meth",
		weight = 100,
		stack = true,
		close = true,
		description = "A baggie of Meth",
		client = {
			image = "meth_baggy.png",
		}
	},

	["veh_suspension"] = {
		label = "Suspension",
		weight = 1000,
		stack = true,
		close = true,
		description = "Upgrade vehicle suspension",
		client = {
			image = "veh_suspension.png",
		}
	},

	["filled_evidence_bag"] = {
		label = "Evidence Bag",
		weight = 200,
		stack = false,
		close = false,
		description = "A filled evidence bag to see who committed the crime >:(",
		client = {
			image = "evidence.png",
		}
	},

	["aluminumoxide"] = {
		label = "Aluminium Powder",
		weight = 100,
		stack = true,
		close = false,
		description = "Some powder to mix with",
		client = {
			image = "aluminumoxide.png",
		}
	},

	["veh_wheels"] = {
		label = "Wheels",
		weight = 1000,
		stack = true,
		close = true,
		description = "Upgrade vehicle wheels",
		client = {
			image = "veh_wheels.png",
		}
	},

	["brushcamo_attachment"] = {
		label = "Brushstroke Camo",
		weight = 1000,
		stack = true,
		close = true,
		description = "A brushstroke camo for a weapon",
		client = {
			image = "brushcamo_attachment.png",
		}
	},

	["walkstick"] = {
		label = "Walking Stick",
		weight = 1000,
		stack = true,
		close = true,
		description = "Walking stick for ya'll grannies out there.. HAHA",
		client = {
			image = "walkstick.png",
		}
	},

	["steel"] = {
		label = "Metal",
		weight = 200,
		stack = true,
		close = false,
		description = "Metal",
		client = {
			image = "steel.png",
		}
	},

	["grip_attachment"] = {
		label = "Grip",
		weight = 1000,
		stack = true,
		close = true,
		description = "A grip for a weapon",
		client = {
			image = "grip_attachment.png",
		}
	},

	["plastic"] = {
		label = "Plastic",
		weight = 100,
		stack = true,
		close = false,
		description = "Plastico",
		client = {
			image = "plastic.png",
		}
	},

	["tirerepairkit"] = {
		label = "Tire Repair Kit",
		weight = 1000,
		stack = true,
		close = true,
		description = "A kit to repair your tires",
		client = {
			image = "tirerepairkit.png",
		}
	},

	["crack_baggy"] = {
		label = "Bag of Crack",
		weight = 0,
		stack = true,
		close = true,
		description = "To get happy faster",
		client = {
			image = "crack_baggy.png",
		}
	},

	["weed_amnesia"] = {
		label = "Amnesia 2g",
		weight = 200,
		stack = true,
		close = false,
		description = "A weed bag with 2g Amnesia",
		client = {
			image = "weed_baggy.png",
		}
	},

	["woodcamo_attachment"] = {
		label = "Woodland Camo",
		weight = 1000,
		stack = true,
		close = true,
		description = "A woodland camo for a weapon",
		client = {
			image = "woodcamo_attachment.png",
		}
	},

	["fat_end_muzzle_brake"] = {
		label = "Fat End Muzzle Brake",
		weight = 1000,
		stack = true,
		close = true,
		description = "A muzzle brake for a weapon",
		client = {
			image = "fat_end_muzzle_brake.png",
		}
	},

	["driver_license"] = {
		label = "Drivers License",
		weight = 0,
		stack = false,
		close = false,
		description = "Permit to show you can drive a vehicle",
		client = {
			image = "driver_license.png",
		}
	},

	["digicamo_attachment"] = {
		label = "Digital Camo",
		weight = 1000,
		stack = true,
		close = true,
		description = "A digital camo for a weapon",
		client = {
			image = "digicamo_attachment.png",
		}
	},

	["weed_skunk_seed"] = {
		label = "Skunk Seed",
		weight = 0,
		stack = true,
		close = true,
		description = "A weed seed of Skunk",
		client = {
			image = "weed_seed.png",
		}
	},

	["sandwich"] = {
		label = "Sandwich",
		weight = 200,
		stack = true,
		close = true,
		description = "Nice bread for your stomach",
		client = {
			image = "sandwich.png",
		}
	},

	['sandwich_moldy'] = {
		label = 'Sandwich Mohoso',
		weight = 200,
		description = "Rico sandwich pero con moho",
		client = {
			status = { hunger = 100000, thirst = -5000 },
			anim = 'eating',
			prop = 'sandwich',
			usetime = 2500,
			image = "sandwich_moldy.png",
		},
	},

	["veh_transmission"] = {
		label = "Transmission",
		weight = 1000,
		stack = true,
		close = true,
		description = "Upgrade vehicle transmission",
		client = {
			image = "veh_transmission.png",
		}
	},

	["joint"] = {
		label = "Joint",
		weight = 0,
		stack = true,
		close = true,
		description = "Sidney would be very proud at you",
		client = {
			image = "joint.png",
		}
	},

	["veh_interior"] = {
		label = "Interior",
		weight = 1000,
		stack = true,
		close = true,
		description = "Upgrade vehicle interior",
		client = {
			image = "veh_interior.png",
		}
	},

	["aluminum"] = {
		label = "Aluminium",
		weight = 100,
		stack = true,
		close = false,
		description = "Nice piece of metal that you can probably use for something",
		client = {
			image = "aluminum.png",
		}
	},

	["drill"] = {
		label = "Drill",
		weight = 20000,
		stack = true,
		close = false,
		description = "The real deal...",
		client = {
			image = "drill.png",
		}
	},

	["iron"] = {
		label = "Mineral de hierro",
		weight = 800,
		stack = true,
		close = false,
		description = "Handy piece of metal that you can probably use for something",
		client = {
			image = "iron.png",
		}
	},

	["tunerlaptop"] = {
		label = "Tunerchip",
		weight = 2000,
		stack = false,
		close = true,
		description = "With this tunerchip you can get your car on steroids... If you know what you're doing",
		client = {
			image = "tunerchip.png",
		}
	},

	["split_end_muzzle_brake"] = {
		label = "Split End Muzzle Brake",
		weight = 1000,
		stack = true,
		close = true,
		description = "A muzzle brake for a weapon",
		client = {
			image = "split_end_muzzle_brake.png",
		}
	},

	["fitbit"] = {
		label = "Fitbit",
		weight = 500,
		stack = false,
		close = true,
		description = "I like fitbit",
		client = {
			image = "fitbit.png",
		}
	},

	["ifaks"] = {
		label = "ifaks",
		weight = 200,
		stack = true,
		close = true,
		description = "ifaks for healing and a complete stress remover.",
		client = {
			image = "ifaks.png",
		}
	},

	["moneybag"] = {
		label = "Money Bag",
		weight = 0,
		stack = false,
		close = true,
		description = "A bag with cash",
		client = {
			image = "moneybag.png",
		}
	},

	["weed_nutrition"] = {
		label = "Plant Fertilizer",
		weight = 2000,
		stack = true,
		close = true,
		description = "Plant nutrition",
		client = {
			image = "weed_nutrition.png",
		}
	},

	["tactical_muzzle_brake"] = {
		label = "Tactical Muzzle Brake",
		weight = 1000,
		stack = true,
		close = true,
		description = "A muzzle brakee for a weapon",
		client = {
			image = "tactical_muzzle_brake.png",
		}
	},

	["thermalscope_attachment"] = {
		label = "Thermal Scope",
		weight = 1000,
		stack = true,
		close = true,
		description = "A thermal scope for a weapon",
		client = {
			image = "thermalscope_attachment.png",
		}
	},

	["veh_exterior"] = {
		label = "Exterior",
		weight = 1000,
		stack = true,
		close = true,
		description = "Upgrade vehicle exterior",
		client = {
			image = "veh_exterior.png",
		}
	},

	["attachment_bench"] = {
		label = "Attachment Workbench",
		weight = 15000,
		stack = false,
		close = false,
		description = "A workbench for crafting attachments.",
		client = {
			image = "attworkbench.png",
		}
	},

	["kurkakola"] = {
		label = "Cola",
		weight = 500,
		stack = true,
		close = true,
		description = "For all the thirsty out there",
		client = {
			image = "cola.png",
		}
	},

	["goldbar"] = {
		label = "Gold Bar",
		weight = 7000,
		stack = true,
		close = true,
		description = "Looks pretty expensive to me",
		client = {
			image = "goldbar.png",
		}
	},

	["newsmic"] = {
		label = "News Microphone",
		weight = 100,
		stack = false,
		close = true,
		description = "A microphone for the news",
		client = {
			image = "newsmic.png",
		}
	},

	["xtcbaggy"] = {
		label = "Bag of XTC",
		weight = 0,
		stack = true,
		close = true,
		description = "Pop those pills baby",
		client = {
			image = "xtc_baggy.png",
		}
	},

	["goldchain"] = {
		label = "Golden Chain",
		weight = 1500,
		stack = true,
		close = true,
		description = "A golden chain seems like the jackpot to me!",
		client = {
			image = "goldchain.png",
		}
	},

	["ironoxide"] = {
		label = "Iron Powder",
		weight = 100,
		stack = true,
		close = false,
		description = "Some powder to mix with.",
		client = {
			image = "ironoxide.png",
		}
	},

	--[[["copper"] = {
		label = "Mineral de cobre",
		weight = 1200,
		stack = true,
		close = false,
		client = {
			image = "copper.png",
		}
	},
	["copper_refinado"] = {
		label = "Cobre refinado",
		weight = 1000,
		stack = true,
		close = false,
		description = "Pieza de cobre que probablemente puedas usar para algo",
		client = {
			image = "copper_refinado.png",
		}
	},]]

	["diving_gear"] = {
		label = "Diving Gear",
		weight = 30000,
		stack = false,
		close = true,
		description = "An oxygen tank and a rebreather",
		client = {
			image = "diving_gear.png",
		}
	},

	["geocamo_attachment"] = {
		label = "Geometric Camo",
		weight = 1000,
		stack = true,
		close = true,
		description = "A geometric camo for a weapon",
		client = {
			image = "geocamo_attachment.png",
		}
	},

	["id_card"] = {
		label = "ID Card",
		weight = 0,
		stack = false,
		close = false,
		description = "A card containing all your information to identify yourself",
		client = {
			image = "id_card.png",
		}
	},

	["weed_whitewidow"] = {
		label = "White Widow 2g",
		weight = 200,
		stack = true,
		close = false,
		description = "A weed bag with 2g White Widow",
		client = {
			image = "weed_baggy.png",
		}
	},

	["weed_ak47"] = {
		label = "AK47 2g",
		weight = 200,
		stack = true,
		close = false,
		description = "A weed bag with 2g AK47",
		client = {
			image = "weed_baggy.png",
		}
	},

	["veh_turbo"] = {
		label = "Turbo",
		weight = 1000,
		stack = true,
		close = true,
		description = "Install vehicle turbo",
		client = {
			image = "veh_turbo.png",
		}
	},

	["firework4"] = {
		label = "Weeping Willow",
		weight = 1000,
		stack = true,
		close = true,
		description = "Fireworks",
		client = {
			image = "firework4.png",
		}
	},

	["veh_neons"] = {
		label = "Neons",
		weight = 1000,
		stack = true,
		close = true,
		description = "Upgrade vehicle neons",
		client = {
			image = "veh_neons.png",
		}
	},

	["weed_ogkush_seed"] = {
		label = "OGKush Seed",
		weight = 0,
		stack = true,
		close = true,
		description = "A weed seed of OG Kush",
		client = {
			image = "weed_seed.png",
		}
	},

	["clip_attachment"] = {
		label = "Clip",
		weight = 1000,
		stack = true,
		close = true,
		description = "A clip for a weapon",
		client = {
			image = "clip_attachment.png",
		}
	},

	["firework3"] = {
		label = "WipeOut",
		weight = 1000,
		stack = true,
		close = true,
		description = "Fireworks",
		client = {
			image = "firework3.png",
		}
	},

	["iphone"] = {
		label = "iPhone",
		weight = 1000,
		stack = true,
		close = true,
		description = "Very expensive phone",
		client = {
			image = "iphone.png",
		}
	},

	["heavyarmor"] = {
		label = "Heavy Armor",
		weight = 5000,
		stack = true,
		close = true,
		description = "Some protection won't hurt... right?",
		client = {
			image = "armor.png",
		}
	},

	["jerry_can"] = {
		label = "Jerrycan 20L",
		weight = 20000,
		stack = true,
		close = true,
		description = "A can full of Fuel",
		client = {
			image = "jerry_can.png",
		}
	},

	["samsungphone"] = {
		label = "Samsung S10",
		weight = 1000,
		stack = true,
		close = true,
		description = "Very expensive phone",
		client = {
			image = "samsungphone.png",
		}
	},

	["nvscope_attachment"] = {
		label = "Night Vision Scope",
		weight = 1000,
		stack = true,
		close = true,
		description = "A night vision scope for a weapon",
		client = {
			image = "nvscope_attachment.png",
		}
	},

	["empty_weed_bag"] = {
		label = "Empty Weed Bag",
		weight = 0,
		stack = true,
		close = true,
		description = "A small empty bag",
		client = {
			image = "weed_baggy_empty.png",
		}
	},

	["advscope_attachment"] = {
		label = "Advanced Scope",
		weight = 1000,
		stack = true,
		close = true,
		description = "An advanced scope for a weapon",
		client = {
			image = "advscope_attachment.png",
		}
	},

	["weed_amnesia_seed"] = {
		label = "Amnesia Seed",
		weight = 0,
		stack = true,
		close = true,
		description = "A weed seed of Amnesia",
		client = {
			image = "weed_seed.png",
		}
	},

	["veh_engine"] = {
		label = "Engine",
		weight = 1000,
		stack = true,
		close = true,
		description = "Upgrade vehicle engine",
		client = {
			image = "veh_engine.png",
		}
	},

	["labkey"] = {
		label = "Key",
		weight = 500,
		stack = false,
		close = true,
		description = "Key for a lock...?",
		client = {
			image = "labkey.png",
		}
	},

	["smallscope_attachment"] = {
		label = "Small Scope",
		weight = 1000,
		stack = true,
		close = true,
		description = "A small scope for a weapon",
		client = {
			image = "smallscope_attachment.png",
		}
	},

	["security_card_02"] = {
		label = "Security Card B",
		weight = 0,
		stack = true,
		close = true,
		description = "A security card... I wonder what it goes to",
		client = {
			image = "security_card_02.png",
		}
	},

	["tenkgoldchain"] = {
		label = "10k Gold Chain",
		weight = 2000,
		stack = true,
		close = true,
		description = "10 carat golden chain",
		client = {
			image = "10kgoldchain.png",
		}
	},

	["heavy_duty_muzzle_brake"] = {
		label = "HD Muzzle Brake",
		weight = 1000,
		stack = true,
		close = true,
		description = "A muzzle brake for a weapon",
		client = {
			image = "heavy_duty_muzzle_brake.png",
		}
	},

	["tablet"] = {
		label = "Tablet",
		weight = 2000,
		stack = true,
		close = true,
		description = "Expensive tablet",
		client = {
			image = "tablet.png",
		}
	},

	["drum_attachment"] = {
		label = "Drum",
		weight = 1000,
		stack = true,
		close = true,
		description = "A drum for a weapon",
		client = {
			image = "drum_attachment.png",
		}
	},

	--[["advancedrepairkit"] = {
		label = "Advanced Repairkit",
		weight = 4000,
		stack = true,
		close = true,
		description = "A nice toolbox with stuff to repair your vehicle",
		client = {
			image = "advancedkit.png",
		}
	},]]

	["bellend_muzzle_brake"] = {
		label = "Bellend Muzzle Brake",
		weight = 1000,
		stack = true,
		close = true,
		description = "A muzzle brake for a weapon",
		client = {
			image = "bellend_muzzle_brake.png",
		}
	},

	["tosti"] = {
		label = "Grilled Cheese Sandwich",
		weight = 200,
		stack = true,
		close = true,
		description = "Nice to eat",
		client = {
			image = "tosti.png",
		}
	},

	["dendrogyra_coral"] = {
		label = "Dendrogyra",
		weight = 1000,
		stack = true,
		close = true,
		description = "Its also known as pillar coral",
		client = {
			image = "dendrogyra_coral.png",
		}
	},

	["suppressor_attachment"] = {
		label = "Suppressor",
		weight = 1000,
		stack = true,
		close = true,
		description = "A suppressor for a weapon",
		client = {
			image = "suppressor_attachment.png",
		}
	},

	["vodka"] = {
		label = "Vodka",
		weight = 500,
		stack = true,
		close = true,
		description = "For all the thirsty out there",
		client = {
			status = { thirst = 500000 },
			image = "vodka.png",
		}
	},

	["weed_whitewidow_seed"] = {
		label = "White Widow Seed",
		weight = 0,
		stack = true,
		close = false,
		description = "A weed seed of White Widow",
		client = {
			image = "weed_seed.png",
		}
	},

	["zebracamo_attachment"] = {
		label = "Zebra Camo",
		weight = 1000,
		stack = true,
		close = true,
		description = "A zebra camo for a weapon",
		client = {
			image = "zebracamo_attachment.png",
		}
	},
	["kq_airdrop_flare"] = {
		label = "Bengala Airdrop",
		weight = 300,
		stack = true,
		close = true,
		description = "Bengala que solicita un Airdrop",
		client = {
			image = "kq_airdrop_flare.png",
		}
	},

	--PERSONALIZADOS
	--['moneda_undead'] = {label = "Moneda", stack = true},
	['meat'] = {label = "Carne cruda", stack = true, weight = 100,  category = 'food',},
	["coocked_meat2"] = {label = "Carne cocinada", stack = true, weight = 100, category = 'food', client = {status = { hunger = 200000 }, anim = 'eating', usetime = 2500}},
	["beans"] = {
		label = "Judias",
		stack = true, 
		weight = 100, 
		category = 'food',
		client = {
			status = {
				hunger = 200000 
				}, 
			anim = {
				dict = 'fractalcanfood@animation',
				clip = 'canfood_clip'
			},
			prop = { model = `fractal_food_beanscan`, pos = vec3(0.13, 0.05, -0.02), rot = vec3(-90.0, -72.0, -23.0) , bone = 57005},
			usetime = 7500}
		},
	["can"] = {
		label = "Lata caducada",
		stack = true, 
		weight = 100, 
		category = 'food',
		client = {
			status = {
				hunger = 150000 
				}, 
			anim = {
				dict = 'fractalcanfood@animation',
				clip = 'canfood_clip'
			},
			prop = { model = `fractal_food_unidentified`, pos = vec3(0.13, 0.05, -0.02), rot = vec3(-90.0, -72.0, -23.0) , bone = 57005},
			usetime = 7500}
		},
	["dog"] = {
		label = "Comida de perro",
		stack = true, 
		weight = 100, 
		category = 'food',
		client = {
			status = {
				hunger = 150000 
				}, 
			anim = {
				dict = 'fractalcanfood@animation',
				clip = 'canfood_clip'
			},
			prop = { model = `fractal_food_dogcan`, pos = vec3(0.13, 0.05, -0.02), rot = vec3(-90.0, -72.0, -23.0) , bone = 57005},
			usetime = 7500}
		},
	["lentejas"] = {
		label = "Lentejas",
		stack = true, 
		weight = 100, 
		category = 'food',
		client = {
			status = {
				hunger = 200000 
				}, 
			anim = {
				dict = 'fractalcanfood@animation',
				clip = 'canfood_clip'
			},
			prop = { model = `fractal_food_lentejascan`, pos = vec3(0.13, 0.05, -0.02), rot = vec3(-90.0, -72.0, -23.0) , bone = 57005},
			usetime = 7500}
		},
	["meat_can"] = {
		label = "Lata de carne",
		stack = true, 
		weight = 100, 
		category = 'food',
		client = {
			status = {
				hunger = 300000 
				}, 
			anim = {
				dict = 'fractalcanfood@animation',
				clip = 'canfood_clip'
			},
			prop = { model = `fractal_food_meatcan`, pos = vec3(0.13, 0.05, -0.02), rot = vec3(-90.0, -72.0, -23.0) , bone = 57005},
			usetime = 7500}
		},
	["olives"] = {
		label = "Aceitunas",
		stack = true, 
		weight = 100, 
		category = 'food',
		client = {
			status = {
				hunger = 200000 
				}, 
			anim = {
				dict = 'fractalcanfood@animation',
				clip = 'canfood_clip'
			},
			prop = { model = `fractal_food_olivescan`, pos = vec3(0.13, 0.04, -0.01), rot = vec3(-90.0, -72.0, -23.0) , bone = 57005},
			usetime = 7500}
		},
	["outdate"] = {
		label = "Lata caducada",
		stack = true, 
		weight = 100, 
		category = 'food',
		client = {
			status = {
				hunger = 100000 
				}, 
			anim = {
				dict = 'fractalcanfood@animation',
				clip = 'canfood_clip'
			},
			prop = { model = `fractal_food_outofdate`, pos = vec3(0.13, 0.05, -0.02), rot = vec3(-90.0, -72.0, -23.0) , bone = 57005},
			usetime = 7500}
		},
	["pate"] = {
		label = "Pate",
		stack = true, 
		weight = 100, 
		category = 'food',
		client = {
			status = {
				hunger = 1200000 
				}, 
			anim = {
				dict = 'fractalcanfood@animation',
				clip = 'canfood_clip'
			},
			prop = { model = `fractal_food_patecan`, pos = vec3(0.13, 0.04, -0.01), rot = vec3(-90.0, -72.0, -23.0) , bone = 57005},
			usetime = 7500}
		},
	["peas"] = {
		label = "Guisantes",
		stack = true, 
		weight = 100, 
		category = 'food',
		client = {
			status = {
				hunger = 120000 
				}, 
			anim = {
				dict = 'fractalcanfood@animation',
				clip = 'canfood_clip'
			},
			prop = { model = `fractal_food_peascan`, pos = vec3(0.13, 0.05, -0.02), rot = vec3(-90.0, -72.0, -23.0) , bone = 57005},
			usetime = 2500}
		},
	["tunaCan"] = {
		label = "Atun",
		stack = true, 
		weight = 100, 
		category = 'food',
		client = {
			status = {
				hunger = 350000 
				}, 
			anim = {
				dict = 'fractalcanfood@animation',
				clip = 'canfood_clip'
			},
			prop = { model = `fractal_food_tunacan`, pos = vec3(0.15, 0.03, -0.04), rot = vec3(-90.0, -72.0, -23.0) , bone = 57005},
			usetime = 2500}
	},
-- HRS_BASE_BUILDING ITEMS

['gr_prop_gr_hobo_stove_01'] = {
        label = 'CampFire',
        weight = 200,
		stack = true,
        close = true,
        category = 'materials',
        description = 'Campfire for cooking food',
        client = {
            image = 'prop_hobo_stove.png',
        }
    },

    ['model_windowway_stone'] = {
		label = 'Marco de ventana de piedra',
        weight = 200,
        stack = true,
        close = true,
        category = 'materials',
        description = 'Se usa para construir bases',
        client = {
            image = 'model_windowway_stone.png',
        }
    },

	['model_ceilingladder_stone_triangle'] = {
        label = 'Escalera de techo triangular de piedra',
        weight = 200,
        stack = true,
        close = true,
        category = 'materials',
        description = 'Se usa para construir bases',
        client = {
			image = 'model_ceilingladder_stone_triangle.png',
        }
    },

    ['model_wall_wood'] = {
        label = 'Pared de madera',
        weight = 200,
        stack = true,
        close = true,
        category = 'materiales',
		description = 'Se usa para construir bases',
        client = {
            image = 'model_wall_wood.png',
        }
    },

    ['gr_prop_gr_gunlocker_01a'] = {
        label = 'Almacén metálico',
        weight = 200,
		stack = true,
        close = true,
        category = 'materiales',
        description = 'Se usa para construir bases',
        client = {
            image = 'gr_prop_gr_gunlocker_01a.png',
        }
    },

	['model_gateway_stone'] = {
        label = 'Marco de puerta de piedra',
        weight = 200,
        stack = true,
        close = true,
        category = 'materials',
        description = 'Se usa para construir bases',
        client = {
            image = 'model_gateway_stone.png',
        }
	},

    ['model_powercomb1_wall'] = {
        label = 'Combinador de energía',
        weight = 200,
        stack = true,
        close = true,
        category = 'materials',
        description = 'Se usa para construir bases',
        client = {
			image = 'model_powercomb1_wall.png',
        }
    },

    ['p_v_43_safe_s'] = {
        label = 'Almacén metálico 2',
        weight = 200,
        stack = true,
        close = true,
        category = 'materiales',
		description = 'Se usa para construir bases',
        client = {
            image = 'p_v_43_safe_s.png',
        }
    },

    ['model_wall_stone_triangle'] = {
        label = 'Muro triangular de piedra',
        weight = 200,
		stack = true,
        close = true,
        category = 'materiales',
        description = 'Se usa para construir bases',
        client = {
            image = 'model_wall_stone_triangle.png',
        }
    },

    ['model_generator_small'] = {
		label = 'Generador pequeño',
        weight = 200,
        stack = true,
        close = true,
        category = 'materials',
        description = 'Se usa para construir bases',
        client = {
            image = 'model_generator_small.png',
        }
    },

	['model_totem'] = {
        label = 'Tótem',
        weight = 200,
        stack = true,
        close = true,
        category = 'materials',
        description = 'Se usa para construir bases',
        client = {
            image = 'model_totem.png',
        }
    },

	['wood'] = {
        label = 'Madera',
        weight = 500,
        stack = true,
        close = true,
        category = 'materials',
        description = 'Usado para crear objetos y construcciones',
        client = {
            image = 'wood.png',
        }
    },

	['model_wall_stone_roof'] = {
        label = 'Techo de piedra',
        weight = 200,
        stack = true,
        close = true,
        category = 'materials',
        description = 'Se usa para construir bases',
        client = {
			image = 'model_wall_stone_roof.png',
        }
    },

    ['bkr_prop_meth_table01a'] = {
        label = 'Mesa médica',
        weight = 200,
		stack = true,
        close = true,
        category = 'materiales',
        description = 'Se usa para construir bases',
        client = {
            image = 'bkr_prop_meth_table01a.png',
        }
    },

	['model_doorway_metal'] = {
        label = 'Marco de puerta metálico',
        weight = 200,
        stack = true,
        close = true,
        category = 'materials',
        description = 'Se usa para construir bases',
        client = {
            image = 'model_doorway_metal.png',
        }
	},

    ['model_windowway_wood'] = {
        label = 'Marco de ventana de madera',
        weight = 200,
        stack = true,
        category = 'materials',
        close = true,
        description = 'Se usa para construir bases',
        client = {
			image = 'model_windowway_wood.png',
        }
    },

    ['model_pillar_stone'] = {
        label = 'Pilar de piedra',
        weight = 200,
        stack = true,
        close = true,
        category = 'materiales',
        description = 'Se usa para construir bases',
		client = {
            image = 'model_pillar_stone.png',
        }
    },

    ['model_biggateway_wood'] = {
        label = 'Gran puerta de madera',
        weight = 200,
        stack = true,
        close = true,
        category = 'materiales',
		description = 'Se usa para construir bases',
        client = {
            image = 'model_biggateway_wood.png',
        }
    },

    ['model_ceilingstairs_wood'] = {
        label = 'Escaleras de madera',
        weight = 200,
        stack = true,
        close = true,
		category = 'materiales',
        description = 'Se usa para construir bases',
        client = {
            image = 'model_ceilingstairs_wood.png',
        }
    },

    ['model_windowway_metal'] = {
        label = 'Marco de ventana metálico',
        weight = 200,
		stack = true,
        close = true,
        category = 'materiales',
        description = 'Se usa para construir bases',
        client = {
            image = 'model_windowway_metal.png',
        }
    },

	['gr_prop_gr_bench_02a'] = {
        label = 'Mesa de armas',
        weight = 10000,
        stack = true,
        close = true,
        category = 'materials',
		description = 'Se usa para construir bases',
        client = {
            image = 'gr_prop_gr_bench_02a.png',
        }
    },

    ['model_door_wood'] = {
        label = 'Puerta de madera',
		weight = 200,
        stack = true,
        close = true,
        category = 'materials',
        description = 'Se usa para construir bases',
        client = {
            image = 'model_door_wood.png',
        }
    },

    ['model_wall_wood_triangle'] = {
		label = 'Pared triangular de madera',
        weight = 200,
        stack = true,
        close = true,
        category = 'materials',
        description = 'Se usa para construir bases',
        client = {
            image = 'model_wall_wood_triangle.png',
        }
    },

	['model_wall_metal_roof'] = {
        label = 'Metal Roof',
        weight = 200,
        stack = true,
        close = true,
        category = 'materials',
        description = 'Se usa para construir bases',
        client = {
            image = 'model_wall_metal_roof.png',
		}
    },

    ['model_wall_wood_roof'] = {
        label = 'Techo de madera',
        weight = 200,
        stack = true,
        close = true,
        category = 'materials',
        description = 'Se usa para construir bases',
		client = {
            image = 'model_wall_wood_roof.png',
        }
    },

    ['model_ceiling_wood_triangle'] = {
        label = 'Techo triangular de madera',
        weight = 200,
        stack = true,
        close = true,
        category = 'materials',
		description = 'Se usa para construir bases',
        client = {
            image = 'model_ceiling_wood_triangle.png',
        }
    },

    ['prop_box_wood01a'] = {
        label = 'Almacén de madera',
        weight = 200,
        stack = true,
        close = true,
		category = 'materiales',
        description = 'Se usa para construir bases',
        client = {
            image = 'prop_box_wood01a.png',
        }
    },

    ['model_ceiling_stone_triangle'] = {
        label = 'Techo triangular de piedra',
        weight = 200,
		stack = true,
        close = true,
        category = 'materials',
        description = 'Se usa para construir bases',
        client = {
            image = 'model_ceiling_stone_triangle.png',
        }
    },

    ['prop_rural_windmill'] = {
		label = 'Aerogenerador',
        weight = 200,
        stack = true,
        close = true,
        category = 'materials',
        description = 'Se usa para construir bases',
        client = {
            image = 'prop_rural_windmill.png',
        }
    },

	['model_door_stone'] = {
        label = 'Puerta de piedra',
        weight = 200,
        stack = true,
        close = true,
        useable = true,
        category = 'materials',
        description = 'Se usa para construir bases',
        client = {
            image = 'model_door_stone.png',
		}
    },

    ['model_wall_wood_roof_triangle'] = {
        label = 'Techo triangular de madera',
        weight = 200,
        stack = true,
        close = true,
        category = 'materials',
        description = 'Se usa para construir bases',
        client = {
			image = 'model_wall_wood_roof_triangle.png',
        }
    },

    ['prop_tool_bench02_ld'] = {
        label = 'Mesa de trabajo',
        weight = 5000,
        stack = true,
        close = true,
		category = 'materiales',
        description = 'Se usa para construir bases',
        client = {
            image = 'prop_tool_bench02_ld.png',
        }
    },

    ['model_base_wood'] = {
        label = 'Cimientos de madera',
		weight = 200,
        stack = true,
        close = true,
        category = 'materiales',
        description = 'Se usa para construir bases',
        client = {
            image = 'model_base_wood.png',
        }
    },

    ['model_powerdist1_wall'] = {
		label = 'Distribuidor de energía',
        weight = 200,
        stack = true,
        close = true,
        category = 'materials',
        description = 'Se usa para construir bases',
        client = {
            image = 'model_powerdist1_wall.png',
        }
    },

	['v_tre_sofa_mess_b_s'] = {
        label = 'Sofá',
        weight = 200,
        stack = true,
        close = true,
        category = 'materials',
        description = 'Se usa para construir bases',
        client = {
			image = 'v_tre_sofa_mess_b_s.png',
        }
    },

    ['model_wall_metal'] = {
        label = 'Pared metálica',
        weight = 200,
        stack = true,
        close = true,
        category = 'materiales',
		description = 'Se usa para construir bases',
        client = {
            image = 'model_wall_metal.png',
        }
    },

    ['model_pillar_wood'] = {
        label = 'Wood Pillar',
        weight = 200,
		stack = true,
        close = true,
        category = 'materiales',
        description = 'Se usa para construir bases',
        client = {
            image = 'model_pillar_wood.png',
        }
    },

    ['prop_solarpanel_02'] = {
        label = 'Panel solar grande',
		weight = 200,
        stack = true,
        close = true,
        category = 'materials',
        description = 'Se usa para construir bases',
        client = {
            image = 'prop_solarpanel_02.png',
        }
    },

    ['model_upkeep_2'] = {
		label = 'Mantenimiento nivel 2',
        weight = 200,
        stack = true,
        close = true,
        category = 'materials',
        description = 'Se usa para construir bases',
        client = {
            image = 'model_upkeep_2.png',
        }
    },

	['model_biglight_1'] = {
        label = 'Luz grande',
        weight = 200,
        stack = true,
        close = true,
        category = 'materials',
        description = 'Se usa para construir bases',
        client = {
            image = 'model_biglight_1.png',
        }
	},
	['model_wall_stone'] = {
        label = 'Muro de piedra',
        weight = 200,
        stack = true,
        close = true,
        category = 'materials',
        description = 'Se usa para construir bases',
        client = {
			image = 'model_wall_stone.png',
        }
    },

    ['bkr_prop_biker_campbed_01'] = {
        label = 'Cama',
        weight = 200,
		stack = true,
        close = true,
        category = 'materiales',
        description = 'Se usa para construir bases',
        client = {
            image = 'bkr_prop_biker_campbed_01.png',
        }
    },

	['model_window_metal'] = {
        label = 'Ventana metálica',
        weight = 200,
        stack = true,
        close = true,
        category = 'materials',
        description = 'Se usa para construir bases',
        client = {
            image = 'model_window_metal.png',
        }
	},

    ['model_generator_medium'] = {
        label = 'Generador de tamaño mediano',
        weight = 200,
        stack = true,
        close = true,
        category = 'materials',
        description = 'Se usa para construir bases',
        client = {
			image = 'model_generator_medium.png',
        }
    },

    ['prop_solarpanel_03'] = {
        label = 'Panel solar',
        weight = 200,
        stack = true,
        close = true,
        category = 'materiales',
		description = 'Se usa para construir bases',
        client = {
            image = 'prop_solarpanel_03.png',
        }
    },

    ['model_doorway_wood'] = {
        label = 'Marco de puerta de madera',
        weight = 200,
		stack = true,
        close = true,
        category = 'materiales',
        description = 'Se usa para construir bases',
        client = {
            image = 'model_doorway_wood.png',
        }
    },

    ['model_ceilinglight_1'] = {
        label = 'Lámpara de techo',
		weight = 200,
        stack = true,
        close = true,
        category = 'materials',
        description = 'Se usa para construir bases',
        client = {
            image = 'model_ceilinglight_1.png',
        }
    },

    ['model_ceiling_stone'] = {
		label = 'Techo de piedra',
        weight = 200,
        stack = true,
        close = true,
        category = 'materials',
        description = 'Se usa para construir bases',
        client = {
            image = 'model_ceiling_stone.png',
        }
    },

	['prop_telegraph_06a'] = {
        label = 'Línea eléctrica',
        weight = 200,
        stack = true,
        close = true,
        category = 'materials',
        description = 'Se usa para construir bases',
        client = {
			image = 'prop_telegraph_06a.png',
        }
    },

    ['model_oldlight_ext'] = {
        label = 'Luz exterior antigua',
        weight = 200,
        stack = true,
        close = true,
        category = 'materiales',
		description = 'Se usa para construir bases',
        client = {
            image = 'model_oldlight_ext.png',
        }
    },

    ['model_wall_stone_roof_triangle'] = {
        label = 'Techo triangular de piedra',
        weight = 200,
		stack = true,
        close = true,
        category = 'materiales',
        description = 'Se usa para construir bases',
        client = {
            image = 'model_wall_stone_roof_triangle.png',
        }
    },

    ['model_wall_metal_roof_triangle'] = {
		label = 'Techo triangular de metal',
        weight = 200,
        stack = true,
        close = true,
        category = 'materials',
        description = 'Se usa para construir bases',
        client = {
            image = 'model_wall_metal_roof_triangle.png',
        }
    },

	['model_gateway_metal'] = {
        label = 'Marco de puerta metálico',
        weight = 200,
        stack = true,
        close = true,
        category = 'materials',
        description = 'Se usa para construir bases',
        client = {
			image = 'model_gateway_metal.png',
        }
    },

    ['model_worklight_2'] = {
        label = 'Lámpara de trabajo pequeña',
        weight = 200,
        stack = true,
        close = true,
        category = 'materiales',
        description = 'Se usa para construir bases',
		client = {
            image = 'model_worklight_2.png',
        }
    },

    ['model_stairs_stone'] = {
        label = 'Escalera de prieda',
        weight = 200,
        stack = true,
        close = true,
        category = 'materials',
		description = 'Se usa para construir bases',
        client = {
            image = 'model_stairs_stone.png',
        }
    },

    ['model_window_wood'] = {
        label = 'Ventana de madera',
        weight = 200,
        stack = true,
        close = true,
		category = 'materiales',
        description = 'Se usa para construir bases',
        client = {
            image = 'model_window_wood.png',
        }
    },

    ['model_gateway_wood'] = {
        label = 'Marco de puerta de madera',
        weight = 200,
		stack = true,
        close = true,
        category = 'materiales',
        description = 'Se usa para construir bases',
        client = {
            image = 'model_gateway_wood.png',
        }
    },

    ['model_gate_metal'] = {
        label = 'Puerta metálica',
		weight = 200,
        stack = true,
        close = true,
        category = 'materials',
        description = 'Se usa para construir bases',
        client = {
            image = 'model_gate_metal.png',
        }
    },

    ['model_ceiling_metal_triangle'] = {
		label = 'Techo triangular metálico',
        weight = 200,
        stack = true,
        close = true,
        category = 'materials',
        description = 'Se usa para construir bases',
        client = {
            image = 'model_ceiling_metal_triangle.png',
        }
    },

	['model_base_stone_triangle'] = {
        label = 'Cimentación triangular de piedra',
        weight = 200,
		stack = true,
        close = true,
        category = 'materials',
        description = 'Se usa para construir bases',
        client = {
            image = 'model_base_stone_triangle.png',
        }
    },
	['model_wall_wood_small'] = {
        label = 'Pared pequeña de madera',
        weight = 200,
        stack = true,
        close = true,
        category = 'materials',
        description = 'Se usa para construir bases',
        client = {
			image = 'model_wall_wood_small.png',
        }
    },

    ['model_upkeep_3'] = {
        label = 'Mantenimiento nivel 3',
        weight = 200,
        stack = true,
        close = true,
		category = 'materiales',
        description = 'Se usa para construir bases',
        client = {
            image = 'model_upkeep_3.png',
        }
    },

    ['model_ceilingstairs_metal'] = {
        label = 'Escaleras metálicas',
		weight = 200,
        stack = true,
        close = true,
        category = 'materiales',
        description = 'Se usa para construir bases',
        client = {
            image = 'model_ceilingstairs_metal.png',
        }
    },

	['model_wall_metal_small'] = {
        label = 'Pared metálica pequeña',
        weight = 200,
        stack = true,
        close = true,
        category = 'materials',
        description = 'Se usa para construir bases',
        client = {
			image = 'model_wall_metal_small.png',
        }
    },

    ['model_stairs_wood'] = {
        label = 'Escaleras de madera',
        weight = 200,
        stack = true,
        close = true,
        category = 'materiales',
		description = 'Se usa para construir bases',
        client = {
            image = 'model_stairs_wood.png',
        }
    },

    ['model_base_metal_triangle'] = {
        label = 'Metal Triangle Foundation',
        weight = 200,
        stack = true,
        close = true,
		category = 'materiales',
        description = 'Se usa para construir bases',
        client = {
            image = 'model_base_metal_triangle.png',
        }
    },

    ['model_window_stone'] = {
        label = 'Ventana de piedra',
        weight = 200,
		stack = true,
        close = true,
        category = 'materiales',
        description = 'Se usa para construir bases',
        client = {
            image = 'model_window_stone.png',
        }
    },

    ['model_ceiling_metal'] = {
        label = 'Techo metálico',
		weight = 200,
        stack = true,
        close = true,
        category = 'materials',
        description = 'Se usa para construir bases',
        client = {
            image = 'model_ceiling_metal.png',
        }
    },

	['model_gate_stone'] = {
        label = 'Puerta de piedra',
        weight = 200,
        stack = true,
        close = true,
        category = 'materials',
        description = 'Se usa para construir bases',
        client = {
            image = 'model_gate_stone.png',
        }
    } ,

    ['model_door_metal'] = {
        label = 'Puerta metálica',
        weight = 200,
        stack = true,
        close = true,
        category = 'materials',
        description = 'Se usa para construir bases',
        client = {
			image = 'model_door_metal.png',
        }
    },

    ['model_ceilingladder_metal_triangle'] = {
        label = 'Escalera de techo triangular de metal',
        weight = 200,
        stack = true,
        close = true,
        category = 'materiales',
		description = 'Se usa para construir bases',
        client = {
            image = 'model_ceilingladder_metal_triangle.png',
        }
    },

    ['model_base_wood_triangle'] = {
        label = 'Cimientos triangular de madera',
		weight = 200,
        stack = true,
        close = true,
        category = 'materiales',
        description = 'Se usa para construir bases',
        client = {
            image = 'model_base_wood_triangle.png',
        }
    },

    ['prop_planer_01'] = {
		label = 'Máquina de reciclaje',
        weight = 200,
        stack = true,
        close = true,
        category = 'materials',
        description = 'Se usa para construir bases',
        client = {
            image = 'prop_planer_01.png',
        }
    },

	['model_battery_pack_6'] = {
        label = 'Batería',
        weight = 200,
        stack = true,
        close = true,
        category = 'materials',
        description = 'Se usa para construir bases',
		client = {
            image = 'model_battery_pack_6.png',
        }
    },

    ['model_wall_metal_triangle'] = {
        label = 'Pared triangular metálica',
        weight = 200,
        stack = true,
        close = true,
		category = 'materiales',
        description = 'Se usa para construir bases',
        client = {
            image = 'model_wall_metal_triangle.png',
        }
    },

    ['model_stairs_metal'] = {
        label = 'Escaleras metálicas',
        weight = 200,
        stack = true,
		close = true,
        category = 'materials',
        description = 'Se usa para construir bases',
        client = {
            image = 'model_stairs_metal.png',
        }
    },

    ['model_doorway_stone'] = {
        label = 'Marco de puerta de piedra',
        weight = 200,
		stack = true,
        close = true,
        category = 'materiales',
        description = 'Se usa para construir bases',
        client = {
            image = 'model_doorway_stone.png',
        }
    },

    ['model_bigwall_wood'] = {
		label = 'Pared grande de madera',
        weight = 200,
        stack = true,
        close = true,
        category = 'materials',
        description = 'Se usa para construir bases',
        client = {
            image = 'model_bigwall_wood.png',
        }
    },

	['model_worklight_1'] = {
        label = 'Lámpara de trabajo grande',
        weight = 200,
        stack = true,
        close = true,
        category = 'materials',
        description = 'Se usa para construir bases',
        client = {
            image = 'model_worklight_1.png',
		}
    },

    ['model_ceilingstairs_stone'] = {
        label = 'Escalera de piedra',
        weight = 200,
        stack = true,
        close = true,
        category = 'materials',
        description = 'Se usa para construir bases',
        client = {
			image = 'model_ceilingstairs_stone.png',
        }
    },
	['model_base_metal'] = {
        label = 'Cimentación metálica',
        weight = 200,
        stack = true,
        close = true,
        category = 'materials',
        description = 'Se usa para construir bases',
        client = {
			image = 'model_base_metal.png',
        }
    },

    ['model_base_stone'] = {
        label = 'Cimientos de piedra',
        weight = 200,
        stack = true,
        close = true,
        category = 'materiales',
		description = 'Se usa para construir bases',
        client = {
            image = 'model_base_stone.png',
        }
    },

    ['model_pillar_metal'] = {
        label = 'Metal Pillar',
        weight = 200,
		stack = true,
		close = true,
		category = 'materiales',
		description = 'Se usa para construir bases',
		client = {
			image = 'model_pillar_metal.png',
		}
	},

	['model_generator_big'] = {
		label = 'Generador grande',
        weight = 200,
        stack = true,
        close = true,
        category = 'materials',
        description = 'Se usa para construir bases',
        client = {
            image = 'model_generator_big.png',
        }
    },

	['model_biggate_wood'] = {
        label = 'Puerta grande de madera',
        weight = 200,
        stack = true,
        close = true,
        category = 'materials',
        description = 'Se usa para construir bases',
        client = {
			image = 'model_biggate_wood.png',
        }
    },

    ['model_walllight_1'] = {
        label = 'Lámpara de pared',
        weight = 200,
        stack = true,
        close = true,
        category = 'materiales',
		description = 'Se usa para construir bases',
        client = {
            image = 'model_walllight_1.png',
        }
    },

    ['model_ceilingladder_wood_triangle'] = {
        label = 'Escalera de techo triangular de madera',
        weight = 200,
		stack = true,
        close = true,
        category = 'materials',
        description = 'Se usa para construir bases',
        client = {
            image = 'model_ceilingladder_wood_triangle.png',
        }
    },

    ['model_gate_wood'] = {
		label = 'Puerta de madera',
        weight = 200,
        stack = true,
        close = true,
        category = 'materials',
        description = 'Se usa para construir bases',
        client = {
            image = 'model_gate_wood.png',
        }
    },

	['model_wall_stone_small'] = {
        label = 'Muro pequeño de piedra',
        weight = 200,
        stack = true,
        close = true,
        category = 'materials',
        description = 'Se usa para construir bases',
        client = {
			image = 'model_wall_stone_small.png',
        }
    },

    ['model_powerdist1_switch_wall'] = {
        label = 'Distribuidor de energía [ON/OFF]',
        weight = 200,
        stack = true,
        close = true,
        category = 'materiales',
		description = 'Se usa para construir bases',
        client = {
            image = 'model_powerdist1_switch_wall.png',
        }
    },

    ['model_ceiling_wood'] = {
        label = 'Techo de madera',
        weight = 200,
		pila = true,
        close = true,
        category = 'materiales',
        description = 'Se usa para construir bases',
        client = {
            image = 'model_ceiling_wood.png',
        }
    },

    ['model_upkeep_1'] = {
		label = 'Mantenimiento lvl 1',
        weight = 200,
        stack = true,
        close = true,
        category = 'materials',
        description = 'Se usa para construir bases',
        client = {
            image = 'model_upkeep_1.png',
        }
    },

-- RESOURCES
['cable'] = {label = 'Cable', weight = 1},
['gasoline'] = {label = 'Gasolina', weight = 10},
['tablones'] = {label = 'Tablones', weight = 100},

-- NOT USEABLE
['prop_money_bag_01'] = {label = 'Bag', weight = 100},

-- UKPEEP
-- ['xm3_prop_xm3_whshelf_03a'] = {label = 'Big Upkeep Box', weight = 100},

-- CAMPFIRES
['model_campfire'] = {label = "Hoguera", weight = 100, category = 'materials'},
['model_hobo_stove'] = {label = "Fuego improvisado", weight = 100, category = 'materials'},

--Personalizados
['cloth'] = {label = 'Tela', weight = 5,  category = 'materials'},
['clavos'] = {label = 'Clavos', weight = 5,  category = 'materials'},
	['backpack'] = {
		label = 'Backpack',
		weight = 220,
		stack = false,
		consume = 0,
		client = {
			export = 'wasabi_backpack.openBackpack'
		}
	},

	["base_blueprint"] = {
		label = "Plano construccion",
		weight = 200,
		stack = true,
		close = true,
		description = "Se usa para construir bases",
		client = {
			image = "base_blueprint.png",
		}
	},

	["Tablones"] = {
		label = "Tablones",
		weight = 100,
		stack = true,
		close = false,
		description = "Tablones de Madera",
		client = {
			image = "tablones.png",
		}
	},
	["torch"] = {
		label = "Antorcha",
		weight = 1,
		stack = false,
		close = true,
		client = {
			image = 'torch.png',
			export = 'bzzz_torch_effect.useTorch'
		},
	},
	["bbqbig"] = {
		label = "Chimenea",
		weight = 1000,
		stack = true,
		close = true,
		description = "Para preparar ricas comidas y calentarte",
		client = {
			image = "bbqbig.png",
		}
	},
	["bbqrustys"] = {
		label = "Barbacoa Oxidada",
		weight = 1000,
		stack = true,
		close = true,
		description = "Para prearar ricas comidas",
		client = {
			image = "bbqrustys.png",
		}
	},
	["cauldron"] = {
		label = "Caldero",
		weight = 1000,
		stack = true,
		close = true,
		description = "Para prearar ricas comidas",
		client = {
			image = "cauldron.png",
		}
	},
	["furnacebig"] = {
		label = "Horno",
		weight = 1000,
		stack = true,
		close = true,
		description = "Para refinar metales",
		client = {
			image = "furnacebig.png",
		}
	},
	["furnacesmall"] = {
		label = "Horno Pequeño",
		weight = 1000,
		stack = true,
		close = true,
		description = "Para refinar metales",
		client = {
			image = "furnacesmall.png",
		}
	},
	["hornoelectrico"] = {
		label = "Horno Electrico",
		weight = 1000,
		stack = true,
		close = true,
		description = "Para preparar ricas comidas",
		client = {
			image = "hornoelectrico.png",
		}
	},
	["stone"] = {
		label = "Piedra",
		weight = 800,
		stack = true,
		close = true,
		description = "Para fabricar cositas",
		client = {
			image = "stone.png",
		}
	},
	["kq_outfitbag"] = {
        label = "Mochila Outfits",
        weight = 400,
        stack = true,
        close = true,
        consume = 0,
        server = {
            export = 'kq_outfitbag2.UseBag',
        },
    },
	["sulfur"] = {
        label = "Azufre",
        weight = 400,
        stack = true,
        close = true,
        client = {
			image = "sulfur.png",
		}
    },
	["sulfur2"] = {
        label = "Mena de Azufre",
        weight = 400,
        stack = true,
        close = true,
        client = {
			image = "sulfur2.png",
		}
    },
	
	["charcoal"] = {
		label = "Carbon",
		weight = 20,
		stack = true,
		close = true
	},
	
	["iron_trash"] = {
		label = "Hierro",
		weight = 500,
		stack = true,
		close = true
	},
	
	["tech_parts"] = {
		label = "Componentes Electronicos",
		weight = 400,
		stack = true,
		close = true,
		description = "Puedes reciclarlos para obtener materiales",
	},
	
	["gunpowder"] = {
		label = "Gunpowder",
		weight = 100,
		stack = true,
		close = true
	},

	["metal_fragments"] = {
		label = "Trozos de metal",
		weight = 100,
		stack = true,
		close = true
	},

	['protein'] = {
		label = 'Protein',
		weight = 1,
		stack = true
	},
	['runbooster'] = {
		label = 'Run-Booster',
		weight = 1,
		stack = true
	},

	["alcohol"] = {
		label = "Alcohol Etílico",
		weight = 100,
		stack = true,
		close = true
	},
	["car_battery"] = {
		label = "Bateria de coche",
		weight = 400,
		stack = true,
		close = true
	},

	["repairitem"] = {
		label = "repairitem",
		weight = 2500,
		stack = true,
		close = true,
		description = "self repair item for cars and trucks",
		client = {
			image = "repairkit.png",
		}
	},

	 -- =====================================
    -- HEALING ITEMS (uses healingItems config)
    -- These can be used directly from inventory
    -- Wasabi Advanced Ambulance Job V2
    -- =====================================
    ["bandage"] = {      -- Make sure no duplicates exist in the original items.lua
        label = 'Bandage',
        description = 'A simple bandage to stop minor bleeding',
        weight = 25,
        server = {
            export = "wasabi_ambulance_v2.bandage"
        }
    },
    ["medkit"] = {
        label = 'Med-Kit',
        description = 'A medical kit for treating injuries',
        weight = 250,
        server = {
            export = "wasabi_ambulance_v2.medkit"
        }
    },
    ["firstaidkit"] = {
        label = 'First Aid Kit',
        description = 'A comprehensive first aid kit for serious injuries',
        weight = 350,
        server = {
            export = "wasabi_ambulance_v2.firstaidkit"
        }
    },
    ["painkillers"] = {
        label = 'Painkillers',
        description = 'Pills to temporarily relieve pain and reduce stun effects',
        weight = 10,
        server = {
            export = "wasabi_ambulance_v2.painkillers"
        }
    },
    ["ifak"] = {
        label = 'IFAK',
        description = 'Individual First Aid Kit',
        weight = 150,
        server = {
            export = "wasabi_ambulance_v2.ifak"
        }
    },

    -- =====================================
    -- MEDICAL TREATMENT ITEMS (uses medicalItems config)
    -- These are used via the inspection UI by dragging onto limbs
    -- They do NOT have exports - the UI system handles their usage
    -- Wasabi Advanced Ambulance
    -- =====================================
    ["forceps"] = {
        label = 'Forceps',
        description = 'Used to treat gunshot wounds',
        weight = 100,
    },
    ["pliers"] = {
        label = 'Pliers',
        description = 'Used to treat taser prong wounds',
        weight = 25,
    },
    ["suture"] = {
        label = 'Suture',
        description = 'Used to treat cuts',
        weight = 25,
    },
    ["splint"] = {
        label = 'Splint',
        description = 'Used to treat broken bones',
        weight = 50,
    },
    ["icepack"] = {
        label = 'Ice Pack',
        description = 'Used to treat punches and bruises',
        weight = 25,
    },
    ["traumakit"] = {
        label = 'Trauma Kit',
        description = 'Used to treat blunt force trauma',
        weight = 75,
    },
    ["burncream"] = {
        label = 'Burn Cream',
        description = 'Used to treat burns',
        weight = 10,
    },

    -- =====================================
    -- EQUIPMENT ITEMS
    -- Wasabi Advanced Ambulance
    -- =====================================
    ["medbag"] = {
        label = 'Medbag',
        description = 'A portable medical bag containing supplies',
        weight = 50,
        stack = false,
        close = true,
        consume = 0,
        server = {
            export = "wasabi_ambulance_v2.medbag"
        }
    },
-- PLANTATION

['tomato'] = {
    label = 'Tomate',
    weight = 100,
    degrade = 1440,
    rarity = 'common',
    stack = true,
    close = true,
    description = 'Tomate fresco',
	client = {
		status = { hunger = 180000},
		anim = 'eating',
		usetime = 2500
	},
},

['tomato_seed'] = {
    label = 'Semilla de tomate',
    weight = 10,
    rarity = 'common',
	category = 'food',
    stack = true,
    close = true,
    description = 'Semillas para cultivar tomates'
},

['rotten_tomato'] = {
    label = 'Tomate podrido',
    weight = 100,
    degrade = 720,
    rarity = 'common',
    stack = true,
    close = true,
    description = 'Tomate podrido',
	client = {
		status = { hunger = 100000},
		anim = 'eating',
		usetime = 2500
	},
},

['zucchini'] = {
    label = 'Calabacín',
    weight = 150,
    degrade = 1440,
    rarity = 'common',
	category = 'food',
    stack = true,
    close = true,
    description = 'Calabacín fresco',
	client = {
		status = { hunger = 180000},
		anim = 'eating',
		usetime = 2500
	},
},

['zucchini_seed'] = {
    label = 'Semilla de calabacin',
    weight = 10,
    rarity = 'common',
    stack = true,
    close = true,
    description = 'Semillas para cultivar calabacines'
},

['rotten_zucchini'] = {
    label = 'Calabacín podrido',
    weight = 150,
    degrade = 720,
    rarity = 'common',
    stack = true,
    close = true,
    description = 'Calabacín podrido',
	client = {
		status = { hunger = 100000},
		anim = 'eating',
		usetime = 2500
	},
},

['pumpkin'] = {
    label = 'Calabaza',
    weight = 150,
    degrade = 2880,
    rarity = 'common',
	category = 'food',
    stack = true,
    close = true,
    description = 'Calabaza fresca',
	client = {
		status = { hunger = 200000},
		anim = 'eating',
		usetime = 2500
	},
},

['pumpkin_seed'] = {
    label = 'Semilla de calabaza',
    weight = 10,
    rarity = 'common',
    stack = true,
    close = true,
    description = 'Semilla para cultivar calabazas'
},

['rotten_pumpkin'] = {
    label = 'Calabaza podrida',
    weight = 150,
    degrade = 720,
    rarity = 'common',
	category = 'food',
    stack = true,
    close = true,
    description = 'Calabaza podrida',
	client = {
		status = { hunger = 100000},
		anim = 'eating',
		usetime = 2500
	},
},

['potato'] = {
    label = 'Patata',
    weight = 200,
    degrade = 2880,
    rarity = 'common',
	category = 'food',
    stack = true,
    close = true,
    description = 'Patata fresca',
	client = {
		status = { hunger = 180000},
		anim = 'eating',
		usetime = 2500
	},
},

['potato_seed'] = {
    label = 'Semilla de patata',
    weight = 10,
    rarity = 'common',
    stack = true,
    close = true,
    description = 'Semilla para cultivar patatas'
},

['rotten_potato'] = {
    label = 'Patata podrida',
    weight = 200,
    degrade = 720,
    rarity = 'common',
	category = 'food',
    stack = true,
    close = true,
    description = 'Patata podrida',
	client = {
		status = { hunger = 100000},
		anim = 'eating',
		usetime = 2500
	},
},

['pepper'] = {
    label = 'Pimiento',
    weight = 100,
    degrade = 1440,
    rarity = 'common',
	category = 'food',
    stack = true,
    close = true,
    description = 'Pimiento fresco',
	client = {
		status = { hunger = 180000},
		anim = 'eating',
		usetime = 2500
	},
},

['pepper_seed'] = {
    label = 'Semilla de pimiento',
    weight = 10,
    rarity = 'common',
    stack = true,
    close = true,
    description = 'Semilla para cultivar pimientos'
},

['rotten_pepper'] = {
    label = 'Pimiento podrido',
    weight = 100,
    degrade = 720,
    rarity = 'common',
    stack = true,
    close = true,
    description = 'Pimiento podrido',
	client = {
		status = { hunger = 100000},
		anim = 'eating',
		usetime = 2500
	},
},


["salad"] = {
    label = "Ensalada de verduras",
    weight = 100,
    rarity = 'uncommon',
    stack = true,
    close = true,
    description = 'Ensalada de verduras',
	client = {
		status = { hunger = 650000},
		anim = 'eating',
		usetime = 2500
	},
},


["consumable_stir_fry"] = {
    label = "Salteado de verduras",
    weight = 1,
   	rarity = 'uncommon',
    stack = true,
    close = true,
    description = 'Salteado de verduras rico rico',
	client = {
		status = { hunger = 650000},
		anim = 'eating',
		usetime = 2500
	},
},


["gumbo_stew"] = {
    label = "Estofado de verduras",
    weight = 1,
    rarity = 'uncommon',
    stack = true,
    close = true,
    description = 'Estofado de verduras rico rico',
	client = {
		status = { hunger = 650000},
		anim = 'eating',
		usetime = 2500
	},
},


['sprinkler'] = {
    label = 'Sprinkler',
    weight = 500,
    rarity = 'uncommon',
    stack = false,
    close = true,
    description = 'Irrigation tool for crops'
},

["farm_fertilizer"] = {
    label = "Fertilizante",
    weight = 100,
    stack = true,
    close = true
},

["watering_can_full"] = {
    label = "Regadera llena",
    weight = 1000,
    stack = false,
    close = true,
	decay = true
},

["watering_can"] = {
    label = "Regadera vacía",
    weight = 500,
    stack = true,
    close = false,
},

   ['book'] = {
    label = 'Book',
    weight = 100,
    stack = false,
    close = true,
    consume = 0,
    description = 'An empty book that can store images as pages.',
    client = { event = 'books:client:useBook' },
    image = 'book.png',
	},
	
	["blueprint"] = {
		label = "Planos armas",
		weight = 1,
		stack = true,
		close = true,
		consume = 1,
		maxstock = 1,             -- (Number) Hard limit per slot.
    	rarity = 'legendary',            -- (String) Color border effect.
		description = "Blueprint para aprender a fabricar armas",
		client = {
			event = 'blueprints:abrirMenu',
    	}
	},
	
	['antidoto'] = {
		label = 'Antídoto',
		weight = 200,
		stack = true,
		close = true,
		consume = 0,
		rarity = 'legendary',
		description = 'Suero experimental que elimina la infección zombi',
	},

	['pastillas_infeccion'] = {
		label = 'Pastillas antivirales',
		weight = 100,
		stack = true,
		close = true,
		consume = 0,
		rarity = 'rare',
		description = 'Reducen el avance de la infección, pero no la curan',
	},

	['tuna'] = {
		label = 'Atun',
		weight = 650,
		stack = true,
		description = "Atun cocinado",
		close = false,
	},
	
	['salmon'] = {
		label = 'Salmon',
		weight = 350,
		stack = true,
		close = false,
		description = "Salmon cocinado",
	},

	['trout'] = {
		label = 'Trucha',
		weight = 250,
		stack = true,
		close = false,
		description = "Trucha cocinada",
	},

	['anchovy'] = {
		label = 'Anchoa',
		weight = 50,
		stack = true,
		close = false,
		description = "Anchoa cocinado",
	},

	['fishbait'] = {
		label = 'Cebo para peces',
		weight = 50,
		stack = true,
		close = false,
	},

	['fishingrod'] = {
		label = 'Caña de pescar',
		weight = 800,
		stack = true,
		close = true,
		description = "Caña de pescar",
		client = {
			image = "fishingrod.png",
		}
	},

	['tuna_cooked'] = {
		label = 'Atun cocinado',
		weight = 650,
		stack = true,
		description = "Atun cocinado",
		category = 'food',
		client = {
			status = { hunger = 180000},
			anim = 'eating',
			usetime = 2500
		},
	},
	
	['salmon_cooked'] = {
		label = 'Salmon cocinado',
		weight = 350,
		stack = true,
		description = "Salmon cocinado",
		category = 'food',
		client = {
			status = { hunger = 180000},
			anim = 'eating',
			usetime = 2500
		},
	},

	['trout_cooked'] = {
		label = 'Trucha cocinada',
		weight = 250,
		stack = true,
		description = "Trucha cocinada",
		category = 'food',
		client = {
			status = { hunger = 180000},
			anim = 'eating',
			usetime = 2500
		},
	},

	['anchovy_cooked'] = {
		label = 'Anchoa cocinada',
		weight = 50,
		stack = true,
		description = "Anchoa cocinada",
		category = 'food',
		client = {
			status = { hunger = 180000},
			anim = 'eating',
			usetime = 2500
		},
	},


	["moneda_undead"] = {
		label = "Moneda",
		weight = 0,
		stack = false,
		close = false,
		description = "Moneda",
		client = {
			image = "moneda_undead.png",
		}
	},

	--- CUSTOM OX ITEMS

['clothing'] = {
    label = 'Clothing',
    weight = 100,
    stack = false,
    close = true,
    category = 'materials'
},

['mask'] = {
    label = 'Mask',
    weight = 100,
    stack = false,
    close = true,
    category = 'equipment'
},

['hat'] = {
    label = 'Hat',
    weight = 100,
    stack = false,
    close = true,
    category = 'equipment'
},

['earrings'] = {
    label = 'Earrings',
    weight = 100,
    stack = false,
    close = true,
    category = 'equipment'
},

['glasses'] = {
    label = 'Glasses',
    weight = 100,
    stack = false,
    close = true,
    category = 'equipment'
},

['chain'] = {
    label = 'Necklace',
    weight = 100,
    stack = false,
    close = true,
    category = 'equipment'
},

['undershirt'] = {
    label = 'Undershirt',
    weight = 100,
    stack = false,
    close = true,
    category = 'equipment'
},

['jacket'] = {
    label = 'Jacket',
    weight = 170,
    stack = false,
    close = true,
    category = 'equipment'
},

['bodyarmor'] = {
    label = 'Body Armor',
    weight = 100,
    stack = false,
    close = true,
    category = 'equipment',
    consume = 0,
    buttons = {{
        label = "Manage Plates",
        action = function(slot)
            exports['ml_clothing']:managePlates(slot)
        end
    }}
},

['bracelet'] = {
    label = 'Bracelet',
    weight = 100,
    stack = false,
    close = true,
    category = 'equipment'
},

['watch'] = {
    label = 'Watch',
    weight = 100,
    stack = false,
    close = true,
    category = 'equipment'
},

['bag'] = {
    label = 'Bag',
    weight = 100,
    stack = false,
    close = true,
    category = 'equipment'
},

['pants'] = {
    label = 'Pants',
    weight = 100,
    stack = false,
    close = true,
    category = 'equipment'
},

['shoes'] = {
    label = 'Shoes',
    weight = 100,
    stack = false,
    close = true,
    category = 'equipment'
},

['gloves'] = {
    label = 'Gloves',
    weight = 100,
    stack = false,
    close = true,
    category = 'equipment'
},

['decals'] = {
    label = 'Decals',
    weight = 100,
    stack = false,
    close = true,
    category = 'equipment'
},


-- PLATES
['lightplate'] = {
    label = 'Light Plate',
    description = 'Polyethylene lightweight armor plate.',
    weight = 250,
    stack = false,
    close = true,
    rarity = 'uncommon',
    category = 'materials',
    client = {
       event = 'ml_clothing:client:usePlate',
      }

},

['heavyplate'] = {
    label = 'Heavy Plate',
    description = 'Ceramic heavy armor plate.',
    weight = 500,
    stack = false,
    close = true,
    rarity = 'uncommon',
    category = 'materials',
    client = {
       event = 'ml_clothing:client:usePlate',
      }

},

['brokenplate'] = {
    label = 'Broken Plate',
    description = 'This plate is completely shattered!',
    weight = 500,
    stack = false,
    close = true,
    rarity = 'uncommon',
    category = 'materials'
},

["weed_white-widow"] = {
    label = "White Widow weed",
    weight = 150,
    stack = false,
},

["weed_purple-haze"] = {
    label = "Purple Haze weed",
    weight = 150,
    stack = false,
},

["weed_og-kush"] = {
    label = "OG Kush weed",
    weight = 150,
    stack = false,
},

["weed_white-widow_seed"] = {
    label = "White Widow seed",
    weight = 50,
    stack = false,
},

["weed_purple-haze_seed"] = {
    label = "Purple Haze seed",
    weight = 50,
    stack = false,
},

["weed_og-kush_seed"] = {
    label = "OG Kush seed",
    weight = 50,
    stack = false,
},

["apple"] = {
    label = "Apple",
    weight = 1,
    stack = true,
    close = true,
	client = {
		status = { hunger = 180000},
		anim = 'eating',
		usetime = 2500
	},
},

["rottenapple"] = {
    label = "Rottenapple",
    weight = 1,
    stack = true,
    close = true,
	client = {
		status = { hunger = 100000},
		anim = 'eating',
		usetime = 2500
	},
},

["clothe"] = {
    label = "Ropa usada",
    weight = 1,
    stack = true,
    close = true
},

["piedrarefinada"] = {
    label = "Piedra Refinada",
    weight = 200,
    stack = true,
    close = true
},

["sewing_kit"] = {
    label = "Kit de costura",
    weight = 10,
    stack = true,
    close = true
},

["shirts"] = {
    label = "Camiseta",
    weight = 10,
    stack = true,
    close = true
},


["resource_rope"] = {
    label = "Cuerda",
    weight = 10,
    stack = true,
    close = true
},

["raw_ore"] = {
    label = "Laton",
    weight = 400,
    stack = true,
    close = true
},

["brass"] = {
    label = "Laton refinado",
    weight = 100,
    stack = true,
    close = true
},

["bullet_casings"] = {
    label = "Casquillo de bala vacío",
    weight = 100,
    stack = true,
    close = true
},

["cartucho_escopeta"] = {
    label = "Cartucho escopeta vacio",
    weight = 100,
    stack = true,
    close = true
},

["coke_cement"] = {
    label = "Cemento",
    weight = 1000,
    stack = true,
    close = true
},

["clay"] = {
    label = "Arcilla",
    weight = 1000,
    stack = true,
    close = true
},

["sierra"] = {
    label = "Sierra Circular",
    weight = 100,
    stack = true,
    close = true
},


	["copper"] = {
		label = "Copper",
		weight = 100,
		stack = true,
		close = false,
		description = "Bonita pieza de metal que probablemente puedas usar para algo.",
		client = {
			image = "copper.png",
		}
	},

	["sierraCircular"] = {
		label = "Sierra Circular",
		weight = 1000,
		stack = true,
		close = true,
	},

	["ticket_tuning"] = {
		label = "Ticket Tunning",
		weight = 1,
		stack = true,
		close = true,
		maxstock = 1,             -- (Number) Hard limit per slot.
    	rarity = 'legendary',            -- (String) Color border effect.
	},

	['blueprint_car'] = {
    label = 'Blueprint',
    weight = 10,
    stack = true,
    close = true,
    consume = 0,
    client = {
        export = 'last-vehiclecraft.blueprint'
    },
    description = 'Blueprint used to start a vehicle project.'
},

['vehicle_manual'] = {
    label = 'Vehicle Manual',
    weight = 10,
    stack = true,
    close = true,
    consume = 0,
    client = {
        export = 'last-vehiclecraft.vehicle_manual'
    },
    description = 'Use it to open the vehicle crafting menu.'
},

	--Water statiosn items
	['bottle_water'] = {
		label = 'Water Bottle',
		weight = 500,
		rarity = 'common',
		category = 'materials'
	},
	['bottle_fuel'] = {
		label = 'Bottella de combustible',
		weight = 500,
		rarity = 'common',
		category = 'materials'
	},
	['bottle_empty'] = {
		label = 'Empty Bottle',
		weight = 50,
		-- rarity = 'common',
		category = 'tools'
	},
	['jug_water'] = {
		label = 'Jarra defaults',
		weight = 5000,
		rarity = 'rare',
		category = 'materials'
	},
	['jug_fuel'] = {
		label = 'Jarra de combustible',
		weight = 5000,
		rarity = 'rare',
		category = 'materials'
	},
	['jug_empty'] = {
		label = 'Jarra vacia',
		weight = 500,
		rarity = 'common',
		category = 'tools'
	},
	['bucket_water'] = {
		label = 'Cubo de agua',
		weight = 10000,
		rarity = 'epic',
		category = 'materials'
	},
	['bucket_fuel'] = {
		label = 'Cubo de combustible',
		weight = 10000,
		rarity = 'epic',
		category = 'materials'
	},
	['bucket_empty'] = {
		label = 'Cubo vacio',
		weight = 1000,
		rarity = 'rare',
		category = 'tools'
	},

	['small_water_tank'] = {
		label = 'Tanque de agua pequeño',
		stack = false,
		weight = 3000,
		rarity = 'common',
		category = 'tools'
	},

	['medium_water_tank'] = {
		label = 'Tanque de agua mediano',
		stack = false,
		weight = 6000,
		rarity = 'rare',
		category = 'tools'
	},

	['large_water_tank'] = {
		label = 'Tanque de agua grande',
		stack = false,
		weight = 10000,
		rarity = 'epic',
		category = 'tools'
	},


	--[[Mechanic items]]
	-- Jim-Mechanic --
	["mechanic_tools"] = {
		label = "Mechanic tools", weight = 0, stack = false, close = true, description = "Needed for vehicle repairs",
		client = { image = "mechanic_tools.png", event = "jim-mechanic:client:Repair:Check" }
	},
	["toolbox"] = {
		label = "Toolbox", weight = 0, stack = false, close = true, description = "Needed for Performance part removal",
		client = { image = "toolbox.png", event = "jim-mechanic:client:Menu" }
	},
	["ducttape"] = {
		label = "Duct Tape", weight = 0, stack = false, close = true, description = "Good for quick fixes",
		client = { image = "bodyrepair.png", event = "jim-mechanic:quickrepair" }
	},
	['mechboard'] = { label = 'Mechanic Sheet', weight = 0, stack = false, close = true,
		buttons = {
			{ 	label = 'View List',
				action = function(slot)
					local items = exports.ox_inventory:Search('slots', 'mechboard')
					for _, v in pairs(items) do
						if (v.slot == slot) then
							local item = v
							item.info = item.metadata["info"] or {}
							TriggerEvent("jim-mechanic:client:giveList", item)
							exports.ox_inventory:closeInventory()
							break
						end
					end
				end
			},
			{ 	label = 'Copy Parts List',
				action = function(slot)
					local items = exports.ox_inventory:Search('slots', 'mechboard')
					for _, v in pairs(items) do
						if (v.slot == slot) then
							lib.setClipboard(v.metadata.info.vehlist)
							break
						end
					end
				end
			},
			{ 	label = 'Copy Platedsdf Number',
				action = function(slot)
					local items = exports.ox_inventory:Search('slots', 'mechboard')
					for _, v in pairs(items) do
						if (v.slot == slot) then
							lib.setClipboard(v.metadata.info.vehplate)
							break
						end
					end
				end
			},
			{	label = 'Copy Vehicle Model',
				action = function(slot)
					local items = exports.ox_inventory:Search('slots', 'mechboard')
					for _, v in pairs(items) do
						if (v.slot == slot) then
							lib.setClipboard(v.metadata.info.veh) break
						end
					end
				end
			},
		},
		client = {
			event = "jim-mechanic:client:giveList"
		}
	},
	--Performance
	["turbo"] = {
		label = "Supercharger Turbo", weight = 0, stack = false, close = true, description = "Who doesn't need a 65mm Turbo??",
		client = { image = "turbo.png", event = "jim-mechanic:client:applyTurbo", remove = false },
	},
	["car_armor"] = {
		label = "Vehicle Armor", weight = 0, stack = false, close = true, description = "",
		client = { image = "armour.png", event = "jim-mechanic:client:applyArmour", remove = false },
	},
	["nos"] = {
		label = "NOS Bottle", weight = 0, stack = false, close = true, description = "A full bottle of NOS",
		client = { image = "nos.png", event = "jim-mechanic:client:applyNOS", },
	},
	["noscan"] = {
		label = "Empty NOS Bottle", weight = 0, stack = true, close = true, description = "An Empty bottle of NOS",
		client = { image = "noscan.png", }
	},
	["noscolour"] = {
		label = "NOS Colour Injector", weight = 0, stack = true, close = true, description = "Make that purge spray",
		client = { image = "noscolour.png", event = "jim-mechanic:client:NOS:rgbORhex", },
	},

	["engine1"] = {
		label = "Tier 1 Engine", weight = 0, stack = false, close = true, description = "",
		client = { image = "engine1.png",  event = "jim-mechanic:client:applyEngine", level = 0, remove = false },
	},
	["engine2"] = {
		label = "Tier 2 Engine", weight = 0, stack = false, close = true, description = "",
		client = { image = "engine2.png",  event = "jim-mechanic:client:applyEngine", level = 1, remove = false },
	},
	["engine3"] = {
		label = "Tier 3 Engine", weight = 0, stack = false, close = true, description = "",
		client = { image = "engine3.png",  event = "jim-mechanic:client:applyEngine", level = 2, remove = false },
	},
	["engine4"] = {
		label = "Tier 4 Engine", weight = 0, stack = false, close = true, description = "",
		client = { image = "engine4.png",  event = "jim-mechanic:client:applyEngine", level = 3, remove = false },
	},
	["engine5"] = {
		label = "Tier 5 Engine", weight = 0, stack = false, close = true, description = "",
		client = { image = "engine5.png",  event = "jim-mechanic:client:applyEngine", level = 4, remove = false },
	},

	["transmission1"] = {
		label = "Tier 1 Transmission", weight = 0, stack = false, close = true, description = "",
		client = { image = "transmission1.png",  event = "jim-mechanic:client:applyTransmission", level = 0, remove = false },
	},
	["transmission2"] = {
		label = "Tier 2 Transmission", weight = 0, stack = false, close = true, description = "",
		client = { image = "transmission2.png",  event = "jim-mechanic:client:applyTransmission", level = 1, remove = false },
	},
	["transmission3"] = {
		label = "Tier 3 Transmission", weight = 0, stack = false, close = true, description = "",
		client = { image = "transmission3.png",  event = "jim-mechanic:client:applyTransmission", level = 2, remove = false },
	},
	["transmission4"] = {
		label = "Tier 4 Transmission", weight = 0, stack = false, close = true, description = "",
		client = { image = "transmission4.png",  event = "jim-mechanic:client:applyTransmission", level = 3, remove = false },
	},

	["brakes1"] = {
		label = "Tier 1 Brakes", weight = 0, stack = false, close = true, description = "",
		client = { image = "brakes1.png",  event = "jim-mechanic:client:applyBrakes", level = 0, remove = false },
	},
	["brakes2"] = {
		label = "Tier 2 Brakes", weight = 0, stack = false, close = true, description = "",
		client = { image = "brakes2.png",  event = "jim-mechanic:client:applyBrakes", level = 1, remove = false },
	},
	["brakes3"] = {
		label = "Tier 3 Brakes", weight = 0, stack = false, close = true, description = "",
		client = { image = "brakes3.png",  event = "jim-mechanic:client:applyBrakes", level = 2, remove = false },
	},

	["suspension1"] = {
		label = "Tier 1 Suspension", weight = 0, stack = false, close = true, description = "",
		client = { image = "suspension1.png", event = "jim-mechanic:client:applySuspension",  level = 0, remove = false },
	},
	["suspension2"] = {
		label = "Tier 2 Suspension", weight = 0, stack = false, close = true, description = "",
		client = { image = "suspension2.png", event = "jim-mechanic:client:applySuspension", level = 1, remove = false },
	},
	["suspension3"] = {
		label = "Tier 3 Suspension", weight = 0, stack = false, close = true, description = "",
		client = { image = "suspension3.png", event = "jim-mechanic:client:applySuspension", level = 2, remove = false },
	},
	["suspension4"] = {
		label = "Tier 4 Suspension", weight = 0, stack = false, close = true, description = "",
		client = { image = "suspension4.png", event = "jim-mechanic:client:applySuspension", level = 3, remove = false },
	},
	["suspension5"] = {
		label = "Tier 5 Suspension", weight = 0, stack = false, close = true, description = "",
		client = { image = "suspension5.png", event = "jim-mechanic:client:applySuspension", level = 4, remove = false },
	},

	["bprooftires"] = {
		label = "Bulletproof Tires", weight = 0, stack = false, close = true, description = "",
		client = { image = "bprooftires.png", event = "jim-mechanic:client:applyBulletProof", remove = false },
	},
	["drifttires"] = {
		label = "Drift Tires", weight = 0, stack = false, close = true, description = "",
		client = { image = "drifttires.png", event = "jim-mechanic:client:applyDrift", remove = false },
	},

	["oilp1"] = {
		label = "Tier 1 Oil Pump", weight = 0, stack = false, close = true, description = "",
		client = { image = "oilp1.png", event = "jim-mechanic:client:applyExtraPart", level = 1, mod = "oilp", remove = false },
	},
	["oilp2"] = {
		label = "Tier 2 Oil Pump", weight = 0, stack = false, close = true, description = "",
		client = { image = "oilp2.png", event = "jim-mechanic:client:applyExtraPart", level = 2, mod = "oilp", remove = false },
	},
	["oilp3"] = {
		label = "Tier 3 Oil Pump", weight = 0, stack = false, close = true, description = "",
		client = { image = "oilp3.png", event = "jim-mechanic:client:applyExtraPart", level = 3, mod = "oilp", remove = false },
	},

	["drives1"] = {
		label = "Tier 1 Drive Shaft", weight = 0, stack = false, close = true, description = "",
		client = { image = "drives1.png", event = "jim-mechanic:client:applyExtraPart", level = 1, mod = "drives", remove = false },
	},
	["drives2"] = {
		label = "Tier 2 Drive Shaft", weight = 0, stack = false, close = true, description = "",
		client = { image = "drives2.png", event = "jim-mechanic:client:applyExtraPart", level = 2, mod = "drives", remove = false },
	},
	["drives3"] = {
		label = "Tier 3 Drive Shaft", weight = 0, stack = false, close = true, description = "",
		client = { image = "drives3.png", event = "jim-mechanic:client:applyExtraPart", level = 3, mod = "drives", remove = false },
	},

	["cylind1"] = {
		label = "Tier 1 Cylinder Head", weight = 0, stack = false, close = true, description = "",
		client = { image = "cylind1.png", event = "jim-mechanic:client:applyExtraPart", level = 1, mod = "cylind", remove = false },
	},
	["cylind2"] = {
		label = "Tier 2 Cylinder Head", weight = 0, stack = false, close = true, description = "",
		client = { image = "cylind2.png", event = "jim-mechanic:client:applyExtraPart", level = 2, mod = "cylind", remove = false },
	},
	["cylind3"] = {
		label = "Tier 3 Cylinder Head", weight = 0, stack = false, close = true, description = "",
		client = { image = "cylind3.png", event = "jim-mechanic:client:applyExtraPart", level = 3, mod = "cylind", remove = false },
	},

	["cables1"] = {
		label = "Tier 1 Battery Cables", weight = 0, stack = false, close = true, description = "",
		client = { image = "cables1.png", event = "jim-mechanic:client:applyExtraPart", level = 1, mod = "cables", remove = false },
	},
	["cables2"] = {
		label = "Tier 2 Battery Cables", weight = 0, stack = false, close = true, description = "",
		client = { image = "cables2.png", event = "jim-mechanic:client:applyExtraPart", level = 2, mod = "cables", remove = false },
	},
	["cables3"] = {
		label = "Tier 3 Battery Cables", weight = 0, stack = false, close = true, description = "",
		client = { image = "cables3.png", event = "jim-mechanic:client:applyExtraPart", level = 3, mod = "cables", remove = false },
	},

	["fueltank1"] = {
		label = "Tier 1 Fuel Tank", weight = 0, stack = false, close = true, description = "",
		client = { image = "fueltank1.png", event = "jim-mechanic:client:applyExtraPart", level = 1, mod = "fueltank", remove = false },
	},
	["fueltank2"] = {
		label = "Tier 2 Fuel Tank", weight = 0, stack = false, close = true, description = "",
		client = { image = "fueltank2.png", event = "jim-mechanic:client:applyExtraPart", level = 2, mod = "fueltank", remove = false },
	},
	["fueltank3"] = {
		label = "Tier 3 Fuel Tank", weight = 0, stack = false, close = true, description = "",
		client = { image = "fueltank3.png", event = "jim-mechanic:client:applyExtraPart", level = 3, mod = "fueltank", remove = false },
	},

	["antilag"] = {
		label = "AntiLag", weight = 0, stack = false, close = true, description = "",
		client = { image = "antiLag.png", event = "jim-mechanic:client:applyAntiLag", remove = false },
	},

	["underglow_controller"] = {
		label = "Neon Controller", weight = 0, stack = false, close = true, description = "",
		client = { image = "underglow_controller.png", event = "jim-mechanic:client:neonMenu", },
	},
	["headlights"] = {
		label = "Xenon Headlights", weight = 0, stack = false, close = true, description = "",
		client = { image = "headlights.png", event = "jim-mechanic:client:applyXenons", },
	},

	["tint_supplies"] = {
		label = "Window Tint Kit", weight = 0, stack = false, close = true, description = "",
		client = { image = "tint_supplies.png", event = "jim-mechanic:client:Cosmetic:Check", },
	},

	["customplate"] = {
		label = "Customized Plates", weight = 0, stack = false, close = true, description = "",
		client = { image = "plate.png", event = "jim-mechanic:client:Cosmetic:Check", },
	},
	["hood"] = {
		label = "Vehicle Hood", weight = 0, stack = false, close = true, description = "",
		client = { image = "hood.png", event = "jim-mechanic:client:Cosmetic:Check", },
	},
	["roof"] = {
		label = "Vehicle Roof", weight = 0, stack = false, close = true, description = "",
		client = { image = "roof.png", event = "jim-mechanic:client:Cosmetic:Check", },
	},
	["spoiler"] = {
		label = "Vehicle Spoiler", weight = 0, stack = false, close = true, description = "",
		client = { image = "spoiler.png", event = "jim-mechanic:client:Cosmetic:Check", },
	},
	["bumper"] = {
		label = "Vehicle Bumper", weight = 0, stack = false, close = true, description = "",
		client = { image = "bumper.png", event = "jim-mechanic:client:Cosmetic:Check", },
	},
	["skirts"] = {
		label = "Vehicle Skirts", weight = 0, stack = false, close = true, description = "",
		client = { image = "skirts.png", event = "jim-mechanic:client:Cosmetic:Check", },
	},
	["exhaust"] = {
		label = "Vehicle Exhaust", weight = 0, stack = false, close = true, description = "",
		client = { image = "exhaust.png", event = "jim-mechanic:client:Cosmetic:Check", },
	},
	["seat"] = {
		label = "Seat Cosmetics", weight = 0, stack = false, close = true, description = "",
		client = { image = "seat.png", event = "jim-mechanic:client:Cosmetic:Check", },
	},
	["rollcage"] = {
		label = "Roll Cage", weight = 0, stack = false, close = true, description = "",
		client = { image = "rollcage.png", event = "jim-mechanic:client:Cosmetic:Check", },
	},

	["rims"] = {
		label = "Custom Wheel Rims", weight = 0, stack = false, close = true, description = "",
		client = { image = "rims.png", event = "jim-mechanic:client:Rims:Check", },
	},

	["livery"] = {
		label = "Livery Roll", weight = 0, stack = false, close = true, description = "",
		client = { image = "livery.png", event = "jim-mechanic:client:Cosmetic:Check", },
	},
	["paintcan"] = {
		label = "Vehicle Spray Can", weight = 0, stack = false, close = true, description = "",
		client = { image = "spraycan.png", event = "jim-mechanic:client:Paints:Check", },
	},
	["tires"] = {
		label = "Drift Smoke Tires", weight = 0, stack = false, close = true, description = "",
		client = { image = "tires.png", event = "jim-mechanic:client:Tires:Check", },
	},

	["horn"] = {
		label = "Custom Vehicle Horn", weight = 0, stack = false, close = true, description = "",
		client = { image = "horn.png", event = "jim-mechanic:client:Cosmetic:Check", },
	},

	["internals"] = {
		label = "Internal Cosmetics", weight = 0, stack = false, close = true, description = "",
		client = { image = "internals.png", event = "jim-mechanic:client:Cosmetic:Check", },
	},
	["externals"] = {
		label = "Exterior Cosmetics", weight = 0, stack = false, close = true, description = "",
		client = { image = "mirror.png", event = "jim-mechanic:client:Cosmetic:Check", },
	},

	["newoil"] = {
		label = "Car Oil", weight = 0, stack = false, close = true, description = "",
		client = { image = "caroil.png", },
	},
	["sparkplugs"] = {
		label = "Spark Plugs", weight = 0, stack = false, close = true, description = "",
		client = { image = "sparkplugs.png", },
	},
	["carbattery"] = {
		label = "Car Battery", weight = 0, stack = false, close = true, description = "",
		client = { image = "carbattery.png", },
	},
	["axleparts"] = {
		label = "Axle Parts", weight = 0, stack = false, close = true, description = "",
		client = { image = "axleparts.png", },
	},
	["sparetire"] = {
		label = "Spare Tire", weight = 0, stack = false, close = true, description = "",
		client = { image = "sparetire.png", event = "jim-mechanic:client:wheelRepair" },
	},

	["harness"] = {
		label = "Race Harness", weight = 0, stack = true, close = true, description = "Racing Harness so no matter what you stay in the car",
		client = { image = "harness.png", event = "jim-mechanic:client:applyHarness", remove = false },
	},

	["manual"] = {
		label = "Manual Transmission", weight = 0, stack = true, close = true, description = "Manual Transmission change for vehicles",
		client = { image = "manual.png", event = "jim-mechanic:client:applyManual", remove = false },
	},

	["underglow"] = {
		label = "Underglow LEDS", weight = 0, stack = true, close = true, description = "Underglow addition for vehicles",
		client = { image = "underglow.png", event = "jim-mechanic:client:applyUnderglow", remove = false },
	},

	["stancerkit"] = {
		label = "Stancer Kit", weight = 0, stack = true, close = true, description = "Stancer Kit for vehicles",
		client = { image = "stancerkit.png", event = "jim-mechanic:client:stancerMenu", remove = false },
	},

	["newplate"] = {
		label = "New Plate", weight = 250, stack = false, close = true, description = "A Customizable licence plate.",
		client = { image = "newplate.png", event = "jim-mechanic:client:setplate:Menu" }
	},

	-- Replace these if these are already installed

	["cleaningkit"] = {
	    label = "Cleaning Kit", weight = 0, stack = true, close = true, description = "A microfiber cloth with some soap will let your car sparkle again!",
	    client = { image = "cleaningkit.png", event = "jim-mechanic:client:cleanVehicle"},
	},
	["repairkit"] = {
	    label = "Kit de reparacion", weight = 0, stack = true, close = true, description = "Contiene herramientas y suministros para arreglar problemas mecánicos.",
	    client = { image = "repairkit.png", event = "jim-mechanic:vehFailure:RepairVehicle", item = "repairkit", full = true },
	},
	["advancedrepairkit"] = {
	    label = "Advanced Repairkit", weight = 0, stack = true, close = true, description = "A nice toolbox with stuff to repair your vehicle",
	    client = { image = "advancedkit.png", event = "jim-mechanic:vehFailure:RepairVehicle", item = "advancedrepairkit", full = true },
	},
	
	["photo"] = {
		label = "Photo",
		weight = 10,
		stack = true,
		close = true
	},

	-- Documento creacion comunidad
	['acta_fundacional'] = {
		label = 'Acta Fundacional',
		weight = 100,
		stack = false,
		close = true,
		description = 'Documento para fundar una comunidad. Un solo uso.',
	},

	["vic5"] = {
		label = "Vicodin 5MG",
		weight = 2,
		stack = true,
		close = true,
		description = "A controlled substance to control pain",
		client = {
			image = "vic5.png",
		}
	},

	["perc5"] = {
		label = "Percocet 5MG",
		weight = 2,
		stack = true,
		close = true,
		description = "A controlled substance to control pain",
		client = {
			image = "perc5.png",
		}
	},

	["medikit"] = {
		label = "Kit Medico",
		weight = 110,
		stack = true,
		close = true,
		description = "Un botiquín de primeros auxilios para curar a personas heridas.",
		client = {
			image = "medikit.png",
		}
	},

	["tweezers"] = {
		label = "Tweezers",
		weight = 50,
		stack = true,
		close = true,
		description = "For picking out bullets",
		client = {
			image = "tweezers.png",
		}
	},

	["morphine30"] = {
		label = "Morphine 30MG",
		weight = 2,
		stack = true,
		close = true,
		description = "A controlled substance to control pain",
		client = {
			image = "morphine30.png",
		}
	},

	["perc30"] = {
		label = "Percocet 30MG",
		weight = 2,
		stack = true,
		close = true,
		description = "A controlled substance to control pain",
		client = {
			image = "perc30.png",
		}
	},

	["suturekit"] = {
		label = "Suture Kit",
		weight = 60,
		stack = true,
		close = true,
		description = "For stitching your patients",
		client = {
			image = "suturekit.png",
		}
	},

	["defib"] = {
		label = "Defibrillator",
		weight = 1120,
		stack = true,
		close = true,
		description = "Used to revive patients",
		client = {
			image = "defib.png",
		}
	},

	["sedative"] = {
		label = "Sedative",
		weight = 20,
		stack = true,
		close = true,
		description = "If needed, this will sedate patient",
		client = {
			image = "sedative.png",
		}
	},

	["morphine15"] = {
		label = "Morphine 15MG",
		weight = 2,
		stack = true,
		close = true,
		description = "A controlled substance to control pain",
		client = {
			image = "morphine15.png",
		}
	},

	["perc10"] = {
		label = "Percocet 10MG",
		weight = 2,
		stack = true,
		close = true,
		description = "A controlled substance to control pain",
		client = {
			image = "perc10.png",
		}
	},

	["vic10"] = {
		label = "Vicodin 10MG",
		weight = 2,
		stack = true,
		close = true,
		description = "A controlled substance to control pain",
		client = {
			image = "vic10.png",
		}
	},

	["silbato"] = {
		label = "Silbato",
		weight = 1,
		stack = false,
		close = true,
		description = "Silbato para llamar a tu perrito",
	},

	-- [UNDEAD] Camuflaje: los zombis te ignoran un rato. Lo gestiona
	-- undeadZombis (client/camuflaje.lua). DISENO_ZOMBIS.md §6.2
	["tripas_zombi"] = {
		label = "Tripas de zombi",
		weight = 300,
		stack = true,
		close = true,
		description = "Úntatelas y los muertos no te olerán durante un rato. Disparar o correr lo estropea.",
		client = {
			export = 'undeadZombis.usarTripas',
			anim = { dict = 'clothingshirt', clip = 'try_shirt_positive_d' },
			usetime = 3000,
		}
	},

}