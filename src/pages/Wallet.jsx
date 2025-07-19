import React, { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import Navbar from "../components/Navbar";
import Icon from "../../public/images/GoLogo.png";

import { useNavigate } from "react-router-dom";

const DoMoreModal = ({ isOpen, onClose, isDark }) => {
  const navigate = useNavigate();
  if (!isOpen) return null;

  const options = [
    {
      title: "Withdraw",
      subtitle: "Withdraw to connected wallet",
      path: "/wallet/withdraw",
    },
    {
      title: "Recieve Payments",
      subtitle: "Choose a method to recieve payments",
      path: "/wallet/receive",
    },
    {
      title: "Send payment",
      subtitle: "Choose a method to send payments",
      path: "/wallet/send",
    },
    {
      title: "Swap",
      subtitle: "Swap between currencies e.g BTC to ETH",
      path: "/wallet/swap",
    },
    {
      title: "Savings",
      subtitle: "Start saving in different currencies",
      path: "/wallet/savings",
    },
    {
      title: "Pay Bills",
      subtitle: "Pay utilities e.g airtime, data, etc",
      path: "/wallet/paybills",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div
        className={`w-full max-w-sm mx-4 p-4 rounded-xl shadow-lg ${
          isDark ? "bg-[#2a2a2a] text-white" : "bg-white text-black"
        }`}
      >
        <div className="space-y-2">
          {options.map((opt, i) => (
            <button
              key={i}
              onClick={() => navigate(opt.path)}
              className={`w-full text-left p-2 rounded-lg ${
                isDark
                  ? "bg-[#3a3a3a] hover:bg-[#444]"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <p className="text-sm font-medium">{opt.title}</p>
              <p className="text-xs text-gray-400">{opt.subtitle}</p>
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full py-2 bg-orange-500 text-white text-sm rounded-full hover:bg-orange-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const GoWalletComponent = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [isModalOpen, setIsModalOpen] = useState(false);

  const transactions = [
    {
      id: 1,
      type: "Received",
      amount: "+0.003746",
      date: "29 AUG - 10:21 PM",
      isPositive: true,
    },
    {
      id: 2,
      type: "Withdrawal",
      amount: "-0.003746",
      date: "29 AUG - 10:21 PM",
      isPositive: false,
    },
    {
      id: 3,
      type: "Received",
      amount: "+0.003746",
      date: "29 AUG - 10:21 PM",
      isPositive: true,
    },
    {
      id: 4,
      type: "Received",
      amount: "+0.003746",
      date: "29 AUG - 10:21 PM",
      isPositive: true,
    },
    {
      id: 5,
      type: "Withdrawal",
      amount: "-0.003746",
      date: "29 AUG - 10:21 PM",
      isPositive: false,
    },
    {
      id: 6,
      type: "Withdrawal",
      amount: "-0.003746",
      date: "29 AUG - 10:21 PM",
      isPositive: false,
    },
    {
      id: 7,
      type: "Received",
      amount: "+0.003746",
      date: "29 AUG - 10:21 PM",
      isPositive: true,
    },
  ];

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDark ? "bg-[#1e1e1e] text-white" : "bg-[#f9f9f9] text-black"
      }`}
    >
      <h1 className="pt-6 px-4 text-lg font-semibold">Go Wallet</h1>
      {/* Balance Card */}
      <div className="pt-6 px-4 space-y-2 text-sm pb-2">
        <div
          className={`rounded-xl p-4 ${
            isDark ? "bg-[#2a2a2a]" : "bg-white"
          } shadow-sm`}
        >
          <div className="flex justify-between items-start mb-1">
            <div>
              <p className="text-xs text-gray-400">GoToken Balance</p>
              <p className="text-2xl font-semibold">0.0046589</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">~$20.00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Do More Button */}
      <div className="px-4 mt-1 mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-orange-500 text-white rounded-full mt-2 mb-2 py-2 text-sm font-medium hover:bg-orange-600 transition-colors"
        >
          Do more with GoC
        </button>
      </div>

      {/* Transaction History */}
      <div className="px-4 mb-20 w-full">
        <h2 className="text-md font-semibold mb-4">Transaction History</h2>
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <img
                  src={Icon}
                  alt="tx"
                  className="w-8 h-8 rounded-full bg-gray-200"
                />
                <div>
                  <p className="text-sm font-medium">{tx.type}</p>
                  <p className="text-xs text-gray-400">{tx.date}</p>
                </div>
              </div>
              <div
                className={`text-sm font-semibold ${
                  tx.isPositive ? "text-green-500" : "text-red-500"
                }`}
              >
                {tx.amount}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <DoMoreModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isDark={isDark}
      />

      {/* Bottom Navbar */}
      <Navbar />
    </div>
  );
};

export default GoWalletComponent;
