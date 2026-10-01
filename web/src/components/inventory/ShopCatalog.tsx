import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Slot } from '../../typings';
import InventoryTabs from './InventoryTabs';
import ShopItemCard from './ShopItemCard';

interface ShopCatalogProps {
  items: Slot[];
}

const ShopCatalog: React.FC<ShopCatalogProps> = ({ items }) => {
  const [activeTab, setActiveTab] = useState<string>('inventory');

  // Filter items based on active tab
  const filteredItems = items.filter((item) => {
    if (activeTab === 'inventory') {
      // Show general items (not clothes)
      return !item.metadata?.type || item.metadata.type !== 'clothing';
    } else if (activeTab === 'clothes') {
      return item.metadata?.type === 'clothing';
    }
    return true;
  });

  return (
    <div className="flex flex-col gap-[15px] w-full">
      {/* Tabs */}
      <InventoryTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={[
          { id: 'inventory', label: 'INVENTARIO', badge: 1 },
          { id: 'clothes', label: 'CLOTHES', badge: 2 },
        ]}
      />

      {/* Product Grid - 5 columns */}
      <motion.div
        className="grid grid-cols-5 gap-[10px] w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <ShopItemCard key={item.slot} item={item} />
          ))
        ) : (
          <div className="col-span-5 text-center py-[40px]">
            <p className="text-[var(--theme-text-primary)] text-[16px] opacity-50">
              No items available in this category
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ShopCatalog;
