import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useAntiUX } from '../hooks/useAntiUX';
import { playSound } from '../utils/audio';

interface FakeDropdownProps {
  label: string;
  options: string[];
  defaultValue?: string;
  onChange?: (val: string) => void;
}

export const FakeDropdown: React.FC<FakeDropdownProps> = ({
  label,
  options,
  defaultValue,
  onChange,
}) => {
  const { config, recordInteraction } = useAntiUX();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(defaultValue || options[0] || 'Select Option');
  const [hoverOffsets, setHoverOffsets] = useState<{ [key: number]: number }>({});

  const toggleDropdown = () => {
    playSound('click');
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (opt: string) => {
    playSound('click');
    if (config.normalMode) {
      setSelectedLabel(opt);
      setIsOpen(false);
      if (onChange) onChange(opt);
      return;
    }

    // Anti-UX: Visually selects, but underlies arbitrary selection (Section 11)
    setSelectedLabel(opt);
    setIsOpen(false);
    recordInteraction('general', 4);
  };

  const handleOptionHover = (idx: number) => {
    if (config.normalMode) return;
    // Options slightly move when hovered (Section 11)
    setHoverOffsets((prev) => ({
      ...prev,
      [idx]: (prev[idx] || 0) + 12,
    }));
  };

  // Duplicate "None" injection if in anti-ux mode
  const displayOptions = config.normalMode
    ? options
    : ['None', ...options, 'None'];

  return (
    <div className="relative text-xs space-y-1">
      <label className="block font-semibold text-slate-300">{label}</label>

      <button
        type="button"
        onClick={toggleDropdown}
        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 flex items-center justify-between hover:border-slate-600 transition-colors"
      >
        <span>{selectedLabel}</span>
        {/* Opens upward intentionally (Section 11) */}
        {!config.normalMode ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
      </button>

      {isOpen && (
        <div
          className={`absolute left-0 right-0 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl p-1 z-50 space-y-0.5 ${
            !config.normalMode ? 'bottom-full mb-1' : 'top-full mt-1'
          }`}
        >
          {displayOptions.map((opt, idx) => (
            <div
              key={idx}
              onClick={() => handleSelect(opt)}
              onMouseEnter={() => handleOptionHover(idx)}
              style={{
                transform: `translateX(${hoverOffsets[idx] || 0}px)`,
                transition: 'transform 0.1s ease',
              }}
              className="px-3 py-1.5 rounded hover:bg-slate-800 text-slate-300 cursor-pointer select-none"
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
