import React, { useState } from 'react';
import { Search, Bell, Settings } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useTheme } from '../contexts/ThemeContext'; // Make sure the path is correct

const TaskTimeline = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const filters = ['All', 'Social', 'Content', 'Apps', 'Survey'];

  const tasks = [
    {
      id: 1,
      title: 'Social media',
      description: 'Engage and share campaign posts on platforms.',
      amount: '0.000048',
      change: '~$2.00',
      icon: '📱',
    },
    {
      id: 2,
      title: 'Content creation',
      description: 'Create and post original media content.',
      amount: '0.000048',
      change: '~$2.00',
      icon: '📝',
    },
    {
      id: 3,
      title: 'App download & reviews',
      description: 'Download partner apps and leave reviews.',
      amount: '0.000048',
      change: '~$2.00',
      icon: '📲',
    },
    {
      id: 4,
      title: 'Survey & Polls',
      description: 'Participate in surveys and community polls.',
      amount: '0.000048',
      change: '~$2.00',
      icon: '📊',
    },
  ];

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={`min-h-screen flex flex-col pb-24 ${isDark ? 'bg-[#1e1e1e] text-white' : 'bg-[#f9f9f9] text-black'}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-10 pb-4">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 ${isDark ? 'bg-[#cc8400]' : 'bg-orange-600'} rounded-full flex items-center justify-center font-bold text-sm`}>
            G
          </div>
          <span className="font-bold text-base">GO COIN</span>
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center ${isDark ? 'bg-[#cc8400]' : 'bg-orange-600'} rounded-full px-3 py-1`}>
            <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
            <span className="text-white font-semibold text-sm">20</span>
          </div>
          <Bell size={20} className={isDark ? 'text-white' : 'text-black'} />
        </div>
      </div>

      {/* Search */}
      <div className="px-4 mb-3">
        <div className="relative flex items-center">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className={`w-full ${isDark ? 'bg-[#2a2a2a] text-white' : 'bg-white text-black'} placeholder-gray-400 rounded-full pl-10 pr-4 py-2 text-sm outline-none`}
          />
          <button className="ml-3 p-2">
            <Settings size={20} className={isDark ? 'text-white' : 'text-black'} />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 mb-4">
        <div className="flex space-x-2 overflow-x-auto hide-scrollbar">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterChange(filter)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                activeFilter === filter
                  ? 'bg-orange-500 text-white'
                  : `${isDark ? 'bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a]' : 'bg-white text-black hover:bg-gray-100'}`
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Task Timeline */}
      <div className="px-4">
        <h2 className="text-base font-bold mb-2">Task Timeline</h2>
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`${isDark ? 'bg-[#2a2a2a]' : 'bg-white'} rounded-2xl p-3 text-sm shadow-lg`}
            >
              <h3 className="font-semibold mb-1">{task.title}</h3>
              <p className="text-black text-xs mb-2">{task.description}</p>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center text-xs">
                  {task.icon}
                </div>
                <span className="text-[#cc8400] font-medium">{task.amount}</span>
                <span className="text-black text-xs">{task.change}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navbar */}
      <Navbar />
    </div>
  );
};

export default TaskTimeline;
