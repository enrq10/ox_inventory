import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Inventory, Slot } from '../../typings';
import { Items } from '../../store/items';
import { fetchNui } from '../../utils/fetchNui';
import useNuiEvent from '../../hooks/useNuiEvent';
import { Locale } from '../../store/locale';

interface ShopInterfaceProps {
  inventory: Inventory;
}

interface CartItem {
  item: Slot;
  quantity: number;
  price: number;
  name: string;
  weight: number;
  currency: string;
}

const ShopInterface: React.FC<ShopInterfaceProps> = ({ inventory }) => {
  const [cart, setCart] = useState<Map<number, CartItem>>(new Map());
  const [showCart, setShowCart] = useState(false);
  const [bankMoney, setBankMoney] = useState(0);
  const [walletMoney, setWalletMoney] = useState(0);

  // Request money data when shop opens
  useEffect(() => {
    fetchNui<{ bank?: number; cash?: number }>('getMoney').then((data) => {
      if (data?.bank !== undefined) setBankMoney(data.bank);
      if (data?.cash !== undefined) setWalletMoney(data.cash);
    }).catch(() => {
      // Dev fallback
      console.log('[Dev] getMoney callback not implemented');
    });
  }, []);

  // Receive money updates from game
  useNuiEvent<{ bank?: number; cash?: number }>('setMoney', (data) => {
    if (data.bank !== undefined) setBankMoney(data.bank);
    if (data.cash !== undefined) setWalletMoney(data.cash);
  });

  // Show all items
  const filteredItems = inventory.items.filter((item) => item.name);

  // Calculate totals
  const totalItems = Array.from(cart.values()).reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = Array.from(cart.values()).reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalWeight = Array.from(cart.values()).reduce((sum, item) => sum + (item.weight * item.quantity), 0);

  const getCurrencyLabel = (currency: string) => Items[currency]?.label || currency;

  // Per-currency totals from the current cart
  const cartCurrencyTotals = (() => {
    const totals = new Map<string, number>();
    for (const cartItem of cart.values()) {
      const c = cartItem.currency;
      totals.set(c, (totals.get(c) || 0) + cartItem.price * cartItem.quantity);
    }
    return totals;
  })();

  const cartCurrencyEntries = [...cartCurrencyTotals.entries()];
  const isMixedCurrency = cartCurrencyEntries.length > 1;
  const singleCartCurrency = cartCurrencyEntries.length === 1 ? cartCurrencyEntries[0][0] : null;

  // 'money' and 'bank' are both dollar-denominated — display with $ and green
  const isMoneyLike = (c: string) => c === 'money' || c === 'bank';

  // Add item to cart
  const addToCart = (item: Slot, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const stock = item.metadata?.stock;
    const hasStock = stock === undefined || stock === null || stock > 0;
    if (!hasStock) return;

    const itemPrice = (item as any).price || item.metadata?.price || 0;
    const itemName = item.metadata?.label || (item.name && Items[item.name]?.label) || item.name || 'Unknown';
    const itemWeight = item.weight || 0;

    setCart(prev => {
      const newCart = new Map(prev);
      const existing = newCart.get(item.slot);

      if (existing) {
        // Check stock limit
        const maxStock = stock ?? Infinity;
        if (existing.quantity < maxStock) {
          newCart.set(item.slot, { ...existing, quantity: existing.quantity + 1 });
        }
      } else {
        newCart.set(item.slot, { item, quantity: 1, price: itemPrice, name: itemName, weight: itemWeight, currency: (item as any).currency || 'money' });
      }

      return newCart;
    });

    // Open cart panel automatically when item is added
    setShowCart(true);
  };

  // Remove one from cart
  const removeFromCart = (slot: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCart(prev => {
      const newCart = new Map(prev);
      const existing = newCart.get(slot);

      if (existing) {
        if (existing.quantity > 1) {
          newCart.set(slot, { ...existing, quantity: existing.quantity - 1 });
        } else {
          newCart.delete(slot);
        }
      }

      return newCart;
    });
  };

  // Clear cart
  const clearCart = () => {
    setCart(new Map());
  };

  // Checkout
  const handleCheckout = async (method: 'cash' | 'bank' = 'cash') => {
    if (totalItems === 0) return;

    const items = Array.from(cart.values()).map(({ item, quantity }) => ({
      slot: item.slot,
      name: item.name,
      quantity
    }));

    try {
      const response = await fetchNui<{ success: boolean; message: { type: string; description: string } }>('shopCheckout', {
        items,
        total: totalPrice,
        method
      });

      if (response?.success) {
        // Clear cart on success
        clearCart();
        setShowCart(false);
        // The server will refresh the inventory automatically
      } else if (response?.message) {
        fetchNui('notifyError', { description: response.message.description }).catch(() => {});
      }
    } catch (error) {
      fetchNui('notifyError', { description: String(error) }).catch(() => {});
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        fetchNui('closeInventory');
      } else if (e.key === 'F1' && totalItems > 0) {
        e.preventDefault();
        handleCheckout('bank');
      } else if (e.key === 'F2' && totalItems > 0) {
        e.preventDefault();
        handleCheckout('cash');
      } else if (e.key.toLowerCase() === 'c' && showCart) {
        setShowCart(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [totalItems, totalPrice, showCart]);

  // Remove item completely from cart
  const removeItemFromCart = (slot: number) => {
    setCart(prev => {
      const newCart = new Map(prev);
      newCart.delete(slot);
      return newCart;
    });
  };

  return (
    <motion.div
      className="flex flex-col gap-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Money Indicators */}
      <motion.div
        className="flex gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {/* Bank/Card Money */}
        <div className="bg-[var(--theme-bg-main)] px-3 py-1.5 rounded-[8px] flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="24" height="24" fill="var(--theme-special-neon-green)">
            <path d="M64 192v32h512v-32c0-35.3-28.7-64-64-64H128c-35.3 0-64 28.7-64 64m0 80v176c0 35.3 28.7 64 64 64h384c35.3 0 64-28.7 64-64V272zm64 152c0-13.3 10.7-24 24-24h48c13.3 0 24 10.7 24 24s-10.7 24-24 24h-48c-13.3 0-24-10.7-24-24m144 0c0-13.3 10.7-24 24-24h64c13.3 0 24 10.7 24 24s-10.7 24-24 24h-64c-13.3 0-24-10.7-24-24"/>
          </svg>
          <p className="font-readable-bold text-[18px] text-[var(--theme-special-neon-green)] italic font-bold leading-none">${bankMoney.toLocaleString()}</p>
        </div>

        {/* Wallet Money */}
        <div className="bg-[var(--theme-bg-main)] px-3 py-1.5 rounded-[8px] flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="24" height="24" fill="var(--theme-hud-hunger)">
            <path d="M16 6H3.5v-.5l11-.88v.88H16V4c0-1.1-.891-1.872-1.979-1.717L3.98 3.717C2.891 3.873 2 4.9 2 6v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2m-1.5 7.006a1.5 1.5 0 1 1 .001-3.001a1.5 1.5 0 0 1-.001 3.001"/>
          </svg>
          <p className="font-readable-bold text-[18px] text-[var(--theme-hud-hunger)] italic font-bold leading-none">${walletMoney.toLocaleString()}</p>
        </div>
      </motion.div>

      {/* Shop and Cart Container */}
      <div className="flex gap-4">
        {/* Shop Panel */}
        <motion.div
          className="bg-[var(--theme-bg-main)] p-[20px] rounded-[15px] flex flex-col gap-[15px] w-fit"
          style={{ height: '680px' }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
        {/* Header Row: SHOP Title + Cart Button */}
        <div className="flex justify-between items-center">
          {/* Left: Shop Icon + Title */}
          <div className="flex items-center gap-[10px]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="29" height="29" fill="var(--theme-text-primary)">
              <path d="M5 22h14a2 2 0 0 0 2-2V9a1 1 0 0 0-1-1h-3v-.777c0-2.609-1.903-4.945-4.5-5.198A5.005 5.005 0 0 0 7 7v1H4a1 1 0 0 0-1 1v11a2 2 0 0 0 2 2m12-12v2h-2v-2zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v1H9zm-2 3h2v2H7z"/>
            </svg>
            <h2 className="font-readable-bold text-[35px] text-[var(--theme-text-primary)] italic leading-normal">
              {Locale.ui_shop}
            </h2>
          </div>

          {/* Right: Cart Button */}
          <motion.button
            onClick={() => setShowCart(!showCart)}
            className={`flex items-center gap-[8px] px-[12px] py-[6px] rounded-[7px] transition-colors ${showCart ? 'bg-[var(--theme-slot-disabled-bg)]' : 'bg-[var(--theme-bg-secondary-highlight)]'} hover:bg-[var(--theme-slot-disabled-bg)]`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="22" height="22" fill="var(--theme-text-primary)">
              <path d="m528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681"/>
            </svg>
            <motion.span
              key={totalItems}
              initial={{ scale: 1.3 }}
              animate={{ scale: 1 }}
              className="bg-[var(--theme-bg-secondary-highlight)] text-[var(--theme-text-primary)] rounded-[5px] px-[8px] py-[2px] font-readable-bold text-[17px] font-black min-w-[24px] text-center leading-normal"
              style={{ fontWeight: 900 }}
            >
              {totalItems}
            </motion.span>
          </motion.button>
        </div>

        {/* Help Section - Mouse Controls */}
        <div className="flex items-center justify-center gap-10 py-2 px-3 bg-[var(--theme-bg-secondary-highlight)] rounded-[10px]">
          {/* Left Click */}
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20" fill="var(--theme-special-neon-green)">
              <path d="M144 16h-32a64.07 64.07 0 0 0-64 64v96a64.07 64.07 0 0 0 64 64h32a64.07 64.07 0 0 0 64-64V80a64.07 64.07 0 0 0-64-64m48 64v24h-64V32h16a48.05 48.05 0 0 1 48 48m-48 144h-32a48.05 48.05 0 0 1-48-48v-56h128v56a48.05 48.05 0 0 1-48 48"/>
            </svg>
            <p className="font-readable-bold text-[13px] text-[var(--theme-text-secondary)] italic">{Locale.ui_to_add_item}</p>
          </div>

          {/* Right Click */}
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20" fill="var(--theme-state-danger)">
              <path d="M144 16h-32a64.07 64.07 0 0 0-64 64v96a64.07 64.07 0 0 0 64 64h32a64.07 64.07 0 0 0 64-64V80a64.07 64.07 0 0 0-64-64m-32 16h16v72H64V80a48.05 48.05 0 0 1 48-48m32 192h-32a48.05 48.05 0 0 1-48-48v-56h128v56a48.05 48.05 0 0 1-48 48"/>
            </svg>
            <p className="font-readable-bold text-[13px] text-[var(--theme-text-secondary)] italic">{Locale.ui_to_remove_item}</p>
          </div>
        </div>

        {/* Products Grid */}
        <div
          className="grid gap-1.5 inventory-grid-container py-2 pl-2 pr-3"
          style={{
            gridTemplateColumns: 'repeat(5, 100px)',
            gridAutoRows: '100px',
            maxHeight: '520px',
            overflowY: 'auto',
            overflowX: 'visible'
          }}
        >
          {filteredItems.map((item) => {
            if (!item.name) return null;

            const stock = item.metadata?.stock;
            const hasStock = stock === undefined || stock === null || stock > 0;
            const itemPrice = (item as any).price || item.metadata?.price || 0;
            const itemImage = `https://cfx-nui-ox_inventory/web/images/${item.name}.png`;
            const itemName = item.metadata?.label || (Items[item.name]?.label) || item.name;
            const cartItem = cart.get(item.slot);
            const inCart = cartItem?.quantity || 0;
            const itemCurrency = (item as any).currency || 'money';
            const isCustomItemCurrency = !isMoneyLike(itemCurrency);

            return (
              <motion.div
                key={item.slot}
                className={`
                  relative rounded-[10px] overflow-visible aspect-square
                  ${!hasStock ? 'bg-[rgba(42,45,53,0.3)]' : 'bg-[var(--theme-bg-secondary-highlight)]'}
                  ${inCart > 0 ? 'ring-2 ring-[var(--theme-accent-base)]' : ''}
                  transition-all duration-200
                `}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileTap={hasStock ? { scale: 0.95 } : {}}
                transition={{ duration: 0.2 }}
              >
                {/* Price Badge - Top Right */}
                <div
                  className="absolute top-[-5px] right-[-5px] flex items-center justify-center px-[6px] py-[2px] rounded-[6px] pointer-events-none z-10"
                  style={{ backgroundColor: isCustomItemCurrency ? '#c0392b' : 'var(--theme-accent-base)' }}
                >
                  <p className="font-readable-bold text-[14px] text-[var(--theme-text-primary)] leading-none font-bold">
                    {isCustomItemCurrency ? itemPrice.toLocaleString() : `$${itemPrice.toLocaleString()}`}
                  </p>
                </div>

                {/* Main clickable area */}
                <button
                  onClick={() => addToCart(item)}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    removeFromCart(item.slot);
                  }}
                  disabled={!hasStock}
                  className={`
                    absolute inset-0 flex flex-col items-center justify-center pt-7 px-3 pb-4 gap-3 overflow-hidden
                    ${!hasStock ? 'cursor-not-allowed opacity-50' : 'hover:bg-[var(--theme-slot-disabled-bg)] cursor-pointer'}
                    transition-colors duration-200 rounded-[10px]
                  `}
                >
                  {/* Item Image */}
                  <div className="h-[45px] w-full flex items-center justify-center shrink-0">
                    <img
                      src={itemImage}
                      alt={itemName}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>

                  {/* Item Name */}
                  <p className="font-readable-bold text-[11px] font-black text-[var(--theme-text-primary)] text-center leading-tight w-full uppercase truncate shrink-0">
                    {itemName}
                  </p>
                </button>

              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Cart Side Panel */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            className="bg-[var(--theme-bg-main)] rounded-[15px] w-[320px] flex flex-col overflow-hidden"
            style={{ height: '680px' }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Cart Header */}
            <div className="p-4 border-b border-[var(--theme-bg-secondary-highlight)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-[var(--theme-accent-base)] p-2 rounded-[7px]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 24" width="18" height="18" fill="white">
                      <path d="M25.714 10.286h.027c.465 0 .885.192 1.185.502c.31.301.502.721.502 1.186v.028v-.001v.027c0 .465-.192.885-.502 1.185c-.301.31-.721.502-1.186.502h-.028h.001h-.201l-1.541 8.869a1.66 1.66 0 0 1-.587 1.015l-.003.002c-.29.249-.67.401-1.085.401H5.129c-.415 0-.795-.152-1.087-.403l.002.002a1.65 1.65 0 0 1-.588-1.008l-.001-.01l-1.541-8.869h-.228c-.465 0-.885-.192-1.185-.502a1.65 1.65 0 0 1-.502-1.186v-.054c0-.465.192-.885.502-1.185c.301-.31.721-.502 1.186-.502h.028h-.001zM6.491 21a.82.82 0 0 0 .581-.3l.001-.001a.82.82 0 0 0 .208-.626v.003l-.429-5.572a.82.82 0 0 0-.3-.581l-.001-.001a.82.82 0 0 0-.626-.208h.003a.82.82 0 0 0-.581.3l-.001.001a.82.82 0 0 0-.208.626v-.003l.429 5.572a.83.83 0 0 0 .274.562l.001.001a.83.83 0 0 0 .572.228h.011h-.001zm5.505-.856v-5.58a.82.82 0 0 0-.254-.594a.82.82 0 0 0-.595-.254h-.016a.82.82 0 0 0-.594.254a.82.82 0 0 0-.254.595v5.588c0 .234.097.445.254.594a.82.82 0 0 0 .595.254h.016a.82.82 0 0 0 .594-.254a.82.82 0 0 0 .258-.598v-.006zm5.143 0v-5.58a.82.82 0 0 0-.254-.594a.82.82 0 0 0-.595-.254h-.016a.82.82 0 0 0-.594.254a.82.82 0 0 0-.254.595v5.588c0 .234.097.445.254.594a.82.82 0 0 0 .595.254h.016a.82.82 0 0 0 .594-.254a.82.82 0 0 0 .258-.598v-.006zm4.714.066l.429-5.572a.83.83 0 0 0-.208-.624l.001.001a.83.83 0 0 0-.58-.302h-.003a.83.83 0 0 0-.624.208l.001-.001a.83.83 0 0 0-.302.58v.003l-.429 5.572a.83.83 0 0 0 .208.624l-.001-.001a.83.83 0 0 0 .58.302h.08a.83.83 0 0 0 .573-.228a.83.83 0 0 0 .279-.564v-.003zM6.375 3.91L5.13 9.428H3.362l1.352-5.906c.163-.785.59-1.45 1.182-1.915l.007-.005A3.33 3.33 0 0 1 8.01.858h.038h-.002h2.236V.85c0-.234.097-.445.254-.594a.82.82 0 0 1 .596-.255h5.162c.234 0 .445.097.594.254a.82.82 0 0 1 .254.595v.008h2.273c.801 0 1.536.28 2.112.748l-.006-.005A3.26 3.26 0 0 1 22.706 3.5l.004.021l1.352 5.906h-1.768l-1.245-5.518a1.77 1.77 0 0 0-.606-.962l-.003-.003a1.64 1.64 0 0 0-1.046-.375h-2.255v.008a.82.82 0 0 1-.254.594a.82.82 0 0 1-.595.254h-5.158a.82.82 0 0 1-.594-.254a.82.82 0 0 1-.254-.595v-.008H8.029a1.64 1.64 0 0 0-1.048.377l.003-.002a1.76 1.76 0 0 0-.603.954l-.002.012z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-readable-bold text-[18px] text-[var(--theme-text-primary)] italic">{Locale.ui_basket}</h3>
                    <p className="font-readable-bold text-[11px] text-[var(--theme-text-secondary)] italic">{totalItems} {Locale.ui_items}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-readable-bold text-[10px] text-[var(--theme-text-secondary)] italic uppercase">{Locale.ui_weight}</p>
                  <p className="font-readable-bold text-[14px] text-[var(--theme-text-primary)] italic">{(totalWeight / 1000).toFixed(1)}KG</p>
                </div>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-3" style={{ maxHeight: '500px' }}>
              {totalItems === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-[var(--theme-text-secondary)] py-12 gap-4">
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" className="opacity-40">
                    <path d="M2 2h1.74c1.08 0 1.93.93 1.84 2l-.83 9.96a2.796 2.796 0 0 0 2.79 3.03h10.65c1.44 0 2.7-1.18 2.81-2.61l.54-7.5c.12-1.66-1.14-3.01-2.81-3.01H5.82" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16.25 22a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM8.25 22a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM9 8h12" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className="text-center">
                    <p className="font-readable-bold text-[18px] italic text-[var(--theme-text-primary)] mb-2">{Locale.ui_basket_empty}</p>
                    <p className="font-readable-bold text-[13px] italic text-[var(--theme-text-secondary)]">{Locale.ui_click_to_add}</p>
                  </div>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  <div className="flex flex-col gap-2 w-full">
                    {Array.from(cart.values()).map(({ item, quantity, price, name, currency }) => (
                    <motion.div
                      key={item.slot}
                      className="relative bg-[var(--theme-bg-secondary-highlight)] rounded-[10px] p-3 flex gap-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Price Badge - Top Right */}
                      <div
                        className="absolute top-[-5px] right-[-5px] flex items-center justify-center px-[6px] py-[2px] rounded-[6px] pointer-events-none z-10"
                        style={{ backgroundColor: !isMoneyLike(currency) ? '#c0392b' : 'var(--theme-accent-base)' }}
                      >
                        <p className="font-readable-bold text-[14px] text-[var(--theme-text-primary)] leading-none font-bold">
                          {!isMoneyLike(currency)
                            ? (price * quantity).toLocaleString()
                            : `$${(price * quantity).toLocaleString()}`}
                        </p>
                      </div>

                      {/* Left: Item image spanning full height */}
                      <div className="w-[60px] h-[60px] bg-[var(--theme-bg-main)] rounded-[8px] flex items-center justify-center flex-shrink-0">
                        <img
                          src={`https://cfx-nui-ox_inventory/web/images/${item.name}.png`}
                          alt={name}
                          className="max-w-[45px] max-h-[45px] object-contain"
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                      </div>

                      {/* Right: Content column with 2 rows */}
                      <div className="flex-1 flex flex-col gap-2 justify-between">
                        {/* First row: Name (lowered with pt-2) */}
                        <p className="font-readable-bold text-[13px] text-[var(--theme-text-primary)] italic line-clamp-1 uppercase leading-none pt-2">
                          {name}
                        </p>

                        {/* Second row: Quantity controls + Remove button */}
                        <div className="flex items-center justify-between gap-3">
                          {/* Left: Quantity controls */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFromCart(item.slot);
                              }}
                              className="w-6 h-6 flex items-center justify-center bg-[var(--theme-bg-main)] hover:bg-[var(--theme-accent-base)] text-[var(--theme-text-primary)] font-readable-bold text-[14px] italic rounded transition-colors cursor-pointer"
                            >
                              -
                            </button>
                            <input
                              type="text"
                              inputMode="numeric"
                              value={quantity}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, ''); // Only allow digits
                                const newQuantity = parseInt(value) || 1;
                                const stock = item.metadata?.stock;
                                const maxStock = stock ?? Infinity;
                                const clampedQuantity = Math.max(1, Math.min(newQuantity, maxStock));

                                setCart(prev => {
                                  const newCart = new Map(prev);
                                  const existing = newCart.get(item.slot);
                                  if (existing) {
                                    newCart.set(item.slot, { ...existing, quantity: clampedQuantity });
                                  }
                                  return newCart;
                                });
                              }}
                              onKeyDown={(e) => {
                                e.stopPropagation();
                                // Allow: backspace, delete, tab, escape, enter, numbers
                                if (e.key === 'Backspace' || e.key === 'Delete' || e.key === 'Tab' ||
                                    e.key === 'Escape' || e.key === 'Enter' || /^\d$/.test(e.key)) {
                                  return;
                                }
                                e.preventDefault();
                              }}
                              onClick={(e) => e.stopPropagation()}
                              onFocus={(e) => {
                                e.stopPropagation();
                                e.target.select();
                              }}
                              onMouseDown={(e) => e.stopPropagation()}
                              className="w-[50px] h-6 bg-[var(--theme-bg-main)] text-[var(--theme-text-primary)] text-center font-readable-bold text-[14px] italic rounded border-none outline-none"
                              style={{ pointerEvents: 'auto' }}
                            />
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                addToCart(item, e);
                              }}
                              className="w-6 h-6 flex items-center justify-center bg-[var(--theme-bg-main)] hover:bg-[var(--theme-accent-base)] text-[var(--theme-text-primary)] font-readable-bold text-[14px] italic rounded transition-colors cursor-pointer"
                            >
                              +
                            </button>
                          </div>

                          {/* Right: Remove button */}
                          <button
                            onClick={() => removeItemFromCart(item.slot)}
                            className="w-6 h-6 bg-[var(--theme-state-danger)] hover:bg-[#c42f2f] rounded-[7px] flex items-center justify-center transition-colors flex-shrink-0 cursor-pointer"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="14" height="14" fill="white">
                              <path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32m-200 0H360v-72h304z"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  </div>
                </AnimatePresence>
              )}
            </div>

            {/* Cart Footer */}
            <div className="p-4 border-t border-[var(--theme-bg-secondary-highlight)] mt-auto">
              {/* Total - per currency breakdown */}
              <div className="flex flex-col gap-1 mb-3">
                {cartCurrencyEntries.length === 0 ? (
                  <div className="flex justify-between items-center">
                    <span className="font-readable-bold text-[14px] text-[var(--theme-text-secondary)] italic uppercase">{Locale.ui_total}</span>
                    <span className="font-readable-bold text-[20px] italic font-bold" style={{ color: 'var(--theme-special-neon-green)' }}>$0</span>
                  </div>
                ) : cartCurrencyEntries.map(([c, total]) => {
                  const moneyLike = isMoneyLike(c);
                  return (
                    <div key={c} className="flex justify-between items-center">
                      <span className="font-readable-bold text-[14px] text-[var(--theme-text-secondary)] italic uppercase">
                        {c === 'bank' ? Locale.ui_bank : moneyLike ? Locale.ui_total : getCurrencyLabel(c)}
                      </span>
                      <span className="font-readable-bold text-[20px] italic font-bold" style={{ color: moneyLike ? 'var(--theme-special-neon-green)' : '#E74C3C' }}>
                        {moneyLike ? `$${total.toLocaleString()}` : `${total.toLocaleString()} ${getCurrencyLabel(c)}`}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Payment Buttons */}
              <div className="flex gap-2 mb-2">
                {isMixedCurrency ? (
                  // Mixed currencies → single PAY button
                  <motion.button
                    onClick={() => handleCheckout('cash')}
                    disabled={totalItems === 0}
                    className="flex-1 bg-[#c0392b] hover:bg-[#a93226] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer rounded-[7px] py-2 flex items-center justify-center gap-2"
                    whileHover={totalItems > 0 ? { scale: 1.02 } : {}}
                    whileTap={totalItems > 0 ? { scale: 0.98 } : {}}
                  >
                    <span className="font-readable-bold text-[15px] text-[var(--theme-text-primary)] italic uppercase">{Locale.ui_pay}</span>
                  </motion.button>
                ) : singleCartCurrency === 'bank' ? (
                  // Explicit bank-only cart → single bank button
                  <motion.button
                    onClick={() => handleCheckout('bank')}
                    disabled={totalItems === 0}
                    className="flex-1 bg-[var(--theme-special-neon-green)] hover:bg-[var(--theme-shop-success)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer rounded-[7px] py-2 flex items-center justify-center gap-2"
                    whileHover={totalItems > 0 ? { scale: 1.02 } : {}}
                    whileTap={totalItems > 0 ? { scale: 0.98 } : {}}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="20" height="20" fill="var(--theme-bg-main)">
                      <path d="M64 192v32h512v-32c0-35.3-28.7-64-64-64H128c-35.3 0-64 28.7-64 64m0 80v176c0 35.3 28.7 64 64 64h384c35.3 0 64-28.7 64-64V272zm64 152c0-13.3 10.7-24 24-24h48c13.3 0 24 10.7 24 24s-10.7 24-24 24h-48c-13.3 0-24-10.7-24-24m144 0c0-13.3 10.7-24 24-24h64c13.3 0 24 10.7 24 24s-10.7 24-24 24h-64c-13.3 0-24-10.7-24-24"/>
                    </svg>
                    <span className="font-readable-bold text-[16px] text-[var(--theme-bg-main)] italic">{Locale.ui_bank}</span>
                  </motion.button>
                ) : singleCartCurrency && singleCartCurrency !== 'money' ? (
                  // Single custom item currency → "Pay with [currency]"
                  <motion.button
                    onClick={() => handleCheckout('cash')}
                    disabled={totalItems === 0}
                    className="flex-1 bg-[#c0392b] hover:bg-[#a93226] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer rounded-[7px] py-2 flex items-center justify-center gap-2"
                    whileHover={totalItems > 0 ? { scale: 1.02 } : {}}
                    whileTap={totalItems > 0 ? { scale: 0.98 } : {}}
                  >
                    {Items[singleCartCurrency] && (
                      <img
                        src={`https://cfx-nui-ox_inventory/web/images/${singleCartCurrency}.png`}
                        className="w-5 h-5 object-contain"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        alt=""
                      />
                    )}
                    <span className="font-readable-bold text-[15px] text-[var(--theme-text-primary)] italic uppercase">
                      Pay with {getCurrencyLabel(singleCartCurrency)}
                    </span>
                  </motion.button>
                ) : (
                  // money-only → bank + cash (player chooses)
                  <>
                    <motion.button
                      onClick={() => handleCheckout('bank')}
                      disabled={totalItems === 0}
                      className="flex-1 bg-[var(--theme-special-neon-green)] hover:bg-[var(--theme-shop-success)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer rounded-[7px] py-2 flex items-center justify-center gap-2"
                      whileHover={totalItems > 0 ? { scale: 1.02 } : {}}
                      whileTap={totalItems > 0 ? { scale: 0.98 } : {}}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="20" height="20" fill="var(--theme-bg-main)">
                        <path d="M64 192v32h512v-32c0-35.3-28.7-64-64-64H128c-35.3 0-64 28.7-64 64m0 80v176c0 35.3 28.7 64 64 64h384c35.3 0 64-28.7 64-64V272zm64 152c0-13.3 10.7-24 24-24h48c13.3 0 24 10.7 24 24s-10.7 24-24 24h-48c-13.3 0-24-10.7-24-24m144 0c0-13.3 10.7-24 24-24h64c13.3 0 24 10.7 24 24s-10.7 24-24 24h-64c-13.3 0-24-10.7-24-24"/>
                      </svg>
                      <span className="font-readable-bold text-[16px] text-[var(--theme-bg-main)] italic">{Locale.ui_bank}</span>
                    </motion.button>
                    <motion.button
                      onClick={() => handleCheckout('cash')}
                      disabled={totalItems === 0}
                      className="flex-1 bg-[var(--theme-hud-hunger)] hover:bg-[#e5aa1f] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer rounded-[7px] py-2 flex items-center justify-center gap-2"
                      whileHover={totalItems > 0 ? { scale: 1.02 } : {}}
                      whileTap={totalItems > 0 ? { scale: 0.98 } : {}}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20" fill="var(--theme-bg-main)">
                        <path d="M16 6H3.5v-.5l11-.88v.88H16V4c0-1.1-.891-1.872-1.979-1.717L3.98 3.717C2.891 3.873 2 4.9 2 6v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2m-1.5 7.006a1.5 1.5 0 1 1 .001-3.001a1.5 1.5 0 0 1-.001 3.001"/>
                      </svg>
                      <span className="font-readable-bold text-[16px] text-[var(--theme-bg-main)] italic">{Locale.ui_cash}</span>
                    </motion.button>
                  </>
                )}
              </div>

              {/* Clear Button */}
              <motion.button
                onClick={clearCart}
                disabled={totalItems === 0}
                className="w-full bg-[rgba(221,57,57,0.15)] hover:bg-[rgba(221,57,57,0.25)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer rounded-[7px] py-2 flex items-center justify-center gap-2"
                whileHover={totalItems > 0 ? { scale: 1.02 } : {}}
                whileTap={totalItems > 0 ? { scale: 0.98 } : {}}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="18" height="18" fill="var(--theme-state-danger)">
                  <path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32m-200 0H360v-72h304z"/>
                </svg>
                <span className="font-readable-bold text-[16px] text-[var(--theme-state-danger)] italic">{Locale.ui_clear}</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ShopInterface;
