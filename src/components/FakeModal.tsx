import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { useAntiUX } from '../hooks/useAntiUX';
import { playSound } from '../utils/audio';

interface FakeModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  onClose: () => void;
  onConfirm: () => void;
}

export const FakeModal: React.FC<FakeModalProps> = ({
  isOpen,
  title,
  description,
  onClose,
  onConfirm,
}) => {
  const { config, recordInteraction } = useAntiUX();
  const [swapped, setSwapped] = useState(false);
  const [closeBtnOffset, setCloseBtnOffset] = useState({ x: 0, y: 0 });

  if (!isOpen) return null;

  const handleCloseHover = () => {
    if (config.normalMode) return;
    // Close button moves slightly (Section 15)
    setCloseBtnOffset({
      x: (Math.random() - 0.5) * 30,
      y: (Math.random() - 0.5) * 30,
    });
    recordInteraction('button_ignored', 4);
  };

  const handleBtnHover = () => {
    if (config.normalMode) return;
    // Occasionally switch buttons after hover (Section 15)
    if (Math.random() < 0.4) {
      setSwapped((prev) => !prev);
      playSound('dodge');
      recordInteraction('button_ignored', 5);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      {/* Slightly off-center margin in Anti-UX mode (Section 15) */}
      <div
        className={`w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl relative space-y-4 ${
          !config.normalMode ? 'translate-x-3 -translate-y-2' : ''
        }`}
      >
        {/* Close Button with Dodge */}
        <button
          onClick={onClose}
          onMouseEnter={handleCloseHover}
          style={{
            transform: `translate(${closeBtnOffset.x}px, ${closeBtnOffset.y}px)`,
            transition: 'transform 0.15s ease',
          }}
          className="absolute top-3 right-3 text-slate-400 hover:text-white p-1 text-sm font-bold"
        >
          ✕
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">{title}</h3>
            <p className="text-xs text-slate-400">Confirmation dialogue</p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">{description}</p>

        {/* Buttons swapping positions (Section 15) */}
        <div
          onMouseEnter={handleBtnHover}
          className={`flex items-center gap-3 pt-3 ${swapped ? 'flex-row-reverse' : 'flex-row'}`}
        >
          <button
            onClick={() => {
              playSound('click');
              onConfirm();
            }}
            className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow"
          >
            Confirm
          </button>
          <button
            onClick={() => {
              playSound('click');
              onClose();
            }}
            className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg border border-slate-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
