import React from 'react';
import { motion } from 'framer-motion';
import HealthIcon from '../utils/icons/HealthIcon';
import HungerIcon from '../utils/icons/HungerIcon';
import ArmorIcon from '../utils/icons/ArmorIcon';
import ThirstIcon from '../utils/icons/ThirstIcon';

interface HUDBarProps {
  icon: React.ReactNode;
  percentage: number;
  colorVar: string;
}

const HUDBar: React.FC<HUDBarProps> = ({ icon, percentage, colorVar }) => {
  return (
    <motion.div
      className="flex gap-[5px] items-center overflow-clip px-[8px] py-[6px] rounded-[10px] flex-1"
      style={{ backgroundColor: 'var(--theme-hud-container-bg)' }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="shrink-0">{icon}</div>

      <p
        className="font-main text-[13px] leading-normal shrink-0 min-w-[35px]"
        style={{ color: colorVar, fontWeight: 900 }}
      >
        {Math.round(percentage)}%
      </p>

      <div className="flex-1 relative h-[10px] min-w-[60px]">
        <div className="absolute inset-0 rounded-[8px]" style={{ backgroundColor: 'var(--theme-hud-bar-bg)' }} />
        <motion.div
          className="absolute top-0 left-0 h-full rounded-[8px]"
          style={{ backgroundColor: colorVar }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
};

interface InventoryHUDProps {
  health?: number;
  armor?: number;
  hunger?: number;
  thirst?: number;
}

const InventoryHUD: React.FC<InventoryHUDProps> = ({
  health = 100,
  armor = 0,
  hunger = 100,
  thirst = 100,
}) => {
  return (
    <div className="flex flex-row gap-[6px] w-full">
      <HUDBar icon={<HealthIcon />} percentage={health} colorVar="var(--theme-hud-health)" />
      <HUDBar icon={<ArmorIcon />}  percentage={armor}  colorVar="var(--theme-hud-armor)" />
      <HUDBar icon={<HungerIcon />} percentage={hunger} colorVar="var(--theme-hud-hunger)" />
      <HUDBar icon={<ThirstIcon />} percentage={thirst} colorVar="var(--theme-hud-thirst)" />
    </div>
  );
};

export default InventoryHUD;
