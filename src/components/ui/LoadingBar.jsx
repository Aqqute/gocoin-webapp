import React from "react";

const Loader = ({ type = "circles", size = "md" }) => {
  // Tailwind size mapping
  const sizeMap = {
    sm: "w-3 h-3",
    md: "w-5 h-5",
    lg: "w-8 h-8",
  };

  if (type === "circles") {
    return (
      <div className="flex items-center justify-center space-x-3">
        <div className={`${sizeMap["md"]} rounded-full bg-orange-400 animate-bounce`} />
        <div className={`${sizeMap["md"]} rounded-full bg-orange-500 animate-bounce [animation-delay:0.2s]`} />
        <div className={`${sizeMap["md"]} rounded-full bg-orange-600 animate-bounce [animation-delay:0.4s]`} />
        <div className={`${sizeMap["md"]} rounded-full bg-orange-500 animate-bounce [animation-delay:0.6s]`} />
      </div>
    );
  }

  if (type === "bar") {
    return (
      <div className="w-64 h-3 bg-orange-100/20 rounded-full overflow-hidden relative">
        <div
          className="absolute inset-0 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 animate-[shimmer_1.8s_infinite]"
        />
        <style>{`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </div>
    );
  }

  return null;
};

export default Loader;
