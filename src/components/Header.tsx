import ThemeToggle from "./ThemeToggle";

/**
 * Header Component with Navigation
 *
 * This component renders the main header, which includes the navbar and theme toggle.
 * 
 * Accessibility Features:
 * - `<header>`: Provides a **semantic landmark** for assistive technologies.
 * - `role="banner"`: Ensures the header is recognized as the **main site header**.
 * - `<nav>` inside `<header>`: Clearly associates navigation with the site’s structure.
 *
 * @component
 * @returns {JSX.Element} The site header with navigation.
 */
export default function Header() {
    return (
        <header 
            className="w-full bg-gray-200 dark:bg-gray-900 shadow-md"
            role="banner"
        >
            <nav 
                className="w-full flex justify-end items-center px-6 py-4"
                role="navigation"
                aria-label="Main Navigation"
            >
                <ThemeToggle />
            </nav>
        </header>
    );
}
