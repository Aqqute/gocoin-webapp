import React from "react";
import { ArrowLeft, Copy } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import Referral from "../../../public/images/Referrals.png";
import { toast } from "react-hot-toast";

const Referrals = ({ onBack }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const referralCode = "RG3845U2NBH3";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    toast.success("Referral code copied!");
  };

  return (
    <div
      className={`min-h-screen flex flex-col px-4 ${
        isDark ? "bg-[#1e1e1e] text-white" : "bg-[#f9f9f9] text-black"
      }`}
    >
      {/* Header */}
      <div className="flex items-center pt-6 pb-4">
        <button
          onClick={onBack || (() => window.history.back())}
          className="mr-4"
        >
          <ArrowLeft
            size={20}
            className={isDark ? "text-white" : "text-black"}
          />
        </button>
        <h1 className="text-lg font-semibold">
          Refer and earn 0.0045 tokens
        </h1>
      </div>

      {/* Illustration */}
      <div className="flex justify-center mb-6">
        <img
          src={Referral}
          alt="Referral Illustration"
          className="w-64 h-auto"
        />
      </div>

      {/* Steps (Responsive) */}
      <div className="space-y-4 text-sm mb-6">
        {[
          "Share Referral link/code to your friends",
          "Your friend clicks the referral link and is directed to download the Go Token app.",
          "After your friend successfully joins and completes a task you’ll earn your reward.",
        ].map((text, index) => (
          <div key={index} className="flex items-start gap-3 sm:gap-4">
            <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center bg-orange-100 text-orange-600 font-bold rounded-full">
              {index + 1}
            </div>
            <p className="flex-1">{text}</p>
          </div>
        ))}
      </div>

      {/* Referral Code */}
      <div
        className={`flex items-center justify-between px-4 py-3 rounded-xl mb-6 ${
          isDark ? "bg-[#2a2a2a] text-white" : "bg-[#f3f3fd] text-black"
        }`}
      >
        <span className="font-semibold text-[#4a3aff]">{referralCode}</span>
        <button
          onClick={handleCopy}
          className="text-sm border border-orange-500 text-orange-500 px-3 py-1 rounded-full hover:bg-orange-100"
        >
          Copy
        </button>
      </div>

      {/* Invite Button */}
      <button
        onClick={() => toast.success("Invite link sent!")}
        className="bg-orange-500 text-white font-semibold py-2 rounded-full text-center"
      >
        Invite friends
      </button>
    </div>
  );
};

export default Referrals;
