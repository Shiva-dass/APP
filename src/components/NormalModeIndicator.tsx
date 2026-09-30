import React from 'react';
import { ShieldCheck, ShieldAlert } from 'lucide-react';
import { useAntiUX } from '../hooks/useAntiUX';

export const NormalModeIndicator: React.FC = () => {
  const { config, toggleNormalMode } = useAntiUX();

  return (
    <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl shadow-lg text-xs">
      <button
        onClick={toggleNormalMode}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-semibold transition-all ${
          config.normalMode
            ? 'bg-emerald-600 text-white shadow-emerald-500/20 shadow-md'
            : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
        }`}
      >
        {config.normalMode ? <ShieldCheck className="w-3.5 h-3.5 text-white" /> : <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />}
        <span>{config.normalMode ? 'Normal Mode Active' : 'Make this UI normal'}</span>
      </button>

      <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">
        (or Ctrl+Shift+N)
      </span>
    </div>
  );
};
