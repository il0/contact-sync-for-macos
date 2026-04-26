export type SyncSource = 'google' | 'facebook' | null;
export type SyncStatus = 'pending' | 'synced' | 'error';

export interface Contact {
  id: string;
  name: string;
  email: string;
  currentPhoto: string | null;
  proposedPhoto: string | null;
  source: SyncSource;
  status: SyncStatus;
  selected: boolean;
}

export interface AppState {
  contacts: Contact[];
  isGoogleConnected: boolean;
  isFacebookConnected: boolean;
  isSyncing: boolean;
  syncProgress: number;
}
