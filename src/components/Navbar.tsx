import ThemeToggle from "./ThemeToggle";

/**
 * Navbar Component
 *
 * This component renders a navigation bar with an accessible theme toggle button.
 *
 * @component
 * @returns {JSX.Element} The navigation bar with a theme toggle button.
 */
export default function Navbar() {
    return (
        <nav 
            className="w-full flex justify-end items-center bg-gray-200 dark:bg-gray-900 mb-4 px-6 py-4 shadow-md"
            role="navigation"
            aria-label="Main Navigation"
        >
            {/* Theme Toggle Button on the Right */}
            <ThemeToggle />
        </nav>
    );
}
