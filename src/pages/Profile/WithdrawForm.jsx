import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import Button from '../../components/Button';
import LoadingBar from '../../components/ui/LoadingBar';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

function WithdrawForm({ user }) {
  const [amount, setAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validate = () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError('Enter a valid amount');
      return false;
    }
    if (!walletAddress || !/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
      setError('Enter a valid wallet address');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/withdrawal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
    <Card>
      <h3>Withdraw Funds</h3>
      <form onSubmit={handleSubmit} className="withdraw-form">
        <div>
          <label>Amount</label>
          <Input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="Enter amount"
            min="1"
            required
          />
        </div>
        <div>
          <label>Wallet Address</label>
          <Input
            value={walletAddress}
            onChange={e => setWalletAddress(e.target.value)}
            placeholder="0x..."
            required
          />
        </div>
        {loading && <LoadingBar />}
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        <Button type="submit" disabled={loading} variant="primary">Submit Withdrawal</Button>
      </form>
    </Card>
  );
}

export default WithdrawForm;
