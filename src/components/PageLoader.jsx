import React from "react";
import GoLogo from "../../public/images/GoLogo.png";
import { useTheme } from "../contexts/ThemeContext";

const PageLoader = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        isDark ? "bg-black" : "bg-white"
      }`}
    >
      <div
        className="w-20 h-20 rounded-full border-[6px] border-orange-500 border-t-transparent animate-spin flex items-center justify-center"
      >
        <img
          src={GoLogo}
          alt="Logo"
          className="w-10 h-10 object-contain"
        />
      </div>
    </div>
  );
};

export default PageLoader;
