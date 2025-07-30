import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Activity,
  Wallet,
  Bell,
  Moon,
  Lock,
  Shield,
  Users,
  FileText,
  ChevronRight,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const ProfileSettings = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { token } = useAuth();
  const isDark = theme === 'dark';

  const [user, setUser] = useState({
    username: 'username',
    email: 'email@example.com',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('https://gocoin.onrender.com/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Fetched user:', response.data);
        setUser(response.data.user || {});
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchUser();
  }, [token]);

  const settingsItems = [
    {
      id: 'profile',
      title: user.username,
      subtitle: user.email,
      isProfileCard: true,
      path: '/profile/edit',
    },
    { id: 'activities', title: 'Activities', icon: Activity, path: '/profile/activities' },
    { id: 'wallet', title: 'Manage Wallet', icon: Wallet, path: '/profile/wallet' },
    { id: 'notifications', title: 'Notifications', icon: Bell, path: '/profile/notifications' },
    { id: 'lightMode', title: 'Theme', icon: Moon },
    { id: 'password', title: 'Change Password', icon: Lock, path: '/profile/password' },
    { id: 'privacy', title: 'Privacy Settings', icon: Shield, path: '/profile/privacy' },
    { id: 'referrals', title: 'Referrals', icon: Users, path: '/profile/referrals' },
    { id: 'terms', title: 'Terms of Service', icon: FileText, path: '/profile/terms' },
  ];

  const handleItemClick = (item) => {
    if (item.id === 'lightMode') {
      toggleTheme();
    } else if (item.path) {
      navigate(item.path, { state: { user } });
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDark ? 'bg-[#1e1e1e] text-white' : 'bg-white text-black'
      }`}
    >
      <h1 className="pt-6 px-4 text-lg font-semibold">Profile Settings</h1>

      <div className="pt-6 px-4 space-y-2 text-sm pb-2">
        {settingsItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item)}
            className={`cursor-pointer transition-colors rounded-lg ${
              item.isProfileCard
                ? isDark
                  ? 'bg-[#2b2b2b] hover:bg-[#333]'
                  : 'bg-gray-100 hover:bg-gray-200'
                : isDark
                ? 'hover:bg-[#2a2a2a]'
                : 'hover:bg-gray-100'
            } p-3 flex justify-between items-center`}
          >
            <div className="flex items-center gap-3">
              {item.isProfileCard ? (
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center font-bold text-white text-base">
                  {user.username?.charAt(0).toUpperCase()}
                </div>
              ) : (
                <item.icon size={20} className={isDark ? 'text-gray-300' : 'text-gray-600'} />
              )}
              <div className="flex flex-col leading-tight">
                <span className="font-medium text-md">{item.title}</span>
                {item.subtitle && (
                  <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {item.subtitle}
                  </span>
                )}
              </div>
            </div>

            {item.id === 'lightMode' ? (
              <div
                className={`w-10 h-5 rounded-full flex items-center px-1 ${
                  isDark ? 'bg-orange-500' : 'bg-gray-400'
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full transition-transform ${
                    isDark ? 'translate-x-5' : 'translate-x-0'
                  }`}
                ></div>
              </div>
            ) : (
              <ChevronRight size={20} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
            )}
          </div>
        ))}
      </div>

      <Navbar />
    </div>
  );
};

export default ProfileSettings;
