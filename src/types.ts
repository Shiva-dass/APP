export type PageId = 
  | 'dashboard' 
  | 'analytics' 
  | 'projects' 
  | 'messages' 
  | 'settings' 
  | 'profile' 
  | 'help';

export interface RageState {
  rageLevel: number;
  interactionsSurvived: number;
  buttonsIgnored: number;
  fakeErrorsEncountered: number;
  navigationMistakes: number;
}

export interface AntiUXConfig {
  annoyanceLevel: number; // 1 to 10
  cursorInversion: boolean;
  cursorInvertX: boolean;
  cursorInvertY: boolean;
  cursorDelay: number; // ms
  cursorDrift: boolean;
  targetAvoidance: boolean;
  targetAttraction: boolean;
  buttonMovement: boolean;
  fakeSuccess: boolean;
  fakeLoading: boolean;
  navigationSabotage: boolean;
  normalMode: boolean; // Emergency accessibility mode
  soundEnabled: boolean;
}

export interface ToastItem {
  id: string;
  title?: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  timestamp?: number;
}

export interface ProjectItem {
  id: string;
  title: string;
  status: 'In Progress' | 'Blocked' | 'Pending Review' | 'Cancelled';
  progress: number;
  dueDate: string;
}

export interface MessageItem {
  id: string;
  sender: string;
  avatar: string;
  preview: string;
  time: string;
  unread: boolean;
}

export interface TableRowItem {
  id: string;
  name: string;
  status: 'Active' | 'Pending' | 'Suspended' | 'Archived';
  progress: number;
  lastUpdated: string;
}
