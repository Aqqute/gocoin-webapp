import React from "react";
import GoLogo from "../../public/images/GoLogo.png";
import { Flame, Bell } from "lucide-react";
import Search from "./Search";
import { useTheme } from "../contexts/ThemeContext";

const Header = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header
      className={`p-4 shadow-md fixed top-0 left-0 right-0 z-50 transition-colors ${
        isDark ? "bg-[#1e1e1e]" : "bg-white"
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Logo + Title */}
        <div className="flex items-center gap-2">
          <img src={GoLogo} alt="GoCoin Logo" width={30} height={40} />
          <h1
            className={`font-semibold font-mono text-xl ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            GOTOKEN
          </h1>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-6 relative">
          <div className="flex items-center bg-gray-300 px-2 py-1 rounded-full gap-1">
            <Flame className="text-orange-500" size={20} />
            <span className={`text-sm font-medium ${isDark ? "text-black" : "text-black"}`}>
              20
            </span>
          </div>
          
          <div className="relative">
            <Bell className={isDark ? "text-gray-300" : "text-black"} size={22} />
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full px-1.5 text-xs">
              0
            </span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mt-4">
        <Search />
      </div>
    </header>
  );
};

export default Header;
