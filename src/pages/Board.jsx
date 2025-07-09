import React from "react";
import Navbar from "../components/Navbar";
import { useTheme } from "../contexts/ThemeContext";

const Board = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bgColor = isDark ? "bg-[#1e1e1e]" : "bg-[#f9f9f9]";
  const textColor = isDark ? "text-white" : "text-black";

  return (
    <div className={`min-h-screen ${bgColor} ${textColor} pt-10 pb-24`}>
      <div className="text-center text-2xl font-semibold mb-4">
        <h1>Board</h1>
      </div>

      {/* Example Board content */}
      <div className="px-4">
        <p className="mb-2">Your activity board will show here soon.</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Stay tuned for task updates, earnings, and performance analytics.
        </p>
      </div>

      <Navbar />
    </div>
  );
};

export default Board;
