import React from 'react';
import { motion } from 'framer-motion';
import { fetchNui } from '../../utils/fetchNui';
import { Locale } from '../../store/locale';

const ClothingButtons: React.FC = () => {
  const handleRemoveAll = () => {
    fetchNui('removeAllClothes', {}).catch(() => {});
  };

  const handleWearAll = () => {
    fetchNui('wearAllClothes', {}).catch(() => {});
  };

  return (
    <div className="flex gap-[10px] w-full pt-4">
      {/* Remove All Clothes Button */}
      <motion.button
        onClick={handleRemoveAll}
        className="
          flex-1 h-[50px] flex items-center justify-center
          bg-[rgba(221,57,57,0.1)] rounded-[15px]
          transition-all duration-200
          hover:bg-[rgba(221,57,57,0.2)]
        "
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <p className="font-main text-[17px] text-[var(--theme-state-danger)] italic leading-normal">
          {Locale.ui_remove_all_clothes}
        </p>
      </motion.button>

      {/* Wear All Clothes Button */}
      <motion.button
        onClick={handleWearAll}
        className="
          flex-1 h-[50px] flex items-center justify-center
          bg-[rgba(108,59,255,0.1)] rounded-[15px]
          transition-all duration-200
          hover:bg-[rgba(108,59,255,0.2)]
        "
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <p className="font-main text-[17px] text-[var(--theme-accent-base)] italic leading-normal">
          {Locale.ui_wear_all_clothes}
        </p>
      </motion.button>
    </div>
  );
};

export default ClothingButtons;
