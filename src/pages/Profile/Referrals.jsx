import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import Referral from "../../../public/images/Referrals.png"; 

const Referrals = ({ onBack }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDark ? "bg-[#1e1e1e] text-white" : "bg-[#f9f9f9] text-black"
      }`}
    >
      <div className="flex items-center px-3 pt-6 pb-3">
        <button
          onClick={onBack || (() => window.history.back())}
          className="mr-4"
        >
          <ArrowLeft
            size={20}
            className={isDark ? "text-white" : "text-black"}
          />
        </button>
        <h1 className="text-lg font-semibold">Refer and Earn 0.0045 tokens</h1>
      </div>
      {/* Main  */}
      <div>
        <img src={Referral} alt="" />

      </div>
    </div>
  );
};

export default Referrals;
