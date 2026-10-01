import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SlotWithItem } from '../typings';

interface ContextMenuState {
  coords: {
    x: number;
    y: number;
  } | null;
  item: SlotWithItem | null;
  inventoryType: string | null;
  inventoryId: string | number | null;
}

const initialState: ContextMenuState = {
  coords: null,
  item: null,
  inventoryType: null,
  inventoryId: null,
};

export const contextMenuSlice = createSlice({
  name: 'contextMenu',
  initialState,
  reducers: {
    openContextMenu(state, action: PayloadAction<{ item: SlotWithItem; coords: { x: number; y: number }; inventoryType?: string; inventoryId?: string | number }>) {
      state.coords = action.payload.coords;
      state.item = action.payload.item;
      state.inventoryType = action.payload.inventoryType || 'player';
      state.inventoryId = action.payload.inventoryId ?? null;
    },
    closeContextMenu(state) {
      state.coords = null;
    },
  },
});

export const { openContextMenu, closeContextMenu } = contextMenuSlice.actions;

export default contextMenuSlice.reducer;
