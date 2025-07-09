import React from "react";

const ThemeSelector = ({ onSelect }) => {
  return (
    <div className="h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-xl font-bold mb-4">Choose Your Theme</h1>
      <div className="space-x-4">
        <button
          onClick={() => onSelect("light")}
          className="bg-white text-black px-6 py-3 rounded-full font-semibold"
        >
          Light Mode
        </button>
        <button
          onClick={() => onSelect("dark")}
          className="bg-[#1E1E1E] text-white px-6 py-3 rounded-full border border-gray-500"
        >
          Dark Mode
        </button>
      </div>
    </div>
  );
};

export default ThemeSelector;
