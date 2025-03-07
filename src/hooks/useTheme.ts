import { useEffect, useState } from "react";

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
            localStorage.setItem("theme", prefersDark ? "dark" : "light"); // Save preference

            return prefersDark;
        }

        return false; // Default to light mode if window is unavailable (e.g., during SSR)
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

    const toggleTheme = () => setIsDarkMode((prev) => !prev);

    return { isDarkMode, toggleTheme };
}
