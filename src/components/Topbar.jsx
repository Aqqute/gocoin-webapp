import { Flame, Bell, SlidersHorizontal } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useLocation } from "react-router-dom";

const Topbar = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const location = useLocation();

  const bgColor = isDark ? "bg-black" : "bg-white";
  const borderColor = isDark ? "border-[#2a2a2a]" : "border-gray-200";
  const textColor = isDark ? "text-white" : "text-black";
  const inputBg = isDark ? "bg-[#1e1e1e] text-white" : "bg-gray-100 text-black";
  const placeholderColor = isDark ? "placeholder-gray-400" : "placeholder-gray-500";

  // Define route titles
  const routeTitles = {
    "/": "Dashboard",
    "/wallet": "Wallet",
    "/leaderboard": "Leaderboard",
    "/profile": "Profile",
  };

  const currentPath = location.pathname;
  const pageTitle = routeTitles[currentPath] || "";

  return (
    <header
      className={`hidden lg:flex justify-between items-center px-8 py-4 border-b ${borderColor} ${bgColor} transition-colors`}
    >
      {/* Left: Page Title + Search */}
      <div className="flex items-center gap-4 w-1/3">
        <h2 className={`text-lg font-semibold ${textColor}`}>{pageTitle}</h2>
        {/* <div className={`flex items-center px-3 py-1.5 rounded-full ${inputBg} w-full`}>
          <input
            type="text"
            placeholder="Search..."
            className={`w-full bg-transparent focus:outline-none text-sm ${placeholderColor}`}
          />
          <SlidersHorizontal size={18} className={isDark ? "text-gray-400" : "text-gray-600"} />
        </div> */}
      </div>

      {/* Right: Flame + Bell */}
      <div className="flex items-center gap-6">
        <div
          className={`rounded-full flex items-center py-1 px-3 text-sm font-medium ${
            isDark ? "bg-[#2a2a2a]" : "bg-gray-200"
          }`}
        >
          {/* <Flame className="text-orange-500" size={18} />
          <span className={`ml-1 ${textColor}`}>20</span> */}
        </div>

        <div className="relative">
          <Bell className={isDark ? "text-gray-300" : "text-black"} size={22} />
          <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full px-1.5 text-xs">
            0
          </span>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
