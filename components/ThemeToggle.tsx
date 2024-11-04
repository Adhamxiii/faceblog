"use client";

import Image from "next/image";
import { useTheme } from "./context/ThemeContext";
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={`flex items-center justify-between w-12 h-6 rounded-full cursor-pointer ${
        theme === "dark" ? "bg-[#0f172a]" : "bg-white"
      } border border-gray-300 relative overflow-hidden`}
      onClick={toggleTheme}
    >
      <div
        className={`absolute top-0 left-0 w-full h-full flex items-center justify-between transform transition-transform duration-500 ${
          theme === "dark" ? "translate-x-0" : "translate-x-0"
        }`}
      >
        <div className="flex items-center justify-center w-6 h-6">
          <Image src="/moon.png" alt="moon" width={14} height={14} />
        </div>
        <div className="flex items-center justify-center w-6 h-6">
          <Image src="/sun.png" alt="sun" width={14} height={14} />
        </div>
      </div>
      <div
        className={`absolute w-5 h-5 rounded-full transform transition-transform duration-500 ${
          theme === "dark" 
            ? "translate-x-6 bg-white" 
            : "translate-x-0.5 bg-[#0f172a]"
        }`}
      />
    </div>
  );
};

export default ThemeToggle;
