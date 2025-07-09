import { PlayIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";

const Loading = ({ onComplete }) => {
  const [text, setText] = useState("");
  const fullText = "GoCoin";
  const { theme } = useTheme();

  const isDark = theme === "dark";
  const bgColor = isDark ? "bg-[#1e1e1e]" : "bg-white";
  const textColor = isDark ? "text-white" : "text-black";
  const barBg = isDark ? "bg-gray-700" : "bg-gray-300";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;

      if (index > fullText.length) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 1000);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-colors duration-500 ${bgColor}`}>
      {/* Icon and Text */}
      <div className={`mb-6 text-4xl font-semibold font-mono flex items-center ${textColor}`}>
        <span className="w-11 h-11 flex items-center justify-center rounded-full bg-orange-500  mr-3">
          <PlayIcon size={22} className="text-white" />
        </span>
        {text}
        <span className="ml-1 animate-blink">|</span>
      </div>

      {/* Progress Bar */}
      <div className={`w-[200px] h-[2px] rounded ${barBg} overflow-hidden`}>
        <div className="w-[40%] h-full bg-orange-500  animate-loading-bar" />
      </div>
    </div>
  );
};

export default Loading;
