import ThemeToggle from "./ThemeToggle";

export default function Navbar() {

    
    return (
        <nav className="w-full flex justify-end items-center bg-gray-200 dark:bg-gray-900 mb-4 px-6 py-4 shadow-md">
            

            {/* Theme Toggle Button on the Right */}
            <ThemeToggle />
        </nav>
    );
}
