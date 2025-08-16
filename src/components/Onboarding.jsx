import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";



const steps = [
  {
    title: "GoToken, rewarding every action!",
    message:
      "GoToken: Your key to earning rewards.\nEngage with campaigns, complete tasks,\nand watch your tokens grow.",
    image: "/images/Step1.png",
  },
  {
    title: "Earn by doing simple tasks",
    message:
      "Complete missions, share content,\nor invite friends to earn GoTokens instantly.",
    image: "/images/Step2.png",
  },
  {
    title: "Engage Today, Earn Today  !",
    message:
      "Start engaging today and watch your\n efforts turn into rewards with Go Token.\nJoin now and begin earning!",
    isFinal: true,
    image: "/images/Step3.png",
  },
];

const Onboarding = ({ onAccept }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const currentStep = steps[stepIndex];
  const { theme } = useTheme();
  const navigate = useNavigate();

  const isDark = theme === "dark";
  const bgColor = isDark ? "bg-[#2B2B2B]" : "bg-white";
  const textColor = isDark ? "text-white" : "text-black";
  const mutedText = isDark ? "text-gray-300" : "text-gray-600";
  const dotInactive = isDark ? "bg-gray-500" : "bg-gray-300";

  const handleNext = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    }
  };

  return (
    <div
      className={`fixed inset-0 w-full  h-full ${
        isDark ? "bg-black" : "bg-white"
      }`}
    >
      <div className="hidden md:block">
        <div className="flex p-6 items-center gap-2">
          <img src={GoLogo} alt="GoCoin Logo" width={30} height={40} />
          <h1
            className={`font-semibold font-mono text-2xl ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            GOCOIN
          </h1>
        </div>
      </div>
      {/* Desktop View */}
      <div className="hidden p-2 md:flex h-full">
        {/* Left side with image and logo */}
        <div className="w-1/2 flex flex-col justify-center items-center p-10 relative">
          <img
            src={currentStep.image}
            alt="Onboarding visual"
            className="w-1/2"
          />
        </div>

        {/* Right side with card */}
        <div className="w-1/2 flex items-center justify-center px-10">
          <div
            className={`rounded-3xl shadow-lg w-full max-w-md p-8 text-center ${bgColor}`}
          >
            <h1 className={`text-xl font-bold mb-4 ${textColor}`}>
              {currentStep.title}
            </h1>
            <p className={`text-sm whitespace-pre-line mb-6 ${mutedText}`}>
              {currentStep.message}
            </p>

            {/* Dot Indicators */}
            <div className="flex justify-center space-x-2 mb-6">
              {steps.map((_, index) => (
                <span
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === stepIndex
                      ? "w-4 bg-orange-500"
                      : `w-2 ${dotInactive}`
                  }`}
                ></span>
              ))}
            </div>

            {/* Controls */}
            {currentStep.isFinal ? (
              <>
                <button
                  onClick={() => {
                    onAccept();
                    navigate("/signup");
                  }}
                  className="bg-orange-500 text-white font-semibold text-sm w-full py-2 rounded-full mb-4"
                >
                  Get Started
                </button>

                <p className={`text-sm ${mutedText}`}>
                  Already have an account?{" "}
                  <button
                    onClick={() => {
                      onAccept();
                      navigate("/login");
                    }}
                    className={`${textColor} font-medium underline`}
                  >
                    Log In
                  </button>
                </p>
              </>
            ) : (
              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    onAccept();
                    navigate("/login");
                  }}
                  className={`${mutedText} text-sm hover:underline`}
                >
                  Skip
                </button>
                <button
                  onClick={handleNext}
                  className="bg-orange-500 p-3 rounded-full text-white"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="flex md:hidden flex-col items-center justify-end h-full">
        <img
          src={currentStep.image}
          alt="Onboarding"
          className="absolute inset-0 w-full h-full object-contain z-0"
        />
        <div
          className={`relative z-10 w-full max-w-md rounded-t-[30px] px-6 pt-6 pb-10 text-center shadow-lg ${bgColor}`}
        >
          <h1 className={`text-xl font-bold mb-3 ${textColor}`}>
            {currentStep.title}
          </h1>
          <p className={`${mutedText} text-sm whitespace-pre-line mb-6`}>
            {currentStep.message}
          </p>

          {/* Dot Indicators */}
          <div className="flex justify-center space-x-2 mb-6">
            {steps.map((_, index) => (
              <span
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === stepIndex
                    ? "w-4 bg-orange-500"
                    : `w-2 ${dotInactive}`
                }`}
              ></span>
            ))}
          </div>

          {/* Controls */}
          {currentStep.isFinal ? (
            <>
              <button
                onClick={() => {
                  onAccept();
                  navigate("/signup");
                }}
                className="bg-orange-500 text-white font-semibold text-sm w-full py-2 rounded-full mb-4"
              >
                Get Started
              </button>

              <p className={`text-sm ${mutedText}`}>
                Already have an account?{" "}
                <button
                  onClick={() => {
                    onAccept();
                    navigate("/login");
                  }}
                  className={`${textColor} font-medium underline`}
                >
                  Log In
                </button>
              </p>
            </>
          ) : (
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  onAccept();
                  navigate("/login");
                }}
                className={`${mutedText} text-sm hover:underline`}
              >
                Skip
              </button>
              <button
                onClick={handleNext}
                className="bg-orange-500 p-3 rounded-full text-white"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
