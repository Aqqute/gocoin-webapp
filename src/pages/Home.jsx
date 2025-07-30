import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { useTheme } from "../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GoLogo from "../../public/images/GoLogo.png";
import { useAuth } from "../contexts/AuthContext";
import { FileQuestion } from "lucide-react";

const Home = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activities, setActivities] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();

  const { token, isAuthenticated } = useAuth();

  const filters = [
    "All",
    "Social",
    "Content",
    "Apps",
    "Survey",
    "Polls",
    "Jobs",
  ];

  const handleFilterChange = (filter) => setActiveFilter(filter);

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
        console.log("Fetched activities:", response.data);
        setActivities(response.data.data.tasks || []);
      } catch (error) {
        console.error("Failed to fetch activities:", error);
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchActivities();
    } else {
      setLoading(false);
    }
  }, [token]);

  const filteredActivities =
    activeFilter === "All"
      ? activities
      : activities.filter((activity) =>
          activity.taskId?.type
            ?.toLowerCase()
            .includes(activeFilter.toLowerCase())
        );

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
                  ? "bg-gray-200 border border-orange-500 text-orange-500"
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

        {loading ? (
          <p className="text-center text-sm">Loading tasks...</p>
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
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 w-full">
            {filteredActivities.map((activity) => (
              <div
                key={activity._id}
                onClick={() => navigate(`/task/${activity._id}`)}
                className={`rounded-2xl p-3 text-sm shadow-lg cursor-pointer hover:shadow-xl transition ${
                  isDark ? "bg-[#2a2a2a]" : "bg-white"
                }`}
              >
                <h3 className="font-semibold text-left mb-1">
                  {activity.campaignTopic || "Untitled Task"}
                </h3>
                <p
                  className={`text-xs text-left mb-4 ${
                    isDark ? "text-gray-300" : "text-gray-800"
                  }`}
                >
                {activity.description.split(".")[0]  || "N/A"}
                </p>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-white p-1 shadow-md">
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
  );
};

export default Home;
