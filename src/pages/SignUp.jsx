import React from "react";
import { useTheme } from "../contexts/ThemeContext";

const Signup = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const bg = isDark ? "bg-[#1e1e1e]" : "bg-gray-100";
  const cardBg = isDark ? "bg-[#2B2B2B]" : "bg-white";
  const text = isDark ? "text-white" : "text-black";

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${bg}`}>
      <div className={`w-full max-w-md ${cardBg} p-6 rounded-lg shadow-md`}>
        <h1 className={`text-2xl font-bold text-center mb-4 ${text}`}>Signup</h1>
        {/* Signup form goes here */}
        <input
          type="text"
          placeholder="Username"
          className="w-full px-4 py-2 mb-4 border rounded outline-none focus:ring-2 focus:ring-orange-400 bg-transparent text-inherit placeholder-gray-400"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 mb-4 border rounded outline-none focus:ring-2 focus:ring-orange-400 bg-transparent text-inherit placeholder-gray-400"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 mb-6 border rounded outline-none focus:ring-2 focus:ring-orange-400 bg-transparent text-inherit placeholder-gray-400"
        />
        <button className="w-full py-3 bg-[#FFA500] text-white font-semibold rounded">
          Signup
        </button>
      </div>
    </div>
  );
};

export default Signup;
