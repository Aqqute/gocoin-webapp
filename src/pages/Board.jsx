import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import Navbar from '../components/Navbar';
import GoLogo from '../../public/images/GoLogo.png';
import PageLoader from '../components/PageLoader';
import BaseLayout from '../components/Layout';

const EarningLeaderBoard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Today');
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);


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
    <BaseLayout>
      <div className={`min-h-screen pb-20 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <h1 className="pt-6 px-4 text-lg font-semibold">Earning Leader Board</h1>

        <div className="px-4 mb-4 pt-4">
          <div className={`flex ${isDark ? 'bg-black' : 'bg-gray-200'} rounded-full p-1 border-1 border-[#3a3a3a]`}>
            {periods.map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`flex-1 py-1.5 px-3 rounded-full text-xs font-medium transition-colors ${
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

        <div className="px-4 mb-4">
          <div className={`${isDark ? 'bg-[#2a2a2a]' : 'bg-gray-100'} rounded-xl p-4`}>
            <div className="flex items-end justify-center space-x-3">
              {topUsers.map((user, index) => (
                <div key={user.id} onClick={() => handleUserClick(user)} className="flex flex-col items-center cursor-pointer">
                  <div className="relative mb-2">
                    <div className={`rounded-full ${index === 1 ? 'w-16 h-16 bg-gradient-to-r from-cyan-400 to-cyan-600 p-0.5' : 'w-14 h-14'} ${index === 2 ? 'bg-gradient-to-r from-pink-400 to-pink-600 p-0.5' : ''}`}>
                      <img
                        src={user.avatar}
                        alt="User"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <div className={`absolute -bottom-1 left-4 w-6 h-6 ${index === 1 ? 'bg-yellow-500 text-black' : isDark ? 'bg-[#3a3a3a]' : 'bg-gray-300'} rounded-full flex items-center justify-center text-xs font-bold`}>
                      {user.rank}
                    </div>
                  </div>
                  <div className="text-[10px] text-gray-400 mb-0.5">{user.username}</div>
                  <div className="flex items-center space-x-1">
                    <img src={GoLogo} className='w-3' alt="token" />
                    <span className={`text-xs ${index === 1 ? 'text-orange-500' : ''}`}>{user.earnings}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-4 space-y-2">
          {otherUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => handleUserClick(user)}
              className={`${isDark ? 'bg-[#2a2a2a]' : 'bg-gray-100'} rounded-xl p-3 cursor-pointer`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-6 h-6 ${isDark ? 'bg-[#3a3a3a]' : 'bg-gray-300'} rounded-full flex items-center justify-center text-xs font-bold`}>
                    {user.rank}
                  </div>
                  <div className="flex items-center space-x-2">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-600 rounded-full" />
                    )}
                    <div>
                      <div className="text-sm font-medium">{user.name}</div>
                      <div className="flex items-center space-x-1">
                        <div className={`w-2 h-2 rounded-full ${user.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className="text-[10px] text-gray-400">
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`rounded-full px-3 py-1 flex items-center space-x-1 ${isDark ? 'bg-[#3a3a3a]' : 'bg-white shadow-sm'}`}>
                  <img src={GoLogo} className='w-3' alt="token" />
                  <span className="text-xs">{user.earnings}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Navbar />
      </div>
    </BaseLayout>
  );
};

export default EarningLeaderBoard;
