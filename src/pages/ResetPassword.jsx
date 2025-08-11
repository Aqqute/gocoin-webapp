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

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleNext = async () => {
    if (step === 1) {
      try {
        await axios.post(`https://gocoin.onrender.com/api/auth/reset-password`, {
          step: 1,
          email: formData.email,
        });
        toast.success("OTP sent to your email.");
        setStep(2);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to send OTP.");
      }
    } else if (step === 2) {
      try {
        await axios.post(`https://gocoin.onrender.com/api/auth/reset-password`, {
          step: 2,
          email: formData.email,
          emailCode: formData.emailCode,
        });
        toast.success("OTP verified.");
        setStep(3);
      } catch (err) {
        toast.error(err.response?.data?.message || "Invalid or expired OTP.");
      }
    } else if (step === 3) {
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match.");
        return;
      }

      try {
        await axios.post(`https://gocoin.onrender.com/api/auth/reset-password`, {
          step: 3,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        });
        toast.success("Password reset successful!");
        navigate("/login");
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to reset password.");
      }
    }
  };

  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const resendOTP = async () => {
    if (!formData.email) {
      toast.error("Email is required to resend OTP.");
      return;
    }

    try {
      await axios.post("https://gocoin.onrender.com/api/auth/resend-otp", {
        email: formData.email,
      });

      toast.success("OTP resent to your email.");
      setTimer(120);
      setResendAvailable(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend OTP.");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h2 className={`text-xl font-bold mb-6 ${text}`}>Reset Password</h2>
            <p className={`text-sm  mb-4 ${text}`}>
              Enter the email address associated with your account to receive
              instruction for password reset.
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
              className="w-full mt-4 text-sm bg-orange-500 text-white py-2 rounded-full font-semibold"
            >
              Send Instructions
            </button>
          </>
        );

      case 2:
        return (
          <>
            <h2 className={`text-xl font-bold mb-6 ${text}`}>Enter OTP</h2>
            <p className={`text-sm mb-4 ${text}`}>
              An OTP has been sent to your email address{" "}
              <strong>{formData.email}</strong>. Please enter the 6-digit OTP.
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
              <p className="text-base mb-6 mt-4 flex justify-between font-semibold">
                <span className={`text-sm text-center ${text}`}>
                  {formatTime()}{" "}
                </span>
                <span className="text-orange-500 text-sm ">Resend code</span>
              </p>
            ) : (
              <p
                className="text-sm font-semibold text-orange-500 text-center underline mb-4 cursor-pointer"
                onClick={resendOTP}
              >
                Resend Code
              </p>
            )}
            <button
              onClick={handleNext}
              className="w-full text-sm bg-orange-500 text-white py-3 rounded-full font-semibold"
            >
              Continue
            </button>
          </>
        );

      case 3:
        return (
          <>
            <h2 className={`text-xl font-bold mb-6 ${text}`}>
              Create New Password
            </h2>
            <p className={`text-sm mb-4 ${text}`}>
              Your new password must be different from previously used passwords.
            </p>

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
              className="w-full bg-orange-500 text-sm text-white py-3 mt-5 rounded-full font-semibold"
            >
              Reset Password
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
            <button onClick={handleBack}>
              <ArrowLeft size={20} className={`${text}`} />
            </button>
          )}
          <p className={`text-base font-bold ${text}`}>Step {step}/3</p>
        </div>

        <div className="w-full h-1 bg-gray-200 rounded mb-6">
          <div
            className="h-1 bg-orange-500 rounded-full"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        <div className="bg-transparent p-2">{renderStep()}</div>

        {step === 1 && (
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
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
