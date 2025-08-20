import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import toast from "react-hot-toast"; // Keep toast for feedback

const ChangePassword = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      return toast.error("All fields are required");
    }
    if (newPassword !== confirmPassword) {
      return toast.error("New passwords do not match");
    }

    try {
      setLoading(true);
      // Simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      // In a real app:
      // const res = await axios.post("https://yourapi.com/change-password", {
      //   oldPassword,
      //   newPassword,
      // });
      // if (res.status === 200) {
      //   toast.success("Password changed successfully");
      // } else {
      //   toast.error("Failed to change password");
      // }

      toast.success("Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputBaseStyle = `w-full px-4 py-2 pr-10 rounded-md text-sm outline-none`;
  const inputBg = isDark ? "bg-[#2B2B2B] text-white border border-gray-700 focus:border-orange-500" : "bg-gray-100 text-black border border-gray-200 focus:border-orange-500";

  return (
    <div className={`flex flex-col h-full ${isDark ? "text-white" : "text-black"}`}>
      <h2 className="text-lg font-semibold mb-4">Change Password</h2>

      {/* Main Content */}
      <div className="space-y-4">
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
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
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
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
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
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
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
              loading ? "bg-orange-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
            } text-white py-2 rounded-full font-semibold flex items-center justify-center transition-colors`}
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
            {loading ? "Changing..." : "Change password"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;