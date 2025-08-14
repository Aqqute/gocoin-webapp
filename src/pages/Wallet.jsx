import React, { useEffect, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import Navbar from "../components/Navbar";
import Icon from "../../public/images/GoLogo.png";
import { X } from "lucide-react";
import axios from "axios";
import PageLoader from "../components/PageLoader";
import { useAuth } from "../contexts/AuthContext";
import watermark from "../../public/images/watermark.svg";
import withdraw from "../../public/images/withdraw.svg";
import send from "../../public/images/send.svg";
import receive from "../../public/images/recieve.svg";
import swap from "../../public/images/swap.svg";
import TransactionsTable from "../components/Table";
import BaseLayout from "../components/Layout";
import WithdrawModal from "../components/WithdrawModal";
import Button from "../components/Button";

function Heading({ heading }) {
const { theme } = useTheme();
const isDark = theme === "dark";
  return <h4 className={`font-bold text-xl leading-8 ${isDark ? 'text-white' : 'text-black'}`}>{heading}</h4>;
}

function Card({ children }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div className={`${isDark ? "bg-black text-white" : "bg-gray-50 text-black"} h-fit w-full rounded-2xl shadow-sm p-6`}>
      {children}
    </div>
  );
}




//   {
//     date: "1 Jul, 2025",
//     type: "Withdrawal",
//     amount: "₦8,000",
//     method: "Visa 4893",
//     status: "Completed",
//   },
//   {
//     date: "1 Jul, 2025",
//     type: "Received",
//     amount: "₦8,000",
//     method: "Visa 4893",
//     status: "Completed",
//   },
//   {
//     date: "1 Jul, 2025",
//     type: "Sent",
//     amount: "₦8,000",
//     method: "Visa 4893",
//     status: "Completed",
//   },
//   {
//     date: "1 Jul, 2025",
//     type: "Swap",
//     amount: "₦8,000",
//     method: "Visa 4893",
//     status: "Completed",
//   },
//   {
//     date: "1 Jul, 2025",
//     type: "Bill Payment",
//     amount: "₦8,000",
//     method: "Visa 4893",
//     status: "Completed",
//   },
//   {
//     date: "1 Jul, 2025",
//     type: "Savings",
//     amount: "₦8,000",
//     method: "Visa 4893",
//     status: "Completed",
//   },
// ];

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

  const wallets = [
    { name: "Go token balance", balance: balance, amount: "20.00", },
    { name: "Metamask wallet", balance: "0.0046589", amount: "20.00", },
    { name: "Solana wallet", balance: "0.0046589", amount: "20.00", },
  ];

  const quickActions = [
    { title: "Withdraw", subtitle: "Select withdrawal method",  image: withdraw},
    {
      title: "Receive payments",
      subtitle: "Choose a method to recieve payments", 
      image: receive

    },
    { title: "Send Payments", subtitle: "Choose a method to send payments",  image: send},
    { title: "Swap", subtitle: "Swap between currencies e.g BTC to ETH",  image: swap},
  ];

  return (
    <BaseLayout>
      <div
        className={`min-h-screen flex flex-col gap-8 p-6 ${
          isDark ? "bg-black text-white" : "bg-gray-50 text-black"
        }`}
      >
        {/* wallets */}
        <Card>
          <div className="flex items-center justify-between">
          <Heading heading={"Your Wallets"} />
          {/* test btn */}
          <div className="w-[200px]">
            <Button content={"Withdraw"} onClick={() => setIsModalOpen(true)}/>
          </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
            {wallets.map((wallet, idx) => {
              return (
                <div
                  key={idx}
                  className={`h-[120px] w-full border ${isDark ? 'border-gray-500' : 'border-[#E5E7EB]'} rounded-2xl relative p-5 cursor-pointer hover:shadow-md transition-all duration-300`}
                >
                  <img src={watermark} className="absolute top-0 right-10" />
                  <div className="flex justify-between items-center z-10">
                    <div className="space-y-1">
                      <p className={`text-sm ${isDark ? 'text-white/80' : 'text-[#393A3F]'} font-normal`}>
                        {wallet.name}
                      </p>
                      <h2 className={`${isDark ? 'text-white/90' : 'text-black/90'} font-bold text-[28px] leading-11 truncate w-[200px] relative group`}>
                        {wallet.balance}
                        <div className="absolute bg-gray-100 text-gray-950 text-xs p-1 rounded-full -bottom-1 right-0 hidden group-hover:block transition-all duration-300">{wallet.balance}</div>
                      </h2>
                    </div>
                    <div className={`border border-[#F3F4F9] ${isDark ? 'bg-black/50 text-white' : 'bg-[#e7ecf5] text-[#3C3C43]'} rounded-full w-20 h-[35px] px-2.5 py-1.5 font-bold text-sm flex justify-center items-center`}>
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
                  className="h-[150px] w-full border border-[#E5E7EB] rounded-2xl relative overflow-hidden p-5 space-y-2 cursor-pointer hover:shadow-md transition-all duration-300"
                >
                  <img src={action.image} alt={action.title} />
                  <h3 className={`${isDark ? 'text-white/90' : 'text-black/90'} font-bold text-base leading-[26px]`}>{action.title}</h3>
                  <p className={`${isDark ? 'text-white/80' : 'text-black/80'}font-normal text-sm`}>{action.subtitle}</p>
                </div>
              );
            })}
          </div>
        </Card>

        {/* recent transactions */}
        <Card>
          <Heading heading={"Recent Transactions"} />
          <div className="m-4">
            <TransactionsTable data={transactions}/>
          </div>
        </Card>

        <Navbar />
      </div>

      <WithdrawModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </BaseLayout>
  );
};

export default GoWalletComponent;
