import React, { RefObject, useEffect, useRef } from 'react';
import { DragLayerMonitor, useDragLayer, XYCoord } from 'react-dnd';
import { DragSource } from '../../typings';
import { fetchNui } from '../../utils/fetchNui';
import { store } from '../../store';

interface DragLayerProps {
  data: DragSource;
  currentOffset: XYCoord | null;
  isDragging: boolean;
}

const subtract = (a: XYCoord, b: XYCoord): XYCoord => {
  return {
    x: a.x - b.x,
    y: a.y - b.y,
  };
};

const calculateParentOffset = (monitor: DragLayerMonitor): XYCoord => {
  const client = monitor.getInitialClientOffset();
  const source = monitor.getInitialSourceClientOffset();
  if (client === null || source === null || client.x === undefined || client.y === undefined) {
    return { x: 0, y: 0 };
  }
  return subtract(client, source);
};

export const calculatePointerPosition = (monitor: DragLayerMonitor, childRef: RefObject<Element>): XYCoord | null => {
  const offset = monitor.getClientOffset();
  if (offset === null) {
    return null;
  }

  if (!childRef.current || !childRef.current.getBoundingClientRect) {
    return subtract(offset, calculateParentOffset(monitor));
  }

  const bb = childRef.current.getBoundingClientRect();
  const middle = { x: bb.width / 2, y: bb.height / 2 };
  return subtract(offset, middle);
};

const DragPreview: React.FC = () => {
  const element = useRef<HTMLDivElement>(null);

  const { data, isDragging, currentOffset } = useDragLayer<DragLayerProps>((monitor) => ({
    data: monitor.getItem(),
    currentOffset: calculatePointerPosition(monitor, element),
    isDragging: monitor.isDragging(),
  }));

  const offsetRef = useRef(currentOffset);
  offsetRef.current = currentOffset;

  useEffect(() => {
    if (!isDragging || !data) return;

    const dragData = { ...data };
    const targetRef = { serverId: 0 };

    fetchNui('startScreenPlayer');

    const interval = setInterval(async () => {
      if (offsetRef.current) {
        const serverId = await fetchNui<number>('getScreenPlayer', { x: offsetRef.current.x, y: offsetRef.current.y });
        targetRef.serverId = serverId || 0;
      }
    }, 100);

    return () => {
      clearInterval(interval);

      if (targetRef.serverId > 0 && dragData.item && dragData.inventory === 'player') {
        const { splitAmount, leftInventory } = store.getState().inventory;
        const sourceItem = leftInventory.items.find((i) => i.slot === dragData.item.slot);
        const itemCount = sourceItem && 'count' in sourceItem ? sourceItem.count : 1;
        const count = splitAmount > 0 ? splitAmount : itemCount;
        fetchNui('giveItemToScreenPlayer', { slot: dragData.item.slot, count });
      } else {
        fetchNui('clearScreenPlayer');
      }
    };
  }, [isDragging]);

  return (
    <>
      {isDragging && currentOffset && data.item && (
        <div
          className="item-drag-preview"
          ref={element}
          style={{
            transform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`,
            backgroundImage: data.image,
          }}
        />
      )}
    </>
  );
};

export default DragPreview;
