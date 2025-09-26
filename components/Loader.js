// src/components/WebsiteLoader.js
import React from 'react'; // No need for useState/useEffect since it's prop-controlled

const WebsiteLoader = ({ isLoading = true }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-6">
        {/* Loading text with blinking dots */}
        <div className="text-center">
          <span className="text-gray-900 font-medium text-xl">Loading</span>
          {/* Blinking dots - apply the CSS class here */}
          <span className="loading-dot"></span>
          <span className="loading-dot"></span>
          <span className="loading-dot"></span>
          <span className="loading-dot"></span>
        </div>
        
      </div>
    </div>
  );
};

export default WebsiteLoader;

