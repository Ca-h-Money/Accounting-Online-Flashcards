/**
 * Props for the CheckboxButton component.
 * Extends the default HTML button attributes.
 *
 * @typedef {Object} CheckboxButtonProps
 * @property {React.ReactNode} children - The content inside the button (text, icons, or components).
 * @property {boolean} isChecked - Whether the checkbox button is active.
 * @extends {React.ButtonHTMLAttributes<HTMLButtonElement>}
 */
interface CheckboxButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>  {
    children: React.ReactNode; // Accepts text, icons, or components inside the button
    isChecked: boolean
}

/**
 * A button component that behaves like a checkbox.
 * Accepts all native `<button>` attributes (onClick, disabled, type, etc.).
 *
 * @param {CheckboxButtonProps} props - The props for the checkbox button component.
 * @param {React.ReactNode} children - The content inside the button.
 * @param {boolean} isChecked - Whether the checkbox button is active.
 *
 */
const CheckboxButton = ({children, isChecked, ...props} : CheckboxButtonProps) => {

  return (
    <button
        {...props}
        className={`h-full cursor-pointer rounded-lg border border-transparent px-4 py-2 text-base font-medium 
                transition duration-200 hover:bg-gray-800 ${isChecked ? "bg-gray-900 text-white" : "text-gray-500"} 
                ${props.className}`}
      
    >
      {children}
    </button>
  );
};

export default CheckboxButton;
