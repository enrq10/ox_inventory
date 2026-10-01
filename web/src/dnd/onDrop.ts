import { canStack, findAvailableSlot, getItemData, getTargetInventory, isSlotWithItem } from '../helpers';
import { validateMove } from '../thunks/validateItems';
import { store } from '../store';
import { DragSource, DropTarget, InventoryType, SlotWithItem } from '../typings';
import { moveSlots, stackSlots, swapSlots } from '../store/inventory';
import { Items } from '../store/items';
import { altDragActive } from './dragModifiers';
import { fetchNui } from '../utils/fetchNui';

export const onDrop = async (source: DragSource, target?: DropTarget) => {
  const { inventory: state } = store.getState();

  const { sourceInventory, targetInventory } = getTargetInventory(state, source.inventory, target?.inventory);

  const sourceSlot = sourceInventory.items[source.item.slot - 1] as SlotWithItem;

  let sourceData = Items[sourceSlot.name];

  if (sourceData === undefined) {
    console.warn(`${sourceSlot.name} item data not loaded, fetching...`);
    sourceData = await getItemData(sourceSlot.name);

    if (!sourceData) {
      return console.error(`${sourceSlot.name} item data undefined and could not be fetched!`);
    }
  }

  // If dragging from container slot
  if (sourceSlot.metadata?.container !== undefined) {
    // Prevent storing container in container
    if (targetInventory.type === InventoryType.CONTAINER)
      return console.log(`Cannot store container ${sourceSlot.name} inside another container`);

    // Prevent dragging of container slot when opened
    if (state.rightInventory.id === sourceSlot.metadata.container)
      return console.log(`Cannot move container ${sourceSlot.name} when opened`);
  }

  const targetSlot = target
    ? targetInventory.items[target.item.slot - 1]
    : findAvailableSlot(sourceSlot, sourceData, targetInventory.items);

  if (targetSlot === undefined) {
    fetchNui('cannotCarry', {}).catch(() => {});
    return;
  }

  // If dropping on container slot when opened
  if (targetSlot.metadata?.container !== undefined && state.rightInventory.id === targetSlot.metadata.container)
    return console.log(`Cannot swap item ${sourceSlot.name} with container ${targetSlot.name} when opened`);

  const canSplit = sourceSlot.count > 1 && sourceInventory.type !== 'shop';
  const count =
    altDragActive && canSplit
      ? Math.floor(sourceSlot.count / 2)
      : state.splitAmount > 0 && state.splitAmount < sourceSlot.count
      ? state.splitAmount
      : state.shiftPressed && canSplit
      ? Math.floor(sourceSlot.count / 2)
      : sourceSlot.count;

  const data = {
    fromSlot: sourceSlot,
    toSlot: targetSlot,
    fromType: sourceInventory.type,
    toType: targetInventory.type,
    count: count,
  };

  store.dispatch(
    validateMove({
      ...data,
      fromSlot: sourceSlot.slot,
      toSlot: targetSlot.slot,
    })
  );

  isSlotWithItem(targetSlot, true)
    ? sourceData.stack && canStack(sourceSlot, targetSlot)
      ? store.dispatch(
          stackSlots({
            ...data,
            toSlot: targetSlot,
          })
        )
      : store.dispatch(
          swapSlots({
            ...data,
            toSlot: targetSlot,
          })
        )
    : store.dispatch(moveSlots(data));
};
