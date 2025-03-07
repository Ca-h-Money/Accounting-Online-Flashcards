import { useEffect, useState } from "react";

/**
 * useTheme Hook
 *
 * A custom React hook that manages the application's dark mode state.
 * It checks for a stored user preference in `localStorage`, and if none exists,
 * it falls back to the user's system preference (`prefers-color-scheme`).
 *
 * The hook applies the `dark` class to the `<html>` element when dark mode is enabled.
 * It also persists the user's selection in `localStorage` for future visits.
 *
 * @returns {Object} Theme state and toggler function.
 * @returns {boolean} isDarkMode - `true` if dark mode is enabled, otherwise `false`.
 * @returns {Function} toggleTheme - Function to toggle between dark and light mode.
 *
 */
export function useTheme() {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== "undefined") {
            // Check if a theme is stored in localStorage
            const storedTheme = localStorage.getItem("theme");
            
            if (storedTheme) {
                return storedTheme === "dark";
            }

            // If no stored theme, check system preference
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            localStorage.setItem("theme", prefersDark ? "dark" : "light");

            return prefersDark;
        }

        return false; // Default to light mode if window is unavailable
    });

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDarkMode]);

    /**
     * Toggles the theme between light and dark mode.
     */
    const toggleTheme = () => setIsDarkMode((prev) => !prev);

    return { isDarkMode, toggleTheme };
}
