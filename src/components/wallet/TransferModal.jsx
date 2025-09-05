import React, { useState } from "react";
import Modal from "../PopupModal";
import Button from "../Button";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

const TransferModal = ({ isOpen, onClose, wallets }) => {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    toAddress: "",
    amount: "",
    walletType: wallets?.[0]?.walletType || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTransfer = async () => {
    if (!form.toAddress || !form.amount || !form.walletType) {
      toast.error("Please fill in all fields");
      return;
    }
    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://gocoin.onrender.com/api/wallet/transfer",
        {
          toAddress: form.toAddress,
          amount: Number(form.amount),
          walletType: form.walletType,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message || "Transfer successful");
      onClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Transfer failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-2">
        <h2 className="text-lg font-bold mb-4">Transfer to Wallet</h2>
        <div className="mb-3">
          <label className="block mb-1 text-sm font-medium">From Wallet</label>
          <select
            name="walletType"
            value={form.walletType}
            onChange={handleChange}
            className="w-full p-2 rounded border"
          >
            {wallets.map((w) => (
              <option key={w.address} value={w.walletType}>
                {w.walletType} ({w.address.slice(0, 6)}...{w.address.slice(-4)})
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="block mb-1 text-sm font-medium">To Address</label>
          <input
            type="text"
            name="toAddress"
            value={form.toAddress}
            onChange={handleChange}
            className="w-full p-2 rounded border"
            placeholder="Recipient wallet address"
          />
        </div>
        <div className="mb-3">
          <label className="block mb-1 text-sm font-medium">Amount</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            className="w-full p-2 rounded border"
            placeholder="Amount to transfer"
          />
        </div>
        <Button
          content={isLoading ? "Transferring..." : "Transfer"}
          onClick={handleTransfer}
          disabled={isLoading}
        />
      </div>
    </Modal>
  );
};

export default TransferModal;
