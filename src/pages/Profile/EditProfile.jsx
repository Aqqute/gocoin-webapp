import React, { useEffect, useState } from "react";
import { Camera } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const EditProfile = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { token } = useAuth();
  const isDark = theme === "dark";
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    country: "",
    stateRegion: "",
    avatar: "",
  });

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        "https://gocoin.onrender.com/api/users/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const user = response.data.user;

      setUserId(user._id);
      setFormData({
        userId: user._id,
        username: user.username || "",
        email: user.email || "",
        country: user.country || "",
        stateRegion: user.stateRegion || "",
        avatar: user.avatar || "",
      });
    } catch (error) {
      console.error("Failed to fetch user:", error);
      toast.error("Failed to load user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      setLoading(true);
      fetchUser();
    }
  }, [token]);

  const handleEditImage = () => {
    toast("Profile image edit not implemented yet");
  };

  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      const payload = {
        userId,
        username: formData.username,
        country: formData.country,
        email: formData.email,
        stateRegion: formData.stateRegion,
      };

      const res = await axios.put(
        "https://gocoin.onrender.com/api/users/me/profile",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Profile updated successfully");
      localStorage.setItem(
        "user",
        JSON.stringify({
          token,
          user: res.data.user,
        })
      );
      navigate("/profile");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error(error?.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => navigate("/profile");

  return (
    <div
      className={`min-h-screen flex ${
        isDark ? "bg-[#1e1e1e] text-white" : "bg-[#f9f9f9] text-black"
      }`}
    >
      {/* Left Sidebar Card */}
      <div
        className={`w-1/3 max-w-sm rounded-xl shadow-sm p-6 ${
          isDark ? "bg-[#2a2a2a]" : "bg-white"
        }`}
      >
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden">
              <img
                src={
                  formData.avatar ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={handleEditImage}
              className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow"
            >
              <Camera size={14} className="text-black" />
            </button>
          </div>
          <h2 className="text-base font-semibold mt-3">{formData.username}</h2>
          <p className="text-sm text-gray-500">{formData.email}</p>
          <button
            onClick={handleEditImage}
            className="mt-2 text-xs text-orange-500 hover:underline"
          >
            Edit profile image
          </button>
        </div>
      </div>

      {/* Right Form */}
      <div
        className={`flex-1 ml-6 rounded-xl shadow-sm p-6 ${
          isDark ? "bg-[#2a2a2a]" : "bg-white"
        }`}
      >
        <h2 className="text-lg font-semibold mb-6">Edit profile</h2>
        <div className="space-y-4">
          {[
            { name: "username", label: "Username" },
            { name: "email", label: "Email address", type: "email" },
            { name: "country", label: "Country" },
            { name: "stateRegion", label: "State/Region" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium mb-1">
                {field.label}
              </label>
              <input
                type={field.type || "text"}
                value={formData[field.name]}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    [field.name]: e.target.value,
                  }))
                }
                className={`w-full px-3 py-2 rounded-lg border text-sm outline-none ${
                  isDark
                    ? "bg-[#1e1e1e] border-gray-700 text-white"
                    : "bg-white border-gray-300 text-black"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSaveChanges}
            disabled={loading}
            className={`px-6 py-2 rounded-lg text-sm font-medium ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            } text-white`}
          >
            {loading ? "Saving..." : "Save change"}
          </button>
          <button
            onClick={handleCancel}
            className={`px-6 py-2 rounded-lg text-sm font-medium border ${
              isDark
                ? "border-gray-600 text-white hover:bg-gray-700"
                : "border-gray-300 text-black hover:bg-gray-100"
            }`}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
