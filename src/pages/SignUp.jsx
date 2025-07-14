import React, { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import {
  Music,
  Paintbrush,
  Bitcoin,
  Dumbbell,
  Gamepad,
  Wallet,
  ArrowLeft,
} from "lucide-react";

const Signup = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [timer, setTimer] = useState(120);
  const [resendAvailable, setResendAvailable] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    emailCode: "",
    interests: [],
    country: "",
    state: "",
    wallet: "",
  });

  const bg = isDark ? "bg-[#1e1e1e]" : "bg-white";
  const text = isDark ? "text-white" : "text-black";
  const inputBg = isDark ? "bg-[#2B2B2B] text-white" : "bg-gray-100 text-black";
  const borderColor = isDark ? "border-gray-600" : "border-gray-300";

  useEffect(() => {
    if (step === 2 && timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    } else if (timer <= 0) {
      setResendAvailable(true);
    }
  }, [step, timer]);

  const formatTime = () => {
    const m = Math.floor(timer / 60);
    const s = timer % 60;
    return `${m}:${s < 10 ? "0" + s : s}`;
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 5));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const toggleInterest = (interest) => {
    const updated = formData.interests.includes(interest)
      ? formData.interests.filter((i) => i !== interest)
      : [...formData.interests, interest];
    setFormData({ ...formData, interests: updated });
  };

  const interestOptions = [
    { icon: <Music size={16} />, label: "Music" },
    { icon: <Paintbrush size={16} />, label: "Art" },
    { icon: <Bitcoin size={16} />, label: "Crypto" },
    { icon: <Dumbbell size={16} />, label: "Fitness" },
    { icon: <Gamepad size={16} />, label: "Gaming" },
  ];

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h2 className={`text-xl font-bold mb-6 ${text}`}>Create Account</h2>
            <input
              type="text"
              name="username"
              placeholder="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full mb-4 px-4 py-3 rounded-md ${inputBg} text-sm outline-none border ${borderColor}`}
            />
            <input
              type="email"
              name="email"
              placeholder="email address"
              value={formData.email}
              onChange={handleChange}
              className={`w-full mb-4 px-4 py-3 rounded-md ${inputBg} text-sm outline-none border ${borderColor}`}
            />
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 pr-10 rounded-md ${inputBg} text-sm outline-none border ${borderColor}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400"
              >
                👁️
              </button>
            </div>
            <div className="relative mb-2">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 pr-10 rounded-md ${inputBg} text-sm outline-none border ${borderColor}`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-400"
              >
                👁️
              </button>
            </div>
            <p className="text-xs text-gray-400 mb-6">Both password must match</p>
            <button
              onClick={handleNext}
              className="w-full bg-orange-500 text-white py-3 rounded-full font-semibold"
            >
              Continue
            </button>
          </>
        );

      case 2:
        return (
          <>
            <h2 className={`text-xl font-bold mb-6 ${text}`}>Confirm Email Address</h2>
            <p className="text-sm text-center mb-4 text-gray-500">
              An OTP has been sent to <strong>{formData.email}</strong>
            </p>
            <input
              type="text"
              name="emailCode"
              placeholder="Enter 6-digit code"
              value={formData.emailCode}
              onChange={handleChange}
              className={`w-full mb-3 px-4 py-3 rounded-md ${inputBg} text-sm outline-none border ${borderColor}`}
            />
            {!resendAvailable ? (
              <p className="text-xs text-center text-gray-500 mb-4">
                Resend code in {formatTime()}
              </p>
            ) : (
              <p
                className="text-xs text-orange-500 text-center underline mb-4 cursor-pointer"
                onClick={() => {
                  setTimer(120);
                  setResendAvailable(false);
                }}
              >
                Resend Code
              </p>
            )}
            <button
              onClick={handleNext}
              className="w-full bg-orange-500 text-white py-3 rounded-full font-semibold"
            >
              Continue
            </button>
          </>
        );

      case 3:
        return (
          <>
            <h2 className={`text-xl font-bold mb-6 ${text}`}>Select Interests</h2>
            <p className="mb-6 text-sm">
              Choose 3–5 topics that excite you most. We’ll tailor your experience.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {interestOptions.map((item) => (
                <button
                  key={item.label}
                  onClick={() => toggleInterest(item.label)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm border ${
                    formData.interests.includes(item.label)
                      ? "bg-orange-500 text-white border-orange-500"
                      : `${inputBg} border ${borderColor}`
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
            <button
              onClick={handleNext}
              className="w-full bg-orange-500 text-white py-3 rounded-full font-semibold"
            >
              Continue
            </button>
          </>
        );

      case 4:
        return (
          <>
            <h2 className={`text-xl font-bold mb-6 ${text}`}>Set Location</h2>
            <p className="mb-6 text-sm">
              Set your country and region to help us match local tasks and offers.
            </p>
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              className={`w-full mb-4 px-4 py-3 rounded-md ${inputBg} text-sm outline-none border ${borderColor}`}
            />
            <input
              type="text"
              name="state"
              placeholder="State / Region"
              value={formData.state}
              onChange={handleChange}
              className={`w-full mb-6 px-4 py-3 rounded-md ${inputBg} text-sm outline-none border ${borderColor}`}
            />
            <button
              onClick={handleNext}
              className="w-full bg-orange-500 text-white py-3 rounded-full font-semibold"
            >
              Continue
            </button>
          </>
        );

      case 5:
        return (
          <>
            <h2 className={`text-xl font-bold mb-6 ${text}`}>Connect Wallet</h2>
            <p className="mb-6 text-sm">
              Secure your wallet to start earning GoTokens.
            </p>
            <div className="flex items-center justify-center mb-6 animate-pulse">
              <Wallet size={36} className="text-orange-500" />
            </div>
            <button
              onClick={() =>
                setFormData({ ...formData, wallet: "0x1234...abcd" })
              }
              className="w-full py-3 mb-6 bg-black text-white rounded"
            >
              Connect MetaMask
            </button>
            <button
              onClick={() => alert("Signup complete!")}
              className="w-full py-3 bg-orange-500 text-white font-semibold rounded-full"
            >
              Finish
            </button>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen ${bg} px-4 py-6 flex`}>
      <div className="w-full max-w-md mx-auto">
        {/* Top Navigation */}
        <div className="flex items-center gap-2 mb-3">
          {step > 1 && (
            <button onClick={handleBack}>
              <ArrowLeft size={20} className={`${text}`} />
            </button>
          )}
          <p className={`text-sm font-medium ${text}`}>Step {step}/5</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-gray-200 rounded mb-6">
          <div
            className="h-1 bg-orange-500 rounded-full"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>

        {/* Card */}
        <div className="bg-transparent p-2">{renderStep()}</div>

        {/* Footer */}
        {step === 1 && (
          <p className="text-center mt-6 text-sm text-gray-500">
            Already have an account?{" "}
            <span className="font-semibold underline cursor-pointer">
              Log In
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Signup;
