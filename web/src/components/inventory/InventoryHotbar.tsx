import React, { useState } from 'react';
import { getItemUrl, isSlotWithItem } from '../../helpers';
import useNuiEvent from '../../hooks/useNuiEvent';
import { Items } from '../../store/items';
import { useAppSelector } from '../../store';
import { selectLeftInventory } from '../../store/inventory';
import { SlotWithItem } from '../../typings';
import { motion, AnimatePresence } from 'framer-motion';
import { useResponsiveScale } from '../../hooks/useResponsiveScale';

const getRarityColor = (rarity?: string) => {
  switch (rarity) {
    case 'rare':      return 'var(--theme-rarity-rare-badge)';
    case 'epic':      return 'var(--theme-rarity-epic-badge)';
    case 'legendary': return 'var(--theme-rarity-legendary-badge)';
    default:          return null;
  }
};

const InventoryHotbar: React.FC = () => {
  const [hotbarVisible, setHotbarVisible] = useState(false);
  const items = useAppSelector(selectLeftInventory).items.slice(0, 5);
  const scale = useResponsiveScale();
  const [handle, setHandle] = useState<NodeJS.Timeout>();
  useNuiEvent('toggleHotbar', () => {
    if (hotbarVisible) {
      setHotbarVisible(false);
    } else {
      if (handle) clearTimeout(handle);
      setHotbarVisible(true);
      setHandle(setTimeout(() => setHotbarVisible(false), 3000));
    }
  });

  return (
    <AnimatePresence>
      {hotbarVisible && (
        <motion.div
          className="hotbar-container"
          style={{ scale, transformOrigin: 'bottom center' }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          {/* Dark container matching inventory design - smaller size */}
          <div
            className="bg-[var(--theme-bg-main)] rounded-[14px] p-[6px] flex gap-[4px]"
            style={{ boxShadow: '0px 4px 28.5px rgba(0, 0, 0, 0.5)' }}
          >
            {items.map((item, index) => {
              const isItemSlot = isSlotWithItem(item);
              const itemData = isItemSlot ? Items[item.name] : null;
              const rarityColor = itemData ? getRarityColor(itemData.rarity) : null;

              return (
                <motion.div
                  key={`hotbar-${item.slot}`}
                  className={`hotbar-item-slot rounded-[10px] relative overflow-visible w-[60px] h-[60px]
                    ${isItemSlot ? 'bg-[var(--theme-bg-secondary-highlight)]' : 'bg-[var(--theme-slot-empty-bg)]'}
                  `}
                  style={{
                    borderBottom: rarityColor ? `2px solid ${rarityColor}` : undefined,
                  }}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    duration: 0.2,
                    ease: 'easeOut',
                    delay: index * 0.05,
                  }}
                >
                  {/* Item Image */}
                  {isItemSlot && item?.name && (
                    <div
                      className="absolute inset-0 bg-no-repeat bg-center pointer-events-none"
                      style={{
                        backgroundImage: `url(${getItemUrl(item as SlotWithItem)})`,
                        backgroundSize: '60%',
                      }}
                    />
                  )}

                  {/* Slot number (top-left) - smaller */}
                  <div className="absolute top-[4px] left-[4px] pointer-events-none z-[2]">
                    <span className="inventory-slot-number text-[11px]">{item.slot}</span>
                  </div>

                  {/* Count Badge (top-right) with purple background - smaller */}
                  {isItemSlot && item.count > 1 && (
                    <motion.div
                      className="absolute top-[-2px] right-[-2px] flex items-center justify-center px-[4px] py-[1px] rounded-[4px] pointer-events-none z-10"
                      style={{ backgroundColor: 'var(--theme-accent-base)' }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                    >
                      <p className="font-main text-[11px] text-[var(--theme-text-primary)] leading-none font-bold">
                        {item.count}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InventoryHotbar;
