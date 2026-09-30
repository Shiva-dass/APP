import React, { useState } from 'react';
import { useAntiUX } from '../hooks/useAntiUX';
import { calculateSliderDivergence } from '../engine/sabotage';
import { playSound } from '../utils/audio';

interface FakeSliderProps {
  label: string;
  defaultValue?: number;
  unit?: string;
}

export const FakeSlider: React.FC<FakeSliderProps> = ({
  label,
  defaultValue = 50,
  unit = '%',
}) => {
  const { config, recordInteraction } = useAntiUX();
  const [visualVal, setVisualVal] = useState(defaultValue);

  const displayedVal = calculateSliderDivergence(visualVal, config.normalMode);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = parseInt(e.target.value, 10);
    setVisualVal(raw);
    if (Math.random() < 0.25) {
      playSound('thud');
      recordInteraction('general', 2);
    }
  };

  return (
    <div className="space-y-1 text-xs">
      <div className="flex justify-between items-center">
        <label className="font-semibold text-slate-300">{label}</label>
        <span className="font-mono font-bold text-indigo-400">
          {displayedVal}
          {unit}
        </span>
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={visualVal}
        onChange={handleChange}
        className="w-full accent-indigo-500 bg-slate-800"
      />
      {!config.normalMode && (
        <div className="flex justify-between text-[10px] text-slate-500">
          <span>Actual: {visualVal}%</span>
          <span>Consensus: {displayedVal}%</span>
        </div>
      )}
    </div>
  );
};
