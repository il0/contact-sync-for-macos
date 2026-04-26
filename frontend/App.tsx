import React, { useState, useCallback, useEffect } from 'react';
import { TitleBar } from './components/TitleBar';
import { Sidebar } from './components/Sidebar';
import { PreviewTable } from './components/PreviewTable';
import { AppState } from './types';
import { generateMockContacts } from './mockData';
import { RefreshCw } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    contacts: [],
    isGoogleConnected: false,
    isFacebookConnected: false,
    isSyncing: false,
    syncProgress: 0,
  });

  // Initialize with some local contacts that don't have proposed photos yet
  useEffect(() => {
    const initialContacts = generateMockContacts().map(c => ({
      ...c,
      proposedPhoto: null,
      source: null,
      selected: false
    }));
    setState(s => ({ ...s, contacts: initialContacts }));
  }, []);

  const handleConnectGoogle = useCallback(() => {
    // Simulate connecting and fetching data
    setState(s => ({ ...s, isGoogleConnected: true }));
    window.setTimeout(() => {
      setState(s => {
        const mockData = generateMockContacts();
        const updatedContacts = s.contacts.map(c => {
          const mockMatch = mockData.find(m => m.id === c.id && m.source === 'google');
          if (mockMatch) {
            return { ...c, proposedPhoto: mockMatch.proposedPhoto, source: 'google', selected: true };
          }
          return c;
        });
        return { ...s, contacts: updatedContacts };
      });
    }, 800);
  }, []);

  const handleConnectFacebook = useCallback(() => {
    // Simulate connecting and fetching data
    setState(s => ({ ...s, isFacebookConnected: true }));
    window.setTimeout(() => {
      setState(s => {
        const mockData = generateMockContacts();
        const updatedContacts = s.contacts.map(c => {
          // Only apply facebook if we don't already have a proposed photo, or if we want to override (simplified here)
          const mockMatch = mockData.find(m => m.id === c.id && m.source === 'facebook');
          if (mockMatch && !c.proposedPhoto) {
            return { ...c, proposedPhoto: mockMatch.proposedPhoto, source: 'facebook', selected: true };
          }
          return c;
        });
        return { ...s, contacts: updatedContacts };
      });
    }, 800);
  }, []);

  const handleToggleSelect = useCallback((id: string) => {
    setState(s => ({
      ...s,
      contacts: s.contacts.map(c => c.id === id ? { ...c, selected: !c.selected } : c)
    }));
  }, []);

  const handleToggleAll = useCallback((selected: boolean) => {
    setState(s => ({
      ...s,
      contacts: s.contacts.map(c => {
        const isSyncable = c.proposedPhoto !== null && c.proposedPhoto !== c.currentPhoto && c.status === 'pending';
        return isSyncable ? { ...c, selected } : c;
      })
    }));
  }, []);

  const handleSync = useCallback(() => {
    const contactsToSync = state.contacts.filter(c => c.selected && c.status === 'pending' && c.proposedPhoto);
    if (contactsToSync.length === 0) return;

    setState(s => ({ ...s, isSyncing: true, syncProgress: 0 }));

    // Simulate syncing process
    let syncedCount = 0;
    const total = contactsToSync.length;

    let syncInterval: number;
    syncInterval = window.setInterval(() => {
      syncedCount++;
      setState(s => ({ ...s, syncProgress: (syncedCount / total) * 100 }));

      if (syncedCount >= total) {
        window.clearInterval(syncInterval);
        window.setTimeout(() => {
          setState(s => ({
            ...s,
            isSyncing: false,
            syncProgress: 0,
            contacts: s.contacts.map(c => {
              if (c.selected && c.status === 'pending' && c.proposedPhoto) {
                return {
                  ...c,
                  currentPhoto: c.proposedPhoto,
                  status: 'synced',
                  selected: false
                };
              }
              return c;
            })
          }));
        }, 500);
      }
    }, 400); // Simulate time per contact
  }, [state.contacts]);

  const selectedCount = state.contacts.filter(c => c.selected && c.status === 'pending' && c.proposedPhoto).length;

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-xl overflow-hidden">
      <TitleBar />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          state={state} 
          onConnectGoogle={handleConnectGoogle} 
          onConnectFacebook={handleConnectFacebook} 
        />
        
        <div className="flex-1 flex flex-col relative">
          {/* Toolbar */}
          <div className="h-14 border-b border-gray-200 flex items-center justify-between px-4 bg-white shrink-0">
            <div className="text-sm text-gray-600">
              {state.contacts.length} Contacts
            </div>
            
            <button
              onClick={handleSync}
              disabled={selectedCount === 0 || state.isSyncing}
              className={`
                flex items-center px-4 py-1.5 rounded-md text-sm font-medium transition-all
                ${selectedCount > 0 && !state.isSyncing
                  ? 'bg-mac-active text-white shadow-sm hover:bg-blue-600' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
              `}
            >
              {state.isSyncing ? (
                <>
                  <RefreshCw size={16} className="animate-spin mr-2" />
                  Syncing...
                </>
              ) : (
                `Sync ${selectedCount > 0 ? selectedCount : ''} Photos`
              )}
            </button>
          </div>

          {/* Progress Bar */}
          {state.isSyncing && (
            <div className="absolute top-14 left-0 right-0 h-1 bg-gray-100 z-20">
              <div 
                className="h-full bg-mac-active transition-all duration-300 ease-out"
                style={{ width: `${state.syncProgress}%` }}
              />
            </div>
          )}

          <PreviewTable 
            contacts={state.contacts}
            onToggleSelect={handleToggleSelect}
            onToggleAll={handleToggleAll}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
