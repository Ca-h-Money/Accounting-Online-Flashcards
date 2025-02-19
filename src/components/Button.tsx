/**
 * Props for the Button component.
 * Extends the default HTML button attributes.
 *
 * @typedef {Object} ButtonProps
 * @property {React.ReactNode} children - The content inside the button (text, icons, or components).
 * @extends {React.ButtonHTMLAttributes<HTMLButtonElement>}
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode; // Accepts text, icons, or components inside the button
}

/**
 * A reusable button component with Tailwind styling.
 * Accepts all native `<button>` attributes (onClick, disabled, type, etc.).
 *
 * @param {React.ReactNode} children - The content inside the button.
 * @param {ButtonProps} props - The props for the button component.
 *
 */
const Button= ({children, ...props}: ButtonProps) => {

    return (
        <button 
            {...props}
            className="h-full cursor-pointer rounded-lg border border-transparent px-4 py-2 text-base font-medium bg-gray-900 text-white 
                transition duration-200 hover:border-gray-400"
        >
            {children}
        </button>
    )
}

export default Button;
