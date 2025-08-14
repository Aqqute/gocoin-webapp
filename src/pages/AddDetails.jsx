import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { Globe, Phone, User, Instagram, Twitter, Facebook,  Send } from "lucide-react";

const AddDetails = () => {
  const { theme } = useTheme();
  const { token } = useAuth();
  const isDark = theme === "dark";

  const [country, setCountry] = useState("");
  const [stateRegion, setStateRegion] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [socials, setSocials] = useState({
    telegram: "",
    x: "",
    instagram: "",
    discord: "",
    facebook: "",
  });
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // Fetch user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://gocoin.onrender.com/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const u = res.data.user;
        setUser(u);
        setCountry(u.country || "");
        setStateRegion(u.stateRegion || u.state || "");
        setPhoneNumber(u.phoneNumber || "");
        setSocials({
          telegram: u.telegram || "",
          x: u.x || "",
          instagram: u.instagram || "",
          discord: u.discord || "",
          facebook: u.facebook || "",
        });
      } catch (err) {
        toast.error("Failed to load user details");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
    // eslint-disable-next-line
  }, []);

  const handleSocialChange = (e) => {
    setSocials({ ...socials, [e.target.name]: e.target.value });
  };

  // Update country
  const handleCountrySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "https://gocoin.onrender.com/api/auth/update-country",
        { country },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message);
      setUser((prev) => ({ ...prev, country }));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update country");
    } finally {
      setLoading(false);
    }
  };

  // Update state/region
  const handleStateSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "https://gocoin.onrender.com/api/users/me/state",
        { state: stateRegion },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message || "State updated");
      setUser((prev) => ({ ...prev, stateRegion }));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update state");
    } finally {
      setLoading(false);
    }
  };

  // Update phone
  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "https://gocoin.onrender.com/api/users/me/phone",
        { phoneNumber },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message);
      setUser((prev) => ({ ...prev, phoneNumber }));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update phone number");
    } finally {
      setLoading(false);
    }
  };

  // Update socials (each field separately)
  const handleSocialUpdate = async (e) => {
    const { name, value } = e.target;
    setSocials((prev) => ({ ...prev, [name]: value }));
    // Update immediately on change
    setLoading(true);
    let url = "";
    let body = {};
    switch (name) {
      case "telegram":
        url = "https://gocoin.onrender.com/api/users/me/socials/telegram";
        body = { telegram: value };
        break;
      case "x":
        url = "https://gocoin.onrender.com/api/users/me/socials/x";
        body = { x: value };
        break;
      case "instagram":
        url = "https://gocoin.onrender.com/api/users/me/socials/instagram";
        body = { instagram: value };
        break;
      case "discord":
        url = "https://gocoin.onrender.com/api/users/me/socials/discord";
        body = { discord: value };
        break;
      case "facebook":
        url = "https://gocoin.onrender.com/api/users/me/socials/facebook";
        body = { facebook: value };
        break;
      default:
        setLoading(false);
        return;
    }
    try {
      const res = await axios.post(url, body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(res.data.message || `${name} updated`);
      setUser((prev) => ({ ...prev, [name]: value }));
    } catch (err) {
      toast.error(err.response?.data?.message || `Failed to update ${name}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen w-full flex items-center justify-center px-2 py-6 landscape:flex-row flex-col ${isDark ? "bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#232526] text-white" : "bg-gradient-to-br from-[#f8ffae] via-[#43cea2] to-[#185a9d] text-black"}`}
      style={{ minHeight: '100dvh' }}
    >
      <div
        className="w-full max-w-2xl mx-auto rounded-3xl shadow-2xl p-8 flex flex-col gap-8 backdrop-blur-md bg-white/10 border border-white/20"
        style={{
          boxShadow: isDark
            ? '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
            : '0 8px 32px 0 rgba(67, 206, 162, 0.25)',
        }}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-center tracking-tight flex items-center justify-center gap-2">
          <User className="inline-block text-orange-500" size={32} />
          Complete Your Profile
        </h2>
        {/* Country */}
        <form onSubmit={handleCountrySubmit} className="flex flex-col md:flex-row items-center gap-4 mb-2">
          <label className="flex items-center gap-2 font-semibold text-lg">
            <Globe className="text-blue-500" size={22} /> Country
          </label>
          <input
            type="text"
            className="flex-1 px-4 py-3 rounded-xl border-none shadow-inner bg-white/70 dark:bg-[#232526]/70 text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={country}
            onChange={e => setCountry(e.target.value)}
            placeholder="e.g. Nigeria"
            required
          />
          <button type="submit" className="flex items-center gap-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white px-6 py-2 rounded-xl font-bold shadow-md hover:scale-105 transition-transform" disabled={loading}>
            <Send size={18} /> {loading ? "Saving..." : "Save"}
          </button>
        </form>
        {/* State/Region */}
        <form onSubmit={handleStateSubmit} className="flex flex-col md:flex-row items-center gap-4 mb-2">
          <label className="flex items-center gap-2 font-semibold text-lg">
            <Globe className="text-blue-500" size={22} /> State/Region
          </label>
          <input
            type="text"
            className="flex-1 px-4 py-3 rounded-xl border-none shadow-inner bg-white/70 dark:bg-[#232526]/70 text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={stateRegion}
            onChange={e => setStateRegion(e.target.value)}
            placeholder="e.g. Rivers State"
            required
          />
          <button type="submit" className="flex items-center gap-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white px-6 py-2 rounded-xl font-bold shadow-md hover:scale-105 transition-transform" disabled={loading}>
            <Send size={18} /> {loading ? "Saving..." : "Save"}
          </button>
        </form>
        {/* Phone Number */}
        <form onSubmit={handlePhoneSubmit} className="flex flex-col md:flex-row items-center gap-4 mb-2">
          <label className="flex items-center gap-2 font-semibold text-lg">
            <Phone className="text-green-500" size={22} /> Phone
          </label>
          <input
            type="tel"
            className="flex-1 px-4 py-3 rounded-xl border-none shadow-inner bg-white/70 dark:bg-[#232526]/70 text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
            placeholder="e.g. +1234567890"
            required
          />
          <button type="submit" className="flex items-center gap-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white px-6 py-2 rounded-xl font-bold shadow-md hover:scale-105 transition-transform" disabled={loading}>
            <Send size={18} /> {loading ? "Saving..." : "Save"}
          </button>
        </form>
        {/* Socials */}
        <div className="flex flex-col gap-4">
          <label className="flex items-center gap-2 font-semibold text-lg">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Socials</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center gap-2 bg-white/60 dark:bg-[#232526]/60 rounded-xl px-3 py-2">
              <TelegramIcon />
              <input type="text" name="telegram" value={socials.telegram} onChange={handleSocialUpdate} placeholder="Telegram" className="flex-1 bg-transparent outline-none text-base" />
            </div>
            <div className="flex items-center gap-2 bg-white/60 dark:bg-[#232526]/60 rounded-xl px-3 py-2">
              <Twitter className="text-blue-400" size={20} />
              <input type="text" name="x" value={socials.x} onChange={handleSocialUpdate} placeholder="X (Twitter)" className="flex-1 bg-transparent outline-none text-base" />
            </div>
            <div className="flex items-center gap-2 bg-white/60 dark:bg-[#232526]/60 rounded-xl px-3 py-2">
              <Instagram className="text-pink-500" size={20} />
              <input type="text" name="instagram" value={socials.instagram} onChange={handleSocialUpdate} placeholder="Instagram" className="flex-1 bg-transparent outline-none text-base" />
            </div>
            <div className="flex items-center gap-2 bg-white/60 dark:bg-[#232526]/60 rounded-xl px-3 py-2">
              <input type="text" name="discord" value={socials.discord} onChange={handleSocialUpdate} placeholder="Discord" className="flex-1 bg-transparent outline-none text-base" />
            </div>
            <div className="flex items-center gap-2 bg-white/60 dark:bg-[#232526]/60 rounded-xl px-3 py-2">
              <Facebook className="text-blue-700" size={20} />
              <input type="text" name="facebook" value={socials.facebook} onChange={handleSocialUpdate} placeholder="Facebook" className="flex-1 bg-transparent outline-none text-base" />
            </div>
          </div>
        </div>
        {/* Show current values */}
        {user && (
          <div className="mt-6 text-sm text-center">
            <div className="mb-1">Current Country: <span className="font-semibold">{user.country || "-"}</span></div>
            <div className="mb-1">Current State/Region: <span className="font-semibold">{user.stateRegion || user.state || "-"}</span></div>
            <div className="mb-1">Current Phone: <span className="font-semibold">{user.phoneNumber || "-"}</span></div>
            <div className="mb-1">Telegram: <span className="font-semibold">{user.telegram || "-"}</span></div>
            <div className="mb-1">X: <span className="font-semibold">{user.x || "-"}</span></div>
            <div className="mb-1">Instagram: <span className="font-semibold">{user.instagram || "-"}</span></div>
            <div className="mb-1">Discord: <span className="font-semibold">{user.discord || "-"}</span></div>
            <div className="mb-1">Facebook: <span className="font-semibold">{user.facebook || "-"}</span></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddDetails;
// Custom SVG for Telegram (since Lucide doesn't have one)
function TelegramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="12" fill="#229ED9" />
      <path d="M17.5 7.5L15.5 16.5C15.5 16.5 15.25 17.25 14.5 17.25C13.75 17.25 10.25 14.5 10.25 14.5L8.5 13.75L6.75 13.25C6.75 13.25 6.25 13 6.5 12.5C6.75 12 10.5 8.5 10.5 8.5C10.5 8.5 11 8 11.5 8C12 8 16.5 7.25 16.5 7.25C16.5 7.25 17.75 7 17.5 7.5Z" fill="white" />
    </svg>
  );
}
