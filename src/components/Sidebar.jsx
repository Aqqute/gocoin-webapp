import { Home, Wallet, Trophy, User, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import GoLogo from "../../public/images/GoLogo.png";
import { useState } from "react";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { logout } = useAuth();
  const [logoutModal, setLogoutModal] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { icon: <Home size={18} />, label: "Home", path: "/" },
    { icon: <Wallet size={18} />, label: "Wallet", path: "/wallet" },
    // { icon: <Trophy size={18} />, label: "Leaderboard", path: "/leaderboard" },
    { icon: <User size={18} />, label: "Profile", path: "/profile" },
  ];

  const bgColor = theme === "dark" ? "bg-black" : "bg-white";
  const borderColor = theme === "dark" ? "border-[#2a2a2a]" : "border-gray-200";
  const shadow = theme === "dark" ? "" : "shadow-md";
  const textColor = theme === "dark" ? "text-white" : "text-black";
  const hoverColor = theme === "dark" ? "hover:bg-[#2a2a2a]" : "hover:bg-gray-100";

  const handleLogout = () => {
    setLogoutModal(true);
  };

  const confirmLogout = () => {
    logout();
    setLogoutModal(false);
    navigate("/login");
  };

  return (
    <>
      <aside
        className={`hidden lg:flex flex-col justify-between w-52 min-h-screen ${bgColor} border-r ${borderColor} px-5 py-6 ${shadow}`}
      >
        {/* Top: Logo + Nav */}
        <div>
          <div className="flex items-center gap-2 mb-10">
            <img src={GoLogo} alt="GoCoin Logo" className="w-7 h-7" />
            <h1
              className={`font-semibold font-mono text-lg ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              GOCOIN
            </h1>
          </div>

          <nav className="flex flex-col gap-2">
            {navItems.map(({ icon, label, path }) => (
              <Link
                key={label}
                to={path}
                className={`flex items-center gap-3 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive(path)
                    ? "bg-orange-500 text-white"
                    : `${textColor} ${hoverColor}`
                }`}
              >
                {icon}
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom: Logout */}
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 px-4 py-2 rounded-full text-sm font-medium transition-colors mt-8 ${
            textColor
          } ${hoverColor}`}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </aside>

      {/* Logout Confirmation Modal */}
      {logoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div
            className={`w-full max-w-md p-6 rounded-xl shadow-lg flex flex-col space-y-4 ${
              theme === "dark" ? "bg-[#2a2a2a] text-white" : "bg-white text-black"
            }`}
          >
            <div className="flex flex-col items-center text-center space-y-2">
              <LogOut className="text-red-500" size={36} />
              <h2 className="text-lg font-semibold">Confirm Logout</h2>
            </div>
            <p className="text-sm text-center">
              Are you sure you want to logout? You will need to log in again to access your account.
            </p>
            <div className="flex flex-col justify-between gap-3 pt-2">
              <button
                onClick={confirmLogout}
                className="w-full px-4 py-2 rounded-3xl text-sm font-medium bg-red-600 text-white hover:bg-red-700"
              >
                Logout
              </button>
              <button
                onClick={() => setLogoutModal(false)}
                className="w-full px-4 py-2 rounded-3xl text-sm font-medium border border-gray-400 hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
