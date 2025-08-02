import React, { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import SearchModal from "./SearchModal";
import { useTheme } from "../contexts/ThemeContext";

const SearchBar = () => {
  const { theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isDark = theme === "dark";

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="flex items-center justify-between gap-2 mt-4"
      >
        <div className={`rounded-full w-full gap-2 items-center flex py-1 px-2 text-sm font-medium ${isDark ? "bg-[#2a2a2a]" : "bg-gray-300"}`}>
          <Search
            size={22}
            className={isDark ? "text-white" : "text-black"}
          />
          <span className={ isDark ? "text-white text-sm" : "text-black text-sm"}>Search...</span>
        </div>
        <SlidersHorizontal className={isDark ? "text-gray-300" : "text-black"} />
      </div>

      <SearchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default SearchBar;
