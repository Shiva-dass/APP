import React, { useState } from 'react';
import { FolderPlus, AlertCircle } from 'lucide-react';
import { useAntiUX } from '../hooks/useAntiUX';
import { FakeButton } from '../components/FakeButton';

export const Projects: React.FC = () => {
  const { config, recordInteraction, addToast } = useAntiUX();
  const [clickedMessage, setClickedMessage] = useState(false);

  const handleCreate = () => {
    if (config.normalMode) {
      addToast('Project created in Normal Mode.', 'success');
      return;
    }
    setClickedMessage(true);
    recordInteraction('button_ignored', 8);
    addToast('Creation failed: Button was clicked too directly.', 'error');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-white">Project Portfolios</h1>
        <p className="text-xs text-slate-400 mt-1">Cross-functional roadmap initiatives.</p>
      </div>

      <div className="p-12 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col items-center justify-center min-h-[340px] text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400">
          <FolderPlus className="w-7 h-7" />
        </div>

        <div className="space-y-1 max-w-sm">
          <h3 className="text-sm font-bold text-white">No projects found.</h3>
          <p className="text-xs text-slate-400">
            {clickedMessage
              ? 'Project creation is currently unavailable because you successfully clicked the button.'
              : 'There are currently zero active initiatives registered in this workspace.'}
          </p>
        </div>

        {clickedMessage && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300 flex items-center gap-2 max-w-md">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>Anti-UX Violation: Intentional paradox engaged.</span>
          </div>
        )}

        <FakeButton
          evasive
          mutationText="Do Not Click"
          onClick={handleCreate}
          className="mt-2"
        >
          Create Project
        </FakeButton>
      </div>
    </div>
  );
};
