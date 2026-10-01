import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  selectBasketItems,
  selectBasketTotal,
  selectBasketItemCount,
  removeFromBasket,
  clearBasket,
  setActiveView,
} from '../../store/shop';
import BasketItem from './BasketItem';
import { fetchNui } from '../../utils/fetchNui';
import { Locale } from '../../store/locale';

const ShopBasket: React.FC = () => {
  const dispatch = useAppDispatch();
  const basketItems = useAppSelector(selectBasketItems);
  const total = useAppSelector(selectBasketTotal);
  const itemCount = useAppSelector(selectBasketItemCount);

  const handleRemove = (slot: number) => {
    dispatch(removeFromBasket(slot));
  };

  const handlePayment = async (method: 'card' | 'bank') => {
    try {
      // Format basket items for server
      const purchaseData = basketItems.map((basketItem) => ({
        slot: basketItem.item.slot,
        name: basketItem.item.name,
        quantity: basketItem.quantity,
        price: basketItem.price,
      }));

      // Send purchase request to server
      const result = await fetchNui<{ success: boolean; message?: string }>(
        'buyBasket',
        {
          items: purchaseData,
          method,
        }
      );

      if (result?.success) {
        dispatch(clearBasket());
      } else {
        fetchNui('notifyError', { description: result?.message || '' }).catch(() => {});
      }
    } catch (error) {
      fetchNui('notifyError', { description: String(error) }).catch(() => {});
    }
  };

  const handleCancel = () => {
    dispatch(clearBasket());
    dispatch(setActiveView('catalog'));
  };

  // Empty basket state
  if (basketItems.length === 0) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center py-[60px] gap-[20px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <svg
          width="80"
          height="80"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--theme-slot-disabled-bg)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
        <p className="text-[var(--theme-text-secondary)] text-[18px]">{Locale.ui_basket_empty}</p>
        <motion.button
          onClick={() => dispatch(setActiveView('catalog'))}
          className="bg-[var(--theme-accent-base)] hover:bg-[var(--theme-accent-hover-dark)] text-[var(--theme-text-primary)] px-[25px] py-[12px] rounded-[7px] text-[14px] font-bold uppercase tracking-wide transition-colors cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {Locale.ui_start_shopping}
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="flex flex-col gap-[20px] w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Basket Items List */}
      <div className="flex flex-col gap-[10px] max-h-[400px] overflow-y-auto pr-[5px]">
        <AnimatePresence>
          {basketItems.map((basketItem) => (
            <BasketItem
              key={basketItem.item.slot}
              basketItem={basketItem}
              onRemove={() => handleRemove(basketItem.item.slot)}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Summary and Payment Section */}
      <div className="bg-[var(--theme-bg-secondary-highlight)] rounded-[10px] p-[20px] flex flex-col gap-[15px]">
        {/* Item Count and Total */}
        <div className="flex items-center justify-between">
          <p className="text-[var(--theme-text-secondary)] text-[16px]">{itemCount} {itemCount === 1 ? Locale.ui_item : Locale.ui_items}</p>
          <p className="text-[var(--theme-shop-price)] text-[28px] font-bold">${total.toLocaleString()}</p>
        </div>

        {/* Separator */}
        <div className="w-full h-[1px] bg-[var(--theme-slot-disabled-bg)]" />

        {/* Payment Buttons */}
        <div className="flex gap-[10px]">
          <motion.button
            onClick={() => handlePayment('card')}
            className="flex-1 bg-[var(--theme-accent-base)] hover:bg-[var(--theme-accent-hover-dark)] text-[var(--theme-text-primary)] py-[14px] rounded-[7px] text-[14px] font-bold uppercase tracking-wide transition-colors cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-center gap-[8px]">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
              {Locale.ui_card}
            </div>
          </motion.button>

          <motion.button
            onClick={() => handlePayment('bank')}
            className="flex-1 bg-[var(--theme-accent-base)] hover:bg-[var(--theme-accent-hover-dark)] text-[var(--theme-text-primary)] py-[14px] rounded-[7px] text-[14px] font-bold uppercase tracking-wide transition-colors cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-center gap-[8px]">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              {Locale.ui_bank}
            </div>
          </motion.button>
        </div>

        {/* Cancel Button */}
        <motion.button
          onClick={handleCancel}
          className="w-full bg-[var(--theme-slot-disabled-bg)] hover:bg-[var(--theme-slot-disabled-bg)] text-[var(--theme-text-primary)] py-[12px] rounded-[7px] text-[14px] font-bold uppercase tracking-wide transition-colors cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {Locale.ui_cancel}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ShopBasket;
