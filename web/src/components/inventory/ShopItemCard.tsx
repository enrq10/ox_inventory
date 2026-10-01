import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Slot } from '../../typings';
import { useAppDispatch } from '../../store';
import { addToBasket } from '../../store/shop';
import { Items } from '../../store/items';

interface ShopItemCardProps {
  item: Slot;
}

const ShopItemCard: React.FC<ShopItemCardProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const [cardHovered, setCardHovered] = useState(false);

  const itemImage = item.name ? `https://cfx-nui-ox_inventory/web/images/${item.name}.png` : '';
  const itemName = item.metadata?.label || (item.name && Items[item.name]?.label) || item.name || 'Unknown Item';
  const itemPrice = (item as any).price || item.metadata?.price || 0;
  const stock = item.metadata?.stock !== undefined ? item.metadata.stock : '∞';
  const maxStock = typeof stock === 'number' ? stock : 999;
  const isOutOfStock = stock === 0;

  const handleQuantityChange = (newQty: number) => {
    setQuantity(Math.max(1, Math.min(newQty, maxStock)));
  };

  const handleAddToBasket = () => {
    if (isOutOfStock) return;
    dispatch(addToBasket({ item, quantity, price: itemPrice }));
  };

  return (
    <motion.div
      className="rounded-[10px] p-[12px] flex flex-col gap-[8px] cursor-pointer"
      style={{ backgroundColor: cardHovered ? 'var(--theme-shop-card-hover)' : 'var(--theme-shop-card-bg)', transition: 'background-color 0.15s' }}
      onMouseEnter={() => setCardHovered(true)}
      onMouseLeave={() => setCardHovered(false)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Item Image */}
      <div
        className="w-full aspect-square rounded-[7px] flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: 'var(--theme-bg-main)' }}
      >
        <img
          src={itemImage}
          alt={itemName}
          className="w-[80%] h-[80%] object-contain"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      </div>

      {/* Item Name */}
      <p className="text-[14px] font-medium truncate" style={{ color: 'var(--theme-text-primary)' }} title={itemName}>
        {itemName}
      </p>

      {/* Stock */}
      <p className="text-[12px]" style={{ color: 'var(--theme-text-secondary)' }}>
        Stock: {stock}
      </p>

      {/* Price */}
      <p className="text-[18px] font-bold" style={{ color: 'var(--theme-shop-price)' }}>
        ${itemPrice.toLocaleString()}
      </p>

      {/* Quantity Selector */}
      <div className="flex items-center gap-[5px] rounded-[5px] p-[5px]" style={{ backgroundColor: 'var(--theme-bg-main)' }}>
        <button
          onClick={() => handleQuantityChange(quantity - 1)}
          disabled={quantity <= 1 || isOutOfStock}
          className="disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer w-[28px] h-[28px] rounded-[3px] flex items-center justify-center text-[18px] font-bold transition-colors"
          style={{ backgroundColor: 'var(--theme-slot-filled-bg)', color: 'var(--theme-text-primary)' }}
        >
          −
        </button>

        <input
          type="number"
          value={quantity}
          onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
          disabled={isOutOfStock}
          className="bg-transparent text-center flex-1 text-[14px] font-medium outline-none disabled:opacity-30"
          style={{ color: 'var(--theme-text-primary)' }}
          min="1"
          max={maxStock}
        />

        <button
          onClick={() => handleQuantityChange(quantity + 1)}
          disabled={quantity >= maxStock || isOutOfStock}
          className="disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer w-[28px] h-[28px] rounded-[3px] flex items-center justify-center text-[18px] font-bold transition-colors"
          style={{ backgroundColor: 'var(--theme-slot-filled-bg)', color: 'var(--theme-text-primary)' }}
        >
          +
        </button>
      </div>

      {/* Add to Basket Button */}
      <motion.button
        onClick={handleAddToBasket}
        disabled={isOutOfStock}
        className="w-full py-[10px] rounded-[7px] text-[12px] font-bold uppercase tracking-wide transition-all"
        style={{
          backgroundColor: isOutOfStock ? 'var(--theme-slot-disabled-bg)' : 'var(--theme-accent-base)',
          color: isOutOfStock ? 'var(--theme-text-disabled)' : 'var(--theme-text-on-accent)',
          cursor: isOutOfStock ? 'not-allowed' : 'pointer',
        }}
        whileHover={!isOutOfStock ? { backgroundColor: 'var(--theme-accent-hover-dark)' } : {}}
        whileTap={!isOutOfStock ? { scale: 0.98 } : {}}
      >
        {isOutOfStock ? 'OUT OF STOCK' : 'ADD TO BASKET'}
      </motion.button>
    </motion.div>
  );
};

export default ShopItemCard;
