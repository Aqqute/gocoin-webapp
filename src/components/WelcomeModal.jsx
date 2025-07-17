// components/WelcomeModal.jsx
import React from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Welcome from "../../public/images/welcome.png";

const WelcomeModal = ({ isOpen, onClose, isDark }) => {
  const navigate = useNavigate();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div
        className={`rounded-2xl w-[90%] max-w-sm p-5 relative shadow-lg ${
          isDark ? "bg-[#1e1e1e] text-white" : "bg-white text-black"
        }`}
      >
        <button
          onClick={onClose}
          className={`absolute top-3 right-3 hover:text-gray-700 ${
            isDark ? "text-gray-400 hover:text-gray-200" : "text-gray-500"
          }`}
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col items-center text-center">
          <img src={Welcome} alt="confetti" className="w-20 h-20 mb-3" />
          <h2 className="text-lg font-semibold mb-1">Welcome to Go Token!</h2>
          <p className="text-sm mb-4">
            Start by exploring campaigns, completing tasks, and earning Go Tokens that you can track and manage right within the app.
          </p>

          <button
            onClick={() => {
              onClose();
              navigate("/");
            }}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 text-sm rounded-full mb-2 transition"
          >
            Get started
          </button>

          <button
            onClick={() => {
              onClose();
              navigate("/profile");
            }}
            className="w-full text-sm font-semibold"
          >
            Visit profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
