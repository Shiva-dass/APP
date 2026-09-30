import React, { useState } from 'react';
import { 
  FolderKanban, 
  CheckSquare, 
  MessageSquare, 
  Activity,
  Download,
  Trash2,
  Save,
  ArrowRight
} from 'lucide-react';
import { useAntiUX } from '../hooks/useAntiUX';
import { FakeButton } from '../components/FakeButton';
import { FakeModal } from '../components/FakeModal';
import { FakeTable } from '../components/FakeTable';
import { FakeForm } from '../components/FakeForm';
import { playSound } from '../utils/audio';

export const Dashboard: React.FC = () => {
  const { config, rageState, navigate, recordInteraction, addToast } = useAntiUX();

  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Review quarterly EBITDA regression', done: false },
    { id: 2, text: 'Calibrate non-existent neural weights', done: true },
    { id: 3, text: 'Apologize to customers for cursor acceleration', done: false },
  ]);

  const handleDownloadFake = () => {
    playSound('beep');
    setDownloadProgress(0);

    const steps = [25, 50, 85, 100];
    steps.forEach((p, idx) => {
      setTimeout(() => {
        setDownloadProgress(p);
        if (p === 100) {
          setTimeout(() => {
            setDownloadProgress(null);
            recordInteraction('button_ignored', 7);
            addToast('Download complete. (Zero bytes transmitted)', 'success');
          }, 800);
        }
      }, (idx + 1) * 400);
    });
  };

  const handleToggleTask = (id: number) => {
    playSound('click');
    if (config.normalMode) {
      setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
      return;
    }
    // Clicking one task toggles a different task! (Section 14)
    const targetId = id === 1 ? 3 : 1;
    setTasks(tasks.map(t => t.id === targetId ? { ...t, done: !t.done } : t));
    recordInteraction('general', 4);
    addToast('Task state synchronized with adjacent colleague.', 'info');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Welcome Banner (Section 34) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 to-slate-850 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            Welcome back, Sarah.
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
              ALL NOMINAL
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Synergy vectors and organizational friction indexes are streaming within target tolerances.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Download Button (Section 6) */}
          <button
            onClick={handleDownloadFake}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{downloadProgress !== null ? `Preparing... ${downloadProgress}%` : 'Download Report'}</span>
          </button>

          {/* Delete Button with Confirmation (Section 6) */}
          <button
            onClick={() => setDeleteModalOpen(true)}
            className="px-3 py-2 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Purge Cluster</span>
          </button>

          {/* Save Changes Button (Section 6) */}
          <FakeButton
            evasive
            variant="primary"
            fakeSuccessMessage="Changes saved! (Not persisted)"
            mutationText="Discard Changes"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Changes</span>
          </FakeButton>
        </div>
      </div>

      {/* 4 Cards: Projects, Tasks, Messages, Performance (Section 34) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Projects Card */}
        <div 
          onClick={() => navigate('projects')}
          className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-lg cursor-pointer hover:border-slate-700 transition-all"
        >
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Active Projects</span>
            <FolderKanban className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold font-mono tracking-tight text-white mt-2">
            0 Initiatives
          </div>
          <div className="text-[11px] text-slate-500 mt-2">
            Click to observe creation paradox
          </div>
        </div>

        {/* Tasks Card */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Pending Action Items</span>
            <CheckSquare className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono tracking-tight text-white mt-2">
            3 Unruly Items
          </div>
          <div className="text-[11px] text-slate-500 mt-2">
            Checkboxes toggle other checkboxes
          </div>
        </div>

        {/* Messages Card */}
        <div 
          onClick={() => navigate('messages')}
          className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-lg cursor-pointer hover:border-slate-700 transition-all"
        >
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Unread Dispatches</span>
            <MessageSquare className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono tracking-tight text-white mt-2">
            1 Urgent
          </div>
          <div className="text-[11px] text-slate-500 mt-2">
            From Kevin (staging deletion)
          </div>
        </div>

        {/* Performance / Rage Index Card */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Current Rage Index</span>
            <Activity className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-bold font-mono tracking-tight text-rose-400 mt-2">
            {Math.round(rageState.rageLevel)}%
          </div>
          <div className="text-[11px] text-slate-500 mt-2">
            Survived: {rageState.interactionsSurvived} interactions
          </div>
        </div>

      </div>

      {/* Interactive Task List */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-white">Daily Operational Checkpoints</h2>
            <p className="text-xs text-slate-400">Clicking tasks may influence adjacent responsibilities.</p>
          </div>
          {/* Next Button returns user to same screen (Section 6) */}
          <FakeButton
            variant="secondary"
            fakeSuccessMessage="Page advance simulated. Welcome back to Page 1."
            onClick={() => recordInteraction('general', 4)}
          >
            <span>Next Page</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </FakeButton>
        </div>

        <div className="divide-y divide-slate-800">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => handleToggleTask(task.id)}
              className="py-3 flex items-center justify-between cursor-pointer hover:bg-slate-800/40 px-2 rounded-lg transition-colors text-xs"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.done}
                  readOnly
                  className="rounded bg-slate-950 border-slate-700 text-indigo-500 pointer-events-none"
                />
                <span className={`text-slate-200 ${task.done ? 'line-through text-slate-500' : ''}`}>
                  {task.text}
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">ID: #{task.id}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 20. Fake Data Table (Section 20) */}
      <FakeTable />

      {/* 8. Fake Form System (Section 8) */}
      <FakeForm />

      {/* Fake Modal for Delete (Section 6 & 15) */}
      <FakeModal
        isOpen={deleteModalOpen}
        title="Confirm Irreversible Cluster Purge"
        description="Are you absolutely confident you want to delete all 14,000 corporate records? This action cannot be revoked."
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          setDeleteModalOpen(false);
          recordInteraction('button_ignored', 8);
          addToast('Deleted successfully. (Item remains undisturbed)', 'success');
        }}
      />

    </div>
  );
};
