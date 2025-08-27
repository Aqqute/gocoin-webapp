import React, { useState, useEffect } from "react";
import { Plus, MoreVertical, Trash2, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../contexts/AuthContext";
import WithdrawModal from "../../components/wallet/WithdrawModal";
import TransferModal from "../../components/wallet/TransferModal";
import ConnectWalletModal from "../../components/wallet/ConnectWalletModal";
import BuyTokenModal from "../../components/wallet/BuyTokenModal";
import { Connection, PublicKey } from "@solana/web3.js";

const ManageWallet = () => {
  const { theme } = useTheme();
  const { token } = useAuth();
  const isDark = theme === "dark";

  const [wallets, setWallets] = useState([]);
  const [connecting, setConnecting] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [showBuyToken, setShowBuyToken] = useState(false);
  const [phantomAddress, setPhantomAddress] = useState("");

  // Fetch wallets on mount and after changes
  const fetchWallets = async () => {
    try {
      const res = await axios.get("https://gocoin.onrender.com/api/wallet/get-wallet", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWallets(res.data.data?.connectedWallets || res.data.data || []);
    } catch (error) {
      setWallets([]);
    }
  };
  useEffect(() => {
    if (token) fetchWallets();
  }, [token]);

  // Connect Metamask
  // Handle wallet connect modal and logic
  const handleConnectWallet = () => {
    setShowConnectModal(true);
  };

  // Connect MetaMask
  const connectMetaMask = async () => {
    if (!window.ethereum) {
      toast.error("Please install MetaMask to connect a wallet.");
      return;
    }
    setConnecting(true);
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      if (!accounts || accounts.length === 0) {
        toast.error("No accounts found in MetaMask.");
        setConnecting(false);
        return;
      }
      let added = false;
      for (const acc of accounts) {
        if (!wallets.some((w) => w.address === acc && w.walletType === "Metamask Wallet")) {
          await axios.post(
            "https://gocoin.onrender.com/api/wallet/add-wallet",
            { walletType: "Metamask Wallet", address: acc },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          added = true;
        }
      }
      if (added) {
        toast.success("MetaMask wallet(s) connected.");
      } else {
        toast("MetaMask wallet already connected.");
      }
      await fetchWallets();
    } catch (error) {
      if (error?.code === 4001) {
        toast.error("Connection request rejected by user.");
      } else {
        toast.error(error?.response?.data?.message || error.message || "Error connecting MetaMask");
      }
    } finally {
      setConnecting(false);
      setShowConnectModal(false);
    }
  };

  // Connect Phantom (Solana)
  const connectPhantom = async () => {
    const provider = window.solana;
    if (!provider || !provider.isPhantom) {
      toast.error("Please install Phantom Wallet to connect.");
      return;
    }
    setConnecting(true);
    try {
      const resp = await provider.connect();
      const acc = resp.publicKey?.toString();
      // Get SOL balance
      const connection = new Connection("https://api.mainnet-beta.solana.com");
      let balance = 0;
      if (acc) {
        balance = await connection.getBalance(new PublicKey(acc));
      }
      // Save wallet
      if (!wallets.some((w) => w.address === acc && w.walletType === "Phantom Wallet")) {
        await axios.post(
          "https://gocoin.onrender.com/api/wallet/add-wallet",
          { walletType: "Phantom Wallet", address: acc, balance: balance / 1e9 },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Phantom wallet connected.");
        await fetchWallets();
      } else {
        toast("Phantom wallet already connected.");
      }
    } catch (error) {
      toast.error(error?.message || "Error connecting Phantom");
    } finally {
      setConnecting(false);
      setShowConnectModal(false);
    }
  };

  // Utility: send SOL from Phantom
  async function sendSol(destination, amount) {
    const provider = window.solana;
    const connection = new Connection("https://api.mainnet-beta.solana.com");
    const fromPubkey = provider.publicKey;
    const toPubkey = new PublicKey(destination);
    const { SystemProgram, Transaction } = await import("@solana/web3.js");
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey,
        toPubkey,
        lamports: amount * 1e9, // 1 SOL = 1e9 lamports
      })
    );
    const { signature } = await provider.signAndSendTransaction(transaction);
    await connection.confirmTransaction(signature);
    return signature;
  }

  // Add more wallet connectors here as needed

  const handleWalletTypeSelect = async (type) => {
    if (type === "metamask") {
      await connectMetaMask();
    } else if (type === "phantom") {
      await connectPhantom();
    } else {
      toast.error("Wallet type not supported yet.");
    }
  };

  // Remove wallet
  const handleRemoveWallet = async (address) => {
    try {
      setConnecting(true);
      const response = await axios.delete(
        "https://gocoin.onrender.com/api/wallet/remove-wallet",
        {
          headers: { Authorization: `Bearer ${token}` },
          data: { address },
        }
      );
      toast.success("Wallet removed successfully.");
      await fetchWallets();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to remove wallet");
    } finally {
      setConnecting(false);
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
              <p className="mt-2 text-sm font-medium">Add Wallet</p>
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
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => setShowWithdraw(wallet.address)}
                className="flex items-center gap-1 px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-semibold hover:bg-orange-600"
              >
                <ArrowDownLeft size={14} /> Withdraw
              </button>
              <button
                onClick={() => setShowTransfer(wallet.address)}
                className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-500 text-white text-xs font-semibold hover:bg-green-600"
              >
                <ArrowUpRight size={14} /> Transfer
              </button>
              {wallet.walletType === "Phantom Wallet" && (
                <button
                  onClick={() => {
                    setPhantomAddress(wallet.address);
                    setShowBuyToken(true);
                  }}
                  className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700"
                >
                  Buy Token
                </button>
              )}
            </div>
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
      {/* Withdraw Modal (global, but passes wallets) */}
      <WithdrawModal isOpen={!!showWithdraw} onClose={() => setShowWithdraw(false)} />
      {/* Transfer Modal (global, passes wallets) */}
      <TransferModal isOpen={!!showTransfer} onClose={() => setShowTransfer(false)} wallets={wallets} />
      {/* Connect Wallet Modal */}
      <ConnectWalletModal
        isOpen={showConnectModal}
        onClose={() => setShowConnectModal(false)}
        onConnect={handleWalletTypeSelect}
      />
      {/* Buy Token Modal for Phantom */}
      <BuyTokenModal
        isOpen={showBuyToken}
        onClose={() => setShowBuyToken(false)}
        phantomAddress={phantomAddress}
      />
    </div>
  );
};

export default ManageWallet;
