import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext'; // Use your theme context

const NotificationSettings = ({ onBack }) => {
  const { theme } = useTheme();
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
        <h1 className="text-lg font-semibold">Notification Settings</h1>
      </div>

      {/* Main Content */}
      <div className="px-4 mt-4 space-y-6 pb-10">
        {/* GENERAL Section */}
        <div className={cardStyle}>
          <h2
            className={`text-sm font-medium mb-4 uppercase tracking-wide ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            General
          </h2>

          <div className="space-y-6">
            {/* Email */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold mb-1">Email Notifications</h3>
                <p className="text-sm text-gray-400">
                  Receive updates and alerts via emails.
                </p>
              </div>
              <ToggleSwitch
                isOn={notifications.emailNotifications}
                onToggle={() => toggleNotification('emailNotifications')}
              />
            </div>

            {/* SMS */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold mb-1">SMS Notifications</h3>
                <p className="text-sm text-gray-400">
                  Receive updates and alerts via SMS.
                </p>
              </div>
              <ToggleSwitch
                isOn={notifications.smsNotifications}
                onToggle={() => toggleNotification('smsNotifications')}
              />
            </div>
          </div>
        </div>

        {/* ACTIVITIES Section */}
        <div className={cardStyle}>
          <h2
            className={`text-sm font-medium mb-4 uppercase tracking-wide ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Activities
          </h2>

          <div className="space-y-6">
            {/* New Task */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold mb-1">New Task</h3>
                <p className="text-sm text-gray-400">
                  Get alerts when new tasks are available.
                </p>
              </div>
              <ToggleSwitch
                isOn={notifications.newTask}
                onToggle={() => toggleNotification('newTask')}
              />
            </div>

            {/* Task Reminders */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold mb-1">Task Reminders</h3>
                <p className="text-sm text-gray-400">
                  Be reminded to complete tasks before they're due.
                </p>
              </div>
              <ToggleSwitch
                isOn={notifications.taskReminders}
                onToggle={() => toggleNotification('taskReminders')}
              />
            </div>

            {/* Earnings Alerts */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold mb-1">Earnings Alerts</h3>
                <p className="text-sm text-gray-400">
                  Get notified when you earn GoTokens.
                </p>
              </div>
              <ToggleSwitch
                isOn={notifications.earningsAlerts}
                onToggle={() => toggleNotification('earningsAlerts')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
