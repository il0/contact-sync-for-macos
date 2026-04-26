import React from 'react';
import { Users, Cloud, Globe, Settings, CheckCircle2 } from 'lucide-react';
import { AppState } from '../types';

interface SidebarProps {
  state: AppState;
  onConnectGoogle: () => void;
  onConnectFacebook: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ state, onConnectGoogle, onConnectFacebook }) => {
  return (
    <div className="w-64 bg-mac-sidebar border-r border-mac-border flex flex-col h-full select-none">
      <div className="p-4">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Library</h2>
        <ul className="space-y-1">
          <li>
            <button className="w-full flex items-center space-x-2 px-2 py-1.5 bg-mac-active text-white rounded-md text-sm font-medium">
              <Users size={16} />
              <span>All Contacts</span>
            </button>
          </li>
        </ul>
      </div>

      <div className="p-4 pt-0">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Sources</h2>
        <ul className="space-y-2">
          <li>
            <div className="flex items-center justify-between px-2 py-1.5 rounded-md text-sm text-mac-text hover:bg-gray-200 transition-colors">
              <div className="flex items-center space-x-2">
                <Cloud size={16} className={state.isGoogleConnected ? "text-blue-500" : "text-gray-400"} />
                <span>Google Contacts</span>
              </div>
              {state.isGoogleConnected ? (
                <CheckCircle2 size={14} className="text-green-500" />
              ) : (
                <button onClick={onConnectGoogle} className="text-xs bg-white border border-gray-300 rounded px-2 py-0.5 hover:bg-gray-50">
                  Connect
                </button>
              )}
            </div>
          </li>
          <li>
            <div className="flex items-center justify-between px-2 py-1.5 rounded-md text-sm text-mac-text hover:bg-gray-200 transition-colors">
              <div className="flex items-center space-x-2">
                <Globe size={16} className={state.isFacebookConnected ? "text-blue-600" : "text-gray-400"} />
                <span>Facebook</span>
              </div>
              {state.isFacebookConnected ? (
                <CheckCircle2 size={14} className="text-green-500" />
              ) : (
                <button onClick={onConnectFacebook} className="text-xs bg-white border border-gray-300 rounded px-2 py-0.5 hover:bg-gray-50">
                  Connect
                </button>
              )}
            </div>
          </li>
        </ul>
      </div>

      <div className="mt-auto p-4 border-t border-mac-border">
         <button className="w-full flex items-center space-x-2 px-2 py-1.5 text-sm text-gray-600 hover:bg-gray-200 rounded-md transition-colors">
            <Settings size={16} />
            <span>Preferences...</span>
          </button>
      </div>
    </div>
  );
};
