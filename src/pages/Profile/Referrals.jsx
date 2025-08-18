import React, { useState, useEffect } from "react";
import { Copy } from "lucide-react"; // ArrowLeft is removed
import { useTheme } from "../../contexts/ThemeContext";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

// Assuming 'Referral' is an image asset.
// Replace with actual path or a placeholder if not available.
import ReferralIllustration from '../../../public/images/Referrals.png'; // Example path, adjust as needed

const Referrals = () => { // onBack prop is removed
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { token } = useAuth();

  const [referralCode, setReferralCode] = useState("");
  const [stats, setStats] = useState({
    totalInvites: 0,
    conversions: 0,
    pendingBonus: 0,
  });
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchReferralData = async () => {
      try {
        const res = await axios.get(
          "https://gocoin.onrender.com/api/referral/my-code",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = res.data?.data || {};
        setReferralCode(data.referralCode || "");
        setStats({
          totalInvites: data.totalInvites ?? 0,
          conversions: data.conversions ?? 0,
          pendingBonus: data.pendingBonus?.goToken ?? 0,
        });
        setLoading(false);
      } catch (error) {
        toast.error("Could not load referral data");
        setLoading(false);
      }
    };
    fetchReferralData();
  }, [token]);


  const handleCopy = () => {
    if (!referralCode) {
      toast.error("No referral code to copy.");
      return;
    }
    navigator.clipboard.writeText(referralCode);
    toast.success("Referral code copied!");
  };

  const cardStyle = `${isDark ? 'bg-[#2a2a2a]' : 'bg-white'} rounded-xl p-3 shadow-sm`;

  return (
    <div className={`flex flex-col h-full ${isDark ? 'text-white' : 'text-black'}`}>
      <h2 className="text-lg font-semibold mb-4">Referrals</h2>

      {/* Referral Stats */}
      <div className="mb-6">
        <h3 className="text-base font-semibold mb-3">Referral Stats</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className={cardStyle}>
            <p className="text-lg font-semibold mb-0.5">{loading ? '...' : stats.totalInvites}</p>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-xs`}>Total Invites</p>
          </div>
          <div className={cardStyle}>
            <p className="text-lg font-semibold mb-0.5">{loading ? '...' : stats.conversions}</p>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-xs`}>Conversions</p>
          </div>
          <div className={cardStyle}>
            <p className="text-lg font-semibold mb-0.5">{loading ? '...' : stats.pendingBonus}</p>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-xs`}>Pending Bonus</p>
          </div>
        </div>
      </div>

      {/* Steps and Illustration */}
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 mb-6">
        <div className="flex-1 space-y-4 text-sm">
          {[
            "Share Referral link/code to your friends",
            "Your friend clicks the referral link and is directed to download the Go Token app.",
            "After your friend successfully joins and completes a task you’ll earn your reward.",
          ].map((text, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center bg-orange-100 text-orange-600 font-bold rounded-full text-xs">
                {index + 1}
              </div>
              <p className="flex-1 text-sm">{text}</p>
            </div>
          ))}
        </div>
        <div className="w-full md:w-1/2 flex justify-center items-center">
          {/* Using the imported image or a placeholder */}
          <img
            src={ReferralIllustration || "https://via.placeholder.com/200x200?text=Referral+Image"}
            alt="Referral Illustration"
            className="max-w-[250px] h-auto" // Adjusted size to fit the pane better
          />
        </div>
      </div>

      {/* Referral Code */}
      <div
        className={`flex items-center justify-between p-3 rounded-xl mb-6 ${
          isDark ? "bg-[#2a2a2a]" : "bg-[#f3f3fd]" // Using #f3f3fd for lighter background consistent with image
        }`}
      >
        <span className={`font-semibold text-sm ${isDark ? 'text-orange-400' : 'text-[#4a3aff]'}`}> {/* Matched text color */}
          {loading ? "Loading..." : referralCode || " "}
        </span>
        <button
          onClick={handleCopy}
          disabled={!referralCode || loading}
          className={`text-sm px-4 py-2 rounded-full font-medium ${
            loading || !referralCode ? "bg-orange-300 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
          } text-white transition-colors flex items-center gap-1`}
        >
          <Copy size={16} /> Copy
        </button>
      </div>

      {/* Invite Button */}
      <button
        onClick={() => toast.success("Invite link sent!")} // Keep toast for feedback
        className="bg-orange-500 text-white font-semibold py-3 rounded-full text-center text-sm hover:bg-orange-600 transition-colors"
      >
        Invite friends
      </button>
    </div>
  );
};

export default Referrals;