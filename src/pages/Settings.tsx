import React, { useState } from 'react';
import { FakeToggle } from '../components/FakeToggle';
import { FakeDropdown } from '../components/FakeDropdown';
import { FakeSlider } from '../components/FakeSlider';
import { FakeButton } from '../components/FakeButton';
import { useAntiUX } from '../hooks/useAntiUX';
import { playSound } from '../utils/audio';

export const Settings: React.FC = () => {
  const { config, recordInteraction, addToast } = useAntiUX();
  const [isApplying, setIsApplying] = useState(false);

  const handleApply = () => {
    setIsApplying(true);
    playSound('beep');

    setTimeout(() => {
      setIsApplying(false);
      if (config.normalMode) {
        addToast('Settings persisted cleanly in Normal Mode.', 'success');
      } else {
        recordInteraction('button_ignored', 9);
        addToast('Settings applied, then immediately restored to factory immutable state.', 'warning');
      }
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-white">Platform Settings &amp; Parameters</h1>
        <p className="text-xs text-slate-400 mt-1">Configure telemetry cadence, accessibility, and visual preferences.</p>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6 text-xs">
        
        {/* Toggles */}
        <div className="space-y-2">
          <h3 className="font-semibold text-white uppercase text-[11px] tracking-wider text-slate-400">Security &amp; Storage</h3>
          <FakeToggle
            label="Dark Mode Enforcement"
            description="Permanently lock the interface into nocturnal photon emission mode."
            ignoredMessage="Dark mode successfully ignored."
          />
          <FakeToggle
            label="Automatic Cloud Backups"
            description="Continuously transmit system state to remote cold storage."
            ignoredMessage="Automatic backups successfully cancelled."
          />
          <FakeToggle
            label="Aggressive Mouse Acceleration"
            description="Modulate hardware DPI based on user hesitation."
            defaultChecked={true}
            ignoredMessage="Mouse acceleration set to unpredictable mode."
          />
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <FakeDropdown
            label="Interface Dialect"
            options={['English (Passive Aggressive)', 'Latin (Pig)', 'Ancient Mayan', 'Binary Strings']}
            defaultValue="English (Passive Aggressive)"
          />
          <FakeDropdown
            label="Notification Velocity"
            options={['Every 3 seconds', 'Continuous stream', 'Whenever CPU fans sigh']}
            defaultValue="Every 3 seconds"
          />
        </div>

        {/* Sliders */}
        <div className="pt-2 space-y-4">
          <FakeSlider label="System Friction Coefficient" defaultValue={75} />
          <FakeSlider label="Haptic Hostility Density" defaultValue={88} />
        </div>

        {/* Apply Settings Button */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <FakeButton
            evasive
            variant="primary"
            onClick={handleApply}
            mutationText="Revert Everything"
          >
            {isApplying ? 'Applying Settings...' : 'Apply Global Configuration'}
          </FakeButton>
        </div>

      </div>
    </div>
  );
};
