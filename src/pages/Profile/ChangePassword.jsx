import React, { useState } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleBack = () => navigate("/profile");

  const handleSubmit = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      return toast.error("All fields are required");
    }
    if (newPassword !== confirmPassword) {
      return toast.error("New passwords do not match");
    }

    try {
      setLoading(true);
      const res = await axios.post("https://yourapi.com/change-password", {
        oldPassword,
        newPassword,
      });

      if (res.status === 200) {
        toast.success("Password changed successfully");
        navigate("/profile/settings");
      } else {
        toast.error("Failed to change password");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const cardStyle = `${isDark ? "bg-[#2a2a2a]" : "bg-white"} rounded-xl p-3 shadow-sm`;

  const inputBaseStyle = `w-full px-4 py-3 pr-10 rounded-md text-sm outline-none border`;
  const inputBg = isDark ? "bg-[#2B2B2B] text-white border-gray-600" : "bg-gray-100 text-black border-gray-300";

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? "bg-[#1e1e1e] text-white" : "bg-[#f9f9f9] text-black"}`}>
      {/* Header */}
      <div className="flex items-center px-3 pt-6 pb-3">
        <button onClick={handleBack} className="mr-4">
          <ArrowLeft size={20} className={isDark ? "text-white" : "text-black"} />
        </button>
        <h1 className="text-base font-semibold">Change Password</h1>
      </div>

      {/* Main Content */}
      <div className="px-4 space-y-4 pb-6 mt-6">
        <div>
          <div className="space-y-4">
            {/* Old Password */}
            <div className="relative">
              <input
                type={showOld ? "text" : "password"}
                placeholder="Old password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className={`${inputBaseStyle} ${inputBg}`}
              />
              <button
                type="button"
                onClick={() => setShowOld(!showOld)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* New Password */}
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`${inputBaseStyle} ${inputBg}`}
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`${inputBaseStyle} ${inputBg}`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-1">Both passwords must match</p>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full text-sm ${
                loading ? "bg-orange-400" : "bg-orange-500"
              } text-white py-2 rounded-full font-semibold flex items-center justify-center`}
            >
              {loading && (
                <svg
                  className="animate-spin h-4 w-4 mr-2 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              )}
              {loading ? "Changing..." : "Change Password"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
