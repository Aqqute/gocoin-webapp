
import { Home2, Wallet, Ranking, Profile } from "iconsax-react";
import { useSidebar } from "../contexts/SidebarContext";
import { Link, useLocation } from "react-router-dom";
// Use public path for logo image
import { useTheme } from "../contexts/ThemeContext";

export default function SideBar() {
    // links array
  const links = [
    { name: "Home", icon: Home2, route:"/" },
    { name: "Wallet", icon: Wallet, route:"/wallet" },
    { name: "Leaderboard", icon: Ranking, route:"/board" },
    { name: "Profile", icon: Profile, route:"/profile" },
  ];

  const { mobileOpen, closeMobile } = useSidebar();

    const location = useLocation();
      const { theme } = useTheme();
      const isDark = theme === "dark";
  return (
    <>
        {/* Overlay for mobile */}
        {mobileOpen && (
            <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={closeMobile}
            />
        )}

        <div
        className={`fixed top-0 left-0 h-screen w-[254px] border-r border-gray-200 py-6 mt-0 space-y-2 px-4 z-40 ${isDark ? 'bg-black' : 'bg-white'} ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <img src="/images/logo.svg" alt="GoCoin" className="h-10 mb-6 mt-4" />
        {links.map((link, idx) => {
            const isActive = location.pathname === link.route;
            const IconComponent = link.icon; //component for icon

            return (
            <Link
                to={link.route}
                key={idx}
                className={`h-[50px] w-full rounded-full py-3 px-5 flex gap-3 items-center cursor-pointer transition-colors
                ${isActive ? "bg-[#F58300] text-white" : "hover:bg-gray-200 text-[#919297]"}`}
            >
                <IconComponent
                size={20}
                variant={isActive ? "Bold" : "Linear"}
                color={isActive ? "#fff" : "#919297"}
                />
                <span className="text-sm font-medium">{link.name}</span>
            </Link>
            );
        })}
        </div>
    </>
  );
}
