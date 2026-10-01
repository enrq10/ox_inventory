import React, { useCallback, useContext, useState } from 'react';
import { useResponsiveScale } from '../../hooks/useResponsiveScale';
import { AnimatePresence, motion } from 'framer-motion';
import useNuiEvent from '../../hooks/useNuiEvent';
import { Locale } from '../../store/locale';
import { getItemUrl } from '../../helpers';
import { SlotWithItem } from '../../typings';
import { Items } from '../../store/items';

let notificationCounter = 0;
const MAX_VISIBLE = 5;

interface ItemNotificationProps {
  item: SlotWithItem;
  text: string;
  type: 'added' | 'removed';
}

interface ItemNotificationsContextValue {
  add: (item: ItemNotificationProps) => void;
  notifications: Array<{ id: number; item: ItemNotificationProps }>;
}

export const ItemNotificationsContext = React.createContext<ItemNotificationsContextValue | null>(null);

export const useItemNotifications = () => {
  const ctx = useContext(ItemNotificationsContext);
  if (!ctx) throw new Error(`ItemNotificationsContext undefined`);
  return ctx;
};

const OverflowBadge = ({ count }: { count: number }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.25, ease: 'easeOut', layout: { duration: 0.25, ease: 'easeOut' } }}
    className="flex flex-col items-center"
  >
    <div
      className="px-[12px] py-[5px] w-[103px] z-10 flex items-center justify-center"
      style={{
        backgroundColor: 'var(--theme-notification-item-bg)',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
      }}
    >
      <p className="font-main text-[12px] italic leading-none font-black text-center uppercase text-white/60">
        {Locale['ui_more']}
      </p>
    </div>
    <div
      className="relative w-[103px] h-[103px] flex items-center justify-center"
      style={{ backgroundColor: 'var(--theme-notification-bg)', borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px' }}
    >
      <p className="font-main text-[36px] font-black text-white/80 leading-none">+{count}</p>
    </div>
  </motion.div>
);

const ItemNotification = ({ item, style }: { item: ItemNotificationProps; style?: React.CSSProperties }) => {
    const slotItem = item.item;
    const isAdded = item.type === 'added';

    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.25, ease: 'easeOut', layout: { duration: 0.25, ease: 'easeOut' } }}
        className="flex flex-col items-center"
        style={style}
      >
        {/* Action Badge - Top */}
        <div
          className="px-[12px] py-[5px] rounded-t-[10px] w-[103px] z-10 flex items-center justify-center"
          style={{
            backgroundColor: isAdded ? 'var(--theme-notification-added)' : 'var(--theme-notification-removed)',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
          }}
        >
          <p className="font-main text-[12px] italic leading-none font-black text-center uppercase text-white">
            {item.text}
          </p>
        </div>

        {/* Item Slot - Bottom */}
        <div
          className="relative w-[103px] h-[103px] rounded-b-[15px] overflow-visible"
          style={{
            backgroundColor: 'var(--theme-notification-bg)',
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='72' height='37' viewBox='0 0 72 37' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='18.0208' cy='6.02905' r='4.12263' transform='rotate(-45 18.0208 6.02905)' fill='%232A2D35'/%3E%3Ccircle cx='18.0208' cy='30.4102' r='4.12263' transform='rotate(-45 18.0208 30.4102)' fill='%232A2D35'/%3E%3Ccircle cx='53.8297' cy='6.02905' r='4.12263' transform='rotate(-45 53.8297 6.02905)' fill='%232A2D35'/%3E%3Ccircle cx='53.8297' cy='30.4102' r='4.12263' transform='rotate(-45 53.8297 30.4102)' fill='%232A2D35'/%3E%3Ccircle cx='35.9562' cy='5.83032' r='4.12263' transform='rotate(-45 35.9562 5.83032)' fill='%232A2D35'/%3E%3Ccircle cx='35.9562' cy='30.2114' r='4.12263' transform='rotate(-45 35.9562 30.2114)' fill='%232A2D35'/%3E%3C/svg%3E")`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '70%',
            borderBottomLeftRadius: '15px',
            borderBottomRightRadius: '15px',
          }}
        >
          {/* Item Image */}
          <div
            className="absolute top-0 left-0 right-0 bottom-[28px] bg-no-repeat bg-center pointer-events-none"
            style={{
              backgroundImage: `url(${getItemUrl(slotItem)})`,
              backgroundSize: "60%",
            }}
          />

          {/* Item Name */}
          <div className="absolute bottom-[14px] left-[4px] right-[4px] pointer-events-none">
            <p className="font-readable-bold text-[14px] leading-normal font-black text-center uppercase truncate" style={{ color: 'var(--theme-text-primary)' }}>
              {slotItem.metadata?.label || Items[slotItem.name]?.label || slotItem.name}
            </p>
          </div>
        </div>
      </motion.div>
    );
};

export const ItemNotificationDisplay: React.FC = () => {
  const scale = useResponsiveScale();
  const ctx = useContext(ItemNotificationsContext);
  const notifications = ctx?.notifications ?? [];

  return (
    <div
      className="fixed bottom-[20vh] left-1/2 pointer-events-none z-50"
      style={{ transform: `translateX(-50%) scale(${scale})`, transformOrigin: 'center bottom' }}
    >
      <motion.div
        layout
        className="overflow-x-hidden flex gap-[10px] items-center max-w-[45vw]"
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <AnimatePresence mode="popLayout">
          {notifications.slice(0, MAX_VISIBLE).map((notification) => (
            <ItemNotification key={notification.id} item={notification.item} />
          ))}
          {notifications.length > MAX_VISIBLE && (
            <OverflowBadge key="overflow" count={notifications.length - MAX_VISIBLE} />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export const ItemNotificationsProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<Array<{ id: number; item: ItemNotificationProps }>>([]);

  const add = useCallback((item: ItemNotificationProps) => {
    const id = ++notificationCounter;

    setNotifications((prev) => [...prev, { id, item }]);

    const timeout = setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  useNuiEvent<[item: SlotWithItem, text: string, count?: number]>('itemNotify', ([item, text, count]) => {
    const isAdded = text.toLowerCase().includes('added') || text.toLowerCase().includes('received');
    add({
      item: item,
      text: count ? `${Locale[text]} ${count}x` : `${Locale[text]}`,
      type: isAdded ? 'added' : 'removed',
    });
  });

  return (
    <ItemNotificationsContext.Provider value={{ add, notifications }}>
      {children}
    </ItemNotificationsContext.Provider>
  );
};
