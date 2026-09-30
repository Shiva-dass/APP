import React from 'react';
import { HelpCircle, Terminal } from 'lucide-react';
import { useAntiUX } from '../hooks/useAntiUX';

export const Help: React.FC = () => {
  const { recordInteraction, addToast } = useAntiUX();

  const handleHelpClick = () => {
    recordInteraction('general', 5);
    addToast("Help center status: All agents are busy ignoring you.", 'error');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-white">Knowledge Center &amp; Guidance</h1>
        <p className="text-xs text-slate-400 mt-1">Frequently unasked questions and troubleshooting axioms.</p>
      </div>

      <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6 text-xs">
        
        <div className="p-5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 flex items-start gap-3.5">
          <HelpCircle className="w-5 h-5 flex-shrink-0 text-indigo-400 mt-0.5" />
          <div className="space-y-1">
            <h3 className="font-bold text-sm text-white">You're going to need it.</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              If your buttons are running away, your cursor is drifting, or your checkboxes are unchecking each other, this is operating strictly according to RFC-9021 Specifications.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-bold text-white text-xs uppercase tracking-wider">Common Inquiries</h4>
          
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1 cursor-pointer" onClick={handleHelpClick}>
            <div className="font-semibold text-slate-200">Q: Why did my Save button say "Saved!" but didn't save?</div>
            <p className="text-[11px] text-slate-400">A: The intention to save is philosophically more meaningful than the technical persistence of data.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1 cursor-pointer" onClick={handleHelpClick}>
            <div className="font-semibold text-slate-200">Q: How do I disable the chaos?</div>
            <p className="text-[11px] text-slate-400">
              A: Use the emergency accessibility toggle <span className="text-emerald-400 font-mono font-bold">Ctrl + Shift + N</span> or click "Make this UI normal" in the bottom corner.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[10px] text-slate-500 flex items-center justify-between">
          <span className="flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5" /> Status: Unassisted</span>
          <span>Build: v0.9.9-rc (hostile)</span>
        </div>

      </div>
    </div>
  );
};
