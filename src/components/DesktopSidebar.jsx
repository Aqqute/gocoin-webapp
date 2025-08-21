import { Home2, Wallet, Profile, Logout } from "iconsax-react";
import { useSidebar } from "../contexts/SidebarContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import GoLogo from "../../public/images/GoLogo.png";

export default function SideBar() {
  // links array
  const links = [
    { name: "Home", icon: Home2, route: "/" },
    { name: "Wallet", icon: Wallet, route: "/wallet" },
    { name: "Profile", icon: Profile, route: "/profile" },
  ];

  const { mobileOpen, closeMobile } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleLogout = () => {
    // 👉 Replace with your actual logout logic (clear token, call API, etc.)
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <>
      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black z-30 md:hidden"
          onClick={closeMobile}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-screen w-[240px] border-r py-6 px-4 z-40 flex flex-col justify-between transition-transform duration-300 ease-in-out
          ${isDark ? "bg-black" : "bg-white"}
          ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
      >
        <div>
          {/* Logo + Title */}
          <div className="flex items-center gap-2 mb-8">
            <img src={GoLogo} alt="GoCoin Logo" width={38} height={40} />
            <h1
              className={`font-semibold font-mono text-3xl ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              GOCOIN
            </h1>
          </div>

          {/* Links */}
          {links.map((link, idx) => {
            const isActive = location.pathname === link.route;
            const IconComponent = link.icon;

            return (
              <Link
                to={link.route}
                key={idx}
                className={`h-[40px] mb-3 w-full rounded-full py-3 px-5 flex gap-2 items-center cursor-pointer transition-colors
                  ${
                    isActive
                      ? "bg-orange-500 text-white"
                      : isDark
                      ? "text-gray-300 hover:bg-[#2a2a2a]"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                <IconComponent
                  size={16}
                  variant={isActive ? "Bold" : "Linear"}
                  color={isActive ? "#fff" : isDark ? "#d1d5db" : "#4b5563"}
                />
                <span className="text-sm font-medium">{link.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className={`mt-6 h-[50px] w-full rounded-full py-3 px-5 flex gap-3 items-center transition-colors
            ${
              isDark
                ? "text-gray-300 hover:bg-[#2a2a2a]"
                : "text-gray-600 hover:bg-gray-100"
            }`}
        >
          <Logout size={20} color={isDark ? "#d1d5db" : "#4b5563"} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </>
  );
}
