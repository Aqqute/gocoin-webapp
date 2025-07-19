import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

const Withdraw = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [bankStep, setBankStep] = useState(1);

  const handleBack = () => navigate("/wallet");

  const cardStyle = `${
    isDark ? "bg-[#2a2a2a]" : "bg-white"
  } rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md`;

  const inputStyle = `w-full p-2 rounded border ${
    isDark
      ? "bg-[#1e1e1e] border-gray-600 text-white"
      : "bg-white border-gray-300 text-black"
  }`;

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDark ? "bg-[#1e1e1e] text-white" : "bg-[#f9f9f9] text-black"
      }`}
    >
      {/* Header */}
      <div className="flex items-center px-4 pt-6 pb-3">
        <button onClick={handleBack} className="mr-4">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-base font-semibold">Select a withdrawal method</h1>
      </div>

      {/* Options */}
      <div className="px-4 mt-6 space-y-4">
        <div onClick={() => setShowWalletModal(true)} className={cardStyle}>
          <h2 className="font-medium text-sm">Withdraw to Wallet</h2>
          <p className="text-sm text-gray-400">
            Instant withdrawal to your connected crypto wallet
          </p>
        </div>

        <div
          onClick={() => {
            setShowBankModal(true);
            setBankStep(1);
          }}
          className={cardStyle}
        >
          <h2 className="font-medium text-sm">Withdraw to Bank</h2>
          <p className="text-sm text-gray-400">
            Send money to your local bank account
          </p>
        </div>
        <button className="w-full bg-orange-500 text-white p-2 mt-3 rounded-full">
           Withdrawal
        </button>
      </div>

      {/* Wallet Modal */}
      {showWalletModal && (
        <Modal onClose={() => setShowWalletModal(false)}>
          <h2 className="text-lg font-semibold mb-4">
            Withdraw to Connected Wallet
          </h2>
          <input
            className={inputStyle + " mb-4"}
            type="number"
            placeholder="Enter Go amount"
          />
          <button className="w-full bg-orange-500 text-white p-2 rounded">
            Withdraw
          </button>
        </Modal>
      )}

      {/* Bank Modal */}
      {showBankModal && (
        <Modal onClose={() => setShowBankModal(false)}>
          <h2 className="text-lg font-semibold mb-4">Withdraw to Bank</h2>

          {bankStep === 1 && (
            <div className="space-y-4">
              <input
                className={inputStyle}
                type="text"
                placeholder="Account Number"
              />
              <input
                className={inputStyle}
                type="text"
                placeholder="Bank Name"
              />
              <input
                className={inputStyle}
                type="number"
                placeholder="Amount"
              />
              <input
                className={inputStyle}
                type="text"
                placeholder="Payment Description (optional)"
              />
              <button
                onClick={() => setBankStep(2)}
                className="w-full bg-orange-500 text-white p-2 rounded"
              >
                Continue
              </button>
            </div>
          )}

          {bankStep === 2 && (
            <div className="space-y-4">
              <input
                className={inputStyle}
                type="password"
                placeholder="Enter Password"
              />
              <button
                onClick={() => setBankStep(3)}
                className="w-full bg-orange-500 text-white p-2 rounded"
              >
                Confirm
              </button>
              <button
                onClick={() => setBankStep(1)}
                className="w-full text-sm text-gray-400"
              >
                Back
              </button>
            </div>
          )}

          {bankStep === 3 && (
            <div className="space-y-4 text-sm">
              <p>You're about to withdraw to:</p>
              <p className="font-semibold">Access Bank - 0123456789</p>
              <p>Amount: ₦5,000</p>
              <button
                className="w-full bg-orange-500 text-white p-2 rounded"
                onClick={() => {
                  setShowBankModal(false);
                  // TODO: Handle actual withdrawal
                }}
              >
                Confirm Withdrawal
              </button>
              <button
                onClick={() => setBankStep(2)}
                className="w-full text-sm text-gray-400"
              >
                Back
              </button>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

const Modal = ({ children, onClose }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div
        className={`relative w-[90%] max-w-md rounded-lg p-6 shadow-xl ${
          isDark ? "bg-[#2a2a2a] text-white" : "bg-white text-black"
        }`}
      >
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
        >
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Withdraw;
