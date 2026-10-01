import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Inventory } from '../../typings';
import WeightBar from '../utils/WeightBar';
import InventorySlot from './InventorySlot';
import { getTotalWeight } from '../../helpers';
import { useAppSelector, useAppDispatch } from '../../store';
import { useIntersection } from '../../hooks/useIntersection';
import InventoryControl from './InventoryControl';
import {Backpack, WeightIcon} from 'lucide-react';
import InventoryTabs from './InventoryTabs';
import { InventoryButtonCategory } from './InventoryButtonCategory';
import { IconName } from 'lucide-react/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import ClothingButton from './ClothingButton';
import ClothingInterface from './ClothingInterface';
import ClothingButtons from './ClothingButtons';
import { Locale } from '../../store/locale';
import { ItemCategory, filterItemsByCategory } from '../../helpers/itemCategories';
import { setSplitAmount } from '../../store/inventory';
import { getAssetPath } from '../../utils/assetPath';
import { fetchNui } from '../../utils/fetchNui';

const PAGE_SIZE = 30;

const CompactWeightBar: React.FC<{ weight: number; maxWeight: number }> = ({ weight, maxWeight }) => {
  const currentPercentage = Math.min((weight / (maxWeight || 1)) * 100, 100);
  const getWeightColor = (p: number) => p >= 85 ? 'var(--theme-state-danger)' : p >= 60 ? 'var(--theme-hud-hunger)' : 'var(--theme-special-neon-green)';
  const weightColor = getWeightColor(currentPercentage);
  const emptyBarColor = weightColor === 'var(--theme-special-neon-green)'
    ? 'var(--theme-special-neon-green-bg)'
    : weightColor === 'var(--theme-hud-hunger)'
      ? 'var(--theme-state-warning-bg)'
      : 'var(--theme-state-danger-bg)';

  return (
    <div className="flex items-center gap-[12px]">
      <p className="font-main text-[15px] italic whitespace-nowrap" style={{ color: weightColor }}>
        {(weight / 1000).toFixed(1)}KG
      </p>
      <div className="flex gap-[3px]">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="w-[10px] h-[10px] rounded-[2px] transition-all duration-300"
            style={{ backgroundColor: ((i + 1) / 8) * 100 <= currentPercentage ? weightColor : emptyBarColor }}
          />
        ))}
      </div>
      <p className="font-main text-[15px] italic whitespace-nowrap" style={{ color: weightColor }}>
        {(maxWeight / 1000).toFixed(0)}KG
      </p>
    </div>
  );
};

interface InventoryMeta {
  isMainInventory?: boolean;
  isDropInventory?: {
    value: boolean,
    type: string,
    shouldRender: boolean;
  };
}

