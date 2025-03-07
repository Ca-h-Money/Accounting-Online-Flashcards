import { useTheme } from "../hooks/useTheme";
import { FaMoon, FaSun } from "react-icons/fa";


/**
 * ThemeToggle Component
 *
 * This component allows users to toggle between light and dark mode.
 * It updates the theme using the `useTheme` hook and applies Tailwind's `dark` class
 * to the root HTML element.
 *
 */
export default function ThemeToggle() {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
            aria-pressed={isDarkMode} 
            title={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
            className="p-2 rounded-md bg-gray-400 dark:bg-gray-700 dark:text-white transition-all cursor-pointer"
        >
            <div className="flex gap-2 items-center">
                {isDarkMode ? <FaMoon size={20} /> : <FaSun size={20} />}
                <span>{isDarkMode ? "Dark" : "Light"}</span>
            </div>
        </button>
    );
}
