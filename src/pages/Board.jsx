// src/pages/EarningLeaderBoard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Wallet, BarChart3, User } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import Navbar from '../components/Navbar';
import GoLogo from '../../public/images/GoLogo.png';

const EarningLeaderBoard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Today');
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();

  const topUsers = [
    { id: 1, rank: 2, username: 'Username', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c81c?w=100&h=100&fit=crop&crop=face', earnings: '0.000048' },
    { id: 2, rank: 1, username: 'Username', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', earnings: '0.000048' },
    { id: 3, rank: 3, username: 'Username', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face', earnings: '0.000048' },
  ];

  const otherUsers = [
    { id: 4, rank: 4, name: 'Belz', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', earnings: '0.02456', isActive: true },
    { id: 5, rank: 5, name: 'Esther', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', earnings: '0.02456', isActive: true },
    { id: 6, rank: 6, name: 'Joel', avatar: null, earnings: '0.02456', isActive: false },
    { id: 7, rank: 7, name: 'Jennifer', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face', earnings: '0.02456', isActive: true },
    { id: 8, rank: 8, name: 'Max', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop&crop=face', earnings: '0.02456', isActive: false },
  ];

  const periods = ['Today', 'This week', 'This month'];

  const handleUserClick = (user) => {
    navigate('/board/activity', { state: user });
  };

  return (
    <div className={`min-h-screen pb-24 ${isDark ? 'bg-[#1e1e1e] text-white' : 'bg-white text-black'}`}>
      <h1 className="pt-6 px-4 text-lg font-semibold">Earning Leader Board</h1>

      <div className="px-4 mb-6 pt-6">
        <div className={`flex ${isDark ? 'bg-[#2a2a2a]' : 'bg-gray-200'} rounded-full p-1`}>
          {periods.map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors ${
                selectedPeriod === period
                  ? `${isDark ? 'bg-[#3a3a3a] text-white' : 'bg-white text-black'}`
                  : `${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 mb-6">
        <div className={`${isDark ? 'bg-[#2a2a2a]' : 'bg-gray-100'} rounded-2xl p-6`}>
          <div className="flex items-end justify-center space-x-4">
            {topUsers.map((user, index) => (
              <div key={user.id} onClick={() => handleUserClick(user)} className="flex flex-col items-center cursor-pointer">
                <div className="relative mb-3">
                  <div className={`rounded-full ${index === 1 ? 'w-20 h-20 bg-gradient-to-r from-cyan-400 to-cyan-600 p-1' : 'w-16 h-16'} ${index === 2 ? 'bg-gradient-to-r from-pink-400 to-pink-600 p-1' : ''}`}>
                    <img
                      src={user.avatar}
                      alt="User"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div className={`absolute -bottom-2 left-5 w-8 h-8 ${index === 1 ? 'bg-yellow-500 text-black' : isDark ? 'bg-[#3a3a3a]' : 'bg-gray-300'} rounded-full flex items-center justify-center text-sm font-bold`}>
                    {user.rank}
                  </div>
                </div>
                <div className="text-xs text-gray-400 mb-1">{user.username}</div>
                <div className="flex items-center space-x-1">
                  <img src={GoLogo} className='w-4' alt="token" />
                  <span className={`text-sm ${index === 1 ? 'text-orange-500' : ''}`}>{user.earnings}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 space-y-3">
        {otherUsers.map((user) => (
          <div
            key={user.id}
            onClick={() => handleUserClick(user)}
            className={`${isDark ? 'bg-[#2a2a2a]' : 'bg-gray-100'} rounded-2xl p-4 cursor-pointer`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 ${isDark ? 'bg-[#3a3a3a]' : 'bg-gray-300'} rounded-full flex items-center justify-center text-sm font-bold`}>
                  {user.rank}
                </div>
                <div className="flex items-center space-x-3">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-600 rounded-full" />
                  )}
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="flex items-center space-x-1">
                      <div className={`w-2 h-2 rounded-full ${user.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className="text-xs text-gray-400">
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`rounded-full px-4 py-2 flex items-center space-x-2 ${isDark ? 'bg-[#3a3a3a]' : 'bg-white shadow'}`}>
                <img src={GoLogo} className='w-4' alt="token" />
                <span className="text-sm">{user.earnings}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Navbar />
    </div>
  );
};

export default EarningLeaderBoard;