interface InventoryGridProps {
  inventory: Inventory;
  renderControl?: boolean;
  meta?: InventoryMeta;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const InventoryGrid: React.FC<InventoryGridProps> = ({ inventory, renderControl, meta = {}, activeTab: externalActiveTab, onTabChange: externalOnTabChange }) => {
  const weight = useMemo(
    () => (inventory.maxWeight !== undefined ? Math.floor(getTotalWeight(inventory.items) * 1000) / 1000 : 0),
    [inventory.maxWeight, inventory.items]
  );
  const [page, setPage] = useState(0);
  const [isClothingMode, setIsClothingMode] = useState(false);
  const [internalActiveTab, setInternalActiveTab] = useState('inventory');
  const [itemFilter, setItemFilter] = useState<string>('all');
  const containerRef = useRef(null);
  const { ref, entry } = useIntersection({ threshold: 0.5 });
  const isBusy = useAppSelector((state) => state.inventory.isBusy);
  const splitAmount = useAppSelector((state) => state.inventory.splitAmount);
  const configState = useAppSelector((state) => state.config);
  const dispatch = useAppDispatch();

  // Use external activeTab if provided, otherwise use internal state
  const activeTab = externalActiveTab !== undefined ? externalActiveTab : internalActiveTab;
  const setActiveTab = externalOnTabChange !== undefined ? externalOnTabChange : setInternalActiveTab;

  useEffect(() => {
    if (entry && entry.isIntersecting) {
      setPage((prev) => ++prev);
    }
  }, [entry]);

  useEffect(() => {
    setIsClothingMode(activeTab === 'clothes');
  }, [activeTab]);


  return (
    <motion.div
      className={`flex flex-col items-center gap-2 transition-smooth overflow-visible`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <motion.div
          className={`relative inventory-grid-wrapper rounded-xl
          ${meta?.isDropInventory?.value
            ? meta.isDropInventory.shouldRender
              ? "opacity-100 h-auto pb-0 w-fit"
              : "opacity-0 h-0 scale-y-[50%] scale-x-0 p-0"
            : meta?.isMainInventory
              ? isClothingMode
                ? " w-fit h-auto"
                : " w-fit h-[630px]" // Wrapper height for main inventory with 4 rows + header elements
              : renderControl
                ? " border-4 w-fit h-[280px]" // Wrapper height for secondary inventory with 2 rows
                : "h-0 opacity-0 overflow-hidden p-0 w-fit"
          }`}
          style={{
            pointerEvents: isBusy ? 'none' : 'auto',
            borderColor: meta?.isMainInventory || meta?.isDropInventory?.value ? undefined : "#2f303188",
            background: meta?.isMainInventory || meta?.isDropInventory?.value ? "transparent" : "linear-gradient(to bottom right, var(--theme-bg-main), #111111ff, var(--theme-bg-main))",
            transition: 'height 0.3s ease-in-out'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {/* Main Inventory Header - New Figma Design */}
        {meta?.isMainInventory && (
          <>
            {/* First Row: Tabs + Logo + ESC Button */}
            <div className="flex justify-between items-center mb-2 overflow-visible">
                {/* Tabs */}
                <InventoryTabs activeTab={activeTab} onTabChange={setActiveTab} />

                {/* Logo or ESC Button */}
                {configState.showLogo ? (
                  <img
                    src={getAssetPath(configState.logoFile)}
                    alt="Logo"
                    className="h-[48px] w-auto object-contain opacity-70"
                  />
                ) : (
                  <motion.button
                    onClick={() => fetchNui('closeInventory').catch(() => {})}
                    className="bg-[var(--theme-state-danger)] flex items-center justify-center overflow-clip px-[10px] py-[5px] rounded-[7px] transition-opacity hover:opacity-90 cursor-pointer"
                    whileTap={{ scale: 0.98 }}
                  >
                    <p className="font-main text-[17px] text-[var(--theme-text-primary)] italic leading-normal">
                      ESC
                    </p>
                  </motion.button>
                )}
              </div>

            {/* Second Row: Icon + Title + Weight Bar */}
            <div className="flex justify-between items-center gap-[20px]">
              <motion.div
                className="flex items-center gap-[10px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {/* Inventory Icon SVG - Inline */}
                <svg
                  width="27.789"
                  height="22"
                  viewBox="0 0 27.7895 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[27.789px] h-[22px]"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 3.01052C0 2.21208 0.317179 1.44635 0.881762 0.881762C1.44635 0.317179 2.21208 0 3.01052 0H24.7789C25.5774 0 26.3431 0.317179 26.9077 0.881762C27.4723 1.44635 27.7895 2.21208 27.7895 3.01052V3.93684C27.7895 4.73528 27.4723 5.50102 26.9077 6.0656C26.3431 6.63019 25.5774 6.94737 24.7789 6.94737H24.3158V19.221C24.3158 20.761 23.0768 22 21.5368 22H6.25263C4.71263 22 3.47368 20.761 3.47368 19.221V6.94737H3.01052C2.21208 6.94737 1.44635 6.63019 0.881762 6.0656C0.317179 5.50102 0 4.73528 0 3.93684L0 3.01052ZM3.01052 2.31579C2.82627 2.31579 2.64956 2.38898 2.51927 2.51927C2.38898 2.64956 2.31579 2.82627 2.31579 3.01052V3.93684C2.31579 4.1211 2.38898 4.2978 2.51927 4.42809C2.64956 4.55838 2.82627 4.63158 3.01052 4.63158H24.7789C24.9632 4.63158 25.1399 4.55838 25.2702 4.42809C25.4005 4.2978 25.4737 4.1211 25.4737 3.93684V3.01052C25.4737 2.82627 25.4005 2.64956 25.2702 2.51927C25.1399 2.38898 24.9632 2.31579 24.7789 2.31579H3.01052ZM9.26315 9.26315C8.95606 9.26315 8.66155 9.38515 8.4444 9.60229C8.22725 9.81944 8.10526 10.114 8.10526 10.421C8.10526 10.7281 8.22725 11.0227 8.4444 11.2398C8.66155 11.457 8.95606 11.5789 9.26315 11.5789H18.5263C18.8334 11.5789 19.1279 11.457 19.3451 11.2398C19.5622 11.0227 19.6842 10.7281 19.6842 10.421C19.6842 10.114 19.5622 9.81944 19.3451 9.60229C19.1279 9.38515 18.8334 9.26315 18.5263 9.26315H9.26315Z"
                    fill="var(--theme-text-primary)"
                  />
                </svg>

                {/* Title */}
                <AnimatePresence mode="wait">
                  <motion.h2
                    className="font-main text-[35px] text-[var(--theme-text-primary)] italic leading-normal"
                    key={isClothingMode ? "clothing" : "inventory"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15, ease: "easeInOut" }}
                  >
                    {isClothingMode ? Locale["ui_clothing"] || "CLOTHING" : Locale["ui_inventory"] || "INVENTARIO"}
                  </motion.h2>
                </AnimatePresence>
              </motion.div>

              {/* Weight Indicator */}
              {inventory.maxWeight && (
                <CompactWeightBar weight={weight} maxWeight={inventory.maxWeight} />
              )}
            </div>
          </>
        )}

        {/* Filter Buttons + Split Input - Only shown in inventory tab */}
        {meta?.isMainInventory && !isClothingMode && (
          <div className="flex justify-between items-center mt-2">
            {configState.showCategories && configState.categories.length > 0 ? (
              <div className="flex gap-[8px]">
                <motion.button
                  onClick={() => setItemFilter('all')}
                  onMouseDown={(e) => e.preventDefault()}
                  tabIndex={-1}
                  className={`px-[12px] py-[6px] rounded-[7px] font-main text-[14px] italic transition-all cursor-pointer ${
                    itemFilter === 'all'
                      ? 'bg-[var(--theme-accent-base)] text-[var(--theme-text-primary)]'
                      : 'bg-[var(--theme-bg-secondary-highlight)] text-[var(--theme-text-secondary)] hover:bg-[var(--theme-slot-disabled-bg)]'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {Locale['ui_category_all'] || 'ALL'}
                </motion.button>
                {configState.categories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setItemFilter(category.id)}
                    onMouseDown={(e) => e.preventDefault()}
                    tabIndex={-1}
                    className={`px-[12px] py-[6px] rounded-[7px] font-main text-[14px] italic transition-all cursor-pointer ${
                      itemFilter === category.id
                        ? 'bg-[var(--theme-accent-base)] text-[var(--theme-text-primary)]'
                        : 'bg-[var(--theme-bg-secondary-highlight)] text-[var(--theme-text-secondary)] hover:bg-[var(--theme-slot-disabled-bg)]'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {category.label.toUpperCase()}
                  </motion.button>
                ))}
              </div>
            ) : <div />}

            {/* Persistent split amount input */}
            <div className="flex items-center gap-[5px] bg-[var(--theme-bg-secondary-highlight)] rounded-[7px] px-[8px] h-[32px]">
              <button
                onMouseDown={(e) => e.preventDefault()}
                tabIndex={-1}
                onClick={() => dispatch(setSplitAmount(Math.max(0, splitAmount - 1)))}
                className="text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] transition-colors select-none cursor-pointer px-[4px] text-[16px] leading-none"
              >−</button>
              <input
                type="number"
                className="font-main text-[14px] text-[var(--theme-text-primary)] bg-transparent text-center w-[36px] outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                value={splitAmount}
                min={0}
                onFocus={(e) => e.target.select()}
                onChange={(e) => {
                  const val = Math.floor(e.target.valueAsNumber);
                  dispatch(setSplitAmount(isNaN(val) || val < 0 ? 0 : val));
                }}
              />
              <button
                onMouseDown={(e) => e.preventDefault()}
                tabIndex={-1}
                onClick={() => dispatch(setSplitAmount(splitAmount + 1))}
                className="text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] transition-colors select-none cursor-pointer px-[4px] text-[16px] leading-none"
              >+</button>
              <div className="w-[1px] h-[16px] bg-[var(--theme-slot-disabled-bg)] mx-[2px]" />
              <button
                onMouseDown={(e) => e.preventDefault()}
                tabIndex={-1}
                onClick={() => dispatch(setSplitAmount(0))}
                title="Reset"
                className="text-[var(--theme-text-secondary)] hover:text-[var(--theme-state-danger)] transition-colors select-none cursor-pointer px-[2px] text-[12px] leading-none"
              >✕</button>
            </div>
          </div>
        )}

        {/* Dropped Inventory / Vehicle Storage Header */}
        {meta?.isDropInventory?.value && (
          <>
            {(meta.isDropInventory.type === "glovebox" || meta.isDropInventory.type === "trunk") ? (
              <motion.div
                className="flex items-center justify-between gap-[10px] mb-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <div className="flex items-center gap-[10px]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="24" height="24" fill="var(--theme-text-primary)" style={{ opacity: 1 }}>
                    <path d="M15.395 2.5a3.75 3.75 0 0 0-2.786 0L9.69 3.668l11.25 4.499l4.108-1.644a2.8 2.8 0 0 0-.776-.472zm3.525 6.475l-11.25-4.5l-3.938 1.576a2.7 2.7 0 0 0-.776.472l11.046 4.42zm-16.916-.37q.001-.416.118-.8l11.13 4.453v13.435a4 4 0 0 1-.643-.192L3.732 21.95a2.75 2.75 0 0 1-1.728-2.554zM15.395 25.5q-.316.126-.643.192V12.258l11.13-4.453q.117.384.118.8v10.791a2.75 2.75 0 0 1-1.728 2.554z"/>
                  </svg>
                  <h2 className="font-main text-[22px] text-[var(--theme-text-primary)] italic leading-normal whitespace-pre-wrap m-0">
                    {(meta.isDropInventory.type === 'trunk' ? Locale.ui_trunk : Locale.ui_glovebox)} [{inventory.id}]
                  </h2>
                </div>
                {inventory.maxWeight ? <CompactWeightBar weight={weight} maxWeight={inventory.maxWeight} /> : null}
              </motion.div>
            ) : (
              <motion.div
                className="flex items-center justify-between gap-[10px] mb-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <h2 className="font-main text-[22px] text-[var(--theme-text-primary)] italic leading-normal whitespace-pre-wrap m-0">
                  {(meta.isDropInventory.type === "newdrop" || meta.isDropInventory.type === "drop") ? (Locale.ui_items_dropped || 'ITEMS DROPPED NEARBY') : inventory.label?.toUpperCase() || (Locale.ui_secondary || 'SECONDARY')}
                </h2>
                {inventory.maxWeight ? <CompactWeightBar weight={weight} maxWeight={inventory.maxWeight} /> : null}
              </motion.div>
            )}
          </>
        )}

        {!meta?.isMainInventory && !meta?.isDropInventory?.value && (
          <div
            style={{ color: "rgb(227 228 227)" }}
            className="relative flex flex-col rounded-sm mt-2 py-1 pb-3 mx-3"
          >
            <div className="flex justify-around">
              <p style={{ textTransform: "uppercase" }}>
                {inventory.label}
              </p>
            </div>
          </div>
        )}
        
        {/* Conditional rendering: Clothing Interface or Inventory Grid */}
        <AnimatePresence mode="wait" initial={false}>
          {meta?.isMainInventory && isClothingMode ? (
            <motion.div
              key="clothing-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <motion.div
                className="p-3 pb-0"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <ClothingInterface />
              </motion.div>
              <motion.div
                className=" "
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.15 }}
              >
                <ClothingButtons />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="inventory-tab"
              className={`inventory-grid-container ${meta?.isDropInventory?.value ? '-mt-4' : ''}`}
              ref={containerRef}
              style={{
                height: 'auto',
                maxHeight: meta?.isDropInventory?.value
                  ? '221px' // 2 rows: (103px * 2) + (7px gap) + 8px padding-top = 221px
                  : meta?.isMainInventory
                    ? '500px' // 4 rows: increased to ensure all 4 rows are fully visible
                    : '221px',
                overflowY: 'auto',
                margin: '0 auto'
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <AnimatePresence>
                {(() => {
                  // Apply filter only for main inventory
                  let itemsToShow = inventory.items;

                  if (meta?.isMainInventory && itemFilter !== 'all') {
                    // Filter items by category (only items with names, no empty slots)
                    const filteredItems = filterItemsByCategory(inventory.items, itemFilter, configState.categories);
                    // Display filtered items in sequential order (1, 2, 3...) but keep original slot for drag & drop
                    itemsToShow = filteredItems.map((item, index) => ({
                      ...item,
                      _originalSlot: item.slot,
                      slot: index + 1
                    }));
                  }

                  return itemsToShow.slice(0, (page + 1) * PAGE_SIZE).map((item, index) => {
                    // Skip empty slots when filtering is active
                    if (meta?.isMainInventory && itemFilter !== 'all' && !item.name) {
                      return null;
                    }

                    // Use original slot if available, otherwise use current slot
                    const actualItem = (item as any)._originalSlot ? { ...item, slot: (item as any)._originalSlot } : item;

                    return (
                      <InventorySlot
                        key={`${inventory.type}-${inventory.id}-${item.slot}-${itemFilter}`}
                        item={actualItem}
                        ref={index === (page + 1) * PAGE_SIZE - 1 ? ref : null}
                        inventoryType={inventory.type}
                        inventoryGroups={inventory.groups}
                        inventoryId={inventory.id}
                        disableDrag={meta?.isMainInventory && itemFilter !== 'all'}
                        index={index}
                      />
                    );
                  });
                })()}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default InventoryGrid;
