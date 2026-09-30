import React from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  FolderKanban, 
  MessageSquare, 
  Sliders, 
  UserCircle, 
  HelpCircle,
  ArrowUpDown 
} from 'lucide-react';
import { PageId } from '../types';
import { useAntiUX } from '../hooks/useAntiUX';

export const Sidebar: React.FC = () => {
  const { currentPage, navigate, recordInteraction } = useAntiUX();

  const navItems: { id: PageId; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects', icon: <FolderKanban className="w-4 h-4" /> },
    { id: 'messages', label: 'Messages', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Sliders className="w-4 h-4" /> },
    { id: 'profile', label: 'Profile', icon: <UserCircle className="w-4 h-4" /> },
    { id: 'help', label: 'Help', icon: <HelpCircle className="w-4 h-4" /> },
  ];

  return (
    <aside className="w-60 bg-slate-900/95 border-r border-slate-800 flex flex-col justify-between p-3 flex-shrink-0">
      
      <div className="space-y-6">
        {/* Workspace Swapper */}
        <div className="px-2 py-2 rounded-lg bg-slate-800/60 border border-slate-700/50 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded bg-indigo-500 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
              W
            </div>
            <div className="truncate">
              <div className="font-semibold text-xs text-white truncate">Acme Universal Corp</div>
              <div className="text-[10px] text-slate-400 truncate">Enterprise Synergy Tier</div>
            </div>
          </div>
          <button 
            onClick={() => recordInteraction('nav_mistake', 5)}
            className="text-slate-400 hover:text-white p-1"
            title="Swap Workspace"
          >
            <ArrowUpDown className="w-3 h-3" />
          </button>
        </div>

        {/* Navigation Items (Sections 10 & 34) */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'text-indigo-300 bg-indigo-500/10 border border-indigo-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-transparent'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Cluster Health Box */}
      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] space-y-2">
        <div className="flex items-center justify-between text-slate-400">
          <span>Cluster Health</span>
          <span className="text-emerald-400 font-mono">99.98%</span>
        </div>
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div className="w-5/6 h-full bg-emerald-500" />
        </div>
        <div className="text-[10px] text-slate-500 text-center">
          Ctrl+Shift+N for Normal Mode
        </div>
      </div>

    </aside>
  );
};
