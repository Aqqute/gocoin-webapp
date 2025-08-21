import React from 'react';
import { Search, SlidersHorizontal, Flame, Bell } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const DesktopHeader = ({ title }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`h-20 flex items-center justify-between px-6 border-b ${isDark ? 'bg-[#1e1e1e] border-gray-800 text-white' : 'bg-white border-gray-200 text-black'}`}>
      {/* Page Title */}
      <h1 className="text-xl font-semibold">{title}</h1>

      {/* Search, Filters, Icons */}
      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <div className={`relative flex items-center ${isDark ? 'bg-[#2a2a2a]' : 'bg-gray-100'} rounded-lg px-3 py-2`}>
          <Search size={18} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
          <input
            type="text"
            placeholder="Search..."
            className={`ml-2 outline-none text-sm w-48 ${isDark ? 'bg-[#2a2a2a] text-white' : 'bg-gray-100 text-black'}`}
          />
        </div>

        {/* Filter Icon */}
        <button className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
          <SlidersHorizontal size={18} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
        </button>

        {/* Fire Icon with Count */}
        {/* <div className={`relative p-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
          <Flame size={18} className="text-orange-500" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            20
          </span>
        </div> */}

        {/* Bell Icon */}
        <button className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
          <Bell size={18} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
        </button>
      </div>
    </div>
  );
};

export default DesktopHeader;