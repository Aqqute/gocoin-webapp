import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";

import GoLogo from "../../public/images/GoLogo.png";
import Step2 from "../../public/images/Step2.png";
import { FileQuestion } from "lucide-react";

const Home = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);

  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();
  const { token, isAuthenticated } = useAuth();

  const filters = ["All", "Social", "Content", "Apps", "Survey", "Polls"];

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://gocoin.onrender.com/api/tasks",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setActivities(response.data.data.tasks || []);
      } catch (error) {
        console.error("Failed to fetch activities:", error);
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchActivities();
    else setLoading(false);
  }, [token]);

  const filteredActivities =
    activeFilter === "All"
      ? activities
      : activities.filter((activity) =>
          activity.type?.toLowerCase().includes(activeFilter.toLowerCase())
        );

  return (
    <div
      className={`min-h-screen ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        {/* Sidebar - sticky */}
        <div className="h-screen sticky top-0">
          <Sidebar />
        </div>

        {/* Main content - scrollable */}
        <div className="flex-1 flex flex-col max-h-screen overflow-hidden">
          <Topbar />

          <div className="flex flex-1 overflow-y-auto px-6 pt-6 gap-8 overflow-hidden">
            {/* Left column: filters and tasks */}
            <div
              className="flex-1 max-w-2xl overflow-y-auto pr-2"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <style>
                {`
            div::-webkit-scrollbar {
              display: none;
            }
          `}
              </style>

              {/* Filters */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex flex-wrap gap-2">
                  {filters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                        activeFilter === filter
                          ? "border border-orange-500 text-orange-500 bg-transparent"
                          : isDark
                          ? "bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]"
                          : "bg-gray-200 text-black hover:bg-gray-100"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                {/* Create Task button */}
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-5 py-2 rounded-full text-sm">
                  + Create Task
                </button>
              </div>

              <h2 className="text-lg text-left font-bold mb-4">Task Timeline</h2>

              {/* Task List */}
              {loading ? (
                <div className="flex justify-center mt-20">
                  <div className="w-20 h-20 rounded-full border-[6px] border-orange-500 border-t-transparent animate-spin flex items-center justify-center">
                    <img
                      src={GoLogo}
                      alt="Logo"
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                </div>
              ) : !isAuthenticated ? (
                <EmptyState
                  icon={
                    <FileQuestion
                      size={48}
                      className="mx-auto mb-3 text-gray-400"
                    />
                  }
                  title="Not logged in"
                  subtitle="Please log in to view your tasks."
                />
              ) : filteredActivities.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-20">
                  <img
                    src={GoLogo}
                    alt="No Tasks"
                    className="w-[100px] h-[100px] mb-6"
                  />
                  <h3 className="text-lg font-semibold">No tasks found</h3>
                </div>
              ) : (
                <div className="grid gap-3 pb-10">
                  {filteredActivities.map((activity) => (
                    <div
                      key={activity._id}
                      onClick={() => setSelectedTask(activity)}
                      className={`rounded-2xl p-3 text-sm shadow-lg cursor-pointer hover:shadow-xl transition ${
                        isDark ? "bg-[#2a2a2a]" : "bg-white"
                      }`}
                    >
                      <h3 className="text-left font-semibold mb-1">
                        {activity.campaignTopic || "Untitled Task"}
                      </h3>
                      <p
                        className={`text-left text-xs mb-4 ${
                          isDark ? "text-gray-300" : "text-gray-800"
                        }`}
                      >
                        {activity.description.split(".")[0] || "N/A"}
                      </p>
                      <div className="flex gap-1 items-center">
                        <div className="w-6 h-6 p-1 shadow-md">
                          <img
                            src={GoLogo}
                            alt="Go Logo"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="text-[#cc8400] font-medium">
                          {activity.rewards?.goToken || 0}
                        </span>
                        <span
                          className={` ml-2 text-xs ${
                            isDark ? "text-gray-400" : "text-gray-700"
                          }`}
                        >
                          ~${activity.rewards?.fiatEquivalent || 0}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right column: Task details or illustration */}
            <div className="hidden md:flex flex-col max-w-sm w-full p-4">
              {selectedTask ? (
                <>
                  <h2 className="text-lg font-bold mb-2">
                    {selectedTask.campaignTopic}
                  </h2>
                  <p className="mb-4">{selectedTask.description}</p>
                  <div className="flex gap-1 items-center">
                    <div className="w-6 h-6 p-1 shadow-md">
                      <img
                        src={GoLogo}
                        alt="Go Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-[#cc8400] font-medium">
                      {selectedTask.rewards?.goToken || 0}
                    </span>
                    <span
                      className={`ml-2 text-xs ${
                        isDark ? "text-gray-400" : "text-gray-700"
                      }`}
                    >
                      ~${selectedTask.rewards?.fiatEquivalent || 0}
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex flex-1 items-center justify-center">
                  <img
                    src={Step2}
                    alt="Tasks"
                    className="w-[300px] h-[300px]"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <Header />
        <div className="h-32" />

        {/* Filters */}
        <div className="w-full mb-4 overflow-x-auto hide-scrollbar sm:overflow-visible">
          <div className="flex justify-center space-x-2 min-w-max px-4 sm:px-0 sm:flex-wrap">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  activeFilter === filter
                    ? "bg-gray-200 border border-orange-500 text-orange-500"
                    : isDark
                    ? "bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]"
                    : "bg-gray-200 text-black hover:bg-gray-100"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Tasks */}
        <div className="px-4 pb-32 w-full">
          <h2 className="text-left text-base font-bold mb-4">Task Timeline</h2>
          {loading ? (
            <div className="flex justify-center mt-20">
              <div className="w-20 h-20 rounded-full border-[6px] border-orange-500 border-t-transparent animate-spin flex items-center justify-center">
                <img
                  src={GoLogo}
                  alt="Logo"
                  className="w-10 h-10 object-contain"
                />
              </div>
            </div>
          ) : !isAuthenticated ? (
            <div className="text-center mt-20">
              <FileQuestion size={48} className="mx-auto mb-3 text-gray-400" />
              <h3 className="text-lg font-semibold">Not logged in</h3>
              <p className="text-sm text-gray-500">
                Please log in to view your tasks.
              </p>
            </div>
          ) : filteredActivities.length === 0 ? (
            <div className="text-center mt-20">
              <FileQuestion size={48} className="mx-auto mb-3 text-gray-400" />
              <h3 className="text-lg font-semibold">No tasks found</h3>
            </div>
          ) : (
            <div className="grid gap-3">
              {filteredActivities.map((activity) => (
                <div
                  key={activity._id}
                  onClick={() => navigate(`/task/${activity._id}`)}
                  className={`rounded-2xl p-3 text-sm shadow-lg cursor-pointer hover:shadow-xl transition ${
                    isDark ? "bg-[#2a2a2a]" : "bg-white"
                  }`}
                >
                  <h3 className="text-left font-semibold mb-1">
                    {activity.campaignTopic}
                  </h3>
                  <p
                    className={`text-xs mb-4 text-left ${
                      isDark ? "text-gray-300" : "text-gray-800"
                    }`}
                  >
                    {activity.description.split(".")[0] || "N/A"}
                  </p>
                  <div className="flex gap-1 items-center">
                    <div className="w-6 h-6  p-1 shadow-md">
                      <img
                        src={GoLogo}
                        alt="Go Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-[#cc8400] font-medium">
                      {activity.rewards?.goToken || 0}
                    </span>
                    <span
                      className={` ml-2 text-xs ${
                        isDark ? "text-gray-400" : "text-gray-700"
                      }`}
                    >
                      ~${activity.rewards?.fiatEquivalent || 0}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <Navbar />
      </div>
    </div>
  );
};

export default Home;
