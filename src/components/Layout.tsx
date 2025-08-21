
import Sidebar from "./DesktopSidebar";
import { SidebarProvider } from "../contexts/SidebarContext";
import { Icon } from "@iconify/react";
import { SearchNormal, Notification, Filter, Menu } from "iconsax-react";
import { useTheme } from "../contexts/ThemeContext";
import { Flame, Bell } from "lucide-react";



function Heading({ heading }) {
const { theme } = useTheme();
const isDark = theme === "dark";
  return <h4 className={`font-bold text-xl leading-8 ${isDark ? 'text-white' : 'text-black'}`}>{heading}</h4>;
}

export default function BaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
    const { theme } = useTheme();
    const isDark = theme === "dark";
  return (
    <SidebarProvider>
        <div className="flex min-h-screen flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-[240px] flex-none transition-all duration-300 ease-in-out shadow-sm">
            <Sidebar />
        </div>

        {/* Main content */}
        <section className="flex-grow flex flex-col overflow-hidden">
            {/* nav */}
            <nav className={` w-full p-4 flex justify-between items-center sticky top-0 ${isDark ? 'bg-black' : 'bg-white'}`}>
        <div className="flex items-center gap-20">
            {/* <Heading heading="Dashboard" /> */}
        </div>
        {/* fire icon and count */}
        <div className="gap-2 md:w-[111px] flex items-center">


         <div className="flex items-center gap-6 relative">
                   <div className={`rounded-full flex py-1 px-2 text-sm font-medium ${isDark ? "bg-[#2a2a2a]" : "bg-gray-300"}`}>
                     <Flame className="text-orange-500" size={20} />
                     <span className={`text-sm font-medium ${isDark ? "text-white" : "text-black"}`}>
                       20
                     </span>
                   </div>
                   
                   <div className="relative">
                     <Bell className={isDark ? "text-gray-300" : "text-black"} size={22} />
                     <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full px-1.5 text-xs">
                       0
                     </span>
                   </div>
                 </div>
            {/* menu icon on mobile */}
            {/* <div onClick={openMobile}>
                <Menu color="gray" size={25} className="block md:hidden" variant="Outline" />
            </div> */}
        </div>
    </nav>
            <div className={`flex-grow overflow-y-auto  ${isDark ? 'md:bg-black/90' : 'md:bg-gray-100'}`}>
            {children}
            </div>
        </section>
        </div>
    </SidebarProvider>
  );
}
