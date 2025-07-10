import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { useTheme } from "../contexts/ThemeContext";

const Home = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const filters = [
    "All",
    "Social",
    "Content",
    "Apps",
    "Survey",
    "Polls",
    "Jobs",
  ];

  const tasks = [
    {
      id: 1,
      title: "Social media",
      description: "Engage and share campaign posts on platforms.",
      amount: "0.000048",
      change: "~$2.00",
      icon: "📱",
    },
    {
      id: 2,
      title: "Content creation",
      description: "Create and post original media content.",
      amount: "0.000048",
      change: "~$2.00",
      icon: "📝",
    },
    {
      id: 3,
      title: "App download & reviews",
      description: "Download partner apps and leave reviews.",
      amount: "0.000048",
      change: "~$2.00",
      icon: "📲",
    },
    {
      id: 4,
      title: "Survey & Polls",
      description: "Participate in surveys and community polls.",
      amount: "0.000048",
      change: "~$2.00",
      icon: "📊",
    },
  ];

  const handleFilterChange = (filter) => setActiveFilter(filter);

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDark ? "bg-[#1e1e1e] text-white" : "bg-[#f9f9f9] text-black"
      }`}
    >
      {/* Fixed Header */}
      <Header />

      {/* Spacer below fixed header */}
      <div className="h-32" />

      {/* Filters */}
      <div className="px-4 mb-4">
        <div className="flex space-x-2 overflow-x-auto hide-scrollbar">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterChange(filter)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                activeFilter === filter
                  ? "bg-orange-500 text-white"
                  : isDark
                  ? "bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a]"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Task Timeline */}
      <div className="px-4 pb-32">
        <h2 className="text-base font-bold mb-2">Task Timeline</h2>
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`rounded-2xl p-3 text-sm shadow-lg ${
                isDark ? "bg-[#2a2a2a]" : "bg-white"
              }`}
            >
              <h3 className="font-semibold mb-1">{task.title}</h3>
              <p
                className={`text-xs mb-2 ${
                  isDark ? "text-gray-300" : "text-gray-800"
                }`}
              >
                {task.description}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center text-xs">
                  {task.icon}
                </div>
                <span className="text-[#cc8400] font-medium">
                  {task.amount}
                </span>
                <span
                  className={`text-xs ${
                    isDark ? "text-gray-400" : "text-gray-700"
                  }`}
                >
                  {task.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Bottom Navbar */}
      <Navbar />
    </div>
  );
};

export default Home;
