import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const API_BASE = 'https://gocoin.onrender.com';

function WithdrawModal({ onClose }) {
  const { token } = useAuth();
  const [amount, setAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError('Enter a valid amount');
      return;
    }
    if (!walletAddress || !/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
      setError('Enter a valid wallet address');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/withdrawal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: Number(amount), walletAddress }),
      });
      if (!res.ok) throw new Error('Failed to submit withdrawal request');
      setSuccess('Withdrawal request submitted successfully!');
      setAmount('');
      setWalletAddress('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg w-full max-w-md">
        <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Withdraw Funds</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="Enter amount"
              min="1"
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-[#cc8400]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Wallet Address</label>
            <input
              value={walletAddress}
              onChange={e => setWalletAddress(e.target.value)}
              placeholder="0x..."
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-[#cc8400]"
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && <div className="text-green-500 text-sm">{success}</div>}
          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#cc8400] hover:bg-[#b97a00] text-white font-semibold px-4 py-2 rounded-full flex-1 disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded-full flex-1"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default WithdrawModal;
