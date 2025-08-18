import { useState, useEffect } from "react";
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
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
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
  const [isLoading, setIsLoading] = useState(false); // Added loading state

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

  const bg = isDark ? "bg-black" : "bg-white";
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

  const handleNext = async () => {
    if (step === 1) {
      if (!formData.email) {
        toast.error("Please enter your email.");
        return;
      }
      setIsLoading(true);
      try {
        const res = await axios.post(`https://gocoin.onrender.com/api/auth/forgot-password`, {
          email: formData.email
        });
        toast.success(res.data?.message || "OTP sent to your email!");
        setStep(2);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to send OTP.");
        return;
      } finally {
        setIsLoading(false);
      }
    } else if (step === 2) {
      if (!formData.emailCode || formData.emailCode.length !== 6) {
        toast.error("Please enter the 6-digit OTP sent to your email.");
        return;
      }
      if (!formData.password) {
        toast.error("Please enter a new password.");
        return;
      }
      if (!formData.confirmPassword) {
        toast.error("Please confirm your password.");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match.");
        return;
      }
      if (formData.password.length < 6) {
        toast.error("Password must be at least 6 characters long.");
        return;
      }
      setIsLoading(true);
      try {
        const res = await axios.post(`https://gocoin.onrender.com/api/auth/reset-password`, {
          email: formData.email,
          otp: formData.emailCode,
          newPassword: formData.password,
          confirmPassword: formData.confirmPassword,
        });
        toast.success(res.data?.message || "Password reset successful!");
        setTimeout(() => {
          navigate("/login");
        }, 1200);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to reset password.");
      } finally {
        setIsLoading(false);
      }
    }
  };

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
            <h2 className={`text-xl font-bold mb-6 ${text}`}>Reset Password</h2>
            <p className={`text-sm  mb-4 ${text}`}>
              Enter the email address associated with your account to receive
              instructions for password reset.
            </p>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className={`w-full mb-4 px-4 py-3 rounded-md ${inputBg} text-sm outline-none border ${borderColor}`}
            />
            <button
              onClick={handleNext}
              disabled={isLoading}
              className="w-full mt-4 text-sm bg-orange-500 text-white py-2 rounded-full font-semibold disabled:opacity-50"
            >
              {isLoading ? "Sending..." : "Send Instructions"}
            </button>
          </>
        );
      case 2:
        return (
          <>
            <h2 className={`text-xl font-bold mb-6 ${text}`}>Reset Password</h2>
            <p className={`text-sm mb-4 ${text}`}>
              Enter the OTP sent to your email and your new password.
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
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="New password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-md ${inputBg} text-sm outline-none border ${borderColor}`}
              />
              <div
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </div>
            </div>
            <div className="relative mb-6">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-md ${inputBg} text-sm outline-none border ${borderColor}`}
              />
              <div
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </div>
            </div>
            <button
              onClick={handleNext}
              disabled={isLoading}
              className="w-full bg-orange-500 text-sm text-white py-3 mt-5 rounded-full font-semibold disabled:opacity-50"
            >
              {isLoading ? "Resetting Password..." : "Reset Password"}
            </button>
          </>
        );
    }
  };

  return (
    <div className={`min-h-screen ${bg} px-4 py-6 flex`}>
      <div className="w-full max-w-md mx-auto">
        <div className="flex items-center gap-2 mb-3">
          {step > 1 && (
            <button onClick={handleBack} disabled={isLoading}>
              <ArrowLeft size={20} className={`${text}`} />
            </button>
          )}
          <p className={`text-base font-bold ${text}`}>Step {step}/2</p>
        </div>

        <div className="w-full h-1 bg-gray-200 rounded mb-6">
          <div
            className="h-1 bg-orange-500 rounded-full"
            style={{ width: `${(step / 2) * 100}%` }}
          />
        </div>

        <div className="bg-transparent p-2">{renderStep()}</div>

        {step === 1 && (
          <>
            <p
              className={`mt-2 text-sm text-center font-bold ${text} cursor-pointer`}
            >
              Already have an account?{" "}
              <span
                className="font-semibold underline cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Log In
              </span>
            </p>
            <p
              className={`mt-2 text-sm text-center font-bold ${text} cursor-pointer`}
            >
              Want to complete your profile?{" "}
              <span
                className="font-semibold underline cursor-pointer"
                onClick={() => navigate("/add-details")}
              >
                Add Details
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;