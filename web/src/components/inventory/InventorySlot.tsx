import React, { useCallback, useRef } from 'react';
import { DragSource, Inventory, InventoryType, Slot, SlotWithItem } from '../../typings';
import { useDrag, useDragDropManager, useDrop } from 'react-dnd';
import { useAppDispatch, useAppSelector } from '../../store';
import WeightBar from '../utils/WeightBar';
import { onDrop } from '../../dnd/onDrop';
import { setAltDragActive } from '../../dnd/dragModifiers';
import { onBuy } from '../../dnd/onBuy';
import { Items } from '../../store/items';
import { canCraftItem, canPurchaseItem, getItemUrl, isSlotWithItem } from '../../helpers';
import { onUse } from '../../dnd/onUse';
import { Locale } from '../../store/locale';
import { onCraft } from '../../dnd/onCraft';
import useNuiEvent from '../../hooks/useNuiEvent';
import { ItemsPayload } from '../../reducers/refreshSlots';
import { closeTooltip, openTooltip } from '../../store/tooltip';
import { openContextMenu } from '../../store/contextMenu';
import { useMergeRefs } from '@floating-ui/react';
import { motion } from 'framer-motion';

interface SlotProps {
  inventoryId: Inventory['id'];
  inventoryType: Inventory['type'];
  inventoryGroups: Inventory['groups'];
  item: Slot;
  disableDrag?: boolean;
  index?: number;
}

const getRarityColor = (rarity?: string) => {
  switch (rarity) {
    case 'rare':      return 'var(--theme-rarity-rare-badge)';
    case 'epic':      return 'var(--theme-rarity-epic-badge)';
    case 'legendary': return 'var(--theme-rarity-legendary-badge)';
    case 'common':
    default:          return 'var(--theme-rarity-common-badge)';
  }
};

// Get badge color based on item properties (for new Figma design)
const getBadgeColor = (item: Slot) => {
  if (!isSlotWithItem(item)) return null;

  if (item.metadata?.status === 'important') return 'var(--theme-state-danger)';
  if (item.metadata?.rarity === 'epic' || item.metadata?.rarity === 'legendary') return 'var(--theme-accent-base)';
  if (item.metadata?.new || item.metadata?.notification) return 'var(--theme-state-info)';
  if (item.metadata?.badgeCount) return 'var(--theme-accent-base)';
  if (item.count && item.count > 1) return 'var(--theme-slot-filled-bg)';

  return null;
};

const getBadgeContent = (item: Slot): string | number | null => {
  if (!isSlotWithItem(item)) return null;

  if (item.metadata?.badgeCount) return item.metadata.badgeCount;
  if (item.count && item.count > 1) return item.count;
  if (item.metadata?.status === 'important' || item.metadata?.new || item.metadata?.notification) return '!';

  return null;
};

