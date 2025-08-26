import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
// import  GoLogo  from '../../../public/images/GoLogo.png';
import { ArrowLeft, FileText, X } from "lucide-react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import GoLogo from "../../../public/images/GoLogo.png";

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

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [task, setTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [reward, setReward] = useState(null);
  const [countdown, setCountdown] = useState("");

  const { token } = useAuth();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(
          `https://gocoin.onrender.com/api/tasks/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Support both single and list response
        let fetchedTask = response.data.data.task;
        if (!fetchedTask && Array.isArray(response.data.data.tasks)) {
          fetchedTask = response.data.data.tasks[0];
        }
        setTask(fetchedTask);
        setLoading(false);
        // Setup countdown
        updateCountdown(fetchedTask);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    if (id) {
      fetchTask();
    }
    // eslint-disable-next-line
  }, [id]);

  // Countdown logic
  useEffect(() => {
    let interval;
    if (task) {
      interval = setInterval(() => updateCountdown(task), 1000);
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [task]);

  function updateCountdown(taskObj) {
    if (!taskObj) return;
    const now = new Date();
    const start = new Date(taskObj.startDate);
    const end = new Date(taskObj.endDate);
    let diff, label;
    if (now < start) {
      diff = start - now;
      label = "Starts in";
    } else if (now < end) {
      diff = end - now;
      label = "Ends in";
    } else {
      setCountdown("Task ended");
      return;
    }
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);
    setCountdown(`${label}: ${d}d ${h}h ${m}m ${s}s`);
  }

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.size < 2 * 1024 * 1024) {
      setFile(selected);
    } else {
      alert("Please upload a PNG file under 2MB");
    }
  };

  const cardStyle = `${
    isDark ? "bg-[#2a2a2a]" : "bg-white"
  } rounded-xl p-4 shadow-sm`;

  return (
    <div
      className={`min-h-screen ${
        isDark ? "bg-black text-white" : "bg-[#f9f9f9] text-black"
      }`}
    >
      <div className="flex items-center px-4 pt-6 pb-3">
        <button onClick={() => navigate(-1)} className="mr-4">
          <ArrowLeft
            size={20}
            className={isDark ? "text-white" : "text-black"}
          />
        </button>
        <h1 className="text-base font-semibold">Task Details</h1>
      </div>

      {loading ? (
        <div className="flex justify-center items-center mt-20 text-sm">
          Loading task...
        </div>
      ) : task ? (
        <div className="px-4 space-y-4 pb-6 mt-6 max-w-xl mx-auto">
          <div>
            <h2 className="text-base font-bold mb-0.5">{task.campaignTopic}</h2>
            <p className="text-sm mt-1">{task.description}</p>
            <div className="flex flex-wrap gap-2 mt-2 items-center">
              {countdown && (
                <span className="text-xs font-medium px-2 py-1 rounded bg-orange-100 text-orange-700">
                  {countdown}
                </span>
              )}
              {typeof task.goCoinReward !== "undefined" && (
                <span className="text-xs font-medium px-2 py-1 rounded bg-green-100 text-green-700">
                  Reward: {task.goCoinReward} GO
                </span>
              )}
              {task.rewards?.goToken && (
                <span className="text-xs font-medium px-2 py-1 rounded bg-green-100 text-green-700">
                  Reward: {task.rewards.goToken} GO
                </span>
              )}
            </div>
          </div>

          <div className={cardStyle}>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="text-orange-500" size={20} />
              <h3 className="font-semibold text-lg">Instructions</h3>
            </div>
            <ol className="list-decimal ml-5 space-y-2 text-sm">
              {task.instructions?.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>

          {/* Reward section already shown above */}

          <button
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded-full text-sm transition mt-8"
            onClick={() => setShowModal(true)}
          >
            {getButtonLabel(task.type)}
          </button>

          {showModal && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-end">
              <div
                className={`w-full max-w-md p-4 rounded-t-xl shadow-lg transform transition-all duration-300 translate-y-0 animate-slide-up ${
                  isDark ? "bg-[#2a2a2a] text-white" : "bg-white text-black"
                }`}
              >
                <button
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-white"
                  onClick={() => setShowModal(false)}
                >
                  <X size={20} />
                </button>
                <h3 className="text-lg font-semibold mb-2">
                  {task.submissionMethod === "link"
                    ? ""
                    : "Submit Screenshot"}
                </h3>
                <p className="text-sm mb-4">
                  {task.submissionMethod === "link"
                    ? ""
                    : "Upload a screenshot (PNG only, 2MB max)."}
                </p>

                {task.submissionMethod === "link" ? (
                  // LINK SUBMISSION UI
                  <>
                    <h3 className="font-medium text-lg mb-2">Submit Link</h3>
                    <p
                      className={`text-xs mb-3 ${
                        isDark ? "text-white" : "text-black"
                      }`}
                    >
                      Paste the link to the content you created to receive your
                      reward.
                    </p>

                    <input
                      type="text"
                      placeholder="Enter Link"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="w-full p-2 rounded-lg border mb-3 text-sm dark:bg-[#2a2a2a] dark:border-gray-600"
                    />
                  </>
                ) : (
                  // FILE SUBMISSION UI
                  <>
                    <label className="block mb-2 font-medium text-sm">
                      Upload Screenshot (PNG only, 2MB max)
                    </label>
                    <input
                      type="file"
                      accept="image/png"
                      onChange={handleFileChange}
                      className="mb-3 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                    />
                    {file && (
                      <div className="mb-2 text-xs text-green-600">
                        Selected: {file.name}
                      </div>
                    )}
                  </>
                )}

                <button
                  className="w-full mt-5 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-full text-sm"
                  onClick={async () => {
                    if (task.submissionMethod === "link" && !inputValue)
                      return toast.error("Please provide a valid URL");

                    try {
                      let response;
                      if (task.submissionMethod === "link") {
                        response = await axios.post(
                          `https://gocoin.onrender.com/api/tasks/${id}/submit`,
                          { submissionData: inputValue },
                          {
                            headers: {
                              Authorization: `Bearer ${token}`,
                              "Content-Type": "application/json",
                            },
                          }
                        );
                        setReward(response?.data?.goCoinReward || task.goCoinReward || task.rewards?.goToken);
                        setShowSuccess(true);
                      } else {
                        if (!file)
                          return toast.error("Please upload a screenshot");

                        const formData = new FormData();
                        formData.append("submissionData", file);

                        response = await axios.post(
                          `https://gocoin.onrender.com/api/tasks/${id}/submit`,
                          formData,
                          {
                            headers: {
                              Authorization: `Bearer ${token}`
                              // Do NOT set Content-Type manually for FormData; browser will set it with boundary
                            },
                          }
                        );
                        setReward(response?.data?.goCoinReward || task.goCoinReward || task.rewards?.goToken);
                        setShowSuccess(true);
                      }

                      setShowModal(false);
                      setInputValue("");
                      setFile(null);
                    } catch (error) {
                      console.error("Submission failed:", error);
                      toast.error(
                        error?.response?.data?.message ||
                          "Failed to submit. Please try again later."
                      );
                    }
                  }}
                >
                  Submit{" "}
                  {task.submissionMethod === "link" ? "Link" : "Screenshot"}
                </button>
              </div>
            </div>
          )}

          {/* Success Popup */}
          {showSuccess && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
              <div className="bg-white dark:bg-[#232323] rounded-2xl shadow-lg p-8 max-w-xs w-full flex flex-col items-center">
                <div className="mb-4">
                  <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#22c55e" opacity="0.15"/><path d="M7 13l3 3 7-7" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <h3 className="text-lg font-bold mb-2 text-green-600 dark:text-green-400">Task Submitted!</h3>
                <p className="text-sm mb-2 text-center">Your task was submitted successfully for review.</p>
                {reward && (
                  <div className="text-base font-semibold text-orange-600 dark:text-orange-400 mb-2">+{reward} GO Reward</div>
                )}
                <button
                  className="mt-2 px-6 py-2 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600"
                  onClick={() => setShowSuccess(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center text-sm mt-10 text-red-500">
          Task not found.
        </div>
      )}
    </div>
  );
};

export default TaskDetail;
