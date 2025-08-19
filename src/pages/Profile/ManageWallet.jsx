import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2, AlertTriangle } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import WalletCard from "../../components/WalletCard";

// Icons


const ManageWallet = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [wallets, setWallets] = useState([
    { name: "MetaMask", address: "0xA1B2...98fC", icon: MetaMaskLogo },
    null,
    { name: "Trust Wallet", address: "0xF7G8...e7B2", icon: TrustWalletLogo },
    null,
  ]);

  const [openDropdown, setOpenDropdown] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedWalletIndex, setSelectedWalletIndex] = useState(null);

  const handleBack = () => navigate("/profile");

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
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const confirmRemoveWallet = () => {
    const newWallets = [...wallets];
    newWallets[selectedWalletIndex] = null;
    setWallets(newWallets);
    setShowModal(false);
    setOpenDropdown(null);
    setSelectedWalletIndex(null);
  };

  const handleRemoveWallet = (index) => {
    setSelectedWalletIndex(index);
    setShowModal(true);
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
      <div className="space-y-4 mt-6 relative">
        {wallets.map((wallet, index) => (
          <div key={index} className="relative">
            <WalletCard
              wallet={wallet}
              onAddWallet={() => handleAddWallet(index)}
              onOptionsClick={() => handleOptionsClick(index)}
              isDark={isDark}
            />

            {openDropdown === index && wallet && (
              <div
                className={`absolute right-4 top-16 z-10 w-40 rounded-xl border shadow-lg ${
                  isDark ? "bg-[#2a2a2a] border-[#333]" : "bg-white border-gray-200"
                }`}
              >
                <button
                  onClick={() => handleRemoveWallet(index)}
                  className="w-full p-4 flex items-center gap-2 text-sm hover:bg-red-50 text-red-600"
                >
                  <Trash2 size={16} />
                  Remove Wallet
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div
            className={`w-full max-w-md p-6 rounded-xl shadow-lg flex flex-col space-y-4 ${
              isDark ? "bg-[#2a2a2a] text-white" : "bg-white text-black"
            }`}
          >
            {/* Icon and Title */}
            <div className="flex flex-col items-center text-center space-y-2">
              <AlertTriangle className="text-yellow-500" size={36} />
              <h2 className="text-lg font-semibold">Delete Wallet</h2>
            </div>

            {/* Message */}
            <p className="text-sm text-center">
              Once you’ve deleted this wallet, you will no longer have access to its Go Token
              balance and transaction history.
              <br />
              <strong>This action cannot be undone.</strong>
            </p>

            {/* Actions */}
            <div className="flex flex-col justify-between gap-3 pt-2">
              <button
                onClick={confirmRemoveWallet}
                className="w-full px-4 py-2 rounded-3xl text-sm font-medium bg-red-600 text-white hover:bg-red-700"
              >
                Delete Wallet
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="w-full px-4 py-2 rounded-3xl text-sm font-medium border border-gray-400 hover:bg-gray-100"
              >
                Cancel
              </button>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageWallet;
