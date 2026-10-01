import React from 'react';
import { motion } from 'framer-motion';
import { Locale } from '../../store/locale';
import { useAppSelector } from '../../store';

interface Tab {
  id: 'inventory' | 'clothes';
  label: string;
  badge: number;
}

interface InventoryTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  tabs?: Tab[];
}

const InventoryTabs: React.FC<InventoryTabsProps> = ({
  activeTab,
  onTabChange,
  tabs,
}) => {
  const showClothingTab = useAppSelector((state) => state.config.showClothingTab);

  const allTabs: Tab[] = [
    { id: 'inventory', label: Locale.ui_inventory || 'INVENTORY', badge: 1 },
    { id: 'clothes', label: Locale.ui_clothing || 'CLOTHING', badge: 2 },
  ];

  const resolvedTabs: Tab[] = tabs || (showClothingTab ? allTabs : allTabs.filter(t => t.id !== 'clothes'));
  return (
    <div className="flex gap-3 items-center w-full overflow-visible">
      {resolvedTabs.map((tab) => {
        const isActive = activeTab === tab.id;


        return (
          <motion.button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            onMouseDown={(e) => e.preventDefault()}
            tabIndex={-1}
            className={`
              flex gap-[10px] h-[39px] items-center justify-center
              overflow-clip px-[10px] py-[5px] rounded-[7px] shrink-0
              ${isActive ? 'bg-[var(--theme-accent-base)]' : 'bg-[var(--theme-bg-secondary-highlight)]'}
              transition-all duration-200
              hover:scale-105 active:scale-95 cursor-pointer
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <p className="font-main text-[22px] text-[var(--theme-text-primary)] italic leading-normal whitespace-nowrap">
              {tab.label}
            </p>
          </motion.button>
        );
      })}
    </div>
  );
};

export default InventoryTabs;
