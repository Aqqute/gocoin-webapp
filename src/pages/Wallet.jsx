import React, { useEffect, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import Icon from "../../public/images/GoLogo.png";
import { X } from "lucide-react";
import axios from "axios";
import PageLoader from "../components/PageLoader";
import { useNavigate } from "react-router-dom";

import watermark from "../../public/images/watermark.svg";
import withdraw from "../../public/images/withdraw.svg";
import send from "../../public/images/send.svg";
import receive from "../../public/images/recieve.svg";
import swap from "../../public/images/swap.svg";
import TransactionsTable from "../components/Table";
import BaseLayout from "../components/Layout";
import WithdrawModal from "../components/wallet/WithdrawModal";
import Button from "../components/Button";
import SwapModal from "../components/wallet/SwapModal";
import Header from "../components/Header";

function Heading({ heading }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <h4
      className={`font-bold text-xl leading-8 ${
        isDark ? "text-white" : "text-black"
      }`}
    >
      {heading}
    </h4>
  );
}

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
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-end">
      <div
        className={`w-full max-w-md p-4 rounded-t-xl shadow-lg transform transition-all duration-300 translate-y-0 animate-slide-up ${
          isDark ? "bg-[#2a2a2a] text-white" : "bg-white text-black"
        }`}
      >
        {/* Close Icon */}
        <div className="flex justify-end mb-2">
          <button onClick={onClose} className=" hover:text-red-500">
            <X size={20} />
          </button>
        </div>

        {/* Options */}
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

function Card({ children }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div
      className={`${
        isDark ? "bg-black text-white" : "bg-gray-50 text-black"
      } h-fit w-full rounded-2xl shadow-sm p-6`}
    >
      {children}
    </div>
  );
}

