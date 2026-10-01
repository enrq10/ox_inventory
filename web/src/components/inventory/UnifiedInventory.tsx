import React, { useMemo, useRef, useState } from 'react';
import { Inventory } from '../../typings';
import WeightBar from '../utils/WeightBar';
import InventorySlot from './InventorySlot';
import { getTotalWeight, isSlotWithItem } from '../../helpers';
import { useAppSelector } from '../../store';
import InventoryControl from './InventoryControl';
import { Hash, User } from 'lucide-react';
import ClothingInterface from './ClothingInterface';
import ClothingButtons from './ClothingButtons';
import { selectLeftInventory, selectRightInventory } from '../../store/inventory';
import { playClickSound } from '../../hooks/useSound';
import { motion, AnimatePresence } from 'framer-motion';

type TabType = 'inventory' | 'personal';

const UnifiedInventory: React.FC = () => {
  const leftInventory = useAppSelector(selectLeftInventory);
  const rightInventory = useAppSelector(selectRightInventory);
  const isBusy = useAppSelector((state) => state.inventory.isBusy);

  const [activeTab, setActiveTab] = useState<TabType>('inventory');

  const weight = useMemo(
    () => (leftInventory.maxWeight !== undefined ? Math.floor(getTotalWeight(leftInventory.items) * 1000) / 1000 : 0),
    [leftInventory.maxWeight, leftInventory.items]
  );

  const hasDropItems = useMemo(() => {
    if (rightInventory.type !== 'newdrop') return true;
    return rightInventory.items.some(item => isSlotWithItem(item));
  }, [rightInventory]);

  const rightWeight = useMemo(
    () => (rightInventory.maxWeight !== undefined ? Math.floor(getTotalWeight(rightInventory.items) * 1000) / 1000 : 0),
    [rightInventory.maxWeight, rightInventory.items]
  );

  return (
    <div
      className={`inventory-block ${activeTab === 'inventory' && hasDropItems ? 'has-drop' : ''}`}
      style={{ pointerEvents: isBusy ? 'none' : 'auto' }}
    >
      {/* Tabs */}
      <div className="inventory-tab-list">
        <div
          className={`inventory-tab ${activeTab === 'inventory' ? 'selected' : ''}`}
          onClick={() => {
            playClickSound();
            setActiveTab('inventory');
          }}
        >
          <Hash size={20} strokeWidth={3} />
        </div>
        <div
          className={`inventory-tab ${activeTab === 'personal' ? 'selected' : ''}`}
          onClick={() => {
            playClickSound();
            setActiveTab('personal');
          }}
        >
          <User size={20} strokeWidth={2.5} />
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'inventory' ? (
          <motion.div
            key="inventory"
            className="tab-content-wrapper"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.1, ease: 'easeInOut' }}
          >
            <div className="inventory-title">
              <span>INVENTARIO</span>
              <div className="inventory-control-header">
                <InventoryControl />
              </div>
            </div>

            {leftInventory.maxWeight && (
              <div className="inventory-weight-section">
                <WeightBar
                  percent={leftInventory.maxWeight ? (weight / leftInventory.maxWeight) * 100 : 0}
                  current={weight}
                  max={leftInventory.maxWeight}
                />
              </div>
            )}

            <div className="player-inventory">
              {leftInventory.items.map((item) => (
                <InventorySlot
                  key={`${leftInventory.type}-${leftInventory.id}-${item.slot}`}
                  item={item}
                  inventoryType={leftInventory.type}
                  inventoryGroups={leftInventory.groups}
                  inventoryId={leftInventory.id}
                />
              ))}
            </div>

            {hasDropItems && (
              <div className="second-inventory">
                <div className="drop-title">
                  <span>{rightInventory.type === 'newdrop' ? `DROP-${rightInventory.id}` : rightInventory.label}</span>
                </div>
                {rightInventory.maxWeight && rightInventory.type !== 'crafting' && (
                  <div className="inventory-weight-section">
                    <WeightBar
                      percent={rightInventory.maxWeight ? (rightWeight / rightInventory.maxWeight) * 100 : 0}
                      current={rightWeight}
                      max={rightInventory.maxWeight}
                    />
                  </div>
                )}
                <div className="other-inventory">
                  {rightInventory.items.map((item) => (
                    <InventorySlot
                      key={`${rightInventory.type}-${rightInventory.id}-${item.slot}`}
                      item={item}
                      inventoryType={rightInventory.type}
                      inventoryGroups={rightInventory.groups}
                      inventoryId={rightInventory.id}
                    />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="personal"
            className="tab-content-wrapper personal-tab"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.1, ease: 'easeInOut' }}
          >
            <div className="inventory-title">
              <span>PERSONAL</span>
            </div>
            <div className="clothing-content">
              <ClothingInterface />
            </div>
            <div className="clothing-buttons" style={{ marginTop: '15px' }}>
              <ClothingButtons />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UnifiedInventory;
