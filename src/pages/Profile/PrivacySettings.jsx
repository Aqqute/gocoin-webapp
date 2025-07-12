import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext'; // ✅ Import ThemeContext

const NotificationSettings = ({ onBack }) => {
  const { theme } = useTheme(); // ✅ Use global theme
  const isDark = theme === 'dark';

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    newTask: true,
    taskReminders: false,
    earningsAlerts: true,
  });

  const toggleNotification = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const cardStyle = `${isDark ? 'bg-[#2a2a2a]' : 'bg-white'} rounded-xl p-4 shadow-md transition`;

  const ToggleSwitch = ({ isOn, onToggle }) => (
    <button
      onClick={onToggle}
      className={`relative w-12 h-6 rounded-full focus:outline-none transition-colors duration-300 ${
        isOn ? 'bg-orange-500' : 'bg-gray-400'
      }`}
    >
      <div
        className={`absolute w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 top-0.5 ${
          isOn ? 'translate-x-6' : 'translate-x-0.5'
        }`}
      />
    </button>
  );

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDark ? 'bg-[#1e1e1e] text-white' : 'bg-[#f9f9f9] text-black'
      }`}
    >
      {/* Header */}
      <div className="flex items-center px-3 pt-6 pb-3">
        <button onClick={onBack || (() => window.history.back())} className="mr-4">
          <ArrowLeft size={20} className={isDark ? 'text-white' : 'text-black'} />
        </button>
        <h1 className="text-lg font-semibold">Privacy Settings</h1>
      </div>

      {/* Main Content */}
      <div className="px-4 mt-4 space-y-6 pb-10">
        {/* Activity Visibility */}
        <div className={cardStyle}>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold mb-1">Activity Visibility</h3>
                <p className="text-sm text-gray-400">
                  Enable others to see your task activities from the leaderboard.
                </p>
              </div>
              <ToggleSwitch
                isOn={notifications.emailNotifications}
                onToggle={() => toggleNotification('emailNotifications')}
              />
            </div>
          </div>
        </div>

        {/* Data Sharing */}
        <div className={cardStyle}>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold mb-1">Data Sharing</h3>
                <p className="text-sm text-gray-400">
                  Grant GoToken the permissions to share your data with third-party services.
                </p>
              </div>
              <ToggleSwitch
                isOn={notifications.taskReminders}
                onToggle={() => toggleNotification('taskReminders')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
