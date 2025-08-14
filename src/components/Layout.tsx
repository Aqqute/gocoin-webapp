
import Sidebar from "./DesktopSidebar";
import { SidebarProvider } from "../contexts/SidebarContext";
import { Icon } from "@iconify/react";
import { SearchNormal, Notification, Filter, Menu } from "iconsax-react";
import { useSidebar } from "../contexts/SidebarContext";


function Heading({ heading }) {
  return <h4 className="font-bold text-xl leading-8">{heading}</h4>;
}

export default function BaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 const { openMobile } = useSidebar();
 
  return (
    <SidebarProvider>
        <div className="flex min-h-screen flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-[254px] flex-none transition-all duration-300 ease-in-out shadow-sm">
            <Sidebar />
        </div>

        {/* Main content */}
        <section className="flex-grow flex flex-col overflow-hidden">
            {/* nav */}
            <nav className="h-[89px] w-full p-4 flex justify-between items-center sticky top-0">
        <div className="flex items-center gap-20">
            <Heading heading="Dashboard" />

            {/* search and filter */}
            <div className="hidden md:flex items-center gap-4">
                <div className="w-[352px] h-[45px] rounded-full border border-[#E5E7EB] bg-[#F3F4F6] py-1 px-4 flex gap-2 items-center">
                    <SearchNormal size={25} color="#6D7280" variant="Linear" />
                    <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 ml-2 w-full"
                    />
                </div>
                <Filter color="#6D7280" size={25}/>
            </div>
        </div>
        {/* fire icon and count */}
        <div className="gap-2 md:w-[111px] flex items-center">
            <div className="h-8 w-[71px] rounded-[20px] border border-[#DBDBDB] py-1 px-2 bg-[#F3F4F6] flex justify-center items-center gap-2">
                <Icon icon={"bi:fire"} color="#F69626" />
                <span className="text-sm font-bold text-[#393A3F] leading-[23px]">20</span>
            </div>

            {/* notification */}
            <div className="relative cursor-pointer">
                <Notification size={25} color="#393A3F" variant="Linear" /> 
                <div className="h-2.5 w-2.5 bg-[#C70030] rounded-[8px] border border-white absolute top-0 right-0"></div>
            </div>

            {/* menu icon on mobile */}
            {/* <div onClick={openMobile}>
                <Menu color="gray" size={25} className="block md:hidden" variant="Outline" />
            </div> */}
        </div>
    </nav>
            <div className="flex-grow overflow-y-auto p-3 md:bg-gray-100">
            {children}
            </div>
        </section>
        </div>
    </SidebarProvider>
  );
}
