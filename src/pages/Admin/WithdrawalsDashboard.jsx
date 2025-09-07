import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import Button from '../../components/Button';
import { Input } from '../../components/ui/Input';
import { Label } from '../../components/ui/Label';
import LoadingBar from '../../components/ui/LoadingBar';
import { useAuth } from '../../contexts/AuthContext';
// import './WithdrawalsDashboard.css';

const API_BASE = 'https://gocoin.onrender.com';

function WithdrawalsDashboard() {
  const { token } = useAuth();
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [txHash, setTxHash] = useState({});
  const [actionLoading, setActionLoading] = useState({});

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const fetchWithdrawals = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/api/withdrawal`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch withdrawals');
      const data = await res.json();
      console.log('i am the returned data', data);
      setWithdrawals(Array.isArray(data.withdrawals) ? data.withdrawals : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    if (!txHash[id]) return setError('Please enter a transaction hash');
    setActionLoading((prev) => ({ ...prev, [id]: true }));
    setError('');
    try {
      const res = await fetch(`${API_BASE}/api/withdrawal/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: 'approved', txHash: txHash[id] }),
      });
      if (!res.ok) throw new Error('Failed to approve withdrawal');
      await fetchWithdrawals();
    } catch (err) {
      console.log(' i am the error', err);
      setError(err.message);
    } finally {
      setActionLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleDecline = async (id) => {
    setActionLoading((prev) => ({ ...prev, [id]: true }));
    setError('');
    try {
      const res = await fetch(`${API_BASE}/api/withdrawal/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: 'declined' }),
      });
      if (!res.ok) throw new Error('Failed to decline withdrawal');
      await fetchWithdrawals();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  const renderStatus = (status) => {
    switch (status) {
      case 'approved':
        return <span className="status approved">Approved</span>;
      case 'declined':
        return <span className="status declined">Declined</span>;
      default:
        return <span className="status pending">Pending</span>;
    }
  };

  return (
    <div className="withdrawals-dashboard p-6 min-h-screen bg-gray-50 dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Withdrawals Dashboard</h2>
      {loading && <LoadingBar />}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <Card>
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
              <th className="px-4 py-2 text-left">User</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Wallet Address</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Tx Hash</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {withdrawals.map((w) => (
              <tr key={w._id} className="border-b last:border-none hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <td className="px-4 py-2">{typeof w.user === 'object' ? (w.user.username || '-') : (w.user || '-')}</td>
                <td className="px-4 py-2 font-semibold">{w.amount}</td>
                <td className="px-4 py-2 text-xs break-all">{w.walletAddress}</td>
                <td className="px-4 py-2">{renderStatus(w.status)}</td>
                <td className="px-4 py-2">
                  {w.txHash || (w.status === 'pending' ? (
                    <Input
                      value={txHash[w._id] || ''}
                      onChange={e => setTxHash({ ...txHash, [w._id]: e.target.value })}
                      placeholder="Enter Tx Hash"
                      disabled={actionLoading[w._id]}
                      className="w-36 px-2 py-1 border rounded text-xs"
                    />
                  ) : '-')}
                </td>
                <td className="px-4 py-2">
                  {w.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleApprove(w._id)}
                        disabled={actionLoading[w._id]}
                        type="button"
                        content="Approve"
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold disabled:opacity-50"
                      />
                      <Button
                        onClick={() => handleDecline(w._id)}
                        disabled={actionLoading[w._id]}
                        type="button"
                        content="Decline"
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold disabled:opacity-50"
                      />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

export default WithdrawalsDashboard;
