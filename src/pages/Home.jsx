import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import Header from "../components/Header";
import BaseLayout from "../components/Layout";
import PopupModal from "../components/PopupModal";
import SuccessModalContent from "../components/SuccessModalContent";

import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";

import GoLogo from "../../public/images/GoLogo.png";
import Step2 from "../../public/images/Step2.png";
import {
  FileQuestion,
  SlidersHorizontal,
  Plus,
  Search as SearchIcon,
  FileText,
} from "lucide-react";

const Home = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [tab, setTab] = useState("all"); // "all" or "submitted"
  const [submittedTaskIds, setSubmittedTaskIds] = useState(() => {
    // Persist submitted tasks in localStorage
    const saved = localStorage.getItem("submittedTaskIds");
    return saved ? JSON.parse(saved) : [];
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successAmount, setSuccessAmount] = useState(0);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [query, setQuery] = useState("");
  const [showSubmit, setShowSubmit] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [file, setFile] = useState(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();
  const { token, isAuthenticated } = useAuth();
  const [submitload, setSubmitload] = useState(false);

  const filters = useMemo(
    () => ["All", "Social", "Content", "Apps", "Surveys & Polls"],
    []
  );
  const getButtonLabel = (type) => {
    switch (type?.toLowerCase()) {
      case "social_media":
        return "Link Social Media";
      case "content_creation":
        return "Create Content";
      case "app_download_reviews":
        return "Download App";
      case "survey_polls":
        return "Answer Survey Questions";
      case "watch_video":
        return "Watch Video";
      case "email_subscription":
        return "Subscribe via Email";
      case "product_testing":
        return "Start Product Testing";
      case "join_community":
        return "Join Community";
      default:
        return "Start Task";
    }
  };

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://gocoin.onrender.com/api/tasks",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setActivities(response.data?.data?.tasks || []);
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
  const handleSubmit = async () => {
    if (!selectedTask) return;
    setSubmitload(true);
    try {
      if (selectedTask.submissionMethod === "link") {
        if (!inputValue) {
          toast.error("Please provide a valid link");
          setSubmitload(false);
          return;
        }
        await axios.post(
          `https://gocoin.onrender.com/api/tasks/${selectedTask._id}/submit`,
          { submissionData: inputValue },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setSuccessAmount(selectedTask.rewards?.goToken || selectedTask.goCoinReward || 0);
        setShowSuccessModal(true);
        // Mark as submitted
        const updated = [...submittedTaskIds, selectedTask._id];
        setSubmittedTaskIds(updated);
        localStorage.setItem("submittedTaskIds", JSON.stringify(updated));
      } else {
        if (!file) {
          toast.error("Please upload a screenshot");
          setSubmitload(false);
          return;
        }
        const formData = new FormData();
        formData.append("submissionData", file);
        await axios.post(
          `https://gocoin.onrender.com/api/tasks/${selectedTask._id}/submit`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSuccessAmount(selectedTask.rewards?.goToken || selectedTask.goCoinReward || 0);
        setShowSuccessModal(true);
        // Mark as submitted
        const updated = [...submittedTaskIds, selectedTask._id];
        setSubmittedTaskIds(updated);
        localStorage.setItem("submittedTaskIds", JSON.stringify(updated));
      }
      setInputValue("");
      setFile(null);
    } catch (error) {
      console.error("Submission failed:", error);
      toast.error(error?.response?.data?.message || "Failed to submit task");
    } finally {
      setSubmitload(false);
    }
  };

  const normalized = (s = "") => s.toLowerCase().replaceAll("&", "and");

  const filteredActivities = useMemo(() => {
    let list = activities;
    // Map types to figma-like filters
    if (activeFilter !== "All") {
      const key = normalized(activeFilter);
      list = list.filter((a) => normalized(a.type || "").includes(key));
    }
    if (query.trim()) {
      const q = normalized(query.trim());
      list = list.filter(
        (a) =>
          normalized(a.campaignTopic || "").includes(q) ||
          normalized(a.description || "").includes(q)
      );
    }
    // Filter by tab
    if (tab === "submitted") {
      list = list.filter((a) => submittedTaskIds.includes(a._id));
    } else {
      list = list.filter((a) => !submittedTaskIds.includes(a._id));
    }
    return list;
  }, [activities, activeFilter, query, tab, submittedTaskIds]);

  const renderState = () => {
    if (loading) {
      return (
        <div className="flex justify-center mt-16">
          <div className="w-16 h-16 rounded-full border-[6px] border-orange-500 border-t-transparent animate-spin flex items-center justify-center">
            <img src={GoLogo} alt="Logo" className="w-8 h-8" />
          </div>
        </div>
      );
    }
    if (!isAuthenticated) {
      return (
        <div className="text-center mt-16">
          <FileQuestion size={48} className="mx-auto mb-3 text-gray-400" />
          <h3 className="text-lg font-semibold">Not logged in</h3>
          <p className="text-sm text-gray-500">Please log in to view tasks.</p>
        </div>
      );
    }
    if (filteredActivities.length === 0) {
      return (
        <div className="text-center mt-16">
          <FileQuestion size={48} className="mx-auto mb-3 text-gray-400" />
          <h3 className="text-lg font-semibold">No tasks found</h3>
        </div>
      );
    }
    return null;
  };

  // Countdown helper
  const getCountdown = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    let diff, label;
    if (now < start) {
      diff = start - now;
      label = "Ends in";
    } else if (now < end) {
      diff = end - now;
      label = "Ends in";
    } else {
      return "Task ended";
    }
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);
    return `${label}: ${d}d ${h}h ${m}m ${s}s`;
  };

  const Card = ({ activity, onClick }) => {
    const [countdown, setCountdown] = useState(() => getCountdown(activity.startDate, activity.endDate));
    useEffect(() => {
      const interval = setInterval(() => {
        setCountdown(getCountdown(activity.startDate, activity.endDate));
      }, 1000);
      return () => clearInterval(interval);
    }, [activity.startDate, activity.endDate]);

    return (
      <div
        onClick={onClick}
        className={`rounded-3xl p-4 text-sm shadow-[0_8px_24px_rgba(0,0,0,0.06)] cursor-pointer transition hover:shadow-[0_10px_28px_rgba(0,0,0,0.09)] ${
          isDark ? "bg-[#2a2a2a] text-white" : "bg-white text-black"
        }`}
      >
        <h3 className="text-left font-semibold text-sm mb-1">
          {activity.campaignTopic || "Untitled Task"}
        </h3>
        <p
          className={`text-left text-sm mb-4 ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {activity.description?.split(".")[0] || "N/A"}
        </p>
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <span className="text-xs font-medium px-2 py-1 rounded bg-orange-100 text-orange-700">
            {countdown}
          </span>
          <div className="w-7 h-7 rounded-full shadow-md flex items-center justify-center">
            <img src={GoLogo} alt="Go Logo" className="w-5 h-5 object-contain" />
          </div>
          <span className="font-semibold text-[15px] text-[#cc8400]">
            {typeof activity.goCoinReward !== "undefined"
              ? activity.goCoinReward
              : activity.rewards?.goToken || 0}
          </span>
          {activity.rewards?.fiatEquivalent && (
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                isDark ? "bg-[#1f1f1f] text-gray-300" : "bg-gray-100 text-gray-700"
              }`}
            >
              ~${activity.rewards.fiatEquivalent}
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <BaseLayout>
      <div
        className={`min-h-screen flex flex-col ${
          isDark ? "bg-black text-white" : "bg-[#FAFAF5] text-black"
        }`}
      >
        {/* ====== DESKTOP (>=1024px) ====== */}
        <div className="hidden lg:flex h-screen">
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Top bar */}
            <div className="px-4 py-2 flex items-center justify-between">
              {/* Filters */}
              <div className="flex items-center gap-2 flex-wrap">
                {filters.map((filter) => {
                  const active = activeFilter === filter;
                  return (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-4.5 h-6 rounded-full text-xs font-medium transition-colors ${
                        active
                          ? "border border-orange-500 text-orange-500 bg-transparent"
                          : isDark
                          ? "bg-[#eaeaea12] text-gray-200"
                          : "bg-[#EFEFEF] text-gray-700"
                      }`}
                    >
                      {filter}
                    </button>
                  );
                })}
              </div>
              {/* Tabs for All/Submited */}
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => setTab("all")}
                  className={`px-4 h-8 rounded-full text-xs font-semibold transition-colors ${
                    tab === "all"
                      ? "bg-orange-500 text-white"
                      : isDark
                      ? "bg-[#eaeaea12] text-gray-200"
                      : "bg-[#EFEFEF] text-gray-700"
                  }`}
                >
                  Available Tasks
                </button>
                <button
                  onClick={() => setTab("submitted")}
                  className={`px-4 h-8 rounded-full text-xs font-semibold transition-colors ${
                    tab === "submitted"
                      ? "bg-green-500 text-white"
                      : isDark
                      ? "bg-[#eaeaea12] text-gray-200"
                      : "bg-[#EFEFEF] text-gray-700"
                  }`}
                >
                  Submitted
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden px-4 pt-2 gap-4">
              {/* Left column */}
              <div className="flex-1 overflow-y-auto hide-scrollbar pr-1">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-left text-base mb-2 font-bold">
                    {tab === "all" ? "Task Timeline" : "Submitted Tasks"}
                  </h2>
                </div>

                {renderState() ||
                  (filteredActivities.length > 0 && (
                    <div className="grid gap-2 pb-6">
                      {filteredActivities.map((activity) => (
                        <Card
                          key={activity._id}
                          activity={activity}
                          onClick={() => setSelectedTask(activity)}
                        />
                      ))}
                    </div>
                  ))}
              </div>

              {/* Right column */}
              <div
                className={`hidden md:flex flex-col max-w-sm w-full p-4 rounded-xl shadow-md ${
                  isDark ? "bg-black" : "bg-white"
                } overflow-y-auto hide-scrollbar`}
              >
                {selectedTask ? (
                  <>
                    {/* Header */}
                    <h1 className="text-lg mb-2 text-left font-semibold">
                      Task Details
                    </h1>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm">
                        Status:{" "}
                        <span className="font-bold text-green-600">Open</span>
                      </span>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-800">
                        <div className="flex -space-x-1">
                          {[...Array(3)].map((_, i) => (
                            <img
                              key={i}
                              src="https://img.freepik.com/premium-vector/person-with-blue-shirt-that-says-name-person_1029948-7040.jpg"
                              alt="user"
                              className="w-5 h-5 rounded-full border"
                            />
                          ))}
                        </div>
                        <span className="ml-2">
                          {selectedTask.joined || 0}/
                          {selectedTask.maxJoined || 30}
                        </span>
                      </div>
                    </div>

                    {/* Campaign Topic */}
                    <h2 className="text-sm text-left font-bold mb-1">
                      {selectedTask.campaignTopic}
                    </h2>
                    <p
                      className={`mb-3 text-left text-xs ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {selectedTask.description}
                    </p>

                    {/* Instructions */}
                    <div
                      className={`p-3 text-sm text-left rounded-lg mb-4 ${
                        isDark ? "bg-[#3a3a3a]" : "bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center gap-1 mb-2">
                        <FileText className="text-orange-500" size={14} />
                        <h3 className="font-medium text-sm">Instructions</h3>
                      </div>
                      <ol
                        className={`list-decimal list-inside text-xs space-y-1 ${
                          isDark ? "text-white" : "text-black"
                        }`}
                      >
                        {selectedTask.instructions?.map((step, idx) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ol>
                    </div>

                    {/* Rewards */}
                    <div className="flex justify-between mt-4 mb-6">
                      <h1 className="text-xs font-bold">Rewards:</h1>
                      <div className="flex items-center gap-1">
                        <img
                          src={GoLogo}
                          alt="Go Logo"
                          className="w-3 h-3 object-contain"
                        />
                        <span className="text-[#cc8400] font-medium text-xs">
                          {selectedTask.rewards?.goToken || 0}
                        </span>
                        <span
                          className={`ml-1 text-[10px] ${
                            isDark ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          ~${selectedTask.rewards?.fiatEquivalent || 0}
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => {
                        setShowSubmit(true);
                        toast.success(
                          "scroll to submit task link or screenshot"
                        );
                      }}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-1.5 rounded-full text-sm transition"
                    >
                      {getButtonLabel(selectedTask.type)}
                    </button>

                    {/* Submit Section */}
                    {showSubmit && (
                      <div
                        className={`p-3 mt-6 rounded-xl ${
                          isDark ? "bg-[#3a3a3a]" : "bg-gray-100"
                        }`}
                      >
                        {selectedTask.submissionMethod === "link" ? (
                          <>
                            <h3 className="font-medium text-sm mb-2">
                              Submit Link
                            </h3>
                            <input
                              type="text"
                              placeholder="Enter Link"
                              value={inputValue}
                              onChange={(e) => setInputValue(e.target.value)}
                              className="w-full p-2 rounded-lg border mb-2 text-xs dark:bg-white dark:border-gray-600"
                            />
                            <button
                              onClick={handleSubmit}
                              disabled={submitload}
                              className={`w-full py-1.5 rounded-lg text-white text-xs ${
                                submitload
                                  ? "bg-gray-400 cursor-not-allowed"
                                  : "bg-orange-500 hover:bg-orange-600"
                              }`}
                            >
                              {submitload ? "Submitting..." : "Submit"}
                            </button>
                          </>
                        ) : (
                          // FILE SUBMISSION UI
                          <>
                            <h3 className="font-medium text-lg mb-2">
                              Submit Screenshot
                            </h3>
                            <p
                              className={`text-xs mb-3 ${
                                isDark ? "text-white" : "text-black"
                              }`}
                            >
                              Upload a screenshot as proof to receive your
                              reward.
                            </p>

                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => setFile(e.target.files[0])}
                              className="w-full mb-3 text-sm"
                            />

                            {/* Preview uploaded file */}
                            {file && (
                              <div className="mb-3">
                                <img
                                  src={URL.createObjectURL(file)}
                                  alt="Preview"
                                  className="w-full h-40 object-cover rounded-lg shadow"
                                />
                              </div>
                            )}
                            <button
                              onClick={handleSubmit}
                              disabled={submitload}
                              className={`w-full py-2 rounded-lg text-white text-sm ${
                                submitload
                                  ? "bg-gray-400 cursor-not-allowed"
                                  : "bg-orange-500 hover:bg-orange-600"
                              }`}
                            >
                              {submitload
                                ? "Submitting..."
                                : "Submit Screenshot"}
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <img
                      src={Step2}
                      alt="Select a task"
                      className="w-2/3 object-contain"
                    />
                    <h3
                      className={`mt-6 font-semibold text-center ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Select a Task to View Details
                    </h3>
                    <p
                      className={`text-sm text-center mt-2 ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Choose any task from the left to see its instructions and
                      rewards.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile (<=1023px) */}
        <div className="lg:hidden flex flex-col min-h-screen">
          <Header />
          {/* Tabs for All/Submitted */}
          <div className="flex gap-2 px-2 mt-4">
            <button
              onClick={() => setTab("all")}
              className={`flex-1 h-9 rounded-full text-xs font-semibold transition-colors ${
                tab === "all"
                  ? "bg-orange-500 text-white"
                  : isDark
                  ? "bg-[#eaeaea12] text-gray-200"
                  : "bg-[#EFEFEF] text-gray-700"
              }`}
            >
              Available Tasks
            </button>
            <button
              onClick={() => setTab("submitted")}
              className={`flex-1 h-9 rounded-full text-xs font-semibold transition-colors ${
                tab === "submitted"
                  ? "bg-green-500 text-white"
                  : isDark
                  ? "bg-[#eaeaea12] text-gray-200"
                  : "bg-[#EFEFEF] text-gray-700"
              }`}
            >
              Submitted
            </button>
          </div>
          {/* Filters + Create Task */}
          <div className="px-2 mt-2">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 overflow-x-auto hide-scrollbar pr-2">
                {filters.map((filter) => {
                  const active = activeFilter === filter;
                  return (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-4 h-6 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                        active
                          ? "bg-transparent border border-orange-500 text-orange-500"
                          : isDark
                          ? "bg-[#eaeaea12] text-gray-200"
                          : "bg-[#EFEFEF] text-gray-700"
                      }`}
                    >
                      {filter}
                    </button>
                  );
                })}
              </div>
              <button
                className={` flex items-center rounded-full  font-medium  ${
                  isDark ? " text-orange-400" : " text-orange-500"
                } bg-orange-500 text-white hover:opacity-90`}
              >
                <span className="flex items-center gap-1 h-8 px-3">
                  <Plus size={16} />
                  <span className="text-xs">Create Task</span>
                </span>
              </button>
            </div>
          </div>
          {/* Task Timeline */}
          <div className="px-4 mt-4 pb-32">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-left text-xl font-extrabold">
                {tab === "all" ? "Task Timeline" : "Submitted Tasks"}
              </h2>
            </div>
            {renderState() ||
              (filteredActivities.length > 0 && (
                <div className="grid gap-4">
                  {filteredActivities.map((activity) => (
                    <Card
                      key={activity._id}
                      activity={activity}
                      onClick={() => {
                        if (tab === "all") {
                          navigate(`/task/${activity._id}`);
                        }
                      }}
                    />
                  ))}
                </div>
              ))}
          </div>
          <Navbar />
        </div>
      </div>
      {/* Success Modal */}
      <PopupModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)}>
        <SuccessModalContent amount={successAmount} onClose={() => setShowSuccessModal(false)} />
      </PopupModal>
    </BaseLayout>
  );
};

export default Home;
