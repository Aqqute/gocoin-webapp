import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const Activity = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleBack = () => navigate('/profile');

  const weeklyStats = {
    goTokenEarned: "0.00047356256",
    leaderboardRank: "200",
    dateRange: "From August 1st to August 7th",
  };

  const activities = [
    {
      id: 1,
      title: "Content creation",
      description: "Posted a campaign banner to earn points.",
      amount: "0.000048",
      change: "~$2.00",
      icon: "🎯"
    },
    {
      id: 2,
      title: "Campaign Topic",
      description: "Shared thoughts on the trending campaign.",
      amount: "0.000048",
      change: "~$2.00",
      icon: "📢"
    },
    {
      id: 3,
      title: "Referral Bonus",
      description: "You invited a friend to the platform.",
      amount: "0.000048",
      change: "~$2.00",
      icon: "🤝"
    },
    {
      id: 4,
      title: "Referral Bonus",
      description: "You invited a friend to the platform.",
      amount: "0.000048",
      change: "~$2.00",
      icon: "🤝"
    }, 
      {
      id: 5,
      title: "Referral Bonus",
      description: "You invited a friend to the platform.",
      amount: "0.000048",
      change: "~$2.00",
      icon: "🤝"
    }
  ];

  const cardStyle = `${isDark ? 'bg-[#2a2a2a]' : 'bg-white'} rounded-xl p-3 shadow-sm`;

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'bg-[#1e1e1e] text-white' : 'bg-[#f9f9f9] text-black'}`}>
      {/* Header */}
      <div className="flex items-center px-4 pt-8 pb-2">
        <button onClick={handleBack} className="mr-4">
          <ArrowLeft size={20} className={isDark ? 'text-white' : 'text-black'} />
        </button>
        <h1 className="text-base font-semibold">Activity</h1>
      </div>

      {/* Main Content */}
      <div className="px-4 space-y-4 pb-6">
        <div>
          <h2 className="text-base font-bold mb-0.5">This week</h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-xs`}>
            {weeklyStats.dateRange}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className={cardStyle}>
            <p className="text-sm font-semibold mb-0.5">{weeklyStats.goTokenEarned}</p>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-xs`}>GoToken Earned</p>
          </div>
          <div className={cardStyle}>
            <p className="text-sm font-semibold mb-0.5">{weeklyStats.leaderboardRank}</p>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-xs`}>Leaderboard Rank</p>
          </div>
        </div>

        {/* Activity List */}
        <div className="space-y-3">
          {activities.map((activity) => (
            <div key={activity.id} className={cardStyle}>
              <div className="flex items-start justify-between mb-1">
                <h3 className="text-sm font-semibold">{activity.title}</h3>
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
