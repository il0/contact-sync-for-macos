import React from 'react';
import { Contact } from '../types';
import { ContactRow } from './ContactRow';

interface PreviewTableProps {
  contacts: Contact[];
  onToggleSelect: (id: string) => void;
  onToggleAll: (selected: boolean) => void;
}

export const PreviewTable: React.FC<PreviewTableProps> = ({ contacts, onToggleSelect, onToggleAll }) => {
  const syncableContacts = contacts.filter(c => c.proposedPhoto !== null && c.proposedPhoto !== c.currentPhoto && c.status === 'pending');
  const allSelected = syncableContacts.length > 0 && syncableContacts.every(c => c.selected);
  const someSelected = syncableContacts.some(c => c.selected) && !allSelected;

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Table Header */}
      <div className="flex items-center p-2 border-b border-gray-200 bg-gray-50/80 backdrop-blur text-xs font-semibold text-gray-500 uppercase tracking-wider sticky top-0 z-10">
        <div className="w-10 flex justify-center shrink-0">
          <input
            type="checkbox"
            checked={allSelected}
            ref={(input: HTMLInputElement | null) => {
              if (input) input.indeterminate = someSelected;
            }}
            onChange={(e) => onToggleAll(e.target.checked)}
            disabled={syncableContacts.length === 0}
            className="w-4 h-4 rounded border-gray-300 text-mac-active focus:ring-mac-active disabled:opacity-50"
          />
        </div>
        <div className="w-48 shrink-0 px-1">Contact</div>
        <div className="w-24 text-center shrink-0">Current</div>
        <div className="w-12 shrink-0"></div>
        <div className="w-24 text-center shrink-0">New Photo</div>
        <div className="flex-1 text-right pr-4">Status</div>
      </div>

      {/* Table Body */}
      <div className="flex-1 overflow-y-auto">
        {contacts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4">
            <p>No contacts found.</p>
            <p className="text-sm">Connect a source to find photos.</p>
          </div>
        ) : (
          contacts.map(contact => (
            <ContactRow
              key={contact.id}
              contact={contact}
              onToggleSelect={onToggleSelect}
            />
          ))
        )}
      </div>
    </div>
  );
};