const InventorySlot: React.ForwardRefRenderFunction<HTMLDivElement, SlotProps> = (
  { item, inventoryId, inventoryType, inventoryGroups, disableDrag = false, index = 0 },
  ref
) => {
  const manager = useDragDropManager();
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector((state) => state.ui.activeTab);
  const timerRef = useRef<number | null>(null);
  const lastClickTimeRef = useRef<number>(0);

  const itemData = isSlotWithItem(item) ? Items[item.name] : null;
  const rarity = item.metadata?.rarity || itemData?.rarity;
  const rarityColor = getRarityColor(rarity);
  const badgeColor = getBadgeColor(item);
  const badgeContent = getBadgeContent(item);

  const getRarityBorderColor = () => {
    if (!rarity) return null;
    if (rarity === 'common')   return 'var(--theme-rarity-common-border)';
    if (rarity === 'rare')     return 'var(--theme-rarity-rare-border)';
    if (rarity === 'epic')     return 'var(--theme-rarity-epic-border)';
    if (rarity === 'legendary') return 'var(--theme-rarity-legendary-border)';
    return null;
  };

  const rarityBorderColor = getRarityBorderColor();

  const canDrag = useCallback(() => {
    if (disableDrag) return false;
    return canPurchaseItem(item, { type: inventoryType, groups: inventoryGroups }) && canCraftItem(item, inventoryType);
  }, [item, inventoryType, inventoryGroups, disableDrag]);

  const [{ isDragging }, drag] = useDrag<DragSource, void, { isDragging: boolean }>(
    () => ({
      type: 'SLOT',
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      item: () =>
        isSlotWithItem(item, inventoryType !== InventoryType.SHOP)
          ? {
              inventory: inventoryType,
              item: {
                name: item.name,
                slot: item.slot,
              },
              image: item?.name && `url(${getItemUrl(item) || 'none'}`,
            }
          : null,
      canDrag,
    }),
    [inventoryType, item]
  );

  const [{ isOver }, drop] = useDrop<DragSource, void, { isOver: boolean }>(
    () => ({
      accept: 'SLOT',
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
      drop: (source) => {
        dispatch(closeTooltip());
        switch (source.inventory) {
          case InventoryType.SHOP:
            onBuy(source, { inventory: inventoryType, item: { slot: item.slot } });
            break;
          case InventoryType.CRAFTING:
            onCraft(source, { inventory: inventoryType, item: { slot: item.slot } });
            break;
          default:
            onDrop(source, { inventory: inventoryType, item: { slot: item.slot } });
            break;
        }
      },
      canDrop: (source) =>
        (source.item.slot !== item.slot || source.inventory !== inventoryType) &&
        inventoryType !== InventoryType.SHOP &&
        inventoryType !== InventoryType.CRAFTING,
    }),
    [inventoryType, item]
  );

  useNuiEvent('refreshSlots', (data: { items?: ItemsPayload | ItemsPayload[] }) => {
    if (!isDragging && !data.items) return;
    if (!Array.isArray(data.items)) return;

    const itemSlot = data.items.find(
      (dataItem) => dataItem.item.slot === item.slot && dataItem.inventory === inventoryId
    );

    if (!itemSlot) return;

    manager.dispatch({ type: 'dnd-core/END_DRAG' });
  });

  const connectRef = (element: HTMLDivElement) => drag(drop(element));

  const handleContext = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (inventoryType === 'shop' || inventoryType === 'crafting' || !isSlotWithItem(item)) return;

    const rect = event.currentTarget.getBoundingClientRect();
    dispatch(openContextMenu({ item, coords: { x: rect.left + rect.width / 2, y: rect.bottom }, inventoryType, inventoryId }));
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    dispatch(closeTooltip());
    if (timerRef.current) clearTimeout(timerRef.current);

    // Check for double-click (300ms threshold)
    const now = Date.now();
    const timeSinceLastClick = now - lastClickTimeRef.current;
    const isDoubleClick = timeSinceLastClick < 300;
    lastClickTimeRef.current = now;

    // Double-click to use item (player inventory) or craft item (crafting bench)
    if (isDoubleClick && isSlotWithItem(item)) {
      if (inventoryType === 'player') {
        onUse(item);
        return;
      } else if (inventoryType === 'crafting') {
        onCraft({ item: item, inventory: inventoryType }, { inventory: 'player', item: { slot: item.slot } });
        return;
      }
    }

    // Ctrl+Click to drop item
    if (event.ctrlKey && isSlotWithItem(item) && inventoryType !== 'shop' && inventoryType !== 'crafting') {
      onDrop({ item: item, inventory: inventoryType });
    }
    // Alt+Click to use item
    else if (event.altKey && isSlotWithItem(item) && inventoryType === 'player') {
      onUse(item);
    }
  };

  const refs = useMergeRefs([connectRef, ref]);

  return (
    <motion.div
      ref={refs}
      onContextMenu={handleContext}
      onClick={handleClick}
      onMouseDown={(e) => setAltDragActive(e.altKey)}
      className={`inventory-slot rounded-[15px] custom-scrollbar relative overflow-visible cursor-pointer ${isOver ? "ring-2 ring-purple-primary ring-opacity-50" : ""}`}
      style={{
        backgroundColor: isSlotWithItem(item) ? 'var(--theme-slot-filled-bg)' : 'var(--theme-slot-empty-bg)',
        border: rarityBorderColor ? `2px solid ${rarityBorderColor}` : undefined,
        filter:
          !canPurchaseItem(item, { type: inventoryType, groups: inventoryGroups }) || !canCraftItem(item, inventoryType)
            ? 'brightness(80%) grayscale(100%)'
            : undefined,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='72' height='37' viewBox='0 0 72 37' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='18.0208' cy='6.02905' r='4.12263' transform='rotate(-45 18.0208 6.02905)' fill='%232A2D35'/%3E%3Ccircle cx='18.0208' cy='30.4102' r='4.12263' transform='rotate(-45 18.0208 30.4102)' fill='%232A2D35'/%3E%3Ccircle cx='53.8297' cy='6.02905' r='4.12263' transform='rotate(-45 53.8297 6.02905)' fill='%232A2D35'/%3E%3Ccircle cx='53.8297' cy='30.4102' r='4.12263' transform='rotate(-45 53.8297 30.4102)' fill='%232A2D35'/%3E%3Ccircle cx='35.9562' cy='5.83032' r='4.12263' transform='rotate(-45 35.9562 5.83032)' fill='%232A2D35'/%3E%3Ccircle cx='35.9562' cy='30.2114' r='4.12263' transform='rotate(-45 35.9562 30.2114)' fill='%232A2D35'/%3E%3C/svg%3E")`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '70%',
      }}
    >
      {/* Rarity Inner Shadow - Absolutely Positioned Overlay */}
      {rarityBorderColor && rarity && (
        <div
          className="absolute inset-0 pointer-events-none rounded-[inherit]"
          style={{
            boxShadow: `inset 0px 0px 16px 0px ${rarityBorderColor}`,
          }}
        />
      )}
      {/* Animated Item Image Overlay */}
      {isSlotWithItem(item) && item?.name && (
        <div
          key={`item-image-${item.name}-${item.slot}`}
          className="absolute top-0 left-0 right-0 bottom-[28px] bg-no-repeat bg-center pointer-events-none z-[1]"
          style={{
            backgroundImage: `url(${getItemUrl(item as SlotWithItem)})`,
            backgroundSize: "60%",
          }}
        />
      )}

      {/* Count Badge - Top Right */}
      {isSlotWithItem(item) && item.count && item.count > 1 && (
        <div
          className="absolute top-[-3px] right-[-3px] flex items-center justify-center px-[6px] py-[2px] rounded-[6px] pointer-events-none z-50"
          style={{ backgroundColor: 'var(--theme-accent-base)' }}
        >
          <p className="font-main text-[14px] leading-none font-bold" style={{ color: 'var(--theme-text-primary)' }}>
            {item.count}
          </p>
        </div>
      )}
      
      {isSlotWithItem(item) && (
        <div
          className="item-slot-wrapper"
          onMouseEnter={() => {
            // Only open tooltip if we're in inventory tab, not clothing tab
            if (activeTab !== 'inventory') return;
            
            timerRef.current = window.setTimeout(() => {
              dispatch(openTooltip({ item, inventoryType }));
            }, 500) as unknown as number;
          }}
          onMouseLeave={() => {
            dispatch(closeTooltip());
            if (timerRef.current) {
              clearTimeout(timerRef.current);
              timerRef.current = null;
            }
          }}
        >
          <div
            className={
              inventoryType === 'player' && item.slot <= 5 ? 'item-hotslot-header-wrapper px-2 place-center' : 'item-slot-header-wrapper px-2'
            }
          >
            {inventoryType === 'player' && item.slot <= 5 && <div className="inventory-slot-number">{item.slot}</div>}
          </div>
          <div>
            {inventoryType === 'shop' && item?.price !== undefined && (
              <>
                {item?.currency !== 'money' && item.currency !== 'black_money' && item.price > 0 && item.currency ? (
                  <div className="item-slot-currency-wrapper">
                    <img
                      src={item.currency ? getItemUrl(item.currency) : 'none'}
                      alt="item-image"
                      style={{
                        imageRendering: '-webkit-optimize-contrast',
                        height: 'auto',
                        width: '2vh',
                        backfaceVisibility: 'hidden',
                        transform: 'translateZ(0)',
                      }}
                    />
                    <p>{item.price.toLocaleString('en-us')}</p>
                  </div>
                ) : (
                  <>
                    {item.price > 0 && (
                      <div
                        className="item-slot-price-wrapper"
                        style={{ color: item.currency === 'money' || !item.currency ? '#2ECC71' : '#E74C3C' }}
                      >
                        <p>
                          {Locale.$ || '$'}
                          {item.price.toLocaleString('en-us')}
                        </p>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
            {/* Item Name - Bottom */}
            <div className="absolute bottom-[14px] left-[4px] right-[4px] pointer-events-none z-10">
              <p className="font-readable-bold text-[14px] leading-normal font-black text-center uppercase truncate" style={{ color: 'var(--theme-text-primary)' }}>
                {item.metadata?.label ? item.metadata.label : Items[item.name]?.label || item.name}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Durability indicator - rendered outside the item slot wrapper */}
      {isSlotWithItem(item) && inventoryType !== 'shop' && item?.durability !== undefined && (
        <WeightBar percent={item.durability} durability />
      )}
    </motion.div>
  );
};

export default React.memo(React.forwardRef(InventorySlot));
