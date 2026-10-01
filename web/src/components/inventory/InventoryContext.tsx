import React, { useState, useEffect } from 'react';
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  offset,
  shift,
  useDismiss,
  useFloating,
  useInteractions,
  useTransitionStyles,
} from '@floating-ui/react';
import { useAppSelector, useAppDispatch } from '../../store';
import { store } from '../../store';
import { closeContextMenu } from '../../store/contextMenu';
import { setItemAmount } from '../../store/inventory';
import { Items } from '../../store/items';
import { onUse } from '../../dnd/onUse';
import { onDrop } from '../../dnd/onDrop';
import { fetchNui } from '../../utils/fetchNui';
import { setClipboard } from '../../utils/setClipboard';
import { isSlotWithItem, getItemUrl } from '../../helpers';
import { Locale } from '../../store/locale';

const getRarityBadgeColor = (rarity?: string) => {
  switch (rarity) {
    case 'rare':      return 'var(--theme-rarity-rare-badge)';
    case 'epic':      return 'var(--theme-rarity-epic-badge)';
    case 'legendary': return 'var(--theme-rarity-legendary-badge)';
    default:          return 'var(--theme-accent-base)';
  }
};

interface ActionButton {
  label: string;
  color: string;
  textColor?: string;
  onClick: () => void;
}

