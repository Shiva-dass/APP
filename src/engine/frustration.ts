import { RageState } from '../types';

export const INITIAL_RAGE_STATE: RageState = {
  rageLevel: 0,
  interactionsSurvived: 0,
  buttonsIgnored: 0,
  fakeErrorsEncountered: 0,
  navigationMistakes: 0,
};

export interface RageStage {
  min: number;
  max: number;
  label: string;
  tagline: string;
}

export const RAGE_STAGES: RageStage[] = [
  { min: 0, max: 20, label: 'ZEN', tagline: "You're doing great." },
  { min: 20, max: 40, label: 'SKEPTICAL', tagline: 'Minor inconvenience.' },
  { min: 40, max: 60, label: 'IRRITATED', tagline: 'Patience detected.' },
  { min: 60, max: 80, label: 'SEETHING', tagline: 'Are you sure you want to continue?' },
  { min: 80, max: 95, label: 'BOILING', tagline: 'Questionable life choices.' },
  { min: 95, max: 99, label: 'CRITICAL', tagline: 'Almost there.' },
  { min: 100, max: 100, label: 'TRANSCENDENT', tagline: 'CONGRATULATIONS. YOU HAVE BEEN SUCCESSFULLY FRUSTRATED.' },
];

export function getRageStage(level: number): RageStage {
  const clamped = Math.max(0, Math.min(100, level));
  return RAGE_STAGES.find((s) => clamped >= s.min && clamped <= s.max) || RAGE_STAGES[0];
}
