
interface CheckboxButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>  {
    children: React.ReactNode; // Accepts text, icons, or components inside the button
    isChecked: boolean
}

const CheckboxButton = ({children, isChecked, ...props} : CheckboxButtonProps) => {

  return (
    <button
        {...props}
        className={`h-full cursor-pointer rounded-lg border border-transparent px-4 py-2 text-base font-medium 
                transition duration-200 hover:bg-gray-800 ${isChecked ? "bg-gray-900 text-white" : "text-gray-500"}`}
      
    >
      {children}
    </button>
  );
};

export default CheckboxButton;
