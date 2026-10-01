// Module-level variable to capture alt key state from mousedown events.
// Using a module variable instead of Redux/keydown events because the global
// keyboard blocker (capture phase) prevents keydown from reaching bubble listeners.
export let altDragActive = false;

export const setAltDragActive = (val: boolean) => {
  altDragActive = val;
};
