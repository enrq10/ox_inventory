import React from 'react';
import { motion } from 'framer-motion';
import { fetchNui } from '../../utils/fetchNui';

interface ShopHeaderProps {
  shopName: string;
  basketCount: number;
  onBasketClick: () => void;
  activeView: 'catalog' | 'basket';
}

const ShopHeader: React.FC<ShopHeaderProps> = ({
  shopName,
  basketCount,
  onBasketClick,
  activeView,
}) => {
  const handleClose = () => {
    fetchNui('closeInventory').catch(() => {
      console.log('[Dev] closeInventory callback not implemented');
    });
  };

  return (
    <div className="flex items-center justify-between w-full mb-[10px]">
      {/* Shop Title */}
      <h2 className="font-main text-[28px] text-[var(--theme-text-primary)] italic leading-normal font-bold">
        {activeView === 'basket' ? 'SHOPPING BASKET' : shopName.toUpperCase()}
      </h2>

      {/* Right Side: Basket Button + Close Button */}
      <div className="flex items-center gap-[10px]">
        {/* Basket Button - Only show in catalog view */}
        {activeView === 'catalog' && (
          <motion.button
            onClick={onBasketClick}
            className="relative bg-[var(--theme-accent-base)] hover:bg-[var(--theme-accent-hover-dark)] rounded-[7px] px-[15px] py-[8px] transition-colors cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center gap-[8px]">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--theme-text-primary)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>

              {/* Badge showing item count */}
              {basketCount > 0 && (
                <motion.span
                  className="absolute -top-[5px] -right-[5px] bg-[var(--theme-shop-remove-btn)] text-white text-[12px] font-bold rounded-full w-[20px] h-[20px] flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                >
                  {basketCount}
                </motion.span>
              )}
            </div>
          </motion.button>
        )}

        {/* Close Button */}
        <motion.button
          onClick={handleClose}
          className="bg-[var(--theme-bg-secondary-highlight)] hover:bg-[var(--theme-slot-disabled-bg)] rounded-[7px] w-[40px] h-[40px] flex items-center justify-center transition-colors cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--theme-text-primary)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </motion.button>
      </div>
    </div>
  );
};

export default ShopHeader;
