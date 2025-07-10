import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import WalletCard from "../../components/WalletCard";

// Icons
import MetaMaskLogo from "../../../public/images/MetaMask.webp";
import TrustWalletLogo from "../../../public/images/TrustWallet.png";

const ManageWallet = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleBack = () => navigate("/profile");

  const [wallets, setWallets] = useState([
    {
      name: "MetaMask",
      address: "0xA1B2...98fC",
      icon: MetaMaskLogo,
    },
    null,
    {
      name: "Trust Wallet",
      address: "0xF7G8...e7B2",
      icon: TrustWalletLogo,
    },
    null,
  ]);

  const handleAddWallet = (index) => {
    const newWallets = [...wallets];
    newWallets[index] = {
      name: "New Wallet",
      address: "0x1234...abcd",
      icon: MetaMaskLogo,
    };
    setWallets(newWallets);
  };

  const handleOptionsClick = (index) => {
    alert(`Options for wallet at index ${index}`);
  };

  return (
    <div
      className={`min-h-screen flex flex-col px-4 pt-6 pb-8 ${
        isDark ? "bg-[#1e1e1e] text-white" : "bg-[#f9f9f9] text-black"
      }`}
    >
      {/* Header */}
      <div className="flex items-center pb-4">
        <button onClick={handleBack} className="mr-4">
          <ArrowLeft size={20} className={isDark ? "text-white" : "text-black"} />
        </button>
        <h1 className="text-base font-semibold">Manage Wallet</h1>
      </div>

      {/* Wallet Cards */}
      <div className="space-y-3 mt-6">
        {wallets.map((wallet, index) => (
          <WalletCard
            key={index}
            wallet={wallet}
            onAddWallet={() => handleAddWallet(index)}
            onOptionsClick={() => handleOptionsClick(index)}
            isDark={isDark}
          />
        ))}
      </div>
    </div>
  );
};

export default ManageWallet;
