import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Home as HomeIcon,
  Wallet,
  BarChart3,
  User,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();

  const isDark = theme === "dark";
  const bgColor = isDark ? "bg-[#2a2a2a]" : "bg-white";
  const textColor = isDark ? "text-gray-400" : "text-gray-600";
  const activeColor = "text-[#FFA200]";

  const navItems = [
    { label: "Home", icon: HomeIcon, to: "/" },
    { label: "Wallet", icon: Wallet, to: "/wallet" },
    { label: "Board", icon: BarChart3, to: "/board" },
  ];

  return (
    <div
      className={`w-full rounded-t-[32px] py-2 fixed bottom-0 left-0 right-0 sm:max-w-md sm:left-1/2 sm:translate-x-[-50%] sm:bottom-2 ${bgColor} sm:rounded-[32px] z-50 shadow-lg`}
    >
      <nav className="flex justify-between items-end px-8 py-2 relative">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          const Icon = item.icon;

          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center gap-2 text-xs font-medium relative transition duration-200 flex-1`}
            >
              {isActive ? (
                <>
                  <div
                    className={`absolute -top-12 w-16 h-16 ${
                      isDark
                        ? "bg-orange-500  border-[#2a2a2a]"
                        : "bg-orange-500  shadow-orange-200 border-white"
                    } text-white rounded-full flex items-center justify-center shadow-2xl z-30 border-4`}
                  >
                    <Icon size={26} />
                  </div>
                  <span className={`mt-10 ${activeColor} font-semibold`}>
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
          className={`flex flex-col items-center gap-2 text-xs font-medium relative transition duration-200 flex-1`}
        >
          {location.pathname === "/profile" ? (
            <>
              <div
                className={`absolute -top-12 w-16 h-16 ${
                  isDark
                    ? "bg-orange-500  border-[#2a2a2a]"
                    : "bg-orange-500  shadow-orange-200 border-white"
                } text-white rounded-full flex items-center justify-center shadow-2xl z-30 border-4`}
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
