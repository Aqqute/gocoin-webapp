import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const PrivacySettings = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [activityVisibility, setActivityVisibility] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);

  const toggleStyle = `w-12 h-6 rounded-full flex items-center px-1 transition-colors duration-200 ease-in-out`;
  const dotStyle = `w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out`;

  return (
    <div className={`flex flex-col h-full ${isDark ? 'text-white' : 'text-black'}`}>
      <h2 className="text-lg font-semibold mb-4">Privacy Settings</h2>

      <div className="space-y-4">
        {/* Activity Visibility */}
        <div className={`${isDark ? 'bg-[#2a2a2a]' : 'bg-white'} rounded-xl p-4 shadow-sm flex items-center justify-between`}>
          <div>
            <h3 className="text-sm font-semibold mb-1">Activity Visibility</h3>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-xs`}>
              Enable others to see your task activities from the leaderboard
            </p>
          </div>
          <div
            onClick={() => setActivityVisibility(!activityVisibility)}
            className={`${toggleStyle} ${activityVisibility ? 'bg-orange-500' : 'bg-gray-400'} cursor-pointer`}
          >
            <div className={`${dotStyle} ${activityVisibility ? 'translate-x-6' : 'translate-x-0'}`}></div>
          </div>
        </div>

        {/* Data Sharing */}
        <div className={`${isDark ? 'bg-[#2a2a2a]' : 'bg-white'} rounded-xl p-4 shadow-sm flex items-center justify-between`}>
          <div>
            <h3 className="text-sm font-semibold mb-1">Data Sharing</h3>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-xs`}>
              Grant GoToken the permission to share your data with third-party services
            </p>
          </div>
          <div
            onClick={() => setDataSharing(!dataSharing)}
            className={`${toggleStyle} ${dataSharing ? 'bg-orange-500' : 'bg-gray-400'} cursor-pointer`}
          >
            <div className={`${dotStyle} ${dataSharing ? 'translate-x-6' : 'translate-x-0'}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;