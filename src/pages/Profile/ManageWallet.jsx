import React, { useState, useEffect } from "react";
import { Plus, MoreVertical, Trash2 } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

const ManageWallet = () => {
  const { theme } = useTheme();
  const { token } = useAuth();
  const isDark = theme === "dark";

  const [wallets, setWallets] = useState([]);
  const [connecting, setConnecting] = useState(false);

  // Fetch wallets on mount
  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const res = await axios.get("https://gocoin.onrender.com/api/users/me", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setWallets(res.data.user.connectedWallets || []);
      } catch (error) {
        setWallets([]);
      }
    };
    fetchWallets();
  }, []);

  // Connect Metamask
  const handleConnectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install Metamask to connect a wallet.");
      return;
    }

    try {
      setConnecting(true);
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const account = accounts[0];
      const newWallet = { walletType: "Metamask Wallet", address: account };
      
      console.log("i am the token", token);
      const response = await axios.post(
        "https://gocoin.onrender.com/api/wallet/add-wallet",
        newWallet,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setWallets(response.data.data.connectedWallets || []);
      setConnecting(false);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      alert("Error connecting wallet");
      setConnecting(false);
    }
  };

  // Remove wallet
  const handleRemoveWallet = async (address) => {
    try {
      console.log('i amk removing wallet token:', token);
      const response = await axios.delete(
  "https://gocoin.onrender.com/api/wallet/remove-wallet",
  {
    headers: { Authorization: `Bearer ${token}` },
    data: { address }
  }
);
      setWallets(response.data.data.connectedWallets || []);
    } catch (error) {
      console.error("Failed to remove wallet:", error);
    }
  };

  const cardStyle = `${isDark ? "bg-[#2a2a2a]" : "bg-white"} rounded-xl p-3 shadow-sm`;
  const addCardStyle = `border-2 border-dashed ${
    isDark ? "border-gray-600 text-gray-400" : "border-gray-300 text-gray-500"
  } flex flex-col items-center justify-center p-4 h-full`;

  return (
    <div className={`flex flex-col h-full ${isDark ? "text-white" : "text-black"}`}>
      <h2 className="text-lg font-semibold mb-4">Manage Wallet</h2>

      <div className="grid grid-cols-2 gap-4">
        {/* Add Wallet Button */}
        <div
          onClick={handleConnectWallet}
          className={`${cardStyle} ${addCardStyle} cursor-pointer hover:opacity-80`}
        >
          {connecting ? (
            <p className="text-sm font-medium">Connecting...</p>
          ) : (
            <>
              <Plus size={24} />
              <p className="mt-2 text-sm font-medium">Connect Metamask</p>
            </>
          )}
        </div>

        {/* Existing Wallets */}
        {wallets.map((wallet) => (
          <div key={wallet._id || wallet.address} className={`${cardStyle} relative group overflow-hidden`}>
            <div className="flex items-center mb-2">
              <span className="text-xl mr-2">🦊</span>
              <p className="text-sm font-medium">{wallet.walletType}</p>
            </div>
            <p className={`${isDark ? "text-gray-400" : "text-gray-600"} text-xs`}>
              {wallet.address}
            </p>

            <div className="absolute top-2 right-2 flex items-center">
              <button
                onClick={() => handleRemoveWallet(wallet.address)}
                className="bg-red-500 text-white p-1 rounded-md text-xs flex items-center gap-1 
                           transform translate-x-full group-hover:translate-x-0 transition-transform duration-200 ease-out"
              >
                <Trash2 size={14} /> Remove Wallet
              </button>
              <MoreVertical
                size={18}
                className={`${isDark ? "text-gray-400" : "text-gray-500"} ml-1`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageWallet;
