import React from "react";
import Navbar from "../components/Navbar";
import { useTheme } from "../contexts/ThemeContext";

const Wallet = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bgColor = isDark ? "bg-[#1e1e1e]" : "bg-[#f9f9f9]";
  const textColor = isDark ? "text-white" : "text-black";

  return (
    <div className={`min-h-screen ${bgColor} ${textColor} pt-10 pb-24`}>
      <div className="text-center text-2xl font-semibold mb-4">
        <h1>Wallet</h1>
      </div>

      {/* Example Wallet content */}
      <div className="px-4">
        <p className="mb-2">Your GoCoin wallet will appear here.</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Track your earnings, balances, and transactions.
        </p>
      </div>

      <Navbar />
    </div>
  );
};

export default Wallet;
