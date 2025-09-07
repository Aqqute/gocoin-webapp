import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { 
  AlertTriangle, 
  Wallet, 
  Bell, 
  Moon, 
  Shield, 
  Users, 
  FileText, 
  LogOut, 
  ChevronRight,
  Lock, 
  Activity
} from "lucide-react";


import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
// import PageLoader from '../components/PageLoader';
import BaseLayout from "../components/Layout";
import Navbar from "../components/Navbar";
// import DesktopHeader from "../components/DesktopHeader";

// Sub-components for the right pane
import ProfileSettingsMenu from "./Profile/ProfileSettingsMenu"; // Renamed and modified
import Activities from "./Profile/Activity"; // Modified
import ChangePassword from "./Profile/ChangePassword"; // Modified
import PrivacySettings from "./Profile/PrivacySettings"; // New
import ManageWallet from "./Profile/ManageWallet"; // New
import Referrals from "./Profile/Referrals";
import Notifications from "./Profile/NotificationSettings";
import TermsOfService from "./Profile/Terms";
import AddDetails from "./AddDetails";
import WithdrawForm from "./Profile/WithdrawForm"; // New import

const ProfileDashboard = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { token, logout } = useAuth();
  const isDark = theme === "dark";

  const [user, setUser] = useState({});
  // console.log(user)
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    setLogoutModal(true);
  };

  const confirmLogout = () => {
    logout();
    setLogoutModal(false);
    navigate("/login");
  };

  // 'activities' is the default view as per the image
  const [activeSection, setActiveSection] = useState("activities");
  const [logoutModal, setLogoutModal] = useState(false);

    const settingsItems = [
    {
      id: "profile",
      title: user.username ,
      subtitle: user.email,
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
      id: "add details",
      title: "Add Details",
      icon: Users,
      path: "/profile/add_details"
    },
    {
      id: "terms",
      title: "Terms of Service",
      icon: FileText,
      path: "/profile/terms",
    },
    {
      id: "withdraw",
      title: "Withdraw Funds",
      icon: Wallet,
      path: "/profile/withdraw"
    },
    { id: "logout", title: "Logout", icon: LogOut, action: handleLogout },
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
        toast.error("Failed to load user data.");
        // Optionally redirect to login if token is invalid
        // logout(); // Uncomment to force logout on error
        // navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUser();
    } else {
      setLoading(false);
      navigate("/login"); // Redirect if no token
    }
  }, [token, navigate, logout]);

  

  const renderContent = () => {
    switch (activeSection) {
      case "activities":
        return <Activities />;
      case "wallet":
        return <ManageWallet />;
      case "password":
        return <ChangePassword />;
      case "privacy":
        return <PrivacySettings />;
      case "notifications":
        return <Notifications />;
      case "referrals":
        return <Referrals />;
      case "terms":
        return <TermsOfService />;
      case "add-details":
        return <AddDetails />;
      case "withdraw": // New case for withdraw section
        return <WithdrawForm user={user} />;
      default:
        // Default to Activity if an unknown section is active or for 'profile' card click
        return <Activity />;
    }
  };

  return (
    <BaseLayout>
    {/* MOBILE VIEW */}
    <div
      className={`flex flex-col lg:hidden  ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      } min-h-screen`}
    >

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
      {logoutModal && (
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
    {/* DESKTOP VIEW  */}
      <div className="hidden lg:block">
        <div
          className={`flex min-h-screen ${
            isDark ? "bg-black text-white" : "bg-white text-black"
          } `}
        >
          {/* Main content area */}
          <div className="flex-1 flex flex-col">

            {/* Two-pane content */}
            <div className="flex flex-1 p-6 gap-6">
              {/* Left Profile Settings Menu */}
              <div
                className={`w-1/3 min-w-[300px] ${
                  isDark ? "bg-[#1e1e1e]" : "bg-[#f9f9f9]"
                } rounded-xl p-4 shadow-sm`}
              >
                <ProfileSettingsMenu
                  user={user}
                  activeSection={activeSection}
                  setActiveSection={setActiveSection}
                  toggleTheme={toggleTheme}
                  handleLogout={handleLogout}
                  navigate={navigate}
                />
              </div>

              {/* Right Content Pane */}
              <div
                className={`flex-1 ${
                  isDark ? "bg-[#1e1e1e]" : "bg-[#f9f9f9]"
                } rounded-xl p-4 shadow-sm`}
              >
                {renderContent()}
              </div>
            </div>
          </div>
          {/* Logout Confirmation Modal */}
          {logoutModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div
                className={`rounded-xl p-6 shadow-lg w-full max-w-sm ${
                  isDark ? "bg-[#232323] text-white" : "bg-white text-black"
                }`}
              >
                <div className="flex flex-col items-center gap-3">
                  <AlertTriangle size={40} className="text-orange-500 mb-2" />
                  <h3 className="text-lg font-semibold mb-2">Confirm Logout</h3>
                  <p className="mb-4 text-center">
                    Are you sure you want to logout?
                  </p>
                  <div className="flex gap-3 w-full">
                    <button
                      onClick={confirmLogout}
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-full font-semibold"
                    >
                      Logout
                    </button>
                    <button
                      onClick={() => setLogoutModal(false)}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-black py-2 rounded-full font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </BaseLayout>
  );
};

export default ProfileDashboard;
