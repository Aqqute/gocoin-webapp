import React from "react";
import { Plus, MoreVertical } from "lucide-react";

const WalletCard = ({ wallet, onAddWallet, onOptionsClick, isDark }) => {
  const isConnected = Boolean(wallet);

  return (
    <div
      className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl ${
        isDark ? "bg-[#2a2a2a] text-white" : "bg-white text-black"
      } shadow-md`}
    >
      {!isConnected ? (
        <button
          onClick={onAddWallet}
          className="flex items-center gap-3 w-full"
        >
          <div className="w-8 h-8 border-2 border-dashed border-orange-400 rounded-lg flex items-center justify-center">
            <Plus className="text-orange-400" size={18} />
          </div>
          <span className="text-sm font-medium">Add Crypto Wallet</span>
        </button>
      ) : (
        <>
          <div className="flex items-center gap-3">
            {/* Icon */}
            <img
              src={wallet.icon}
              alt={wallet.name}
              className="w-8 h-8 rounded-md object-contain"
            />
            <div className="text-sm font-medium truncate max-w-[140px]">
              {wallet.address}
            </div>
          </div>

          <button onClick={onOptionsClick}>
            <MoreVertical size={20} className={isDark ? "text-white" : "text-gray-700"} />
          </button>
        </>
      )}
    </div>
  );
};

export default WalletCard;
