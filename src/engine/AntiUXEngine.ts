import { AntiUXConfig, PageId, RageState, ToastItem } from '../types';
import { INITIAL_RAGE_STATE } from './frustration';
import { sabotageNavigation } from './sabotage';
import { playSound } from '../utils/audio';

type Listener = () => void;

class AntiUXEngineService {
  private config: AntiUXConfig = {
    annoyanceLevel: 1, // Progresses 1-10
    cursorInversion: false,
    cursorInvertX: false,
    cursorInvertY: false,
    cursorDelay: 250,
    cursorDrift: true,
    targetAvoidance: true,
    targetAttraction: true,
    buttonMovement: true,
    fakeSuccess: true,
    fakeLoading: true,
    navigationSabotage: true,
    normalMode: false,
    soundEnabled: false,
  };

  private rageState: RageState = { ...INITIAL_RAGE_STATE };
  private toasts: ToastItem[] = [];
  private currentPage: PageId = 'dashboard';
  private listeners: Set<Listener> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      // Global emergency shortcut Ctrl + Shift + N for Normal Mode (Section 24)
      window.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && (e.key === 'N' || e.key === 'n')) {
          this.toggleNormalMode();
        }
      });
    }
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  public getConfig(): AntiUXConfig {
    return { ...this.config };
  }

  public getRageState(): RageState {
    return { ...this.rageState };
  }

  public getCurrentPage(): PageId {
    return this.currentPage;
  }

  public getToasts(): ToastItem[] {
    return [...this.toasts];
  }

  public setConfig(updates: Partial<AntiUXConfig>) {
    this.config = { ...this.config, ...updates };
    this.notify();
  }

  public toggleNormalMode() {
    this.config.normalMode = !this.config.normalMode;
    if (this.config.normalMode) {
      playSound('success');
      this.addToast('Normal Mode Activated. UX sanity restored.', 'success');
    } else {
      playSound('buzzer');
      this.addToast('Anti-UX Mode Restored. Prepare for turbulence.', 'warning');
    }
    this.notify();
  }

  public recordInteraction(type: 'button_ignored' | 'fake_error' | 'nav_mistake' | 'general', rageDelta = 3) {
    this.rageState.interactionsSurvived++;

    if (type === 'button_ignored') {
      this.rageState.buttonsIgnored++;
      playSound('thud');
    } else if (type === 'fake_error') {
      this.rageState.fakeErrorsEncountered++;
      playSound('buzzer');
    } else if (type === 'nav_mistake') {
      this.rageState.navigationMistakes++;
      playSound('beep');
    }

    if (!this.config.normalMode) {
      this.increaseRage(rageDelta);
    }
    this.notify();
  }

  public increaseRage(delta: number) {
    if (this.config.normalMode) return;

    this.rageState.rageLevel = Math.min(100, this.rageState.rageLevel + delta);

    // Progressive Annoyance Escalation (Section 26: Levels 1-10)
    const newAnnoyance = Math.min(10, Math.max(1, Math.ceil(this.rageState.rageLevel / 10)));
    if (newAnnoyance !== this.config.annoyanceLevel) {
      this.config.annoyanceLevel = newAnnoyance;
      if (newAnnoyance >= 5) {
        this.config.cursorInversion = true;
      }
    }

    // Reset loop at 100% (Section 17)
    if (this.rageState.rageLevel >= 100) {
      playSound('buzzer');
      this.addToast('CONGRATULATIONS. YOU HAVE BEEN SUCCESSFULLY FRUSTRATED.', 'error');
      setTimeout(() => {
        this.rageState.rageLevel = 20; // Resets to ~20%
        this.notify();
      }, 4000);
    }

    this.notify();
  }

  public navigate(requested: PageId) {
    this.recordInteraction('general', 2);
    const { destination, sabotaged, note } = sabotageNavigation(
      requested,
      this.config.annoyanceLevel,
      this.config.normalMode
    );

    this.currentPage = destination;

    if (sabotaged) {
      this.recordInteraction('nav_mistake', 5);
      if (note) this.addToast(note, 'warning');
    }

    this.notify();
  }

  public addToast(message: string, type: 'info' | 'warning' | 'error' | 'success' = 'info') {
    const newToast: ToastItem = {
      id: Math.random().toString(36).substring(2, 9),
      message,
      type,
      timestamp: Date.now(),
    };
    // Keep max 4 toasts
    this.toasts = [...this.toasts.slice(-3), newToast];
    this.notify();

    setTimeout(() => {
      this.dismissToast(newToast.id);
    }, 4500);
  }

  public dismissToast(id: string) {
    this.toasts = this.toasts.filter((t) => t.id !== id);
    this.notify();
  }
}

export const AntiUX = new AntiUXEngineService();
