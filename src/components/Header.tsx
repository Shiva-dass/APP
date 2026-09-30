import React, { useState } from 'react';
import { Search, Sun, ChevronDown, Volume2, VolumeX } from 'lucide-react';
import { useAntiUX } from '../hooks/useAntiUX';
import { FakeNotifications } from './FakeNotifications';
import { setAudioEnabled } from '../utils/audio';
import { getRageStage } from '../engine/frustration';

export const Header: React.FC = () => {
  const { config, rageState, navigate, recordInteraction, addToast, updateConfig } = useAntiUX();
  const [searchVal, setSearchVal] = useState('');
  const [showSearchDrop, setShowSearchDrop] = useState(false);
  const [showProfileDrop, setShowProfileDrop] = useState(false);

  const stage = getRageStage(rageState.rageLevel);

  // Irrelevant Search Results (Section 9: "BMW" -> "How to boil water", "Random invoice", "Banana statistics", "404 document")
  const searchResultsMap: { [key: string]: string[] } = {
    default: [
      'How to boil water',
      'Random invoice #98124',
      'Banana statistics across Latin America',
      '404 document: Philosophy of click regret',
    ],
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSearchDrop(true);
    recordInteraction('general', 3);
  };

  const handleSoundToggle = () => {
    const nextSound = !config.soundEnabled;
    updateConfig({ soundEnabled: nextSound });
    setAudioEnabled(nextSound);
    addToast(nextSound ? 'Audio feedback enabled.' : 'Audio feedback muted.', 'info');
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 lg:px-6 h-16 flex items-center justify-between gap-4">
      
      {/* Brand Title (Section 1 & 34) */}
      <div className="flex items-center gap-3 flex-shrink-0 cursor-pointer" onClick={() => navigate('dashboard')}>
        <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-black text-lg">
          ?
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm tracking-tight text-white">WHY WOULD YOU BUILD THIS?</span>
            <span className="px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded">
              v0.9.9-rc
            </span>
          </div>
          <p className="text-[11px] text-slate-400 hidden sm:block">An intentionally terrible user experience</p>
        </div>
      </div>

      {/* 9. FAKE SEARCH BAR */}
      <div className="flex-1 max-w-md relative hidden md:block">
        <form onSubmit={handleSearchSubmit} className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchVal}
            onChange={(e) => {
              setSearchVal(e.target.value);
              setShowSearchDrop(e.target.value.length > 0);
            }}
            placeholder="Search projects, messages, analytics... (⌘K)"
            className="w-full bg-slate-800/80 border border-slate-700/60 rounded-lg pl-9 pr-14 py-1.5 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-sans"
          />
          <kbd className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono bg-slate-900 border border-slate-700 text-slate-400 px-1.5 py-0.5 rounded pointer-events-none">
            ⌘K
          </kbd>
        </form>

        {/* Irrelevant Results Dropdown (Section 9) */}
        {showSearchDrop && (
          <div className="absolute left-0 right-0 top-full mt-1.5 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl p-2 z-50 text-xs">
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">
              Top Results (Completely Irrelevant)
            </div>
            <div className="space-y-0.5">
              {searchResultsMap.default.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setSearchVal('');
                    setShowSearchDrop(false);
                    recordInteraction('general', 4);
                    addToast(`Result '${item}' dismissed.`, 'info');
                  }}
                  className="px-2 py-1.5 rounded hover:bg-slate-800 text-slate-300 cursor-pointer flex items-center justify-between"
                >
                  <span>{item}</span>
                  <span className="text-[9px] text-slate-500 font-mono">irrelevant</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-3">
        
        {/* Sound Toggle (Section 29: Default Sound OFF) */}
        <button
          onClick={handleSoundToggle}
          className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-colors ${
            config.soundEnabled
              ? 'bg-indigo-600/20 border-indigo-500/40 text-indigo-400'
              : 'bg-slate-800/80 border-slate-700/60 text-slate-400 hover:text-slate-200'
          }`}
          title={config.soundEnabled ? 'Mute Sounds' : 'Enable Audio Feedback'}
        >
          {config.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* 17. Rage Meter Badge */}
        <div className="hidden lg:flex items-center gap-2.5 bg-slate-800/90 border border-slate-700 px-3 py-1.5 rounded-lg shadow-inner">
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-mono tracking-wider font-semibold text-slate-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              RAGE
            </span>
            <span className="text-xs font-mono font-bold text-rose-400">
              {Math.round(rageState.rageLevel)}% ({stage.label})
            </span>
          </div>
          <div className="w-20 h-2 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-600 rounded-full transition-all duration-300"
              style={{ width: `${rageState.rageLevel}%` }}
            />
          </div>
        </div>

        {/* 21. Fake Notifications */}
        <FakeNotifications />

        {/* Deceptive Theme Toggle */}
        <button
          onClick={() => {
            recordInteraction('fake_error', 6);
            addToast('Theme Flash Error: Light mode blocked by ocular indemnity policy.', 'error');
          }}
          className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-amber-400 transition-colors"
          title="Toggle Theme"
        >
          <Sun className="w-4 h-4" />
        </button>

        {/* Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setShowProfileDrop(!showProfileDrop)}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-all"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-violet-500 to-rose-500 p-0.5">
              <img
                className="w-full h-full rounded-full object-cover"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces"
                alt="Avatar"
              />
            </div>
            <span className="text-xs font-medium text-slate-200 hidden sm:inline">Sarah Chen</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showProfileDrop && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-1.5 z-50 text-xs">
              <div className="px-3 py-2 border-b border-slate-800 mb-1">
                <div className="font-medium text-slate-200">Sarah Chen</div>
                <div className="text-[11px] text-slate-400 truncate">sarah.chen@enterprise-holdings.corp</div>
              </div>
              <button
                onClick={() => {
                  setShowProfileDrop(false);
                  navigate('profile');
                }}
                className="w-full text-left px-3 py-1.5 rounded-lg text-slate-300 hover:bg-slate-800"
              >
                Profile Settings
              </button>
              <button
                onClick={() => {
                  setShowProfileDrop(false);
                  navigate('settings');
                }}
                className="w-full text-left px-3 py-1.5 rounded-lg text-slate-300 hover:bg-slate-800"
              >
                System Parameters
              </button>
            </div>
          )}
        </div>

      </div>

    </header>
  );
};
