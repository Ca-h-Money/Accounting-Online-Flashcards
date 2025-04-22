/**
 * Props for the Button component.
 * Extends the default HTML button attributes.
 *
 * @typedef {Object} ButtonProps
 * @property {React.ReactNode} children - The content inside the button (text, icons, or components).
 * @extends {React.ButtonHTMLAttributes<HTMLButtonElement>}
 */
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
}

/**
 * A reusable button component with Tailwind styling.
 * Accepts all native `<button>` attributes (onClick, disabled, type, etc.).
 *
 * @param {React.ReactNode} children - The content inside the button.
 * @param {ButtonProps} props - The props for the button component.
 *
 */
const Button= ({className = "", children, ...props}: ButtonProps) => {

    return (
        <button 
            {...props}
            className={`cursor-pointer rounded-lg border border-transparent px-4 py-2 text-base 
                font-medium transition duration-200  text-black bg-white dark:text-white dark:bg-gray-900
                hover:bg-gray-300 dark:hover:bg-gray-800 hover:border-gray-400 ${className}`}
        >
            {children}
        </button>
    )
}

export default Button;
