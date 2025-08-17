import React from 'react';
import { Home, Wallet, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const DesktopSidebar = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const location = useLocation(); // Get current path

  const navItems = [
    { name: "Home", icon: Home, path: "/home" },
    { name: "Wallet", icon: Wallet, path: "/wallet" },
    // { name: "Leaderboard", icon: Leaderboard, path: "/leaderboard" },
    { name: "Profile settings", icon: Settings, path: "/profile" },
  ];

  return (
    <div className={`w-64 min-h-screen p-6 flex flex-col ${isDark ? 'bg-[#1e1e1e] border-r border-gray-800 text-white' : 'bg-white border-r border-gray-200 text-black'}`}>
      {/* Logo */}
      <div className="mb-8 flex items-center justify-start">
        {/* Placeholder for Go Coin Icon */}
        <img src="https://via.placeholder.com/24x24/FF8C00/FFFFFF?text=G" alt="GO COIN Logo" className="h-6 w-6 mr-2" />
        <span className="text-xl font-bold">GO COIN</span>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center p-3 rounded-lg text-sm font-medium transition-colors
                ${isActive
                  ? 'bg-orange-500 text-white'
                  : isDark
                    ? 'text-gray-300 hover:bg-gray-800'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
            >
              <item.icon size={20} className="mr-3" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default DesktopSidebar;