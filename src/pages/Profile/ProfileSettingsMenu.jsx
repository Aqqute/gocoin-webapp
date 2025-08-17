import React from "react";
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
} from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

const ProfileSettingsMenu = ({ user, activeSection, setActiveSection, toggleTheme, handleLogout, navigate }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const settingsItems = [
    {
      id: "profile",
      title: user.username || "Guest",
      subtitle: user.email || "No email",
      isProfileCard: true,
      action: () => navigate("/profile/edit"), // Navigates to a separate full-page component
    },
    {
      id: "activities",
      title: "Activities",
      icon: Activity,
      action: () => setActiveSection("activities"),
    },
    {
      id: "wallet",
      title: "Manage Wallet",
      icon: Wallet,
      action: () => setActiveSection("wallet"),
    },
    {
      id: "notifications",
      title: "Notification settings",
      icon: Bell,
      action: () => setActiveSection("notifications"),
    },
    { id: "theme", title: "Dark mode", icon: Moon, isToggle: true, action: toggleTheme },
    {
      id: "password",
      title: "Change password",
      icon: Lock,
      action: () => setActiveSection("password"),
    },
    {
      id: "privacy",
      title: "Privacy Settings",
      icon: Shield,
      action: () => setActiveSection("privacy"),
    },
    {
      id: "referrals",
      title: "Referrals",
      icon: Users,
      action: () => setActiveSection("referrals"),
    },
    {
      id: "terms",
      title: "Terms of service",
      icon: FileText,
      action: () => setActiveSection("terms"),
    },
    { id: "logout", title: "Logout", icon: LogOut, action: handleLogout },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 space-y-2 text-sm">
        {settingsItems.map((item) => (
          <div
            key={item.id}
            onClick={item.action}
            // Apply active styles if the current item is the active section (excluding profile card)
            className={`cursor-pointer transition-colors rounded-lg 
                        ${item.isProfileCard ?
                            (isDark ? "bg-[#2a2a2a] hover:bg-[#333]" : "bg-gray-100 hover:bg-gray-200") :
                            (activeSection === item.id ?
                                (isDark ? "bg-[#2a2a2a]" : "bg-gray-100") : // Active state
                                (isDark ? "hover:bg-[#2a2a2a]" : "hover:bg-gray-100")
                            )
                        }
                        p-3 flex justify-between items-center`}
          >
            <div className="flex items-center gap-3">
              {item.isProfileCard ? (
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center font-bold text-white text-base overflow-hidden">
                  {user.avatar?.avatar ? (
                     <img src={user.avatar.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                     user.username?.charAt(0)?.toUpperCase() || "?"
                  )}
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

            {item.isToggle ? (
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
    </div>
  );
};

export default ProfileSettingsMenu;