import React, { useEffect, useState } from 'react';
import { useAntiUX } from '../hooks/useAntiUX';
import { useFakeLoading } from '../hooks/useFakeLoading';

export const Analytics: React.FC = () => {
  const { config, recordInteraction } = useAntiUX();
  const { isLoading, progress, statusText, startFakeLoading } = useFakeLoading();
  const [infiniteDots, setInfiniteDots] = useState('');

  useEffect(() => {
    if (!config.normalMode) {
      startFakeLoading('Compiling Neural Telemetry');
      recordInteraction('general', 4);
    }
  }, [config.normalMode, startFakeLoading, recordInteraction]);

  useEffect(() => {
    const interval = setInterval(() => {
      setInfiniteDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-white">Aggregated Intelligence &amp; Analytics</h1>
        <p className="text-xs text-slate-400 mt-1">Multi-variant cohort telemetry streaming in real time.</p>
      </div>

      <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col items-center justify-center min-h-[380px] text-center space-y-4">
        {isLoading || !config.normalMode ? (
          <>
            <div className="w-12 h-12 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
            <div className="space-y-1">
              <div className="text-sm font-semibold text-white">
                {statusText || `Calculating infinite convergence${infiniteDots}`}
              </div>
              <div className="text-xs text-slate-400 font-mono">
                Progress: {progress}% (Estimated remaining: NaN hours)
              </div>
            </div>
            <div className="w-64 h-2 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </>
        ) : (
          <div className="text-emerald-400 text-sm font-semibold">
            Normal Mode: Analytics rendered successfully (14,280 queries served).
          </div>
        )}
      </div>
    </div>
  );
};
