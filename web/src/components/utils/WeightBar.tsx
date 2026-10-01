import React, { useMemo } from 'react';

interface WeightBarProps {
  percent: number;
  current?: number;
  max?: number;
  durability?: boolean;
}

const WeightBar: React.FC<WeightBarProps> = ({ percent, current, max, durability }) => {
  const weightClass = useMemo(() => {
    if (durability) return '';
    if (percent <= 60) return 'normal';
    if (percent <= 85) return 'warning';
    return 'critical';
  }, [percent, durability]);

  if (durability) {
    const getDurabilityColorVar = (p: number) => {
      if (p < 30) return 'var(--theme-durability-low)';
      if (p < 70) return 'var(--theme-durability-medium)';
      return 'var(--theme-durability-high)';
    };

    const color = getDurabilityColorVar(percent);
    const filledSquares = Math.ceil((percent / 100) * 8);

    return (
      <div className="absolute bottom-[4px] left-0 right-0 flex justify-center gap-[2px] pointer-events-none">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="w-[6px] h-[6px] rounded-[1px] transition-all duration-300"
            style={{
              backgroundColor: index < filledSquares ? color : 'var(--theme-durability-bg)',
              border: '1px solid var(--theme-durability-border)',
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="weight-bar-container">
      <div className="weight-bar">
        <div
          className={`weight-bar-fill ${weightClass}`}
          style={{ width: `${Math.min(percent, 100)}%` }}
        />
      </div>
    </div>
  );
};

export default WeightBar;
