import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import GoLogo from "../../../public/images/GoLogo.png";
import { FileText, ArrowLeft } from "lucide-react";

const tasks = [
  {
    id: 1,
    title: "Social media",
    description:
      "This Survey is about dolor sit amet consectetur. Elementum felis nulla facilisis est. Pellentesque mollis purus at vestibulum maecenas.",
    instructions: [
      "This Survey is about dolor sit amet consectetur. Elementum felis nulla facilisis est.",
      "This Survey is about dolor sit amet consectetur. Elementum felis nulla facilisis est.",
      "This Survey is about dolor sit amet consectetur. Elementum felis nulla facilisis est.",
    ],
    amount: "0.000048",
    change: "~$2.00",
  },
  {
    id: 2,
    title: "Content creation",
    description:
      "Create and post original media content. Pellentesque mollis purus at vestibulum maecenas.",
    instructions: [
      "Record a 30-second video using our product.",
      "Post it on TikTok with hashtag #GoCreate.",
      "Include product link in caption.",
    ],
    amount: "0.000048",
    change: "~$2.00",
  },
  {
    id: 3,
    title: "App download & reviews",
    description:
      "Download the XYZ app, complete onboarding, and leave a 5-star review. Upload screenshot proof.",
    instructions: [
      "Download XYZ app from Play Store.",
      "Complete sign-up and onboarding.",
      "Leave a 5-star review and upload a screenshot.",
    ],
    amount: "0.000048",
    change: "~$2.00",
  },
  {
    id: 4,
    title: "Survey & Polls",
    description:
      "This Survey is about dolor sit amet consectetur. Elementum felis nulla facilisis est. Pellentesque mollis purus at vestibulum maecenas.",
    instructions: [
      "Answer all questions honestly.",
      "Do not submit multiple responses.",
      "Submit only when you're done.",
    ],
    amount: "0.000048",
    change: "~$2.00",
  },
];

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const task = tasks.find((t) => t.id === parseInt(id));

  if (!task) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDark ? "bg-[#1e1e1e] text-white" : "bg-[#f9f9f9] text-black"
        }`}
      >
        <p>Task not found</p>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDark ? "bg-[#1e1e1e] text-white" : "bg-[#f9f9f9] text-black"
      }`}
    >
      <Header />
      <div className="h-20" />

      <div className="px-4 pb-32 max-w-xl w-full mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="text-sm font-medium mb-6 flex items-center gap-1 text-orange-500"
        >
          <ArrowLeft size={16} /> Task details
        </button>

        <h1 className="text-xl font-semibold mb-2">Campaign Topic</h1>
        <p className="text-sm mb-6">{task.description}</p>

        <div
          className={`p-4 rounded-xl mb-6 ${
            isDark ? "bg-[#2a2a2a]" : "bg-[#f2f3f5]"
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            <FileText className="text-orange-500" size={18} />
            <h3 className="font-semibold text-sm">Instructions</h3>
          </div>
          <ol className="list-decimal ml-5 space-y-2 text-sm">
            {task.instructions.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ol>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <p className="text-sm font-medium">Rewards:</p>
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
              isDark ? "bg-[#2a2a2a]" : "bg-[#f2f3f5]"
            }`}
          >
            <img
              src={GoLogo}
              alt="Go Logo"
              className="w-4 h-4 object-contain"
            />
            <span className="text-[#cc8400]">{task.amount}</span>
            <span className="text-gray-600">{task.change}</span>
          </div>
        </div>

        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-full text-sm transition">
          Download APP
        </button>
      </div>

      <Navbar />
    </div>
  );
};

export default TaskDetail;
