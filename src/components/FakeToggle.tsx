import React, { useState } from 'react';
import { useAntiUX } from '../hooks/useAntiUX';
import { playSound } from '../utils/audio';

interface FakeToggleProps {
  label: string;
  description?: string;
  defaultChecked?: boolean;
  ignoredMessage?: string;
  onChange?: (checked: boolean) => void;
}

export const FakeToggle: React.FC<FakeToggleProps> = ({
  label,
  description,
  defaultChecked = false,
  ignoredMessage = 'Setting successfully ignored.',
  onChange,
}) => {
  const { config, recordInteraction, addToast } = useAntiUX();
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const handleToggle = () => {
    playSound('click');
    const nextState = !isChecked;
    setIsChecked(nextState);

    if (config.normalMode) {
      if (onChange) onChange(nextState);
      return;
    }

    // Visually changes, but pops toast stating it was ignored (Section 12)
    recordInteraction('general', 4);
    addToast(ignoredMessage, 'info');
  };

  return (
    <div className="flex items-center justify-between py-2 border-b border-slate-800 text-xs">
      <div>
        <div className="font-semibold text-slate-200">{label}</div>
        {description && <div className="text-slate-400 text-[11px]">{description}</div>}
      </div>

      <button
        type="button"
        onClick={handleToggle}
        className={`w-11 h-6 rounded-full p-1 transition-colors relative flex items-center ${
          isChecked ? 'bg-indigo-600 justify-end' : 'bg-slate-800'
        }`}
      >
        <div className={`w-4 h-4 rounded-full transition-transform ${isChecked ? 'bg-white' : 'bg-slate-400'}`} />
      </button>
    </div>
  );
};
