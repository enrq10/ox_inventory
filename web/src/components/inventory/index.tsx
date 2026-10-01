import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import useNuiEvent from '../../hooks/useNuiEvent';
import InventoryHotbar from './InventoryHotbar';
import { useAppDispatch, useAppSelector } from '../../store';
import { refreshSlots, setAdditionalMetadata, setupInventory, selectRightInventory, setSplitAmount } from '../../store/inventory';
import { useExitListener } from '../../hooks/useExitListener';
import type { Inventory as InventoryProps } from '../../typings';
import RightInventory from './RightInventory';
import LeftInventory from './LeftInventory';
import MainInventoryContainer from './MainInventoryContainer';
import ShopInterface from './ShopInterface';
import SecondaryInventory from './SecondaryInventory';
import Tooltip from '../utils/Tooltip';
import { closeTooltip } from '../../store/tooltip';
import InventoryContext from './InventoryContext';
import { closeContextMenu } from '../../store/contextMenu';
import { motion, AnimatePresence } from 'framer-motion';
import { ExtraControls } from './ExtraControls';
import { isInventoryEmpty } from '../../utils/misc';
import { clearBasket } from '../../store/shop';
import { useResponsiveScale } from '../../hooks/useResponsiveScale';

const Inventory = forwardRef((_, ref) => {
  const [inventoryVisible, setInventoryVisible] = useState(false);
  const dispatch = useAppDispatch();
  const rightInventory = useAppSelector(selectRightInventory);
  const scale = useResponsiveScale();

  // Detect if shop is open
  const isShop = rightInventory.type === "shop";
  const showShop = isShop && !isInventoryEmpty(rightInventory);

  // Detect if crafting bench is open
  const isCrafting = rightInventory.type === "crafting";
  const showCrafting = isCrafting && !isInventoryEmpty(rightInventory);

  // Detect if secondary inventory is open (stash, etc. - but NOT trunk/glovebox, those go in main container)
  // Show secondary inventories even if empty (so users can add items to them)
  const isSecondaryInventory = rightInventory.type && rightInventory.type !== "shop" && rightInventory.type !== "crafting" && rightInventory.type !== "drop" && rightInventory.type !== "newdrop" && rightInventory.type !== "glovebox" && rightInventory.type !== "trunk";
  const showSecondaryInventory = isSecondaryInventory;

  // Block all keyboard events when inventory is visible to prevent FiveM controls
  useEffect(() => {
    if (!inventoryVisible) return;

    const blockKeyEvents = (e: KeyboardEvent) => {
      // Allow typing in input fields (except Escape)
      if (e.target instanceof HTMLInputElement && e.code !== 'Escape') return;

      // Block all keys including Escape to prevent them from reaching FiveM
      e.preventDefault();
      e.stopPropagation();

      // Handle Escape key to close inventory
      if (e.code === 'Escape' && e.type === 'keydown') {
        setInventoryVisible(false);
        dispatch(closeContextMenu());
        dispatch(closeTooltip());
        dispatch(clearBasket());
      }
    };

    window.addEventListener('keydown', blockKeyEvents, true);
    window.addEventListener('keyup', blockKeyEvents, true);
    window.addEventListener('keypress', blockKeyEvents, true);

    return () => {
      window.removeEventListener('keydown', blockKeyEvents, true);
      window.removeEventListener('keyup', blockKeyEvents, true);
      window.removeEventListener('keypress', blockKeyEvents, true);
    };
  }, [inventoryVisible, dispatch]);

  useNuiEvent<boolean>('setInventoryVisible', setInventoryVisible);
  useNuiEvent<false>('closeInventory', () => {
    setInventoryVisible(false);
    dispatch(closeContextMenu());
    dispatch(closeTooltip());
    dispatch(clearBasket());
    dispatch(setSplitAmount(0));
  });
  useExitListener(setInventoryVisible);

  useNuiEvent<{
    leftInventory?: InventoryProps;
    rightInventory?: InventoryProps;
  }>('setupInventory', (data) => {
    dispatch(setupInventory(data));
    !inventoryVisible && setInventoryVisible(true);
  });

  useNuiEvent('refreshSlots', (data) => dispatch(refreshSlots(data)));

  useNuiEvent('displayMetadata', (data: Array<{ metadata: string; value: string }>) => {
    dispatch(setAdditionalMetadata(data));
  });

  return (
    <>
      <AnimatePresence>
        {/* Shop Panel — full-screen centered wrapper, content left */}
        {inventoryVisible && showShop && (
          <motion.div
            key="shop-panel"
            style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', pointerEvents: 'none' }}
            initial={{ x: -150, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -150, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="shop-panel-wrapper" style={{ marginLeft: '20px', transform: `scale(${scale})`, transformOrigin: 'left', pointerEvents: 'auto' }}>
              <ShopInterface inventory={rightInventory} />
            </div>
          </motion.div>
        )}

        {/* Crafting Bench - Left Side */}
        {inventoryVisible && showCrafting && (
          <motion.div
            key="crafting-panel"
            style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', pointerEvents: 'none' }}
            initial={{ x: -150, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -150, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="crafting-bench-wrapper" style={{ marginLeft: '20px', transform: `scale(${scale})`, transformOrigin: 'top left', pointerEvents: 'auto' }}>
              <SecondaryInventory inventory={rightInventory} />
            </div>
          </motion.div>
        )}

        {/* Secondary Inventory (Trunk, Glovebox, Stash, etc.) - Left Side */}
        {inventoryVisible && showSecondaryInventory && (
          <motion.div
            key="secondary-panel"
            style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', pointerEvents: 'none' }}
            initial={{ x: -150, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -150, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="secondary-inventory-wrapper" style={{ marginLeft: '20px', transform: `scale(${scale})`, transformOrigin: 'top left', pointerEvents: 'auto' }}>
              <SecondaryInventory inventory={rightInventory} />
            </div>
          </motion.div>
        )}

        {/* Player Inventory — full-screen centered wrapper, content right */}
        {inventoryVisible && (
          <motion.div
            key="inventory-panel"
            style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pointerEvents: 'none' }}
            initial={{ x: 150, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 150, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inventory-wrapper" style={{ transform: `scale(${scale})`, transformOrigin: 'right', pointerEvents: 'auto' }}>
              <MainInventoryContainer />
              <Tooltip />
              <InventoryContext />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <InventoryHotbar />
    </>
  );
});

export default Inventory;