const InventoryContext: React.FC = () => {
  const dispatch = useAppDispatch();
  const contextMenu = useAppSelector((state) => state.contextMenu);
  const item = contextMenu.item;
  const inventoryType = contextMenu.inventoryType || 'player';
  const isOpen = contextMenu.coords !== null;
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (item) setQuantity(0);
  }, [item]);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: (open) => {
      if (!open) dispatch(closeContextMenu());
    },
    placement: 'bottom',
    middleware: [offset(8), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  useEffect(() => {
    if (contextMenu.coords) {
      refs.setPositionReference({
        getBoundingClientRect() {
          return {
            width: 0,
            height: 0,
            x: contextMenu.coords!.x,
            y: contextMenu.coords!.y,
            top: contextMenu.coords!.y,
            right: contextMenu.coords!.x,
            bottom: contextMenu.coords!.y,
            left: contextMenu.coords!.x,
          };
        },
      });
    }
  }, [contextMenu.coords]);

  const dismiss = useDismiss(context);
  const { getFloatingProps } = useInteractions([dismiss]);
  const { isMounted, styles } = useTransitionStyles(context, { duration: 150 });

  const closeMenu = () => dispatch(closeContextMenu());

  const handleUse = () => {
    if (!item) return;
    onUse({ name: item.name, slot: item.slot });
    closeMenu();
  };

  const handleGive = () => {
    if (!item) return;
    const { inventory: { splitAmount } } = store.getState();
    const countToGive = quantity > 0 ? quantity : splitAmount > 0 ? splitAmount : item.count;
    dispatch(setItemAmount(countToGive));
    fetchNui('giveItem', { slot: item.slot, count: countToGive });
    closeMenu();
  };

  const handleDrop = () => {
    if (!item || !isSlotWithItem(item)) return;
    dispatch(setItemAmount(quantity));
    onDrop({ item, inventory: 'player' });
    closeMenu();
  };

  const handleThrow = () => {
    if (!item) return;
    dispatch(setItemAmount(quantity));
    fetchNui('throwItem', { slot: item.slot, count: quantity });
    closeMenu();
  };

  const handleSplit = () => {
    if (!item) return;
    const persistentSplit = store.getState().inventory.splitAmount;
    // Priority: popup quantity > persistent split input > half the stack
    const splitCount = quantity > 0 ? quantity : persistentSplit > 0 ? persistentSplit : Math.floor(item.count / 2);

    if (inventoryType !== 'player') {
      // For secondary inventories, find an empty slot in the right inventory
      const rightInventory = store.getState().inventory.rightInventory;
      const emptySlot = rightInventory.items.find((s) => !s.name)?.slot;
      if (!emptySlot) return;
      fetchNui('splitItem', { slot: item.slot, count: splitCount, inventoryType, toSlot: emptySlot });
    } else {
      fetchNui('splitItem', { slot: item.slot, count: splitCount, inventoryType: 'player' });
    }
    closeMenu();
  };

  const handleRemoveAmmo = () => {
    if (!item) return;
    fetchNui('removeAmmo', item.slot);
    closeMenu();
  };

  const handleCopySerial = () => {
    if (!item?.metadata?.serial) return;
    setClipboard(item.metadata.serial);
    closeMenu();
  };

  const handleRemoveComponent = (component: string) => {
    if (!item) return;
    fetchNui('removeComponent', { component, slot: item.slot });
    closeMenu();
  };

  const handleCustomButton = (id: number) => {
    if (!item) return;
    fetchNui('useButton', { id: id + 1, slot: item.slot });
    closeMenu();
  };

  if (!isMounted || !item) return null;

  const itemData = Items[item.name];
  const rarity = item.metadata?.rarity || itemData?.rarity;
  const label = itemData?.label || item.name;
  const description = itemData?.description;
  const isStackable = itemData?.stack && item.count > 1;

  const isPlayerInventory = inventoryType === 'player';

  // Primary row: USE, DROP, + SPLIT if stackable (USE/DROP only for player inventory)
  const primaryButtons: ActionButton[] = [];
  if (isPlayerInventory) {
    primaryButtons.push({ label: Locale.ui_use  || 'USE',  color: 'var(--theme-state-info)', onClick: handleUse  });
    primaryButtons.push({ label: Locale.ui_drop || 'DROP', color: 'var(--theme-state-danger)', onClick: handleDrop });
  }
  if (isStackable) {
    primaryButtons.push({ label: Locale.ui_split || 'SPLIT', color: 'var(--theme-text-primary)', textColor: 'var(--theme-bg-secondary-highlight)', onClick: handleSplit });
  }

  // Secondary row: GIVE, THROW + weapon conditionals (only for player inventory)
  const secondaryButtons: ActionButton[] = [];
  if (isPlayerInventory) {
    secondaryButtons.push({ label: Locale.ui_give || 'GIVE', color: 'var(--theme-accent-base)', onClick: handleGive });

    if (itemData?.throwProp) {
      secondaryButtons.push({ label: Locale.ui_throw || 'THROW', color: 'var(--theme-state-warning)', onClick: handleThrow });
    }
    if (item.metadata?.ammo > 0) {
      secondaryButtons.push({ label: Locale.ui_remove_ammo || 'REMOVE AMMO', color: 'var(--theme-state-danger)', onClick: handleRemoveAmmo });
    }
    if (item.metadata?.serial) {
      secondaryButtons.push({ label: Locale.ui_copy || 'COPY SERIAL', color: 'var(--theme-state-info)', onClick: handleCopySerial });
    }
  }

  const components: string[] = item.metadata?.components || [];
  const customButtons: any[] = itemData?.buttons || [];

  return (
    <FloatingPortal>
      <FloatingOverlay style={{ background: 'transparent', zIndex: 99999 }}>
        <FloatingFocusManager context={context} modal={false} initialFocus={refs.floating}>
          <div
            ref={refs.setFloating}
            tabIndex={-1}
            style={{ ...floatingStyles, ...styles, zIndex: 99999, outline: 'none' }}
            {...getFloatingProps()}
          >
            <div className="relative">
              {/* Arrow */}
              <div
                className="absolute left-1/2 -translate-x-1/2"
                style={{
                  top: '-10px',
                  width: 0,
                  height: 0,
                  borderLeft: '14px solid transparent',
                  borderRight: '14px solid transparent',
                  borderBottom: '10px solid var(--theme-bg-secondary-highlight)',
                }}
              />

              {/* Card */}
              <div
                className="bg-[var(--theme-bg-secondary-highlight)] flex flex-col gap-[10px] p-[8px] rounded-[11px]"
                style={{ boxShadow: '0px 4px 28.5px 0px rgba(0,0,0,0.71)', minWidth: '240px' }}
              >
                {/* Item info */}
                <div className="flex gap-[10px] items-center">
                  <div
                    className="bg-[var(--theme-bg-main)] rounded-[10px] shrink-0 flex items-end justify-center"
                    style={{ width: '70px', height: '70px', padding: '3px' }}
                  >
                    <div
                      className="w-full h-full bg-no-repeat bg-center"
                      style={{ backgroundImage: `url(${getItemUrl(item)})`, backgroundSize: '60%' }}
                    />
                  </div>

                  <div className="flex flex-col gap-[7px] flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-[8px]">
                      <p className="font-main text-[14px] text-[var(--theme-text-primary)] leading-normal truncate">
                        {label.toUpperCase()}
                      </p>
                      {rarity && rarity !== 'common' && (
                        <div
                          className="shrink-0 flex items-center justify-center px-[5px] py-[1.5px] rounded-[5px]"
                          style={{ backgroundColor: getRarityBadgeColor(rarity) }}
                        >
                          <p className="font-main text-[12px] text-[var(--theme-text-primary)] leading-normal">
                            {rarity.toUpperCase()}
                          </p>
                        </div>
                      )}
                    </div>
                    {description && (
                      <p className="text-[12px] leading-normal" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>
                        {description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Quantity selector — stackable items only */}
                {isStackable && (
                  <div className="bg-[var(--theme-bg-main)] rounded-[12px] flex items-center justify-center h-[37px] px-[8px]">
                    <div className="flex items-center justify-between w-full">
                      <button
                        className="text-[var(--theme-text-primary)] hover:text-white transition-colors select-none cursor-pointer px-[12px] py-[6px]"
                        style={{ fontSize: '22px', fontFamily: 'Resolve, sans-serif' }}
                        onClick={() => setQuantity((q) => Math.max(0, q - 1))}
                      >−</button>
                      <input
                        type="number"
                        className="font-main text-[22px] text-[var(--theme-text-primary)] leading-normal bg-transparent text-center w-[50px] outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none selection:bg-[var(--theme-accent-base)] selection:text-white"
                        value={quantity}
                        min={0}
                        max={item.count}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => {
                          const val = Math.floor(e.target.valueAsNumber);
                          if (isNaN(val) || val < 0) return setQuantity(0);
                          setQuantity(Math.min(val, item.count));
                        }}
                      />
                      <button
                        className="text-[var(--theme-text-primary)] hover:text-white transition-colors select-none cursor-pointer px-[12px] py-[6px]"
                        style={{ fontSize: '22px', fontFamily: 'Resolve, sans-serif' }}
                        onClick={() => setQuantity((q) => Math.min(item.count, q + 1))}
                      >+</button>
                    </div>
                  </div>
                )}

                {/* Primary action buttons */}
                <div className="flex gap-[10px]">
                  {primaryButtons.map((btn) => (
                    <button
                      key={btn.label}
                      onClick={btn.onClick}
                      className="flex-1 flex items-center justify-center overflow-clip px-[10px] py-[5px] rounded-[7px] transition-all duration-150 hover:brightness-110 active:brightness-90 cursor-pointer"
                      style={{ backgroundColor: btn.color }}
                    >
                      <p className="font-main text-[17px] leading-normal" style={{ color: btn.textColor || 'var(--theme-text-primary)' }}>
                        {btn.label}
                      </p>
                    </button>
                  ))}
                </div>

                {/* Secondary action buttons */}
                {secondaryButtons.length > 0 && (
                  <div className="flex gap-[10px] flex-wrap">
                    {secondaryButtons.map((btn) => (
                      <button
                        key={btn.label}
                        onClick={btn.onClick}
                        className="flex-1 flex items-center justify-center overflow-clip px-[10px] py-[5px] rounded-[7px] transition-all duration-150 hover:brightness-110 active:brightness-90 cursor-pointer"
                        style={{ backgroundColor: btn.color, minWidth: '70px' }}
                      >
                        <p className="font-main text-[17px] leading-normal" style={{ color: btn.textColor || 'var(--theme-text-primary)' }}>
                          {btn.label}
                        </p>
                      </button>
                    ))}
                  </div>
                )}

                {/* Remove attachments */}
                {components.length > 0 && (
                  <div className="flex flex-col gap-[6px]">
                    <p className="font-main text-[11px] leading-normal" style={{ color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>
                      {Locale.ui_removeattachments || 'Remove Attachments'}
                    </p>
                    <div className="flex flex-wrap gap-[8px]">
                      {components.map((component: string, index: number) => (
                        <button
                          key={index}
                          onClick={() => handleRemoveComponent(component)}
                          className="bg-[var(--theme-bg-main)] hover:bg-[var(--theme-slot-hover-bg)] flex items-center justify-center px-[10px] py-[4px] rounded-[7px] transition-colors cursor-pointer"
                        >
                          <p className="font-main text-[13px] text-[var(--theme-text-primary)] leading-normal">
                            {Items[component]?.label || component}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Custom item buttons */}
                {customButtons.length > 0 && (
                  <div className="flex flex-wrap gap-[8px]">
                    {customButtons.map((button: any, index: number) => (
                      <button
                        key={index}
                        onClick={() => handleCustomButton(index)}
                        className="bg-[var(--theme-bg-main)] hover:bg-[var(--theme-slot-hover-bg)] flex items-center justify-center px-[10px] py-[4px] rounded-[7px] transition-colors cursor-pointer"
                      >
                        <p className="font-main text-[13px] text-[var(--theme-text-primary)] leading-normal">
                          {typeof button === 'string' ? button : button.label || ''}
                        </p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </FloatingFocusManager>
      </FloatingOverlay>
    </FloatingPortal>
  );
};

export default InventoryContext;
