import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const Activity = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const weeklyStats = {
    goTokenEarned: "0.00047356256",
    leaderboardRank: "200",
    dateRange: "From August 1st to August 7th",
  };

  const activities = [
    {
      id: 1,
      title: "Social media",
      description: "Lorem ipsum dolor sit amet consectetur.",
      amount: "0.000048",
      change: "~$2.00",
      icon: "🎯",
      status: "Pending"
    },
    {
      id: 2,
      title: "Content creation",
      description: "Lorem ipsum dolor sit amet consectetur.",
      amount: "0.000048",
      change: "~$2.00",
      icon: "📢",
      status: "Accepted"
    },
    {
      id: 3,
      title: "Campaign Topic",
      description: "Lorem ipsum dolor sit amet consectetur.",
      amount: "0.000048",
      change: "~$2.00",
      icon: "🤝",
      status: "Rejected"
    },
    {
      id: 4,
      title: "Referral Bonus",
      description: "You invited a friend to the platform.",
      amount: "0.000048",
      change: "~$2.00",
      icon: "🤝",
      status: "Accepted"
    },
    {
      id: 5,
      title: "Referral Bonus",
      description: "You invited a friend to the platform.",
      amount: "0.000048",
      change: "~$2.00",
      icon: "🤝",
      status: "Pending"
    }
  ];

  // Function to get status tag styles
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Accepted':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return '';
    }
  };

  return (
    <div className={`flex flex-col h-full ${isDark ? 'text-white' : 'text-black'}`}>
      <h2 className="text-lg font-semibold mb-4">Activities</h2> {/* Title added to match image */}
      
      {/* Main Content */}
      <div className="space-y-4">
        <div>
          <h2 className="text-base font-bold mb-0.5">This week</h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-xs`}>
            {weeklyStats.dateRange}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className={`${isDark ? 'bg-[#2a2a2a]' : 'bg-white'} rounded-xl p-3 shadow-sm`}>
            <p className="text-sm font-semibold mb-0.5">{weeklyStats.goTokenEarned}</p>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-xs`}>GoToken Earned</p>
          </div>
          <div className={`${isDark ? 'bg-[#2a2a2a]' : 'bg-white'} rounded-xl p-3 shadow-sm`}>
            <p className="text-sm font-semibold mb-0.5">{weeklyStats.leaderboardRank}</p>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-xs`}>Leaderboard Rank</p>
          </div>
        </div>

        {/* Activity List */}
        <div className="space-y-3">
          {activities.map((activity) => (
            <div key={activity.id} className={`${isDark ? 'bg-[#2a2a2a]' : 'bg-white'} rounded-xl p-3 shadow-sm`}>
              <div className="flex items-start justify-between mb-1">
                <h3 className="text-sm font-semibold">{activity.title}</h3>
                {activity.status && (
                  <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${getStatusStyle(activity.status)}`}>
                    {activity.status}
                  </span>
                )}
              </div>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-xs mb-2`}>
                {activity.description}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-[#cc8400] rounded-full flex items-center justify-center text-xs">
                  {activity.icon}
                </div>
                <span className="text-[#cc8400] font-medium text-sm">{activity.amount}</span>
                <span className="text-gray-500 text-xs">{activity.change}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Activity;