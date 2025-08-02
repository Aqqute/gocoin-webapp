import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import GoLogo from "../../../public/images/GoLogo.png";
import { ArrowLeft, FileText, X } from "lucide-react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

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
        console.log("Fetched task:", response.data.data.task);
        setTask(response.data.data.task);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    if (id) {
      fetchTask();
    }
  }, [id]);

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

          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium">Reward:</p>
            <div
              className={`${
                isDark ? "bg-[#2a2a2a]" : "bg-[#f2f3f5]"
              } flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium`}
            >
              <img
                src={GoLogo}
                alt="Go Logo"
                className="w-4 h-4 object-contain"
              />
              <span className="text-[#cc8400]">{task.rewards?.goToken}</span>
              <span>~${task.rewards?.fiatEquivalent}</span>
            </div>
          </div>

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
                    ? "Submit Content Link"
                    : "Submit Screenshot"}
                </h3>
                <p className="text-sm mb-4">
                  {task.submissionMethod === "link"
                    ? "Paste the link to your content (e.g. YouTube, TikTok)"
                    : "Upload a screenshot (PNG only, 2MB max)."}
                </p>

                {task.submissionMethod === "link" ? (
                  <input
                    type="text"
                    placeholder="https://your-content-link.com"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm"
                  />
                ) : (
                  <label className="w-full border border-dashed border-gray-400 dark:border-gray-600 rounded-xl flex items-center justify-center py-8 cursor-pointer text-center">
                    <input
                      type="file"
                      accept="image/png"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    {file ? file.name : "Click to upload image"}
                  </label>
                )}

                <button
                  className="w-full mt-5 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-full text-sm"
                  onClick={async () => {
                    if (task.submissionMethod === "link" && !inputValue)
                      return toast.error("Please provide a valid URL");

                    try {
                      if (task.submissionMethod === "link") {
                        await axios.post(
                          `https://gocoin.onrender.com/api/tasks/${id}/submit`,
                          { submissionData: inputValue },
                          {
                            headers: {
                              Authorization: `Bearer ${token}`,
                              "Content-Type": "application/json",
                            },
                          }
                        );
                        toast.success("Link submitted successfully!");
                      } else {
                        if (!file)
                          return toast.error("Please upload a screenshot");

                        const formData = new FormData();
                        formData.append("submissionData", file);

                        await axios.post(
                          `https://gocoin.onrender.com/api/tasks/${id}/submit`,
                          formData,
                          {
                            headers: {
                              Authorization: `Bearer ${token}`,
                              "Content-Type": "multipart/form-data",
                            },
                          }
                        );
                        toast.success("Screenshot submitted successfully!");
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
