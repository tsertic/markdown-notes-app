import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToogle = () => {
  const { theme, toogleTheme } = useTheme();
  return (
    <button
      onClick={toogleTheme}
      aria-label="toogle theme"
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-400 transition-colors duration-200 cursor-pointer"
    >
      {theme === "dark" ? <FaSun /> : <FaMoon />}
    </button>
  );
};

export default ThemeToogle;
