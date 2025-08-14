import React, { useEffect, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import Navbar from "../components/Navbar";

import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import axios from "axios";
import PageLoader from "../components/PageLoader";
import { useAuth } from "../contexts/AuthContext";

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
      subtitle: "Choose a method to receive payments",
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
    <div className="fixed inset-0 z-50 bg-opacity-10 flex justify-center items-end">
      <div
        className={`w-full max-w-md p-4 rounded-t-xl shadow-lg transform transition-all duration-300 translate-y-0 animate-slide-up ${
          isDark ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <div className="flex justify-end mb-2">
          <button onClick={onClose} className="hover:text-red-500">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-3">
          {options.map((opt, i) => (
            <button
              key={i}
              onClick={() => {
                onClose();
                navigate(opt.path);
              }}
              className={`w-full text-left p-3 rounded-lg ${
                isDark
                  ? "bg-[#3a3a3a] hover:bg-[#444]"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <p className="text-sm font-semibold">{opt.title}</p>
              <p className="text-xs">{opt.subtitle}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const GoWalletComponent = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const [balanceRes, txRes] = await Promise.all([
          axios.get("https://gocoin.onrender.com/api/wallet/balance", config),
          axios.get(
            "https://gocoin.onrender.com/api/wallet/transactions",
            config
          ),
        ]);
        console.log("Balance response:", balanceRes.data);
        console.log("Transactions response:", txRes.data);

        setBalance(balanceRes.data.data.goTokenBalance || "0.000000");
        // setFiatEquivalent(balanceRes.data.data.fiatEquivalent || 0);
        setTransactions(txRes.data.data.transactions || []);
      } catch (error) {
        console.error("Failed to fetch wallet data:", error);
        setBalance("0.000000");
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();
  }, [token]);

  if (loading) return <PageLoader />;

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDark ? "bg-black text-white" : "bg-[#f9f9f9] text-black"
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
              <p className="text-xs">GoToken Balance</p>
              <p className="text-2xl mt-1 font-semibold">
                {Number(balance).toFixed(4)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm">~$20.00</p>
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
        {transactions.length === 0 ? (
          <p className="text-sm text-gray-400 text-center">
            No transaction history
          </p>
        ) : (
          <div className="space-y-3">
            {transactions.map((tx) => {
              const isPositive = tx.amountGoToken > 0;
              const formattedAmount = `${isPositive ? "+" : ""}${
                tx.amountGoToken
              }`;
              const formattedDate = new Date(
                tx.timestamp || tx.createdAt
              ).toLocaleDateString();

              return (
                <div key={tx._id} className={`rounded-xl flex items-center justify-between px-2  py-1 ${
            isDark ? "bg-[#2a2a2a]" : "bg-white"
          } shadow-sm`}>
                  <div className="flex items-center space-x-2">
                    <img
                      src={Icon}
                      alt="tx"
                      className="w-8 h-8 rounded-full bg-gray-200"
                    />
                    <div>
                      <p className="text-sm font-medium capitalize">
                        {tx.type.replace("_", " ")}
                      </p>
                      <p className="text-xs text-gray-400">{formattedDate}</p>
                    </div>
                  </div>
                  <div
                    className={`text-sm font-semibold ${
                      isPositive ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {formattedAmount}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal */}
      <DoMoreModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isDark={isDark}
      />

      {/* Bottom Navbar */}
      {!isModalOpen && <Navbar />}
    </div>
  );
};

export default GoWalletComponent;
