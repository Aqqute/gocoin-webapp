import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import GoLogo from "../../../public/images/GoLogo.png";
import { ArrowLeft, FileText, X } from "lucide-react";

const tasks = [
  {
    id: 1,
    title: "Social media",
    description:
      "Promote our product by sharing a post on your social media account. Ensure you tag us and use the right hashtag.",
    instructions: [
      "Take a screenshot of our product or service.",
      "Write a short caption and include the hashtag #GoSocial.",
      "Tag @ourproduct on Instagram or Twitter.",
    ],
    amount: "0.000048",
    change: "~$2.00",
  },
  {
    id: 2,
    title: "Content creation",
    description:
      "Create engaging video or photo content using our product and share it online.",
    instructions: [
      "Record a 30-second video featuring our product.",
      "Post on TikTok or Instagram with hashtag #GoCreate.",
      "Mention @ourproduct and include product link in caption.",
    ],
    amount: "0.000048",
    change: "~$2.00",
  },
  {
    id: 3,
    title: "App download & reviews",
    description:
      "Help us grow by downloading our app, using it, and leaving a positive review.",
    instructions: [
      "Search for 'XYZ App' in Play Store or App Store.",
      "Sign up and complete the onboarding process.",
      "Leave a 5-star review and upload a screenshot.",
    ],
    amount: "0.000048",
    change: "~$2.00",
  },
  {
    id: 4,
    title: "Survey & Polls",
    description:
      "We want your feedback. Participate in our quick survey to help us improve.",
    instructions: [
      "Click the link to open the survey.",
      "Answer all questions honestly and thoroughly.",
      "Submit your responses only once.",
    ],
    amount: "0.000048",
    change: "~$2.00",
  },
  {
    id: 5,
    title: "Watch video",
    description:
      "Watch our latest product promo video and give feedback at the end.",
    instructions: [
      "Click the video link.",
      "Watch the full video without skipping.",
      "Submit a short comment or feedback form.",
    ],
    amount: "0.000020",
    change: "~$1.00",
  },
  {
    id: 6,
    title: "Email subscription",
    description:
      "Subscribe to our email list and stay updated with our latest offers.",
    instructions: [
      "Open the subscription link.",
      "Enter your email and verify it.",
      "Screenshot confirmation email and upload.",
    ],
    amount: "0.000030",
    change: "~$1.50",
  },
  {
    id: 7,
    title: "Product testing",
    description:
      "Get a free trial of our product and submit a review afterward.",
    instructions: [
      "Request a product sample through the link.",
      "Use it for at least 2 days.",
      "Submit a short written or video review.",
    ],
    amount: "0.000060",
    change: "~$3.00",
  },
  {
    id: 8,
    title: "Join community",
    description:
      "Become part of our growing online community on Discord or Telegram.",
    instructions: [
      "Click the invite link.",
      "Join the community and introduce yourself.",
      "Stay active for at least 24 hours.",
    ],
    amount: "0.000025",
    change: "~$1.25",
  },
];

const getButtonLabel = (title) => {
  switch (title.toLowerCase()) {
    case "social media":
      return "Link Social Media";
    case "content creation":
      return "Create Content";
    case "app download & reviews":
      return "Download App";
    case "survey & polls":
      return "Answer Survey Questions";
    case "watch video":
      return "Watch Video";
    case "email subscription":
      return "Subscribe via Email";
    case "product testing":
      return "Start Product Testing";
    case "join community":
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

  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [file, setFile] = useState(null);

  const task = tasks.find((t) => t.id === parseInt(id));

  if (!task) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-[#1e1e1e] text-white' : 'bg-[#f9f9f9] text-black'}`}>
        <p className="text-lg font-semibold">⚠️ Task not found</p>
      </div>
    );
  }

  const cardStyle = `${isDark ? 'bg-[#2a2a2a]' : 'bg-white'} rounded-xl p-4 shadow-sm`;

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.size < 2 * 1024 * 1024) {
      setFile(selected);
    } else {
      alert("Please upload a PNG file under 2MB");
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#1e1e1e] text-white' : 'bg-[#f9f9f9] text-black'}`}>
      {/* Header */}
      <div className="flex items-center px-4 pt-6 pb-3">
        <button onClick={() => navigate(-1)} className="mr-4">
          <ArrowLeft size={20} className={isDark ? 'text-white' : 'text-black'} />
        </button>
        <h1 className="text-base font-semibold">Task Details</h1>
      </div>

      {/* Main Content */}
      <div className="px-4 space-y-4 pb-6 mt-6 max-w-xl mx-auto">
        <div>
          <h2 className="text-base font-bold mb-0.5">{task.title}</h2>
          <p className="text-sm">{task.description}</p>
        </div>

        {/* Instruction Card */}
        <div className={cardStyle}>
          <div className="flex items-center gap-2 mb-3">
            <FileText className="text-orange-500" size={20} />
            <h3 className="font-semibold text-lg">Instructions</h3>
          </div>
          <ol className="list-decimal ml-5 space-y-2 text-sm">
            {task.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>

        {/* Reward */}
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-medium">Reward:</p>
          <div className={`${isDark ? 'bg-[#2a2a2a]' : 'bg-[#f2f3f5]'} flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium`}>
            <img src={GoLogo} alt="Go Logo" className="w-4 h-4 object-contain" />
            <span className="text-[#cc8400]">{task.amount}</span>
            <span>{task.change}</span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-full text-sm transition mt-12"
          onClick={() => setShowModal(true)}
        >
          {getButtonLabel(task.title)}
        </button>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-[#2a2a2a] text-black dark:text-white w-[90%] max-w-md p-6 rounded-xl relative">
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-white"
                onClick={() => setShowModal(false)}
              >
                <X size={20} />
              </button>
              <h3 className="text-lg font-semibold mb-2">
                {task.title === "Social media"
                  ? "Submit Social Media Link"
                  : "Submit Screenshot"}
              </h3>
              <p className="text-sm mb-4">
                {task.title === "Social media"
                  ? "Please paste a link to your post on Instagram, Twitter, or Facebook."
                  : "Upload a screenshot (PNG only, 2MB max)."}
              </p>

              {task.title === "Social media" ? (
                <input
                  type="text"
                  placeholder="https://socialmedia.com/your-post"
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
                onClick={() => {
                  if (task.title === "Social media" && !inputValue) return alert("Please provide a valid URL");
                  if (task.title !== "Social media" && !file) return alert("Please upload a screenshot");
                  alert("Submitted successfully!");
                  setShowModal(false);
                }}
              >
                Submit {task.title === "Social media" ? "Link" : "Screenshot"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetail;