const GoWalletComponent = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { token } = useAuth();
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isSwapModalOpen, setIsSwapModalOpen] = useState(false);
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const [balanceRes, txRes] = await Promise.all([
          axios.get("https://gocoin.onrender.com/api/wallet/balance", config),
          axios.get(
            "https://gocoin.onrender.com/api/wallet/transactions",
            config
          ),
        ]);

        setBalance(balanceRes.data.data.goTokenBalance || "0.000000");
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

  const wallets = [
    { name: "Go token balance", balance: balance, amount: "20.00" },
    { name: "Metamask wallet", balance: "0.0046589", amount: "20.00" },
    { name: "Solana wallet", balance: "0.00469089", amount: "20.00" },
  ];

  const quickActions = [
    {
      title: "Withdraw",
      subtitle: "Select withdrawal method",
      image: withdraw,
      onClick: () => setIsWalletModalOpen(true),
    },
    {
      title: "Receive payments",
      subtitle: "Choose a method to receive payments",
      image: receive,
      onClick: () => console.log(true),
    },
    {
      title: "Send Payments",
      subtitle: "Choose a method to send payments",
      image: send,
      onClick: () => console.log(true),
    },
    {
      title: "Swap",
      subtitle: "Swap between currencies e.g BTC to ETH",
      image: swap,
      onClick: () => setIsSwapModalOpen(true),
    },
  ];

  return (
    <BaseLayout>
      {/* MOBILE VIEW */}
      {/* <Header /> */}
      <div
        className={`min-h-screen lg:hidden flex flex-col ${
          isDark ? "bg-black text-white" : "bg-[#f9f9f9] text-black"
        }`}
      >
        {/* <h1 className="pt-6 px-4 text-lg font-semibold">Go Wallet</h1> */}
        {/* Balance Card */}
        <div className=" space-y-2">
          <Card>
            <div className="grid grid-cols-1 gap-4">
              {wallets
                .filter((wallet) => wallet.name === "Go token balance")
                .map((wallet, idx) => (
                  <div
                    key={idx}
                    className={`h-[120px] w-full border ${
                      isDark ? "border-gray-500" : "border-[#E5E7EB]"
                    } rounded-2xl relative p-5 cursor-pointer hover:shadow-md transition-all duration-300`}
                  >
                    <img src={watermark} className="absolute top-0 right-10" />
                    <div className="flex justify-between items-center z-10">
                      <div className="space-y-1">
                        <p
                          className={`text-sm ${
                            isDark ? "text-white/80" : "text-[#393A3F]"
                          } font-normal`}
                        >
                          {wallet.name}
                        </p>
                        <h2
                          className={`${
                            isDark ? "text-white/90" : "text-black/90"
                          } font-bold text-[28px] leading-11 truncate w-[200px] relative group`}
                        >
                          {wallet.balance}
                          <div className="absolute bg-gray-100 text-gray-950 text-xs p-1 rounded-full -bottom-1 right-0 hidden group-hover:block transition-all duration-300">
                            {wallet.balance}
                          </div>
                        </h2>
                      </div>
                      <div
                        className={`border border-[#F3F4F9] ${
                          isDark
                            ? "bg-black/50 text-white"
                            : "bg-[#e7ecf5] text-[#3C3C43]"
                        } rounded-full w-20 h-[35px] px-2.5 py-1.5 font-bold text-sm flex justify-center items-center`}
                      >
                        ~${wallet.amount}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
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
        {!isModalOpen && <Navbar />}
      </div>

      {/* DESKTOP VIEW */}
      <div
        className={`min-h-screen hidden lg:flex flex-col gap-8 p-6 ${
          isDark ? "bg-black text-white" : "bg-gray-50 text-black"
        }`}
      >
        {/* wallets */}
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
            {wallets.map((wallet, idx) => {
              return (
                <div
                  key={idx}
                  className={`h-[120px] w-full border ${
                    isDark ? "border-gray-500" : "border-[#E5E7EB]"
                  } rounded-2xl relative p-5 cursor-pointer hover:shadow-md transition-all duration-300`}
                >
                  <img src={watermark} className="absolute top-0 right-10" />
                  <div className="flex justify-between items-center z-10">
                    <div className="space-y-1">
                      <p
                        className={`text-sm ${
                          isDark ? "text-white/80" : "text-[#393A3F]"
                        } font-normal`}
                      >
                        {wallet.name}
                      </p>
                      <h2
                        className={`${
                          isDark ? "text-white/90" : "text-black/90"
                        } font-bold text-[28px] leading-11 truncate w-[200px] relative group`}
                      >
                        {wallet.balance}
                        <div className="absolute bg-gray-100 text-gray-950 text-xs p-1 rounded-full -bottom-1 right-0 hidden group-hover:block transition-all duration-300">
                          {wallet.balance}
                        </div>
                      </h2>
                    </div>
                    <div
                      className={`border border-[#F3F4F9] ${
                        isDark
                          ? "bg-black/50 text-white"
                          : "bg-[#e7ecf5] text-[#3C3C43]"
                      } rounded-full w-20 h-[35px] px-2.5 py-1.5 font-bold text-sm flex justify-center items-center`}
                    >
                      ~${wallet.amount}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* quick actions */}
        <Card>
          <Heading heading={"Quick Actions"} />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-5">
            {quickActions.map((action, idx) => {
              return (
                <div
                  key={idx}
                  onClick={action.onClick}
                  className="h-[150px] w-full border border-[#E5E7EB] rounded-2xl relative overflow-hidden p-5 space-y-2 cursor-pointer hover:shadow-md transition-all duration-300"
                >
                  <img src={action.image} alt={action.title} />
                  <h3
                    className={`${
                      isDark ? "text-white/90" : "text-black/90"
                    } font-bold text-base leading-[26px]`}
                  >
                    {action.title}
                  </h3>
                  <p
                    className={`${
                      isDark ? "text-white/80" : "text-black/80"
                    }font-normal text-sm`}
                  >
                    {action.subtitle}
                  </p>
                </div>
              );
            })}
          </div>
        </Card>

        {/* recent transactions */}
        <Card>
          <Heading heading={"Recent Transactions"} />
          <div className="m-4">
            <TransactionsTable data={transactions} />
          </div>
        </Card>

        <Navbar />
      </div>

      <WithdrawModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />

      <SwapModal
        isOpen={isSwapModalOpen}
        onClose={() => setIsSwapModalOpen(false)}
      />
    </BaseLayout>
  );
};

export default GoWalletComponent;
