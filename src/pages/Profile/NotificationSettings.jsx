
import React, { useEffect, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { AlertCircle, CheckCircle, Smile, Bell } from 'lucide-react';


const Notifications = () => {
  const { theme } = useTheme();
  const { token } = useAuth();
  const isDark = theme === 'dark';

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const res = await axios.get('https://gocoin.onrender.com/api/notifications/all-notification', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(res.data.data.notifications || []);
      } catch (err) {
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchNotifications();
  }, [token]);


  // Common styling for notification cards
  const cardStyle = `${isDark ? 'bg-[#2a2a2a]' : 'bg-white'} rounded-xl p-3 shadow-sm`;

  // Map notification type to icon and color
  const getIconProps = (type) => {
    switch (type) {
      case 'transaction_status':
        return { icon: AlertCircle, iconColor: 'text-orange-600', iconBg: 'bg-orange-100' };
      case 'success':
        return { icon: CheckCircle, iconColor: 'text-green-600', iconBg: 'bg-green-100' };
      case 'referral':
        return { icon: Smile, iconColor: 'text-blue-600', iconBg: 'bg-blue-100' };
      default:
        return { icon: Bell, iconColor: 'text-gray-500', iconBg: 'bg-gray-200' };
    }
  };

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
        {loading ? (
          <div className="text-center py-8 text-gray-400">Loading...</div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-8 text-gray-400">No notifications found.</div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => {
              const { icon, iconColor, iconBg } = getIconProps(notification.type);
              return (
                <NotificationItem
                  key={notification._id}
                  icon={icon}
                  iconColor={iconColor}
                  iconBg={iconBg}
                  title={notification.type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  description={notification.message}
                  time={new Date(notification.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;