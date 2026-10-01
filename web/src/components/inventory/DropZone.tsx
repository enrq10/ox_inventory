import React from 'react';
import { useDrop } from 'react-dnd';
import { DragSource } from '../../typings';
import { Locale } from '../../store/locale';

interface DropZoneProps {
  onDrop?: (item: DragSource) => void;
}

const DropZone: React.FC<DropZoneProps> = ({ onDrop }) => {
  const [{ isOver }, drop] = useDrop<DragSource, void, { isOver: boolean }>({
    accept: 'SLOT',
    drop: (source: DragSource) => {
      if (onDrop) onDrop(source);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className="flex flex-col h-[76px] items-center justify-center overflow-clip rounded-[15px] w-full transition-all duration-200"
      style={{
        backgroundColor: isOver ? 'var(--theme-dropzone-bg-hover)' : 'var(--theme-dropzone-bg)',
        transform: isOver ? 'scale(1.05)' : 'scale(1)',
      }}
    >
      <div className="flex items-center justify-center px-[5px] py-[2px] rounded-[5px]">
        <p className="font-main text-[17px] italic leading-normal" style={{ color: 'var(--theme-dropzone-text)' }}>
          {Locale.ui_drag_to_drop || 'DRAG ITEMS HERE TO DROP IT'}
        </p>
      </div>
    </div>
  );
};

export default DropZone;
