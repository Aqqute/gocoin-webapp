import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import WithdrawModal from './WithdrawModal';

const Activity = () => {
  const { theme } = useTheme();
  const { token } = useAuth();
  const isDark = theme === 'dark';

  const [weeklyStats, setWeeklyStats] = useState({
    goTokenEarned: 0,
    leaderboardRank: null,
    dateRange: '',
  });
  const [activities, setActivities] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  useEffect(() => {
    const fetchActivity = async () => {
      setLoading(true);
      try {
        const res = await axios.get('https://gocoin.onrender.com/api/activity/weekly', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data.data;
        setWeeklyStats({
          goTokenEarned: data.summary.earned,
          leaderboardRank: data.summary.leaderboardRank,
          dateRange: data.summary.dateRange || '',
        });
        setActivities(data.activities || []);
        // Fetch user withdrawal history
        const wRes = await axios.get('https://gocoin.onrender.com/api/withdrawal/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWithdrawals(Array.isArray(wRes.data.withdrawals) ? wRes.data.withdrawals : []);
      } catch (err) {
        setWeeklyStats({ goTokenEarned: 0, leaderboardRank: null, dateRange: '' });
        setActivities([]);
        setWithdrawals([]);
      } finally {
        setLoading(false);
      }
    };
    fetchActivity();
    // eslint-disable-next-line
  }, [token]);

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
      <h2 className="text-lg font-semibold mb-4">Activities</h2>
      <div className="space-y-4">
        <div>
          <h2 className="text-base font-bold mb-0.5">This week</h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-xs`}>
            {weeklyStats.dateRange || ''}
          </p>
        </div>
        <button
          className="bg-[#cc8400] hover:bg-[#b97a00] text-white font-semibold px-4 py-2 rounded-full mb-2"
          onClick={() => setShowWithdrawModal(true)}
        >
          Withdraw Funds
        </button>
        <div className="grid grid-cols-2 gap-3">
          <div className={`${isDark ? 'bg-[#2a2a2a]' : 'bg-white'} rounded-xl p-3 shadow-sm`}>
            <p className="text-sm font-semibold mb-0.5">{weeklyStats.goTokenEarned}</p>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-xs`}>GoToken Earned</p>
          </div>
          <div className={`${isDark ? 'bg-[#2a2a2a]' : 'bg-white'} rounded-xl p-3 shadow-sm`}>
            <p className="text-sm font-semibold mb-0.5">{weeklyStats.leaderboardRank ?? '-'}</p>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-xs`}>Leaderboard Rank</p>
          </div>
        </div>
        <div className="space-y-3">
          {loading ? (
            <div className="text-center py-8 text-gray-400">Loading...</div>
          ) : activities.length === 0 ? (
            <div className="text-center py-8 text-gray-400">No activities this week.</div>
          ) : (
            activities.map((activity, idx) => (
              <div key={activity.id || idx} className={`${isDark ? 'bg-[#2a2a2a]' : 'bg-white'} rounded-xl p-3 shadow-sm`}>
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
            ))
          )}
        </div>
        {/* Withdrawal History Section */}
        <div className="mt-8">
          <h3 className="text-base font-bold mb-2">Withdrawal History</h3>
          {withdrawals.length === 0 ? (
            <div className="text-center py-4 text-gray-400">No withdrawals yet.</div>
          ) : (
            <div className="space-y-2">
              {withdrawals.map(w => (
                <div key={w._id} className={`${isDark ? 'bg-[#2a2a2a]' : 'bg-white'} rounded-xl p-3 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-2`}>
                  <div>
                    <div className="font-semibold text-sm">Amount: <span className="text-[#cc8400]">{w.amount}</span></div>
                    <div className="text-xs text-gray-500">Wallet: {w.walletAddress}</div>
                    <div className="text-xs text-gray-500">Date: {new Date(w.createdAt).toLocaleString()}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${getStatusStyle(w.status)}`}>{w.status}</span>
                    {w.txHash && <span className="text-xs text-gray-400">Tx: {w.txHash}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {showWithdrawModal && (
        <WithdrawModal
          onClose={() => setShowWithdrawModal(false)}
        />
      )}
    </div>
  );
};

export default Activity;