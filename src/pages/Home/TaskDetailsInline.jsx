// TaskDetailInline.jsx
import React, { useState, useEffect } from "react";
import GoLogo from "../../../public/images/GoLogo.png";
import { FileText, X } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

const getButtonLabel = (type) => {
  switch (type?.toLowerCase()) {
    case "social_media": return "Link Social Media";
    case "content_creation": return "Create Content";
    case "app_download_reviews": return "Download App";
    case "survey_polls": return "Answer Survey Questions";
    case "watch_video": return "Watch Video";
    case "email_subscription": return "Subscribe via Email";
    case "product_testing": return "Start Product Testing";
    case "join_community": return "Join Community";
    default: return "Start Task";
  }
};

const TaskDetailInline = ({ taskId }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { token } = useAuth();

  const [task, setTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`https://gocoin.onrender.com/api/tasks/${taskId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTask(res.data.data.task);
        setLoading(false);
      } catch (err) {
        console.error("Fetch failed", err);
      }
    };

    if (taskId) {
      setLoading(true);
      fetchTask();
    }
  }, [taskId]);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.size < 2 * 1024 * 1024) {
      setFile(selected);
    } else {
      alert("Please upload a PNG file under 2MB");
    }
  };

  if (loading) return <p className="mt-6 text-sm">Loading task...</p>;
  if (!task) return <p className="mt-6 text-sm text-red-500">Task not found.</p>;

  return (
    <div className="space-y-5 pb-10 max-w-xl">
      <h2 className="text-xl font-bold">{task.campaignTopic}</h2>
      <p className="text-sm">{task.description}</p>

      <div className={`${isDark ? "bg-[#2a2a2a]" : "bg-white"} p-4 rounded-xl`}>
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

      <div className="flex items-center gap-2">
        <img src={GoLogo} alt="Go Logo" className="w-5 h-5" />
        <span className="text-[#cc8400] font-medium">{task.rewards?.goToken}</span>
        <span className="text-sm text-gray-500">~${task.rewards?.fiatEquivalent}</span>
      </div>

      <button
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded-full text-sm transition"
        onClick={() => setShowModal(true)}
      >
        {getButtonLabel(task.type)}
      </button>

      {showModal && (
        <div className={`mt-6 p-4 border rounded-xl ${isDark ? "bg-[#2a2a2a]" : "bg-white"}`}>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-lg">
              {task.submissionMethod === "link" ? "Submit Link" : "Submit Screenshot"}
            </h3>
            <X className="cursor-pointer" size={18} onClick={() => setShowModal(false)} />
          </div>

          {task.submissionMethod === "link" ? (
            <input
              type="text"
              placeholder="https://link.com"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm mb-4"
            />
          ) : (
            <label className="w-full border border-dashed border-gray-400 rounded-xl flex items-center justify-center py-8 cursor-pointer text-center mb-4">
              <input
                type="file"
                accept="image/png"
                onChange={handleFileChange}
                className="hidden"
              />
              {file ? file.name : "Click to upload PNG (2MB max)"}
            </label>
          )}

          <button
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-full text-sm"
            onClick={async () => {
              try {
                if (task.submissionMethod === "link") {
                  if (!inputValue) return toast.error("Please enter a link");
                  await axios.post(
                    `https://gocoin.onrender.com/api/tasks/${taskId}/submit`,
                    { submissionData: inputValue },
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                      },
                    }
                  );
                } else {
                  if (!file) return toast.error("Please upload a file");
                  const formData = new FormData();
                  formData.append("submissionData", file);
                  await axios.post(
                    `https://gocoin.onrender.com/api/tasks/${taskId}/submit`,
                    formData,
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                      },
                    }
                  );
                }

                toast.success("Submitted successfully!");
                setShowModal(false);
                setInputValue("");
                setFile(null);
              } catch (err) {
                console.error("Submission failed:", err);
                toast.error("Submission failed");
              }
            }}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskDetailInline;
