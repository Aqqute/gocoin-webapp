import React, { useState } from 'react';
import { Plus, MoreVertical, Trash2 } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const ManageWallet = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [wallets, setWallets] = useState([
    { id: 1, name: "Wallet name", address: "Wallet address", icon: "🦊" },
    { id: 2, name: "Wallet name", address: "Wallet address", icon: "🦊" },
    { id: 3, name: "Wallet name", address: "Wallet address", icon: "🦊" },
  ]);

  const handleRemoveWallet = (id) => {
    // In a real app, this would involve API calls and confirmation
    setWallets(wallets.filter(wallet => wallet.id !== id));
  };

  const cardStyle = `${isDark ? 'bg-[#2a2a2a]' : 'bg-white'} rounded-xl p-3 shadow-sm`;
  const addCardStyle = `border-2 border-dashed ${isDark ? 'border-gray-600 text-gray-400' : 'border-gray-300 text-gray-500'} flex flex-col items-center justify-center p-4 h-full`;


  return (
    <div className={`flex flex-col h-full ${isDark ? 'text-white' : 'text-black'}`}>
      <h2 className="text-lg font-semibold mb-4">Manage Wallet</h2>

      <div className="grid grid-cols-2 gap-4">
        {/* Add Crypto Wallet Card */}
        <div className={`${cardStyle} ${addCardStyle} cursor-pointer hover:opacity-80`}>
          <Plus size={24} />
          <p className="mt-2 text-sm font-medium">Add Crypto Wallet</p>
        </div>

        {/* Existing Wallet Cards */}
        {wallets.map((wallet) => (
          <div
            key={wallet.id}
            className={`${cardStyle} relative group overflow-hidden`}
          >
            <div className="flex items-center mb-2">
              <span className="text-xl mr-2">{wallet.icon}</span>
              <p className="text-sm font-medium">{wallet.name}</p>
            </div>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-xs`}>{wallet.address}</p>

            {/* More Vertical Icon and Remove button */}
            <div className="absolute top-2 right-2 flex items-center">
              <button
                onClick={() => handleRemoveWallet(wallet.id)}
                className="bg-red-500 text-white p-1 rounded-md text-xs flex items-center gap-1 
                           transform translate-x-full group-hover:translate-x-0 transition-transform duration-200 ease-out"
              >
                <Trash2 size={14} /> Remove Wallet
              </button>
              <MoreVertical size={18} className={`${isDark ? 'text-gray-400' : 'text-gray-500'} ml-1`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageWallet;