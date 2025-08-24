import Sidebar from "./DesktopSidebar";
import { SidebarProvider } from "../contexts/SidebarContext";
import { useTheme } from "../contexts/ThemeContext";
import { Flame, Bell } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../components/ui/LoadingBar";

function Heading({ heading }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <h4
      className={`font-bold text-xl leading-8 ${
        isDark ? "text-white" : "text-black"
      }`}
    >
      {heading}
    </h4>
  );
}

export default function BaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  // simulate loading for demo
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // routes to page headings
  const routeHeadings: Record<string, string> = {
    "/": "Dashboard",
    "/wallet": "Go Wallet",
    "/profile": "Profile Settings",
  };

  // Match heading based on pathname (handles subroutes too)
  const currentPath = location.pathname;
  const matchedKey = Object.keys(routeHeadings).find(
    (key) => currentPath === key || currentPath.startsWith(key + "/")
  );

  const heading = matchedKey ? routeHeadings[matchedKey] : "Page";

  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col md:flex-row">
        {/* Sidebar - always visible */}
        <div className="w-[240px] flex-none shadow-sm">
          <Sidebar />
        </div>

        {/* Main content */}
        <section className="flex-grow flex flex-col overflow-hidden relative">
          {/* nav */}
          <nav
            className={`w-full p-4 flex justify-between items-center fixed-0 ${
              isDark ? "bg-black" : "bg-white"
            }`}
          >
            <div className="flex items-center gap-20">
              <Heading heading={heading} />
            </div>

            {/* fire icon and count */}
            <div className="gap-2 md:w-[111px] flex items-center">
              <div className="flex items-center gap-6 relative">
                <div
                  className={`rounded-full flex py-1 px-2 text-sm font-medium ${
                    isDark ? "bg-[#2a2a2a]" : "bg-gray-300"
                  }`}
                >
                  <Flame className="text-orange-500" size={20} />
                  <span
                    className={`text-sm font-medium ${
                      isDark ? "text-white" : "text-black"
                    }`}
                  >
                    20
                  </span>
                </div>

                <div className="relative">
                  <Bell
                    className={isDark ? "text-gray-300" : "text-black"}
                    size={22}
                  />
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full px-1.5 text-xs">
                    0
                  </span>
                </div>
              </div>
            </div>
          </nav>

          {/* children area */}
          <div
            className={`flex-grow overflow-y-auto relative ${
              isDark ? "md:bg-black/90" : "md:bg-gray-100"
            }`}
          >
            <div>{children}</div>

            {/* PageLoader overlays ONLY children */}
            {loading && (
              <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                <Loader type="circles" size="lg" color="blue" />
              </div>
            )}
          </div>
        </section>
      </div>
    </SidebarProvider>
  );
}
