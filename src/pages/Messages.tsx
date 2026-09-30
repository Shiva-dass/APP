import React, { useState } from 'react';
import { Mail, Search } from 'lucide-react';
import { MessageItem } from '../types';
import { useAntiUX } from '../hooks/useAntiUX';
import { playSound } from '../utils/audio';

export const Messages: React.FC = () => {
  const { config, recordInteraction, addToast } = useAntiUX();
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: '1',
      sender: 'Kevin from DevOps',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop',
      preview: 'I just deleted the backup staging cluster. Do not panic.',
      time: '12m ago',
      unread: true,
    },
    {
      id: '2',
      sender: 'Legal Compliance Bot',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=80&h=80&fit=crop',
      preview: 'Section 42.9 reminder: Breathing near the server is taxable.',
      time: '2h ago',
      unread: false,
    },
    {
      id: '3',
      sender: 'VP of Ambiguity',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop',
      preview: 'Let us circle back on the synergy of the upcoming circle back.',
      time: 'Yesterday',
      unread: false,
    },
  ]);

  const [activeMessage, setActiveMessage] = useState<MessageItem | null>(messages[0]);

  const handleSelectMessage = (msg: MessageItem) => {
    playSound('click');
    if (!config.normalMode) {
      // Inverts read/unread status!
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, unread: !m.unread } : m))
      );
      recordInteraction('general', 3);
      addToast('Message read status inverted for compliance.', 'info');
    }
    setActiveMessage(msg);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-white">Direct Executive Dispatch</h1>
        <p className="text-xs text-slate-400 mt-1">High-priority internal communications.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[440px] rounded-2xl bg-slate-900 border border-slate-800 shadow-xl overflow-hidden text-xs">
        
        {/* Left: Message List */}
        <div className="border-r border-slate-800 flex flex-col">
          <div className="p-3 border-b border-slate-800">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Filter messages (unreliable)..."
                className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="divide-y divide-slate-800 flex-1 overflow-y-auto">
            {messages.map((m) => (
              <div
                key={m.id}
                onClick={() => handleSelectMessage(m)}
                className={`p-3.5 hover:bg-slate-800/60 cursor-pointer transition-colors flex items-start gap-3 ${
                  activeMessage?.id === m.id ? 'bg-slate-800/80' : ''
                }`}
              >
                <img src={m.avatar} alt="Avatar" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200 truncate">{m.sender}</span>
                    <span className="text-[10px] text-slate-500">{m.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">{m.preview}</p>
                </div>
                {m.unread && <span className="w-2 h-2 rounded-full bg-indigo-500 mt-1 flex-shrink-0" />}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Message Detail */}
        <div className="md:col-span-2 p-6 flex flex-col justify-between bg-slate-950/40">
          {activeMessage ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                <img src={activeMessage.avatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h3 className="text-sm font-bold text-white">{activeMessage.sender}</h3>
                  <span className="text-[10px] text-slate-400">Timestamp: {activeMessage.time}</span>
                </div>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">{activeMessage.preview}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-500">
              <Mail className="w-8 h-8 mb-2 opacity-40" />
              <span>Select a dispatch to read.</span>
            </div>
          )}

          <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-500">
            <span>End-to-end unencrypted</span>
            <span className="text-amber-400">Status: Read state unconfirmed</span>
          </div>
        </div>

      </div>
    </div>
  );
};
