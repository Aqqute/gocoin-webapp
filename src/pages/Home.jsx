import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { useTheme } from "../contexts/ThemeContext";
import GoLogo from "../../public/images/GoLogo.png"; 
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
    },
    {
      id: 2,
      title: "Content creation",
      description: "Create and post original media content.",
      amount: "0.000048",
      change: "~$2.00",
    },
    {
      id: 3,
      title: "App download & reviews",
      description: "Download partner apps and leave reviews.",
      amount: "0.000048",
      change: "~$2.00",
    },
    {
      id: 4,
      title: "Survey & Polls",
      description: "Participate in surveys and community polls.",
      amount: "0.000048",
      change: "~$2.00",
    },
  ];

  const handleFilterChange = (filter) => setActiveFilter(filter);

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDark ? "bg-[#1e1e1e] text-white" : "bg-[#f9f9f9] text-black"
      }`}
    >
      <Header />
      <div className="h-32" />

      {/* Filters */}
      <div className="w-full mb-4 overflow-x-auto hide-scrollbar sm:overflow-visible">
        <div className="flex space-x-2 min-w-max px-4 sm:px-0 sm:flex-wrap sm:justify-center">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterChange(filter)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                activeFilter === filter
                  ? "bg-gray-200 border-1 border-orange-500 text-orange-500"
                  : isDark
                  ? "bg-gray-200 text-black hover:bg-[#3a3a3a]"
                  : "bg-gray-200 text-black hover:bg-gray-100"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Task Timeline */}
      <div className="px-4 pb-32 w-full">
        <h2 className="text-left text-base font-bold mb-4">Task Timeline</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 w-full">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`rounded-2xl p-3 text-sm shadow-lg ${
                isDark ? "bg-[#2a2a2a]" : "bg-white"
              }`}
            >
              <h3 className="font-semibold text-left mb-1">{task.title}</h3>
              <p
                className={`text-xs text-left mb-4 ${
                  isDark ? "text-gray-300" : "text-gray-800"
                }`}
              >
                {task.description}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white p-1 shadow-md">
                  <img
                    src={GoLogo}
                    alt="Go Logo"
                    className="w-full h-full object-contain"
                  />
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

      <Navbar />
    </div>
  );
};

export default Home;
