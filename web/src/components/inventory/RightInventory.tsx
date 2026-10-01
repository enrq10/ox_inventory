import { useAppSelector } from '../../store';
import { selectRightInventory } from '../../store/inventory';
import { isInventoryEmpty } from '../../utils/misc';
import React, { useEffect, useState } from "react";
import InventorySlot from './InventorySlot';
import { motion, AnimatePresence } from 'framer-motion';
import { Locale } from '../../store/locale';

const calcRender = (inventory: any) => {
  return !(inventory.type === "newdrop" && isInventoryEmpty(inventory))
}

const RightInventory: React.FC = () => {
  const rightInventory = useAppSelector(selectRightInventory);
  const [shouldRender, setShouldRender] = useState(() => calcRender(rightInventory));

  useEffect(() => {
    setShouldRender(
      () => calcRender(rightInventory)
    )
  }, [rightInventory]);

  if (!shouldRender) return null;

  return (
    <motion.div
      className="flex flex-col gap-[7px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <p className="font-main text-[22px] text-[var(--theme-text-primary)] italic leading-normal whitespace-pre-wrap">
        {rightInventory.type === "newdrop" ? (Locale.ui_items_dropped || 'ITEMS DROPPED NEARBY') : rightInventory.label?.toUpperCase() || (Locale.ui_secondary || 'SECONDARY')}
      </p>
      <div className="flex flex-wrap gap-[7px] items-start w-[563px]">
        <AnimatePresence>
          {rightInventory.items.map((item, index) => (
            <InventorySlot
              key={`${rightInventory.type}-${rightInventory.id}-${item.slot}`}
              item={item}
              inventoryType={rightInventory.type}
              inventoryGroups={rightInventory.groups}
              inventoryId={rightInventory.id}
            />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default RightInventory;
