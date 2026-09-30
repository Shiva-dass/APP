import { PageId } from '../types';
import { chance } from '../utils/random';

export interface FakeActionConfig {
  actionName: string;
  duration?: number;
  successMessage?: string;
  actuallyExecute?: boolean;
}

export function sabotageNavigation(target: PageId, annoyanceLevel: number, normalMode: boolean): { destination: PageId; sabotaged: boolean; note?: string } {
  if (normalMode || annoyanceLevel < 3) {
    return { destination: target, sabotaged: false };
  }

  // Navigation redirection map based on Section 10
  if (target === 'settings' && chance(0.45)) {
    return { destination: 'profile', sabotaged: true, note: "Redirected 'Settings' to 'Profile' for synergy alignment." };
  }
  if (target === 'profile' && chance(0.35)) {
    return { destination: 'dashboard', sabotaged: true, note: "Profile access deflected back to Dashboard." };
  }
  if (target === 'help') {
    return { destination: 'help', sabotaged: true, note: "You're going to need it." };
  }
  if (target === 'analytics' && chance(0.5)) {
    return { destination: 'analytics', sabotaged: true, note: "Infinite loading engaged on Analytics telemetry." };
  }

  return { destination: target, sabotaged: false };
}

export function calculateSliderDivergence(visualVal: number, normalMode: boolean): number {
  if (normalMode) return visualVal;
  // Disagrees with displayed value (Section 13)
  // E.g. visual 80% -> displays 23%
  const divergent = (100 - visualVal + 17) % 100;
  return divergent === 0 ? 42 : divergent;
}

export function validateFormAntiUx(field: string, val: string, normalMode: boolean): { isValid: boolean; message: string } {
  if (normalMode) {
    return { isValid: val.trim().length > 0, message: val.trim().length > 0 ? '' : 'Field is required.' };
  }

  // Humorous, unrelated, inverted validation rules (Section 8)
  if (field === 'email') {
    if (val.includes('@') && val.includes('.')) {
      // Looks valid, but rejected with humorous reason!
      return {
        isValid: false,
        message: 'Your email address is technically correct, but your keyboard typing cadence is suspicious.',
      };
    } else if (val.length > 0) {
      // Invalid format accepted!
      return {
        isValid: true,
        message: 'Valid. No standards detected.',
      };
    }
  }

  if (field === 'age') {
    const num = parseInt(val, 10);
    if (!isNaN(num) && num >= 18 && num <= 100) {
      return {
        isValid: false,
        message: 'Age rejected: We only accept prime numbers divisible by your zip code.',
      };
    }
  }

  if (field === 'password') {
    if (val.length < 8) {
      return { isValid: false, message: 'Password too brief. Must contain at least one hieroglyphic character.' };
    }
    return { isValid: true, message: 'Password accepted (storing in plaintext for faster lookup).' };
  }

  return { isValid: true, message: '' };
}
