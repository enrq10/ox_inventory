import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import inventoryReducer from './inventory';
import tooltipReducer from './tooltip';
import contextMenuReducer from './contextMenu';
import hudReducer from './hud';
import shopReducer from './shop';
import uiReducer from './ui';
import configReducer from './config';
import themeReducer, { applyThemeToCssVars, initialState as themeInitialState } from './theme';

applyThemeToCssVars(themeInitialState);

export const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
    tooltip: tooltipReducer,
    contextMenu: contextMenuReducer,
    hud: hudReducer,
    shop: shopReducer,
    ui: uiReducer,
    config: configReducer,
    theme: themeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
