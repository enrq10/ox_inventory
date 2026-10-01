import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '../../store';
import { selectLeftInventory, selectRightInventory } from '../../store/inventory';
import InventoryGrid from './InventoryGrid';
import DropZone from './DropZone';
import ActionButtons from './ActionButtons';
import InventoryHUD from './InventoryHUD';
import InventorySlot from './InventorySlot';
import separatorLine from '../../assets/icons/separator-line.svg';
import { fetchNui } from '../../utils/fetchNui';
import { onDrop } from '../../dnd/onDrop';
import { DragSource } from '../../typings';
import { isInventoryEmpty } from '../../utils/misc';
import { setActiveTab as setActiveTabAction } from '../../store/ui';

const MainInventoryContainer: React.FC = () => {
  const leftInventory = useAppSelector(selectLeftInventory);
  const rightInventory = useAppSelector(selectRightInventory);
  const hudState = useAppSelector((state) => state.hud);
  const configState = useAppSelector((state) => state.config);
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState('inventory');

  // Sync local tab state with Redux store
  useEffect(() => {
    dispatch(setActiveTabAction(activeTab as 'inventory' | 'clothes'));
  }, [activeTab, dispatch]);

  // Detection logic for different inventory types
  const isVehicleStorage = rightInventory.type === "glovebox" || rightInventory.type === "trunk";

  const showSecondInventory =
    (rightInventory.type === "newdrop" || rightInventory.type === "drop") && !isInventoryEmpty(rightInventory) ||
    isVehicleStorage; // Vehicle storage always shows, even if empty

  const handleDropItem = (source: DragSource) => {
    // Call onDrop without target to drop item to floor
    onDrop(source);
  };

  const handleActionButton1 = () => {
    fetchNui('actionButton1', {}).catch(() => {
      console.log('[Dev] actionButton1 callback not implemented');
    });
  };

  const handleActionButton2 = () => {
    fetchNui('actionButton2', {}).catch(() => {
      console.log('[Dev] actionButton2 callback not implemented');
    });
  };

  return (
    <motion.div
      className="p-[20px] rounded-[15px] flex flex-col items-center gap-[15px] w-fit"
      style={{ backgroundColor: 'var(--theme-bg-main)' }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Main Inventory Grid (includes header and tabs) */}
      <div>
        <InventoryGrid
          meta={{ isMainInventory: true }}
          renderControl={true}
          inventory={leftInventory}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {/* Second Inventory Section - Appears for dropped items, glovebox, or trunk */}
      <AnimatePresence>
        {showSecondInventory && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <InventoryGrid
              meta={{
                isDropInventory: {
                  value: true,
                  type: rightInventory.type,
                  shouldRender: true,
                }
              }}
              inventory={rightInventory}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Section: Drop Zone + HUD/Action Buttons */}
      <div className="flex flex-col gap-[15px] pt-[10px] w-full max-w-[567px]">
        {/* Drop Zone - Only show when not in clothes mode and not vehicle storage */}
        {activeTab !== 'clothes' && !isVehicleStorage && <DropZone onDrop={handleDropItem} />}

        {/* HUD (if enabled) */}
        {configState.footer === 'hud' && (
          <InventoryHUD
            health={hudState.health}
            armor={hudState.armor}
            hunger={hudState.hunger}
            thirst={hudState.thirst}
          />
        )}

        {/* Action Buttons (only if footer mode is actionbuttons) */}
        {configState.footer === 'actionbuttons' && (
          <ActionButtons onActionButton1={handleActionButton1} onActionButton2={handleActionButton2} />
        )}
      </div>
    </motion.div>
  );
};

export default MainInventoryContainer;
