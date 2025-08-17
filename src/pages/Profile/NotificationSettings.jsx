import React from 'react';
// import { ArrowLeft } from 'lucide-react'; // Removed as it's no longer a standalone page header
import { useTheme } from '../../contexts/ThemeContext';
// Importing specific icons based on the image for visual distinction
import { AlertCircle, CheckCircle, Smile, Bell } from 'lucide-react'; 

const Notifications = () => { // Removed onBack prop, as navigation is handled by parent dashboard
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Dummy data for notifications based on the provided image
  const unreadNotifications = [
    {
      id: 1,
      icon: AlertCircle, // Representing a general alert/new item (orange icon)
      iconColor: 'text-orange-600',
      iconBg: 'bg-orange-100',
      title: "New Task Alert!",
      description: "A new task is available. Earn Go Tokens by completing it now!",
      time: "08:44",
    },
    {
      id: 2,
      icon: CheckCircle, // Representing completion/success (green icon)
      iconColor: 'text-green-600',
      iconBg: 'bg-green-100',
      title: "Task Completed!",
      description: "Your proof of activity has been verified, and you've earned [X] Go Tokens.",
      time: "08:44",
    },
  ];

  const todayNotifications = [
    {
      id: 3,
      icon: AlertCircle, // Representing a reminder (orange icon)
      iconColor: 'text-orange-600',
      iconBg: 'bg-orange-100',
      title: "Reminder",
      description: "You have a task due soon. Complete it by [Time/date] to earn Go Tokens.",
      time: "08:44",
    },
    {
      id: 4,
      icon: Smile, // Representing a positive event like a referral (blue icon)
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100',
      title: "Congratulations!",
      description: "Your friend [Friend's Name] joined Go Token using your referral. You've earned [X] Go Tokens!",
      time: "08:44",
    },
  ];

  // Common styling for notification cards
  const cardStyle = `${isDark ? 'bg-[#2a2a2a]' : 'bg-white'} rounded-xl p-3 shadow-sm`;

  // Reusable component for individual notification items
  const NotificationItem = ({ icon: Icon, iconColor, iconBg, title, description, time }) => (
    <div className={`${cardStyle} flex items-start space-x-3`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${iconBg}`}>
        <Icon size={18} className={iconColor} />
      </div>
      <div className="flex-1">
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-xs mt-0.5`}>
          {description}
        </p>
      </div>
      <span className={`${isDark ? 'text-gray-500' : 'text-gray-500'} text-xs flex-shrink-0`}>
        {time}
      </span>
    </div>
  );

  return (
    <div className={`flex flex-col h-full ${isDark ? 'text-white' : 'text-black'}`}>
      <h2 className="text-lg font-semibold mb-4">Notifications</h2>

      <div className="space-y-6">
        {/* Unread Section */}
        <div>
          <h3 className={`text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Unread
          </h3>
          <div className="space-y-3">
            {unreadNotifications.map((notification) => (
              <NotificationItem key={notification.id} {...notification} />
            ))}
          </div>
        </div>

        {/* Today Section */}
        <div>
          <h3 className={`text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Today
          </h3>
          <div className="space-y-3">
            {todayNotifications.map((notification) => (
              <NotificationItem key={notification.id} {...notification} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;