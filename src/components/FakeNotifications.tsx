import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { useAntiUX } from '../hooks/useAntiUX';
import { playSound } from '../utils/audio';

export const FakeNotifications: React.FC = () => {
  const { config, recordInteraction } = useAntiUX();
  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState(1);
  const [messages, setMessages] = useState<string[]>([
    'Your cursor moved too aggressively at 14:02:11.',
  ]);

  const toggleOpen = () => {
    playSound('beep');
    const nextOpen = !isOpen;
    setIsOpen(nextOpen);

    if (!config.normalMode && nextOpen) {
      // Opening increases unread count! (Section 21)
      const newCount = count + 1;
      setCount(newCount);
      setMessages((prev) => [
        `System update: You have ${newCount} unread notifications now.`,
        ...prev,
      ]);
      recordInteraction('general', 4);
    }
  };

  const handleClearAll = () => {
    playSound('buzzer');
    if (config.normalMode) {
      setCount(0);
      setMessages([]);
      return;
    }

    // Never allows count to reach zero (Section 21)
    const escalated = count + 2;
    setCount(escalated);
    setMessages((prev) => [
      `Attempted clearance rejected: ${escalated} notifications spawned.`,
      ...prev,
    ]);
    recordInteraction('button_ignored', 8);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleOpen}
        className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-slate-300 relative"
      >
        <Bell className="w-4 h-4" />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-mono font-bold flex items-center justify-center ring-2 ring-slate-900">
            {count}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50 text-xs">
          <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between bg-slate-850">
            <span className="font-semibold text-white">Unsolicited Alerts ({count})</span>
            <button
              onClick={handleClearAll}
              className="text-[11px] text-indigo-400 hover:text-indigo-300"
            >
              Clear all
            </button>
          </div>
          <div className="divide-y divide-slate-800 max-h-60 overflow-y-auto">
            {messages.map((m, i) => (
              <div key={i} className="p-3 hover:bg-slate-800/50 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1 flex-shrink-0" />
                <span className="text-slate-300 text-[11px] leading-snug">{m}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
