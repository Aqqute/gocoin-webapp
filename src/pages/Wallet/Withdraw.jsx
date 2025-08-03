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
    isDark ? "bg-black" : "bg-white"
  } rounded-lg p-3 shadow-sm cursor-pointer hover:shadow-md`;

  const inputStyle = `w-full p-2 text-sm rounded border ${
    isDark
      ? "bg-[#1e1e1e] border-gray-600 text-white"
      : "bg-white border-gray-300 text-black"
  }`;

  const smallText = "text-sm";

  return (
    <div className="fixed inset-0 z-50  bg-opacity-50 flex justify-center items-end">
      <div
        className={`w-full max-w-md p-4 rounded-t-xl shadow-lg transform transition-all duration-300 translate-y-0 animate-slide-up ${
          isDark ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        {/* Header */}
        <div className="flex items-center px-2 pt-5 pb-2">
          <button onClick={handleBack} className="mr-3">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-md font-semibold">Select a withdrawal method</h1>
        </div>

        {/* Options */}
        <div className=" mt-4 space-y-3">
          <div onClick={() => setShowWalletModal(true)} className={cardStyle}>
            <h2 className="font-medium text-sm">Withdraw to Wallet</h2>
            <p className="text-xs text-gray-400">
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
            <p className="text-xs text-gray-400">
              Send money to your local bank account
            </p>
          </div>
          <button className="w-full bg-orange-500 text-white p-2 mt-3 rounded-full text-sm">
            Withdrawal
          </button>
        </div>

        {/* Wallet Modal */}
        {showWalletModal && (
          <Modal onClose={() => setShowWalletModal(false)}>
            <h2 className="text-base font-semibold mb-3">
              Withdraw to Connected Wallet
            </h2>

            <label className={`font-semibold text-sm ${smallText}`}>
              Go Amount
            </label>
            <input
              className={`mt-2 mb-4 ${inputStyle}`}
              type="number"
              placeholder="Enter Go amount"
            />

            <button className="w-full bg-orange-500 text-white p-2 rounded-full text-sm">
              Withdraw
            </button>
          </Modal>
        )}

        {/* Bank Modal */}
        {showBankModal && (
          <Modal onClose={() => setShowBankModal(false)}>
            <h2 className="text-base font-bold mb-3">Withdraw to Bank</h2>

            {bankStep === 1 && (
              <div className="space-y-4">
                <div>
                  <label className={`font-semibold text-sm ${smallText}`}>
                    Account Number
                  </label>
                  <input
                    className={`mt-2 ${inputStyle}`}
                    type="text"
                    placeholder="e.g. 0123456789"
                  />
                </div>

                <div>
                  <label className={`font-semibold text-sm ${smallText}`}>
                    Bank
                  </label>
                  <select className={`mt-2 ${inputStyle}`}>
                    <option value="">Select your bank</option>
                    <option value="access">Access Bank</option>
                    <option value="gtbank">GTBank</option>
                    <option value="zenith">Zenith Bank</option>
                    <option value="uba">UBA</option>
                  </select>
                </div>

                <div>
                  <label className={`font-semibold text-sm ${smallText}`}>
                    Amount
                  </label>
                  <input
                    className={`mt-2 ${inputStyle}`}
                    type="number"
                    placeholder="e.g. 5000"
                  />
                </div>

                <div>
                  <label className={`font-semibold text-sm ${smallText}`}>
                    Payment Description
                  </label>
                  <textarea
                    className={`mt-2 ${inputStyle}`}
                    placeholder="Optional"
                  ></textarea>
                </div>

                <p className="text-xs text-gray-400">Add as beneficiary</p>

                <button
                  onClick={() => setBankStep(2)}
                  className="w-full bg-orange-500 text-white p-2 rounded-full text-sm mt-2"
                >
                  Withdraw
                </button>
              </div>
            )}

            {bankStep === 2 && (
              <div className="space-y-4">
                <div>
                  <label className={`font-semibold text-sm ${smallText}`}>
                    Password
                  </label>
                  <input
                    className={`mt-2 ${inputStyle}`}
                    type="password"
                    placeholder="Enter password"
                  />
                </div>

                <button
                  onClick={() => setBankStep(3)}
                  className="w-full bg-orange-500 text-white p-2 rounded-full text-sm"
                >
                  Confirm
                </button>
              </div>
            )}

            {bankStep === 3 && (
              <div className="space-y-4 text-sm">
                <div className="grid gap-4">
                  <div className="flex justify-between items-center p-2">
                    <h1>Amount</h1>
                    <strong>0.0005BTC</strong>
                  </div>
                  <div className="flex justify-between items-center p-2">
                    <h1>Transfer fee</h1>
                    <strong>Free</strong>
                  </div>
                  <div className="flex justify-between items-center p-2">
                    <h1>Total amount</h1>
                    <strong>0.0005BTC</strong>
                  </div>
                </div>

                <button
                  className="w-full bg-orange-500 text-white p-2 rounded-full mt-4 text-sm"
                  onClick={() => setBankStep(4)}
                >
                  Confirm Withdrawal
                </button>
              </div>
            )}
            {bankStep === 4 && (
              <div className="space-y-4 text-sm">
                <div className="grid gap-4">
                  <div className="flex justify-between items-center p-2">
                    <h1>Transaction ID</h1>
                    <strong>0.0005BTC</strong>
                  </div>
                  <div className="flex justify-between items-center p-2">
                    <h1>Status</h1>
                    <strong>Recieved</strong>
                  </div>
                  <div className="flex justify-between items-center p-2">
                    <h1>Amount Remitted</h1>
                    <strong>0.0005BTC</strong>
                  </div>
                  <div className="flex justify-between items-center p-2">
                    <h1>Total fee</h1>
                    <strong>0.0005BTC</strong>
                  </div>
                  <div className="flex justify-between items-center p-2">
                    <h1>Total amount</h1>
                    <strong>0.0005BTC</strong>
                  </div>
                  <div className="flex justify-between items-center p-2">
                    <h1>Date</h1>
                    <strong>0.0005BTC</strong>
                  </div>
                  <div className="flex justify-between items-center p-2">
                    <h1>Time</h1>
                    <strong>0.0005BTC</strong>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    className="w-full bg-orange-500 text-white p-2 rounded-full mt-4 text-sm"
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    Download
                  </button>
                  <button
                    className="w-full bg-orange-500 text-white p-2 rounded-full mt-4 text-sm"
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    Withdraw
                  </button>
                </div>
              </div>
            )}
          </Modal>
        )}
      </div>
    </div>
  );
};

const Modal = ({ children, onClose }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-end">
      <div
        className={`w-full max-w-md p-4 rounded-t-xl shadow-lg transform transition-all duration-300 translate-y-0 animate-slide-up ${
          isDark ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
        >
          <X size={18} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Withdraw;
