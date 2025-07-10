import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import GoLogo from "../../../public/images/GoLogo.png";

const ActivityFeed = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const userProfile = location.state || {
    rank: 4,
    name: "Belz",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    earnings: "0.02456",
    isActive: true,
  };

  const activities = [
    {
      id: 1,
      type: "Content creation",
      description: "Lorem ipsum dolor sit amet consectetur.",
      earnings: "0.000048",
      amount: "~$2.00",
    },
    {
      id: 2,
      type: "Campaign Topic",
      description: "Lorem ipsum dolor sit amet consectetur.",
      earnings: "0.000048",
      amount: "~$2.00",
    },
    {
      id: 3,
      type: "Campaign Topic",
      description: "Lorem ipsum dolor sit amet consectetur.",
      earnings: "0.000048",
      amount: "~$2.00",
    },
    {
      id: 4,
      type: "Campaign Topic",
      description: "Lorem ipsum dolor sit amet consectetur.",
      earnings: "0.000048",
      amount: "~$2.00",
    },
    {
      id: 5,
      type: "Campaign Topic",
      description: "Lorem ipsum dolor sit amet consectetur.",
      earnings: "0.000048",
      amount: "",
    },
  ];

  const handleBack = () => {
    navigate(-1);
  };

  const bgCard = isDark ? "bg-[#2a2a2a]" : "bg-gray-100";
  const textSubtle = isDark ? "text-gray-400" : "text-gray-600";
  const innerCard = isDark ? "bg-[#3a3a3a]" : "bg-white shadow";

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDark ? "bg-[#1e1e1e] text-white" : "bg-white text-black"
      }`}
    >
      {/* Header */}
      <div className="flex items-center px-3 pt-6 pb-3 shrink-0">
        <button onClick={handleBack} className="mr-4">
          <ArrowLeft size={20} className={isDark ? "text-white" : "text-black"} />
        </button>
        <h1 className="text-base font-semibold">Activity</h1>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 space-y-6 pb-8">
        {/* User Profile Card */}
        <div className={`${bgCard} rounded-2xl p-4 mt-2`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  isDark ? "bg-[#3a3a3a]" : "bg-gray-300"
                }`}
              >
                {userProfile.rank}
              </div>
              <div className="flex items-center space-x-3">
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium">{userProfile.name}</div>
                  <div className="flex items-center space-x-1">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        userProfile.isActive ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></div>
                    <span className={`text-xs ${textSubtle}`}>
                      {userProfile.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`rounded-full px-4 py-2 flex items-center space-x-2 ${innerCard}`}
            >
              <img src={GoLogo} alt="go" className="w-4" />
              <span className="text-sm">{userProfile.earnings}</span>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className={`${bgCard} rounded-2xl p-4`}>
              <div className="mb-3">
                <h3 className="font-semibold text-lg mb-2">{activity.type}</h3>
                <p className={`text-sm ${textSubtle}`}>{activity.description}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-orange-500 font-medium">{activity.earnings}</span>
                </div>
                {activity.amount && (
                  <div className={`${innerCard} rounded-full px-3 py-1`}>
                    <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      {activity.amount}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;
