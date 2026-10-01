import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HUDState {
  health: number;
  armor: number;
  hunger: number;
  thirst: number;
}

const initialState: HUDState = {
  health: 100,
  armor: 0,
  hunger: 100,
  thirst: 100,
};

export const hudSlice = createSlice({
  name: 'hud',
  initialState,
  reducers: {
    setHUDValues(state, action: PayloadAction<Partial<HUDState>>) {
      if (action.payload.health !== undefined) state.health = action.payload.health;
      if (action.payload.armor !== undefined) state.armor = action.payload.armor;
      if (action.payload.hunger !== undefined) state.hunger = action.payload.hunger;
      if (action.payload.thirst !== undefined) state.thirst = action.payload.thirst;
    },
  },
});

export const { setHUDValues } = hudSlice.actions;

export default hudSlice.reducer;
