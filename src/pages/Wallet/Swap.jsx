import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronDown, Bitcoin } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

const cryptocurrencies = [
  { name: "Bitcoin", symbol: "BTC", icon: <Bitcoin size={16} /> },
  { name: "Ethereum", symbol: "ETH", icon: <span className="text-purple-500">Ξ</span> },
  { name: "USDT", symbol: "USDT", icon: <span className="text-green-500">₮</span> },
];

const Withdraw = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [fromCrypto, setFromCrypto] = useState(cryptocurrencies[0]);
  const [toCrypto, setToCrypto] = useState(cryptocurrencies[1]);
  const [fromDropdownOpen, setFromDropdownOpen] = useState(false);
  const [toDropdownOpen, setToDropdownOpen] = useState(false);

  const handleBack = () => navigate("/wallet");

  const cardStyle = `${
    isDark ? "bg-[#2a2a2a]" : "bg-white"
  } rounded-lg p-3 shadow-sm cursor-pointer hover:shadow-md`;

  const inputStyle = `w-full p-2 text-sm rounded border ${
    isDark
      ? "bg-[#1e1e1e] border-gray-600 text-white"
      : "bg-white border-gray-300 text-black"
  }`;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-end">
      <div
        className={`w-full max-w-md p-4 rounded-t-xl shadow-lg transform transition-all duration-300 translate-y-0 animate-slide-up ${
          isDark ? "bg-[#2a2a2a] text-white" : "bg-white text-black"
        }`}
      >
        {/* Header */}
        <div className="flex items-center px-2 pt-5 pb-2">
          <button onClick={handleBack} className="mr-3">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-md font-semibold">Swap Currencies</h1>
        </div>

        {/* Options */}
        <div className="mt-4 space-y-3">
          {/* Swap From */}
          <div className={cardStyle}>
            <h2 className="font-medium text-sm">Swap From</h2>
            <div className="flex justify-between items-center mt-1 relative">
              <p className="text-sm px-1">0.0003</p>
              <button
                onClick={() => setFromDropdownOpen(!fromDropdownOpen)}
                className="flex items-center gap-1 px-2 py-1 rounded-md border text-sm border-gray-300 dark:border-gray-600"
              >
                {fromCrypto.icon}
                <span>{fromCrypto.symbol}</span>
                <ChevronDown size={16} />
              </button>

              {fromDropdownOpen && (
                <div className="absolute right-0 top-10 z-10 w-36 bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-700 rounded-md shadow-md">
                  {cryptocurrencies.map((crypto, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setFromCrypto(crypto);
                        setFromDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-[#3a3a3a]"
                    >
                      {crypto.icon}
                      {crypto.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Swap To */}
          <div className={cardStyle}>
            <h2 className="font-medium text-sm">Swap To</h2>
            <div className="flex justify-between items-center mt-1 relative">
              <p className="text-sm px-1">0.0055</p>
              <button
                onClick={() => setToDropdownOpen(!toDropdownOpen)}
                className="flex items-center gap-1 px-2 py-1 rounded-md border text-sm border-gray-300 dark:border-gray-600"
              >
                {toCrypto.icon}
                <span>{toCrypto.symbol}</span>
                <ChevronDown size={16} />
              </button>

              {toDropdownOpen && (
                <div className="absolute right-0 top-10 z-10 w-36 bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-700 rounded-md shadow-md">
                  {cryptocurrencies.map((crypto, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setToCrypto(crypto);
                        setToDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-[#3a3a3a]"
                    >
                      {crypto.icon}
                      {crypto.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Swap Button */}
          <button className="w-full bg-orange-500 text-white p-2 mt-3 rounded-full text-sm">
            Swap
          </button>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
