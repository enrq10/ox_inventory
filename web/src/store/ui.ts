import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  activeTab: 'inventory' | 'clothes';
}

const initialState: UIState = {
  activeTab: 'inventory',
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveTab(state, action: PayloadAction<'inventory' | 'clothes'>) {
      state.activeTab = action.payload;
    },
  },
});

export const { setActiveTab } = uiSlice.actions;

export default uiSlice.reducer;
