import React from 'react';
import { ToastItem } from '../types';

interface ToastSystemProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

export const ToastSystem: React.FC<ToastSystemProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((t) => {
        let borderClass = 'border-indigo-500/40';
        if (t.type === 'warning') borderClass = 'border-amber-500/40 text-amber-300';
        if (t.type === 'error') borderClass = 'border-rose-500/40 text-rose-300';
        if (t.type === 'success') borderClass = 'border-emerald-500/40 text-emerald-300';

        return (
          <div
            key={t.id}
            className={`pointer-events-auto p-3 bg-slate-900 border rounded-xl shadow-2xl text-xs flex items-center justify-between gap-3 text-slate-200 animate-bounce duration-300 ${borderClass}`}
          >
            <span className="flex-1 font-medium">{t.message}</span>
            <button
              onClick={() => onDismiss(t.id)}
              className="text-slate-400 hover:text-white px-1 text-[10px]"
            >
              ✕
            </button>
          </div>
        );
      })}
    </div>
  );
};
