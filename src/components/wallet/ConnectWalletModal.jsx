import React from "react";
import Modal from "../PopupModal";
import Button from "../Button";
import MetaMaskLogo from "../../../public/images/MetaMask.webp";
import PhantomLogo from "../../../public/images/phantom.jpeg";
// Add more wallet logos as needed

const wallets = [
  {
    id: "metamask",
    name: "MetaMask",
    logo: MetaMaskLogo,
    description: "Ethereum, BSC, Polygon, etc.",
  },
  {
    id: "phantom",
    name: "Phantom",
    logo: PhantomLogo,
    description: "Solana, SPL tokens",
  },
  // Add more wallets here
];

const ConnectWalletModal = ({ isOpen, onClose, onConnect }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4 text-center">Connect a Wallet</h2>
        <div className="grid gap-4">
          {wallets.map((w) => (
            <button
              key={w.id}
              onClick={() => onConnect(w.id)}
              className="flex items-center gap-3 p-3 rounded-xl border hover:bg-orange-50 transition"
            >
              <img src={w.logo} alt={w.name} className="w-8 h-8 rounded-full" />
              <div className="flex flex-col items-start">
                <span className="font-semibold text-base">{w.name}</span>
                <span className="text-xs text-gray-500">{w.description}</span>
              </div>
            </button>
          ))}
        </div>
        <Button content="Close" onClick={onClose} className="mt-6 w-full" />
      </div>
    </Modal>
  );
};

export default ConnectWalletModal;
