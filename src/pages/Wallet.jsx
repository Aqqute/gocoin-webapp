import React, { useEffect, useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import Icon from "../../public/images/GoLogo.png";
import { X } from "lucide-react";
import axios from "axios";
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
import { Card } from "../components/ui/Card"; // ✅ assuming you use shadcn/ui

// Heading component
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

// Main Wallet Component
const GoWalletComponent = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { token } = useAuth();

  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isSwapModalOpen, setIsSwapModalOpen] = useState(false);
  const [balance, setBalance] = useState(null);
  const [fiatEquivalent, setFiatEquivalent] = useState(null);
  const [fiatCurrency, setFiatCurrency] = useState("USD");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Solana/GoToken balances
  const [solBalance, setSolBalance] = useState(null);
  const [goTokenBalance, setGoTokenBalance] = useState(null);
  const [walletAddress, setWalletAddress] = useState("");

  // Fetch wallet balance + transactions from backend
  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const [balanceRes, txRes] = await Promise.all([
          axios.get("https://gocoin.onrender.com/api/wallet/balance", config),
          axios.get("https://gocoin.onrender.com/api/wallet/transactions", config),
        ]);

        setBalance(balanceRes.data.data.goTokenBalance || "0.000000");
        setFiatEquivalent(balanceRes.data.data.fiatEquivalent || "0.00");
        setFiatCurrency(balanceRes.data.data.fiatCurrency || "USD");
        setTransactions(txRes.data.data.transactions || []);
      } catch (error) {
        console.error("Failed to fetch wallet data:", error);
        setBalance("0.000000");
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchWalletData();
  }, [token]);

  // Get Phantom wallet from window or localStorage
  useEffect(() => {
    let addr = "";
    if (window.solana && window.solana.isPhantom && window.solana.publicKey) {
      addr = window.solana.publicKey.toString();
    } else {
      addr = localStorage.getItem("phantomAddress") || "";
    }
    setWalletAddress(addr);
  }, []);

  // Fetch Solana + GoToken balances
  useEffect(() => {
    const fetchBalances = async () => {
      if (!walletAddress) {
        setSolBalance(null);
        setGoTokenBalance(null);
        return;
      }
      try {
        const connection = new Connection("https://api.mainnet-beta.solana.com");
        const sol = await connection.getBalance(new PublicKey(walletAddress));
        setSolBalance(sol / 1e9);

        const mintPubkey = new PublicKey("2Kr7Whxn5UE28tEqSxJJNQkrVFnVFS5VKf51XMhJpump");
        const ownerPubkey = new PublicKey(walletAddress);
        const ata = await getAssociatedTokenAddress(mintPubkey, ownerPubkey);
        const accountInfo = await connection.getTokenAccountBalance(ata);
        setGoTokenBalance(accountInfo.value.uiAmount || 0);
      } catch (err) {
        console.error("Balance fetch error:", err);
        setSolBalance(0);
        setGoTokenBalance(0);
      }
    };

    if (walletAddress) fetchBalances();
  }, [walletAddress]);

  const wallets = [
    { name: "GoToken Balance", balance: goTokenBalance, symbol: "GoToken", color: "text-blue-500" },
    { name: "Solana Wallet Balance", balance: solBalance, symbol: "SOL", color: "text-purple-500" },
    { name: "GoToken (Fiat)", balance: balance, amount: fiatEquivalent, currency: fiatCurrency },
  ];

  const quickActions = [
    { title: "Withdraw", subtitle: "Select withdrawal method", image: withdraw, onClick: () => setIsWalletModalOpen(true) },
    { title: "Receive payments", subtitle: "Choose a method to receive payments", image: receive, onClick: () => console.log("Receive") },
    { title: "Send Payments", subtitle: "Choose a method to send payments", image: send, onClick: () => console.log("Send") },
    { title: "Swap", subtitle: "Swap between currencies e.g BTC to ETH", image: swap, onClick: () => setIsSwapModalOpen(true) },
  ];

  return (
    <BaseLayout>
      <div className={`min-h-screen flex flex-col ${isDark ? "bg-black text-white" : "bg-[#f9f9f9] text-black"}`}>
        {/* Wallet Balances */}
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
            {wallets.map((wallet, idx) => (
              <div
                key={idx}
                className={`h-[120px] w-full border ${isDark ? "border-gray-500" : "border-gray-300"} rounded-2xl relative p-5`}
              >
                <img src={watermark} className="absolute top-0 right-10 opacity-20" alt="watermark" />
                <div className="flex flex-col justify-between h-full z-10">
                  <p className="text-sm font-semibold">{wallet.name}</p>
                  <h2 className={`font-bold text-[28px] mt-2 ${isDark ? "text-white" : "text-black"}`}>
                    {wallet.balance === null ? "--" : Number(wallet.balance).toFixed(4)}
                  </h2>
                  {wallet.symbol && <span className="text-xs mt-1">{wallet.symbol}</span>}
                  {wallet.amount && <span className="text-xs mt-1">~${wallet.amount} {wallet.currency}</span>}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card>
          <Heading heading={"Quick Actions"} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
            {quickActions.map((action, idx) => (
              <div
                key={idx}
                onClick={action.onClick}
                className="h-[130px] w-full border border-[#E5E7EB] rounded-2xl px-2 cursor-pointer hover:shadow-md"
              >
                <img src={action.image} alt={action.title} />
                <h3 className="font-bold text-base">{action.title}</h3>
                <p className="text-sm">{action.subtitle}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Transactions */}
        <Card>
          <Heading heading={"Recent Transactions"} />
          <div className="m-4">
            <TransactionsTable data={transactions} />
          </div>
        </Card>

        <Navbar />
      </div>

      {/* Modals */}
      <WithdrawModal isOpen={isWalletModalOpen} onClose={() => setIsWalletModalOpen(false)} />
      <SwapModal isOpen={isSwapModalOpen} onClose={() => setIsSwapModalOpen(false)} />
    </BaseLayout>
  );
};

export default GoWalletComponent;
