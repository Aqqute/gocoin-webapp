import React, { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import {
  Music,
  Paintbrush,
  Bitcoin,
  Dumbbell,
  Gamepad,
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react";
import WelcomeModal from "../components/WelcomeModal";

import MetaMaskLogo from "../../public/images/MetaMask.webp";
import TrustWalletLogo from "../../public/images/TrustWallet.png";
import TronLogo from "../../public/images/Tron.png";
import PhantomLogo from "../../public/images/Phantom.jpeg";
import CoinbaseLogo from "../../public/images/CoinBase.webp";
import SolflareLogo from "../../public/images/Solflare.png";

import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(120);
  const [resendAvailable, setResendAvailable] = useState(false);
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(false);

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
    setFormData((prev) => ({ ...prev, emailCode: otpDigits.join("") }));
  }, [otpDigits]);

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const updated = [...otpDigits];
    updated[index] = value;
    setOtpDigits(updated);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

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
    { icon: "🎬", label: "Movies" },
    { icon: "📚", label: "Books" },
    { icon: "📷", label: "Photography" },
    { icon: "🧘‍♀️", label: "Meditation" },
    { icon: "💼", label: "Business" },
    { icon: "🌍", label: "Travel" },
    { icon: "👨‍🍳", label: "Cooking" },
    { icon: "🎤", label: "Singing" },
    { icon: "🎨", label: "Design" },
    { icon: "🧠", label: "Self-Development" },
    { icon: "🧵", label: "Fashion" },
    { icon: "🕹️", label: "eSports" },
    { icon: "💻", label: "Tech" },
    { icon: "📈", label: "Investing" },
    { icon: "🏞️", label: "Nature" },
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
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full mb-4 px-4 py-3 rounded-md ${inputBg} text-sm outline-none border ${borderColor}`}
            />
            <input
              type="email"
              name="email"
              placeholder="Email address"
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
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p className="text-xs text-gray-400 mb-6">
              Both passwords must match
            </p>
            <button
              onClick={handleNext}
              className="w-full mt-4 bg-orange-500 text-white py-3 rounded-full font-semibold"
            >
              Continue
            </button>
          </>
        );

      case 2:
        return (
          <>
            <h2 className={`text-xl font-bold mb-6 ${text}`}>
              Confirm Email Address
            </h2>
            <p className="text-sm text-center mb-4 text-gray-500">
              An OTP has been sent to your email address{" "}
              <strong>{formData.email}</strong>. Please enter 6 digits OTP
            </p>
            <div className="flex justify-between gap-2 mb-4">
              {otpDigits.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  className={`w-12 h-12 text-center text-lg rounded-md ${inputBg} outline-none border ${borderColor}`}
                />
              ))}
            </div>

            {!resendAvailable ? (
              <p className="text-base mb-10 mt-4 flex justify-between font-semibold">
                {formatTime()}{" "}
                <span className="text-orange-500">Resend code</span>
              </p>
            ) : (
              <p
                className="text-base font-semibold text-orange-500 text-center underline mb-4 cursor-pointer"
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
            <h2 className={`text-xl font-bold mb-6 ${text}`}>
              Select Interests
            </h2>
            <p className="mb-6 text-sm">
              Choose 3-5 topics that excite you the most. This will help us
              tailor tasks and to your preferences
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
                  {item.icon} {item.label}
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
              Almost done! Let’s set your location and provide you with relevant
              tasks based on your region and ensures a better match for local
              campaigns.
            </p>
            <h1 className="font-semibold tex-xl mb-2">Country</h1>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className={`w-full mb-4 px-4 py-3 rounded-md ${inputBg} text-sm outline-none border ${borderColor}`}
            >
              <option value="">Select Country</option>
              <option value="Nigeria">Nigeria</option>
              <option value="Ghana">Ghana</option>
              <option value="South Africa">South Africa</option>
              <option value="Kenya">Kenya</option>
            </select>
            <h1 className="font-semibold tex-xl mb-2">State/Region</h1>
            <input
              type="text"
              name="state"
              placeholder="Enter Region"
              value={formData.state}
              onChange={handleChange}
              className={`w-full mb-6 px-4 py-3 rounded-md ${inputBg} text-sm outline-none border ${borderColor}`}
            />
            <button
              onClick={handleNext}
              className="w-full bg-orange-500 mt-16 text-white py-3 rounded-full font-semibold"
            >
              Continue
            </button>
          </>
        );

      case 5:
        return (
          <>
            <h2 className="text-2xl font-semibold mb-2">
              Connect Crypto Wallet
            </h2>
            <p className="text-gray-500 mb-6 text-sm">
              Ready to start earning? Let’s begin by connecting your wallet and
              secure your GO Tokens.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { name: "Coinbase", icon: CoinbaseLogo },
                { name: "MetaMask", icon: MetaMaskLogo },
                { name: "Tron Wallet", icon: TronLogo },
                { name: "Phantom", icon: PhantomLogo },
                { name: "Trust Wallet", icon: TrustWalletLogo },
                { name: "Solflare", icon: SolflareLogo },
              ].map((wallet) => (
                <button
                  key={wallet.name}
                  onClick={() =>
                    setFormData({ ...formData, wallet: wallet.name })
                  }
                  className={`border rounded-xl p-4 flex flex-col items-center justify-center ${
                    formData.wallet === wallet.name
                      ? "border-orange-500 shadow-sm"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={wallet.icon}
                    alt={wallet.name}
                    className="w-8 h-8 mb-2 object-contain"
                  />
                  <span className="text-sm">{wallet.name}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsWelcomeOpen(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white w-full py-2 px-4 rounded-full mb-4"
            >
              Connect
            </button>

            <WelcomeModal
              isOpen={isWelcomeOpen}
              onClose={() => setIsWelcomeOpen(false)}
              isDark={isDark}
            />

            <button
              onClick={() => navigate("/")}
              className={`w-full text-sm underline mb-6 text-center font-bold ${text} cursor-pointer`}
            >
              Skip
            </button>

            <p className="text-sm text-center mt-8 text-gray-400">
              By connecting your wallet you agree to our{" "}
              <span className="text-blue-800 underline cursor-pointer">
                Terms of service
              </span>{" "}
              and{" "}
              <span className="text-blue-800 underline cursor-pointer">
                Privacy Policy
              </span>
              .
            </p>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen ${bg} px-4 py-6 flex`}>
      <div className="w-full max-w-md mx-auto">
        <div className="flex items-center gap-2 mb-3">
          {step > 1 && (
            <button onClick={handleBack}>
              <ArrowLeft size={20} className={`${text}`} />
            </button>
          )}
          <p className={`text-base font-bold ${text}`}>Step {step}/5</p>
        </div>

        <div className="w-full h-1 bg-gray-200 rounded mb-6">
          <div
            className="h-1 bg-orange-500 rounded-full"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>

        <div className="bg-transparent p-2">{renderStep()}</div>

        {step === 1 && (
          <p className={`text-base mt-2 text-center font-bold ${text} cursor-pointer`}>
            Already have an account?{' '}
            <span
              className="font-semibold underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Log In
            </span>
          </p>
        )}
      </div>
    </div>
  );};

export default Signup;
