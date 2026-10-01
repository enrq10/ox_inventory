import React from 'react';
import { motion } from 'framer-motion';
import cornerDecorPurple from '../../assets/icons/corner-decor-purple.svg';
import cornerDecorGray from '../../assets/icons/corner-decor-gray.svg';

interface ActionButtonsProps {
  onActionButton1?: () => void;
  onActionButton2?: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onActionButton1, onActionButton2 }) => {
  return (
    <div className="flex gap-[20px] items-start w-full">
      {/* ACTION BUTTON 1 */}
      <motion.button
        onClick={onActionButton1}
        className="flex gap-[10px] items-center justify-center min-h-px min-w-px overflow-clip px-[15px] py-[10px] rounded-[10px] relative transition-all duration-200 w-[272px]"
        style={{ backgroundColor: 'var(--theme-accent-base)' }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <p className="font-main text-[20px] italic leading-normal" style={{ color: 'var(--theme-text-on-accent)' }}>
          ACTION BUTTON 1
        </p>
        <div className="flex flex-col items-center justify-center px-[7px] py-[2px] rounded-[7px]" style={{ backgroundColor: 'var(--theme-text-on-accent)' }}>
          <p className="font-main text-[17px] leading-normal whitespace-pre-wrap" style={{ color: 'var(--theme-accent-base)' }}>
            F1
          </p>
        </div>

        {/* Corner decorations */}
        <img src={cornerDecorPurple} alt="" className="absolute left-[3px] top-[3px] w-[13px] h-[13px]" />
        <img src={cornerDecorPurple} alt="" className="absolute right-[2.5px] bottom-[3px] w-[13px] h-[13px] rotate-180" />
      </motion.button>

      {/* ACTION BUTTON 2 */}
      <motion.button
        onClick={onActionButton2}
        className="flex gap-[10px] items-center justify-center min-h-px min-w-px overflow-clip px-[15px] py-[10px] rounded-[10px] relative transition-all duration-200 w-[272px]"
        style={{ backgroundColor: 'var(--theme-accent-light)' }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <p className="font-main text-[20px] italic leading-normal" style={{ color: 'var(--theme-accent-base)' }}>
          ACTION BUTTON 2
        </p>
        <div className="flex flex-col items-center justify-center px-[7px] py-[2px] rounded-[7px]" style={{ backgroundColor: 'var(--theme-accent-light)' }}>
          <p className="font-main text-[17px] leading-normal whitespace-pre-wrap" style={{ color: 'var(--theme-accent-base)' }}>
            F2
          </p>
        </div>

        {/* Corner decorations */}
        <img src={cornerDecorGray} alt="" className="absolute left-[3px] top-[3px] w-[13px] h-[13px]" />
        <img src={cornerDecorGray} alt="" className="absolute right-[2.5px] bottom-[3px] w-[13px] h-[13px] rotate-180" />
      </motion.button>
    </div>
  );
};

export default ActionButtons;
