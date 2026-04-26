import React from 'react';
import { Contact } from '../types';
import { ArrowRight, Cloud, Globe, CheckCircle2, XCircle } from 'lucide-react';

interface ContactRowProps {
  contact: Contact;
  onToggleSelect: (id: string) => void;
}

export const ContactRow: React.FC<ContactRowProps> = ({ contact, onToggleSelect }) => {
  const hasChanges = contact.proposedPhoto !== null && contact.proposedPhoto !== contact.currentPhoto;
  const isSyncable = hasChanges && contact.status === 'pending';

  return (
    <div className={`flex items-center p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors ${!isSyncable ? 'opacity-60' : ''}`}>
      {/* Checkbox */}
      <div className="w-10 flex justify-center shrink-0">
        <input
          type="checkbox"
          checked={contact.selected}
          onChange={() => onToggleSelect(contact.id)}
          disabled={!isSyncable}
          className="w-4 h-4 rounded border-gray-300 text-mac-active focus:ring-mac-active disabled:opacity-50"
        />
      </div>

      {/* Info */}
      <div className="w-48 shrink-0">
        <div className="font-medium text-sm text-gray-900 truncate">{contact.name}</div>
        <div className="text-xs text-gray-500 truncate">{contact.email}</div>
      </div>

      {/* Current Photo */}
      <div className="w-24 flex justify-center shrink-0">
        {contact.currentPhoto ? (
          <img src={contact.currentPhoto} alt="Current" className="w-10 h-10 rounded-full object-cover border border-gray-200" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 border border-gray-300 text-xs">
            None
          </div>
        )}
      </div>

      {/* Arrow */}
      <div className="w-12 flex justify-center shrink-0 text-gray-400">
        {hasChanges ? <ArrowRight size={16} /> : <span className="text-xs">-</span>}
      </div>

      {/* Proposed Photo */}
      <div className="w-24 flex justify-center shrink-0 relative">
        {contact.proposedPhoto ? (
          <>
            <img src={contact.proposedPhoto} alt="Proposed" className="w-10 h-10 rounded-full object-cover border border-blue-200 shadow-sm" />
            {contact.source === 'google' && (
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                <Cloud size={12} className="text-blue-500" />
              </div>
            )}
            {contact.source === 'facebook' && (
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                <Globe size={12} className="text-blue-600" />
              </div>
            )}
          </>
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 border border-gray-200 border-dashed text-xs">
            N/A
          </div>
        )}
      </div>

      {/* Status */}
      <div className="flex-1 flex justify-end pr-4">
        {contact.status === 'synced' && (
          <span className="flex items-center text-green-600 text-xs font-medium bg-green-50 px-2 py-1 rounded-full">
            <CheckCircle2 size={14} className="mr-1" /> Synced
          </span>
        )}
        {contact.status === 'error' && (
          <span className="flex items-center text-red-600 text-xs font-medium bg-red-50 px-2 py-1 rounded-full">
            <XCircle size={14} className="mr-1" /> Error
          </span>
        )}
        {contact.status === 'pending' && hasChanges && (
           <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-full">
             Ready
           </span>
        )}
      </div>
    </div>
  );
};
