import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BasketItem as BasketItemType } from '../../store/shop';
import { Items } from '../../store/items';

interface BasketItemProps {
  basketItem: BasketItemType;
  onRemove: () => void;
}

const BasketItem: React.FC<BasketItemProps> = ({ basketItem, onRemove }) => {
  const { item, quantity, price } = basketItem;
  const [removeBtnHovered, setRemoveBtnHovered] = useState(false);

  const itemImage = item.name ? `https://cfx-nui-ox_inventory/web/images/${item.name}.png` : '';
  const itemName = item.metadata?.label || (item.name && Items[item.name]?.label) || item.name || 'Unknown Item';
  const subtotal = price * quantity;

  return (
    <motion.div
      className="rounded-[10px] p-[15px] flex items-center gap-[15px]"
      style={{ backgroundColor: 'var(--theme-shop-card-bg)' }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.2 }}
    >
      {/* Item Image */}
      <div
        className="w-[48px] h-[48px] rounded-[7px] flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: 'var(--theme-bg-main)' }}
      >
        <img
          src={itemImage}
          alt={itemName}
          className="w-[80%] h-[80%] object-contain"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      </div>

      {/* Item Details */}
      <div className="flex-1 flex flex-col gap-[4px]">
        <div className="flex items-center gap-[8px]">
          <p className="text-[16px] font-medium" style={{ color: 'var(--theme-text-primary)' }}>{itemName}</p>
          <span className="text-[14px]" style={{ color: 'var(--theme-text-secondary)' }}>×{quantity}</span>
        </div>
        <div className="flex items-center gap-[10px]">
          <p className="text-[14px]" style={{ color: 'var(--theme-text-secondary)' }}>${price.toLocaleString()} each</p>
          <span style={{ color: 'var(--theme-text-secondary)' }}>•</span>
          <p className="text-[14px] font-bold" style={{ color: 'var(--theme-shop-price)' }}>${subtotal.toLocaleString()} total</p>
        </div>
      </div>

      {/* Remove Button */}
      <motion.button
        onClick={onRemove}
        onMouseEnter={() => setRemoveBtnHovered(true)}
        onMouseLeave={() => setRemoveBtnHovered(false)}
        className="w-[32px] h-[32px] rounded-[5px] flex items-center justify-center flex-shrink-0 cursor-pointer"
        style={{ backgroundColor: removeBtnHovered ? 'var(--theme-shop-remove-btn-hover)' : 'var(--theme-shop-remove-btn)', transition: 'background-color 0.15s' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </motion.button>
    </motion.div>
  );
};

export default BasketItem;
