import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CategoryConfig {
  id: string;
  label: string;
  items: string[];
}

interface ConfigState {
  footer: 'actionbuttons' | 'hud';
  showCategories: boolean;
  categories: CategoryConfig[];
  showClothingTab: boolean;
  showLogo: boolean;
  logoFile: string;
}

const initialState: ConfigState = {
  footer: 'hud',
  showCategories: true,
  categories: [],
  showClothingTab: true,
  showLogo: true,
  logoFile: 'assets/of_logo.png',
};

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setConfig(state, action: PayloadAction<Partial<ConfigState>>) {
      if (action.payload.footer !== undefined) state.footer = action.payload.footer;
      if (action.payload.showCategories !== undefined) state.showCategories = action.payload.showCategories;
      if (action.payload.categories !== undefined) state.categories = action.payload.categories;
      if (action.payload.showClothingTab !== undefined) state.showClothingTab = action.payload.showClothingTab;
      if (action.payload.showLogo !== undefined) state.showLogo = action.payload.showLogo;
      if (action.payload.logoFile !== undefined) state.logoFile = action.payload.logoFile;
    },
  },
});

export const { setConfig } = configSlice.actions;

export default configSlice.reducer;
