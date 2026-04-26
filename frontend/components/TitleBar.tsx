import React from 'react';

export const TitleBar: React.FC = () => {
  return (
    <div className="h-12 bg-gray-100/80 backdrop-blur-md border-b border-mac-border flex items-center px-4 select-none shrink-0">
      {/* Traffic Lights */}
      <div className="flex space-x-2 w-20">
        <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"></div>
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
        <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
      </div>
      
      {/* Title */}
      <div className="flex-1 text-center text-sm font-semibold text-gray-700">
        ContactSync
      </div>
      
      {/* Spacer to balance traffic lights */}
      <div className="w-20"></div>
    </div>
  );
};
