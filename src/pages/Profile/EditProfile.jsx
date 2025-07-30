import React, { useEffect, useState } from "react";
import { ArrowLeft, Camera } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const EditProfile = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { currentUser, setCurrentUser, token } = useAuth();
  const isDark = theme === "dark";

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    country: "",
    stateRegion: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        username: currentUser.username || "",
        email: currentUser.email || "",
        country: currentUser.country || "",
        stateRegion: currentUser.stateRegion || "",
      });
    }
  }, [currentUser]);

  const handleBack = () => navigate("/profile");

  const handleEditImage = () => {
    toast("Profile image edit not implemented yet");
  };

  const handleSaveChanges = async () => {
    if (!currentUser?._id) {
      toast.error("User ID missing");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        userId: currentUser._id,
        ...formData,
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
      setCurrentUser(res.data.user); 
      console.log("Updated user:", res.data.user);
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

  const cardStyle = `${
    isDark ? "bg-[#2a2a2a]" : "bg-white shadow-sm"
  } rounded-xl p-2`;

  return (
    <div
      className={`h-screen flex flex-col justify-between ${
        isDark ? "bg-[#1e1e1e] text-white" : "bg-[#f9f9f9] text-black"
      }`}
    >
      {/* Header */}
      <div className="flex items-center px-3 pt-6 pb-3">
        <button onClick={handleBack} className="mr-4">
          <ArrowLeft
            size={20}
            className={isDark ? "text-white" : "text-black"}
          />
        </button>
        <h1 className="text-base font-medium">Edit Profile</h1>
      </div>

      {/* Profile image & name */}
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="w-16 h-16 bg-orange-500 rounded-full overflow-hidden">
            <img
              src={currentUser?.avatar || "https://via.placeholder.com/96"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={handleEditImage}
            className="absolute bottom-0 right-0 bg-white rounded-full p-0.5 shadow"
          >
            <Camera size={12} className="text-black" />
          </button>
        </div>

        <h2 className="text-sm font-semibold mt-1">{formData.username}</h2>
        <button
          onClick={handleEditImage}
          className="text-xs text-orange-500 hover:underline"
        >
          Edit profile image
        </button>
      </div>

      {/* Form fields */}
      <div className="px-4 py-6 space-y-2">
        {["username", "email", "country", "stateRegion"].map((field) => (
          <div key={field} className={cardStyle}>
            <input
              type={field === "email" ? "email" : "text"}
              placeholder={
                field === "stateRegion"
                  ? "State/Region"
                  : field.charAt(0).toUpperCase() + field.slice(1)
              }
              value={formData[field]}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, [field]: e.target.value }))
              }
              className={`w-full bg-transparent outline-none placeholder-gray-400 text-xs ${
                isDark ? "text-white" : "text-black"
              }`}
            />
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="px-3 space-y-2 pb-4">
        <button
          onClick={handleSaveChanges}
          disabled={loading}
          className={`w-full py-2 rounded-xl text-sm font-medium ${
            loading ? "bg-gray-400" : "bg-orange-500 hover:bg-[#b67300]"
          } text-white`}
        >
          {loading ? "Saving..." : "Save"}
        </button>
        <button
          onClick={handleCancel}
          className={`w-full py-2 text-sm font-medium rounded-xl ${
            isDark
              ? "text-white hover:text-gray-400"
              : "text-black hover:text-gray-600"
          }`}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
