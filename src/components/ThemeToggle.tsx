import { useTheme } from "../hooks/useTheme";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md bg-gray-300 dark:bg-gray-700 dark:text-white transition-all"
    >
        {isDarkMode ? 
            <div className="flex gap-2 items-center">
                <FaMoon size={20}/> 
                <span>Dark</span>
            </div>
        : 
            <div className="flex gap-2 items-center">
                <FaSun size={20}/>
                <span>Light</span>
            </div>
        }
    </button>
  );
}
