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
        <div className="flex w-full bg-gray-300 rounded-3xl p-2 items-center gap-4 text-gray-500">
          <Search
            size={22}
            className={isDark ? "text-gray-600" : "text-black"}
          />
          <span className="text-sm text-black">Search...</span>
        </div>
        <SlidersHorizontal className={isDark ? "text-gray-300" : "text-black"} />
      </div>

      <SearchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default SearchBar;
