import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '.';
import { Slot } from '../typings';

export interface BasketItem {
  item: Slot;
  quantity: number;
  price: number;
}

interface ShopState {
  basketItems: BasketItem[];
  activeView: 'catalog' | 'basket';
}

const initialState: ShopState = {
  basketItems: [],
  activeView: 'catalog',
};

export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<{ item: Slot; quantity: number; price: number }>) => {
      const { item, quantity, price } = action.payload;

      const existingItem = state.basketItems.find(
        (basketItem) => basketItem.item.slot === item.slot
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.basketItems.push({ item, quantity, price });
      }
    },

    removeFromBasket: (state, action: PayloadAction<number>) => {
      const slot = action.payload;
      state.basketItems = state.basketItems.filter(
        (basketItem) => basketItem.item.slot !== slot
      );
    },

    updateQuantity: (state, action: PayloadAction<{ slot: number; quantity: number }>) => {
      const { slot, quantity } = action.payload;
      const basketItem = state.basketItems.find(
        (item) => item.item.slot === slot
      );

      if (basketItem) {
        basketItem.quantity = Math.max(1, quantity);
      }
    },

    clearBasket: (state) => {
      state.basketItems = [];
      state.activeView = 'catalog';
    },

    setActiveView: (state, action: PayloadAction<'catalog' | 'basket'>) => {
      state.activeView = action.payload;
    },
  },
});

export const {
  addToBasket,
  removeFromBasket,
  updateQuantity,
  clearBasket,
  setActiveView,
} = shopSlice.actions;

export const selectBasketItems = (state: RootState) => state.shop.basketItems;
export const selectActiveView = (state: RootState) => state.shop.activeView;
export const selectBasketTotal = (state: RootState) =>
  state.shop.basketItems.reduce((total, item) => total + item.price * item.quantity, 0);
export const selectBasketItemCount = (state: RootState) => state.shop.basketItems.length;

export default shopSlice.reducer;
