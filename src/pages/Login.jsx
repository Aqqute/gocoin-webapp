import React, { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";


const Login = () => {
  const { theme } = useTheme();
  const { login } = useAuth();
  const isDark = theme === "dark";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const bg = isDark ? "bg-[#1e1e1e]" : "bg-white";
  const text = isDark ? "text-white" : "text-black";
  const inputBg = isDark ? "bg-[#2B2B2B] text-white" : "bg-gray-100 text-black";
  const borderColor = isDark ? "border-gray-600" : "border-gray-300";

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://gocoin.onrender.com/api/auth/login",
        formData
      );
      login(response.data);
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen px-4 py-10 ${bg}`}>
      <div className="max-w-md mx-auto w-full">
        <h2 className={`text-2xl font-bold mb-8 ${text}`}>Log In</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
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

        <div className="mb-6">
          <button
            className="text-orange-500 text-sm font-semibold underline"
            onClick={() => navigate("/resetpassword")}
          >
            Forgot password?
          </button>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full text-sm ${
            loading ? "bg-orange-400" : "bg-orange-500"
          } text-white py-3 rounded-full font-semibold flex items-center justify-center`}
        >
          
          {loading ? "Logging in..." : "Continue"}
        </button>

        <p className={`mt-6 text-sm text-center font-bold ${text}`}>
          Don’t have an account?{" "}
          <span
            className="font-semibold underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
