import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import { useAntiUX } from '../hooks/useAntiUX';
import { FakeButton } from '../components/FakeButton';
import { playSound } from '../utils/audio';

export const Profile: React.FC = () => {
  const { config, recordInteraction, addToast } = useAntiUX();

  const [name, setName] = useState('Sarah Chen');
  const [email, setEmail] = useState('sarah.chen@enterprise-holdings.corp');
  const [bio, setBio] = useState('Executive VP of Tactical Synergy & Cross-Functional Bottlenecks.');
  const [isSaving, setIsSaving] = useState(false);

  const spacesCount = (bio.match(/ /g) || []).length;
  const nonSpaces = bio.length - spacesCount;
  const weightedLength = nonSpaces + spacesCount * 15;

  const handleAvatarClick = () => {
    playSound('buzzer');
    recordInteraction('fake_error', 6);
    addToast('Avatar Upload Failed: Image aspect ratio must be divisible by 13.', 'error');
  };

  const handleSave = () => {
    setIsSaving(true);
    playSound('click');

    setTimeout(() => {
      setIsSaving(false);
      if (config.normalMode) {
        addToast('Profile saved in Normal Mode.', 'success');
      } else {
        // Randomly restores one previous value! (Section 22)
        setName('Sarah Chen (Reverted)');
        recordInteraction('button_ignored', 7);
        addToast('Profile updated successfully (1 field reverted to maintain corporate compliance).', 'success');
      }
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-white">User Persona &amp; Identity Profile</h1>
        <p className="text-xs text-slate-400 mt-1">Manage corporate identity vectors and biometric authentication parameters.</p>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6 text-xs">
        
        {/* Avatar Dropzone */}
        <div>
          <label className="block font-semibold text-slate-300 mb-2">Corporate Profile Photograph</label>
          <div
            onClick={handleAvatarClick}
            className="border-2 border-dashed border-slate-700 hover:border-indigo-500/60 rounded-2xl p-6 text-center bg-slate-950/60 cursor-pointer transition-colors"
          >
            <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-2 text-slate-400">
              <Camera className="w-6 h-6" />
            </div>
            <div className="font-medium text-slate-300">Click or Drag Image to Upload</div>
            <div className="text-[11px] text-slate-500 mt-1">Dimensions must be strictly divisible by 13 (PNG / WebP).</div>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-300 mb-1.5">Official Full Legal Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-300 mb-1.5">Primary Enterprise Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Bio with 15x Space Penalty */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="font-semibold text-slate-300">Executive Bio</label>
            <span className={`text-[10px] font-mono ${weightedLength > 140 ? 'text-rose-400 font-bold' : 'text-slate-400'}`}>
              {weightedLength} / 140 chars (Spaces cost 15 chars)
            </span>
          </div>
          <textarea
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-slate-200 focus:outline-none focus:border-indigo-500 font-sans"
          />
        </div>

        {/* Save Profile Button */}
        <div className="flex justify-end pt-3 border-t border-slate-800">
          <FakeButton
            evasive
            variant="primary"
            onClick={handleSave}
            mutationText="Discard Profile"
          >
            {isSaving ? 'Synchronizing...' : 'Save Profile Changes'}
          </FakeButton>
        </div>

      </div>
    </div>
  );
};
