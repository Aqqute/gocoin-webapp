import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  Wallet,
  Bell,
  Moon,
  Lock,
  Shield,
  Users,
  FileText,
  ChevronRight,
  LogOut,
  AlertTriangle
} from "lucide-react";
import Navbar from "../components/Navbar";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import PageLoader from "../components/PageLoader";
import BaseLayout from "../components/Layout";

const ProfileSettings = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { token, logout } = useAuth();
  const isDark = theme === "dark";

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [logoutmodal, setLogoutmodal] = useState(false);

  // Function to show logout confirmation modal.
  const showLogoutModal = () => {
    setLogoutmodal(true);
  };

  // Function to handle the confirmed logout.
  const confirmLogout = () => {
    // Call the logout function from context
    logout();
    // Close the modal
    setLogoutmodal(false);
    // Redirect the user (update the path as necessary)
    navigate("/login");
  };

  useEffect(() => {
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
        setUser(response.data.user || {});
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  const settingsItems = [
    {
      id: "profile",
      title: user.username || "",
      subtitle: user.email || "",
      isProfileCard: true,
      path: "/profile/edit",
    },
    {
      id: "activities",
      title: "Activities",
      icon: Activity,
      path: "/profile/activities",
    },
    {
      id: "wallet",
      title: "Manage Wallet",
      icon: Wallet,
      path: "/profile/wallet",
    },
    {
      id: "notifications",
      title: "Notifications",
      icon: Bell,
      path: "/profile/notifications",
    },
    { id: "lightMode", title: "Theme", icon: Moon },
    {
      id: "password",
      title: "Change Password",
      icon: Lock,
      path: "/profile/password",
    },
    {
      id: "privacy",
      title: "Privacy Settings",
      icon: Shield,
      path: "/profile/privacy",
    },
    {
      id: "referrals",
      title: "Referrals",
      icon: Users,
      path: "/profile/referrals",
    },
    {
      id: "terms",
      title: "Terms of Service",
      icon: FileText,
      path: "/profile/terms",
    },
    { id: "logout", title: "Logout", icon: LogOut, action: showLogoutModal },
  ];

  const handleItemClick = (item) => {
    if (item.id === "lightMode") {
      toggleTheme();
    } else if (item.id === "logout") {
      item.action(); // Open the logout confirmation modal
    } else if (item.path) {
      navigate(item.path, { state: { user } });
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <BaseLayout>
      <div
        className={`flex flex-col ${
          isDark ? "bg-black text-white" : "bg-white text-black"
        } min-h-screen`}
      >
        <h1 className="pt-6 px-4 text-lg font-semibold">Profile Settings</h1>

        <div className="flex-1 overflow-y-auto pt-6 px-4 space-y-2 text-sm pb-24">
          {settingsItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`cursor-pointer transition-colors rounded-lg ${
                item.isProfileCard
                  ? isDark
                    ? "bg-[#2b2b2b] hover:bg-[#333]"
                    : "bg-gray-100 hover:bg-gray-200"
                  : isDark
                  ? "hover:bg-[#2a2a2a]"
                  : "hover:bg-gray-100"
              } p-3 flex justify-between items-center`}
            >
              <div className="flex items-center gap-3">
                {item.isProfileCard ? (
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center font-bold text-white text-base">
                    {user.username?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                ) : (
                  <item.icon
                    size={20}
                    className={isDark ? "text-gray-300" : "text-gray-600"}
                  />
                )}
                <div className="flex flex-col leading-tight">
                  <span className="font-medium text-md">{item.title}</span>
                  {item.subtitle && (
                    <span
                      className={`text-xs ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {item.subtitle}
                    </span>
                  )}
                </div>
              </div>

              {item.id === "lightMode" ? (
                <div
                  className={`w-10 h-5 rounded-full flex items-center px-1 ${
                    isDark ? "bg-orange-500" : "bg-gray-400"
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      isDark ? "translate-x-5" : "translate-x-0"
                    }`}
                  ></div>
                </div>
              ) : (
                <ChevronRight
                  size={20}
                  className={isDark ? "text-gray-400" : "text-gray-500"}
                />
              )}
            </div>
          ))}
        </div>

        {/* Logout Confirmation Modal */}
        {logoutmodal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div
              className={`w-full max-w-md p-6 rounded-xl shadow-lg flex flex-col space-y-4 ${
                isDark ? "bg-[#2a2a2a] text-white" : "bg-white text-black"
              }`}
            >
              {/* Icon and Title */}
              <div className="flex flex-col items-center text-center space-y-2">
                <AlertTriangle className="text-yellow-500" size={36} />
                <h2 className="text-lg font-semibold">Confirm Logout</h2>
              </div>

              {/* Message */}
              <p className="text-sm text-center">
                Are you sure you want to logout? You will have to login again to access your account.
              </p>

              {/* Actions */}
              <div className="flex flex-col justify-between gap-3 pt-2">
                <button
                  onClick={confirmLogout}
                  className="w-full px-4 py-2 rounded-3xl text-sm font-medium bg-red-600 text-white hover:bg-red-700"
                >
                  Logout
                </button>
                <button
                  onClick={() => setLogoutmodal(false)}
                  className="w-full px-4 py-2 rounded-3xl text-sm font-medium border border-gray-400 hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <Navbar />
      </div>
    </BaseLayout>
  );
};

export default ProfileSettings;
