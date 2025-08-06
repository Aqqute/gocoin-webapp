import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home as HomeIcon,
  Wallet,
  BarChart3,
  User,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const Navbar = () => {
  const location = useLocation();
  const { theme } = useTheme();

  const isDark = theme === "dark";
  const bgColor = isDark ? "bg-[#2a2a2a]" : "bg-white";
  const textColor = isDark ? "text-gray-400" : "text-gray-600";
  const activeColor = "text-orange-500";

  const navItems = [
    { label: "Home", icon: HomeIcon, to: "/" },
    { label: "Wallet", icon: Wallet, to: "/wallet" },
    // { label: "Board", icon: BarChart3, to: "/board" },
  ];

  return (
    <div
      className={` lg:hidden w-full rounded-t-[32px] fixed bottom-0 left-0 right-0 sm:max-w-md sm:left-1/2 sm:translate-x-[-50%] sm:bottom-2 ${bgColor} sm:rounded-[32px] z-50 ${
        isDark ? "shadow-md" : "shadow-[0_0_15px_rgba(0,0,0,0.1)]"
      }`}
    >
      <nav className="flex justify-between items-end py-2 relative">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          const Icon = item.icon;

          return (
            <Link
              key={item.to}
              to={item.to}
              className="flex flex-col items-center gap-2 text-xs font-medium relative transition duration-200 flex-1"
            >
              {isActive ? (
                <>
                  <div
                    className={`absolute -top-8 w-14 h-14 ${
                      isDark
                      ? "bg-[#2a2a2a]"
                    : "bg-white shadow-orange-200 border-gray-200"
                    } text-orange-500 rounded-full flex items-center justify-center shadow-2xl z-30`}
                  >
                    <Icon size={25} />
                  </div>
                  <span className={`mt-10 ${activeColor} text-md font-semibold`}>
                    {item.label}
                  </span>
                </>
              ) : (
                <>
                  <Icon size={22} className={textColor} />
                  <span className={textColor}>{item.label}</span>
                </>
              )}
            </Link>
          );
        })}

        {/* Profile (No auth check) */}
        <Link
          to="/profile"
          className="flex flex-col items-center gap-2 text-xs font-medium relative transition duration-200 flex-1"
        >
          {location.pathname === "/profile" ? (
            <>
              <div
                className={`absolute -top-8 w-14 h-14 ${
                  isDark
                    ? "bg-[#2a2a2a]"
                    : "bg-white shadow-orange-200 border-gray-200"
                } text-orange-500 rounded-full flex items-center justify-center shadow-4xl z-30`}
              >
                <User size={26} />
              </div>
              <span className={`mt-10 ${activeColor} font-semibold`}>
                Profile
              </span>
            </>
          ) : (
            <>
              <User size={22} className={textColor} />
              <span className={textColor}>Profile</span>
            </>
          )}
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
