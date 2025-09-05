import React from "react";
import GoLogo from "../../public/images/GoLogo.png";

const SuccessModalContent = ({ amount, onClose }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-4">
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
        <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-green-500">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold mb-2 text-green-700">Task Submitted!</h2>
      <p className="text-base mb-4 text-gray-700">Congratulations, you have received</p>
      <div className="flex items-center justify-center gap-2 mb-4">
        <img src={GoLogo} alt="GoCoin" className="w-6 h-6 object-contain" />
        <span className="text-xl font-bold text-[#cc8400]">{amount}</span>
        <span className="text-base font-medium text-gray-600">GoCoin</span>
      </div>
      <button
        onClick={onClose}
        className="mt-2 px-6 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-base transition"
      >
        Close
      </button>
    </div>
  );
};

export default SuccessModalContent;
