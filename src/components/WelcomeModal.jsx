// components/WelcomeModal.jsx
import React from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WelcomeModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl w-[90%] max-w-md p-6 relative shadow-lg">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <img src="http://img.freepik.com/free-vector/party-popper_78370-557.jpg?semt=ais_hybrid&w=740" alt="confetti" className="w-25 h-25 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Welcome to Go Token!!</h2>
          <p className="text-gray-600 mb-6">
            Start by exploring campaigns, completing tasks, and earning Go Tokens that you can track and manage right within the app.
          </p>

          <button
            onClick={() => {
              onClose();
              navigate("/");
            }}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-full mb-2 transition"
          >
            Get started
          </button>

          <button
            onClick={() => {
              onClose();
              navigate("/profile");
            }}
            className="w-full text-black font-semibold mt-2"
          >
            Visit profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
