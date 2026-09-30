import React from 'react';
import { useAntiUX } from '../hooks/useAntiUX';
import { getRageStage } from '../engine/frustration';

export const RageMeter: React.FC = () => {
  const { rageState } = useAntiUX();
  const stage = getRageStage(rageState.rageLevel);

  return (
    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-3 text-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
          <span className="font-bold text-white tracking-wide">RAGE METER</span>
        </div>
        <span className="font-mono font-bold text-rose-400 text-sm">
          {Math.round(rageState.rageLevel)}%
        </span>
      </div>

      {/* Progress Track */}
      <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-600 rounded-full transition-all duration-300"
          style={{ width: `${rageState.rageLevel}%` }}
        />
      </div>

      {/* Stage Tagline */}
      <div className="text-[11px] font-medium text-slate-300 italic">
        "{stage.tagline}"
      </div>

      {/* Frustration Counters (Section 18) */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 font-mono text-[10px] text-slate-400">
        <div>
          Survived: <span className="text-white font-bold">{rageState.interactionsSurvived}</span>
        </div>
        <div>
          Ignored: <span className="text-amber-400 font-bold">{rageState.buttonsIgnored}</span>
        </div>
        <div>
          Fake Errors: <span className="text-rose-400 font-bold">{rageState.fakeErrorsEncountered}</span>
        </div>
        <div>
          Nav Mistakes: <span className="text-indigo-400 font-bold">{rageState.navigationMistakes}</span>
        </div>
      </div>
    </div>
  );
};
