import ThemeToggle from "./ThemeToggle";

/**
 * Header Component with Navigation
 *
 * This component renders the main header, which includes the navbar and theme toggle.
 *
 * @component
 * @returns {JSX.Element} The site header with navigation.
 */
export default function Header() {
    return (
        <header 
            className="w-full flex flex-column flex-wrap justify-center bg-gray-200 dark:bg-gray-900 shadow-md sm:flex-row sm:flex-nowrap"
            role="banner"
        >
            <h1 className="basis-4/5 text-5xl/[1.1] content-center text-black dark:text-white">Green River College Accounting Flashcards</h1>
            <nav 
                className="flex basis-1/5 justify-end items-center px-6 py-4"
                role="navigation"
                aria-label="Main Navigation"
            >
                <ThemeToggle />
            </nav>
        </header>
    );
}
