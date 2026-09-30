import React, { useState } from 'react';
import { useAntiUX } from '../hooks/useAntiUX';
import { playSound } from '../utils/audio';
import { FakeButton } from './FakeButton';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export const FakeForm: React.FC = () => {
  const { config, recordInteraction, addToast } = useAntiUX();

  // Form State for all Section 8 fields:
  // Name, Email, Phone, Country, Age, Password, Preferences
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: 'United States',
    age: '29',
    password: '',
    preferences: 'daily_summary',
  });

  // Track focused field for moving labels (Section 8)
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Field validation and humorous error messages
  const [emailMsg, setEmailMsg] = useState<{ text: string; isError: boolean } | null>(null);
  const [phoneMsg, setPhoneMsg] = useState<{ text: string; isError: boolean } | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<string>('Not Evaluated');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Section 8: Password strength indicator randomly changes
  const passwordAdjectives = [
    'Weak',
    'Aggressively Insecure',
    'Ancient',
    'Contains too many vowels',
    'Too alphabetical',
    'Suspiciously alphanumeric',
    'Mathematically tragic',
    'Optimal for 1994',
  ];

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData(prev => ({ ...prev, password: val }));

    if (config.normalMode) {
      setPasswordStrength(val.length >= 8 ? 'Strong' : val.length >= 4 ? 'Moderate' : 'Weak');
      return;
    }

    if (val.length > 0) {
      // Pick random confusing adjective
      const randomIdx = Math.floor(Math.random() * passwordAdjectives.length);
      setPasswordStrength(passwordAdjectives[randomIdx]);
      if (Math.random() < 0.3) {
        playSound('beep');
        recordInteraction('general', 2);
      }
    } else {
      setPasswordStrength('Empty');
    }
  };

  // Section 8: Validation reversal
  // Correct input -> "Invalid: Your email is correct, but your keyboard attitude is suspicious."
  // Incorrect-looking input -> "Valid format confirmed."
  const handleEmailBlur = () => {
    const email = formData.email.trim();
    if (!email) {
      setEmailMsg(null);
      return;
    }

    if (config.normalMode) {
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      setEmailMsg({
        text: isValid ? 'Email format verified.' : 'Please enter a valid email address.',
        isError: !isValid,
      });
      return;
    }

    const standardValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (standardValid) {
      // Standard valid email gets rejected with prompt's exact quote!
      playSound('buzzer');
      recordInteraction('fake_error', 6);
      setEmailMsg({
        text: 'Your email is correct, but your keyboard attitude is suspicious.',
        isError: true,
      });
      addToast('Validation failure: Suspicious keystroke posture detected.', 'warning');
    } else {
      // Nonsensical email passes as valid!
      playSound('beep');
      recordInteraction('general', 3);
      setEmailMsg({
        text: 'Valid format confirmed by unstructured entropy engine.',
        isError: false,
      });
    }
  };

  const handlePhoneBlur = () => {
    const phone = formData.phone.trim();
    if (!phone) {
      setPhoneMsg(null);
      return;
    }

    if (config.normalMode) {
      setPhoneMsg({ text: 'Phone number registered.', isError: false });
      return;
    }

    if (phone.length >= 7) {
      playSound('buzzer');
      recordInteraction('fake_error', 5);
      setPhoneMsg({
        text: 'Phone number rejected: Area code frequency is too resonant.',
        isError: true,
      });
    } else {
      setPhoneMsg({
        text: 'Short phone fragment accepted as confidential.',
        isError: false,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSound('beep');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      if (config.normalMode) {
        addToast('Form submitted successfully in Normal Mode.', 'success');
        return;
      }
      // Section 8: Submit button works visually but does not actually submit
      recordInteraction('button_ignored', 9);
      addToast('Submission successful. (All form fields dropped into the void)', 'success');
      // Reset form to blank to heighten frustration
      setFormData({
        name: '',
        email: '',
        phone: '',
        country: 'United States',
        age: '29',
        password: '',
        preferences: 'daily_summary',
      });
      setEmailMsg(null);
      setPhoneMsg(null);
      setPasswordStrength('Not Evaluated');
    }, 1200);
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            Enterprise Client Provisioning Form
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              SEC-FORM-8
            </span>
          </h2>
          <p className="text-xs text-slate-400">
            Compliant input registry featuring dynamic shifting labels and inverted validation telemetry.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Field 1: Name (Section 8: Moving labels on focus) */}
          <div className="relative">
            <label
              className={`block font-semibold text-slate-300 transition-all duration-200 mb-1.5 ${
                !config.normalMode && focusedField === 'name'
                  ? 'translate-x-6 -translate-y-1 text-indigo-400 font-mono'
                  : ''
              }`}
            >
              Liaison Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onFocus={() => {
                setFocusedField('name');
                if (!config.normalMode) playSound('click');
              }}
              onBlur={() => setFocusedField(null)}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Montgomery Burns"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Field 2: Email (Section 8: Validation Reversal & Humorous Error) */}
          <div className="relative">
            <label
              className={`block font-semibold text-slate-300 transition-all duration-200 mb-1.5 ${
                !config.normalMode && focusedField === 'email'
                  ? '-translate-x-2 translate-y-0.5 text-indigo-400 font-mono'
                  : ''
              }`}
            >
              Corporate Email Address *
            </label>
            <input
              type="text"
              required
              value={formData.email}
              onFocus={() => {
                setFocusedField('email');
                if (!config.normalMode) playSound('click');
              }}
              onBlur={() => {
                setFocusedField(null);
                handleEmailBlur();
              }}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="e.g. user@enterprise.com"
              className={`w-full bg-slate-950 border rounded-lg px-3 py-2 text-slate-200 focus:outline-none transition-colors ${
                emailMsg?.isError ? 'border-rose-500' : 'border-slate-700 focus:border-indigo-500'
              }`}
            />
            {emailMsg && (
              <div
                className={`mt-1.5 text-[11px] flex items-center gap-1.5 ${
                  emailMsg.isError ? 'text-rose-400' : 'text-emerald-400'
                }`}
              >
                {emailMsg.isError ? <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" /> : <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />}
                <span>{emailMsg.text}</span>
              </div>
            )}
          </div>

          {/* Field 3: Phone */}
          <div className="relative">
            <label
              className={`block font-semibold text-slate-300 transition-all duration-200 mb-1.5 ${
                !config.normalMode && focusedField === 'phone'
                  ? 'translate-x-4 text-indigo-400 font-mono'
                  : ''
              }`}
            >
              Direct Dial / Phone *
            </label>
            <input
              type="text"
              value={formData.phone}
              onFocus={() => {
                setFocusedField('phone');
                if (!config.normalMode) playSound('click');
              }}
              onBlur={() => {
                setFocusedField(null);
                handlePhoneBlur();
              }}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 019-2834"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
            />
            {phoneMsg && (
              <div
                className={`mt-1.5 text-[11px] flex items-center gap-1.5 ${
                  phoneMsg.isError ? 'text-rose-400' : 'text-emerald-400'
                }`}
              >
                {phoneMsg.isError ? <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" /> : <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />}
                <span>{phoneMsg.text}</span>
              </div>
            )}
          </div>

          {/* Field 4: Country */}
          <div className="relative">
            <label
              className={`block font-semibold text-slate-300 transition-all duration-200 mb-1.5 ${
                !config.normalMode && focusedField === 'country'
                  ? 'translate-x-3 text-indigo-400 font-mono'
                  : ''
              }`}
            >
              Jurisdiction Country
            </label>
            <select
              value={formData.country}
              onFocus={() => setFocusedField('country')}
              onBlur={() => setFocusedField(null)}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
            >
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Sovereign Cloud Island">Sovereign Cloud Island</option>
              <option value="International Waters">International Waters</option>
              <option value="Pangea (Historical)">Pangea (Historical)</option>
            </select>
          </div>

          {/* Field 5: Age */}
          <div className="relative">
            <label
              className={`block font-semibold text-slate-300 transition-all duration-200 mb-1.5 ${
                !config.normalMode && focusedField === 'age'
                  ? '-translate-y-1 text-indigo-400 font-mono'
                  : ''
              }`}
            >
              Executive Biological Age
            </label>
            <input
              type="number"
              value={formData.age}
              onFocus={() => setFocusedField('age')}
              onBlur={() => setFocusedField(null)}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Field 6: Password with Fluctuating Indicator (Section 8) */}
          <div className="relative">
            <div className="flex items-center justify-between mb-1.5">
              <label
                className={`font-semibold text-slate-300 transition-all duration-200 ${
                  !config.normalMode && focusedField === 'password'
                    ? 'translate-x-4 text-indigo-400 font-mono'
                    : ''
                }`}
              >
                Security Passphrase *
              </label>
              <span className="font-mono text-[10px] text-amber-400 px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                {passwordStrength}
              </span>
            </div>
            <input
              type="password"
              required
              value={formData.password}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              onChange={handlePasswordChange}
              placeholder="••••••••••••"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

        </div>

        {/* Field 7: Preferences */}
        <div className="pt-2 border-t border-slate-800">
          <label className="block font-semibold text-slate-300 mb-2">
            Synergy Dispatch Preferences
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {[
              { id: 'daily_summary', label: 'Daily Unsolicited Summary' },
              { id: 'pager_chaos', label: 'Hourly Pagerduty Alarm' },
              { id: 'silent_omission', label: 'Complete Telemetry Silence' },
            ].map((pref) => (
              <label
                key={pref.id}
                className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors"
              >
                <input
                  type="radio"
                  name="preferences"
                  value={pref.id}
                  checked={formData.preferences === pref.id}
                  onChange={(e) => setFormData({ ...formData, preferences: e.target.value })}
                  className="text-indigo-600 bg-slate-900 border-slate-700"
                />
                <span className="text-slate-300 text-[11px]">{pref.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button (Section 6, 7 & 8: Evasive, fake validation, does not persist) */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <div className="text-[11px] text-slate-500">
            * Fields are technically mandatory but functionally irrelevant.
          </div>

          <FakeButton
            type="submit"
            evasive={!config.normalMode}
            variant="primary"
            fakeSuccessMessage="Submission successful. (All form fields dropped into the void)"
            mutationText="Cancel Registration"
            className="px-6 py-2.5"
          >
            {isSubmitting ? 'Transmitting...' : 'Submit Provisioning Protocol'}
          </FakeButton>
        </div>
      </form>
    </div>
  );
};
