import React from 'react';
import { motion } from 'framer-motion';
import { Inventory } from '../../typings';
import InventorySlot from './InventorySlot';
import { Locale } from '../../store/locale';
import { getTotalWeight } from '../../helpers';

interface SecondaryInventoryProps {
  inventory: Inventory;
}

const SecondaryInventory: React.FC<SecondaryInventoryProps> = ({ inventory }) => {
  // Get inventory type label
  const getInventoryLabel = () => {
    switch (inventory.type) {
      case 'trunk': return Locale.ui_trunk;
      case 'glovebox': return Locale.ui_glovebox;
      case 'stash': return Locale.ui_stash;
      case 'container': return Locale.ui_container;
      case 'dumpster': return Locale.ui_dumpster;
      case 'bin': return Locale.ui_bin;
      case 'crafting': return inventory.label?.toUpperCase() || Locale.ui_crafting;
      default: return inventory.label?.toUpperCase() || Locale.ui_storage;
    }
  };

  // Filter out empty slots and get actual items
  const items = inventory.items.filter((item) => item.name);
  // item.weight from server already includes count (unit_weight × count), use helper to sum correctly
  const totalWeight = getTotalWeight(inventory.items);
  const maxWeight = inventory.maxWeight || 0;
  const weightPercentage = maxWeight > 0 ? (totalWeight / maxWeight) * 100 : 0;

  // Calculate dynamic height based on number of rows (max 4 rows)
  const COLUMNS = 5;
  const SLOT_SIZE = 105; // px
  const GAP = 8; // px
  const HEADER_HEIGHT = 90; // approximate height of header section
  const PADDING = 36; // p-3 top and bottom + extra margin
  const MAX_ROWS = 4; // Maximum rows before scrolling

  const totalSlots = inventory.items.length;
  const rows = Math.ceil(totalSlots / COLUMNS);
  const displayRows = Math.min(rows, MAX_ROWS); // Cap at 4 rows
  const gridHeight = (displayRows * SLOT_SIZE) + ((displayRows - 1) * GAP);
  const totalHeight = HEADER_HEIGHT + gridHeight + PADDING;
  const needsScroll = rows > MAX_ROWS;

  return (
    <motion.div
      className="bg-[var(--theme-bg-main)] rounded-[15px] w-[595px] flex flex-col overflow-hidden"
      style={{ height: `${totalHeight}px` }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="p-4 border-b border-[var(--theme-bg-secondary-highlight)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[var(--theme-accent-base)] p-2 rounded-[7px]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="white">
                <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
              </svg>
            </div>
            <div>
              <h3 className={`font-main text-[var(--theme-text-primary)] italic ${inventory.type === 'crafting' ? 'text-[22px]' : 'text-[18px]'}`}>{getInventoryLabel()}</h3>
              <p className={`font-main text-[var(--theme-text-secondary)] italic ${inventory.type === 'crafting' ? 'text-[13px]' : 'text-[11px]'}`}>{items.length} {Locale.ui_items}</p>
            </div>
          </div>
          {inventory.type !== 'crafting' && (
            <div className="text-right">
              <p className="font-main text-[10px] text-[var(--theme-text-secondary)] italic uppercase">{Locale.ui_weight}</p>
              <p className="font-main text-[14px] text-[var(--theme-text-primary)] italic">{(totalWeight / 1000).toFixed(1)}KG / {(maxWeight / 1000).toFixed(1)}KG</p>
            </div>
          )}
        </div>

        {/* Weight Bar - Hidden for crafting */}
        {inventory.type !== 'crafting' && (
          <div className="mt-3 w-full h-2 bg-[var(--theme-bg-secondary-highlight)] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                backgroundColor: weightPercentage > 90 ? 'var(--theme-state-danger)' : weightPercentage > 70 ? 'var(--theme-hud-hunger)' : 'var(--theme-accent-base)'
              }}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(weightPercentage, 100)}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}
      </div>

      {/* Items Grid */}
      <div
        className={`flex-1 p-3 ${needsScroll ? 'overflow-y-auto' : 'overflow-y-hidden'}`}
        style={{
          display: 'grid',
          gap: '8px',
          gridTemplateColumns: 'repeat(5, 105px)',
          gridAutoRows: '105px',
          alignContent: 'start',
          justifyContent: 'center'
        }}
      >
        {inventory.items.map((item, index) => (
          <InventorySlot
            key={`${inventory.type}-${inventory.id}-${item.slot}`}
            item={item}
            inventoryType={inventory.type}
            inventoryGroups={inventory.groups}
            inventoryId={inventory.id}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default SecondaryInventory;
