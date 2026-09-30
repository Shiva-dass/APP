import React from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { FakeCursor } from './components/FakeCursor';
import { ToastSystem } from './components/ToastSystem';
import { RageMeter } from './components/RageMeter';
import { NormalModeIndicator } from './components/NormalModeIndicator';

// Pages
import { Dashboard } from './pages/Dashboard';
import { Analytics } from './pages/Analytics';
import { Projects } from './pages/Projects';
import { Messages } from './pages/Messages';
import { Settings } from './pages/Settings';
import { Profile } from './pages/Profile';
import { Help } from './pages/Help';

import { useAntiUX } from './hooks/useAntiUX';

export const App: React.FC = () => {
  const { currentPage, toasts, dismissToast } = useAntiUX();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none antialiased overflow-x-hidden relative">
      {/* 5. Custom Visual Cursor Layer */}
      <FakeCursor />

      {/* 1. Header (Sections 1, 9, 21, 29, 34) */}
      <Header />

      <div className="flex-1 flex overflow-hidden">
        {/* 2. Sidebar Navigation (Sections 10 & 34) */}
        <Sidebar />

        {/* 3. Main Viewport Rendering All 7 Pages */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 bg-slate-950 relative">
          {currentPage === 'dashboard' && <Dashboard />}
          {currentPage === 'analytics' && <Analytics />}
          {currentPage === 'projects' && <Projects />}
          {currentPage === 'messages' && <Messages />}
          {currentPage === 'settings' && <Settings />}
          {currentPage === 'profile' && <Profile />}
          {currentPage === 'help' && <Help />}
        </main>
      </div>

      {/* Floating Inconvenient Toast System (Section 19) */}
      <ToastSystem toasts={toasts} onDismiss={dismissToast} />

      {/* Bottom Floating Control Deck: Rage Meter + Normal Mode Indicator (Section 24 & 34) */}
      <div className="fixed bottom-4 left-4 z-40 flex items-center gap-3">
        <NormalModeIndicator />
      </div>

      <div className="fixed bottom-4 right-4 z-40 hidden md:block max-w-xs">
        <RageMeter />
      </div>
    </div>
  );
};

export default App;
