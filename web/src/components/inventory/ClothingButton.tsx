import React from 'react';
import { motion } from 'framer-motion';
import { Shirt, ArrowLeft } from 'lucide-react';

interface ClothingButtonProps {
  isActive: boolean;
  onClick: () => void;
}

const ClothingButton: React.FC<ClothingButtonProps> = ({ isActive, onClick }) => {
  return (
    <motion.button
      className="flex items-center justify-center w-10 h-10 rounded-lg backdrop-blur-md border-2 transition-all duration-150 cursor-pointer"
      style={
        isActive
          ? {
              background: `linear-gradient(to bottom right, var(--theme-clothing-active-from), var(--theme-clothing-active-to))`,
              borderColor: 'var(--theme-clothing-active-border)',
              color: 'var(--theme-text-on-accent)',
            }
          : {
              backgroundColor: 'var(--theme-clothing-inactive-bg)',
              borderColor: 'var(--theme-clothing-inactive-border)',
              color: 'var(--theme-text-on-accent)',
            }
      }
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {isActive ? <ArrowLeft size={18} /> : <Shirt size={18} />}
    </motion.button>
  );
};

export default ClothingButton;
