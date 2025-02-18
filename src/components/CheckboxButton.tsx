
interface CheckboxButtonProps {
    children: React.ReactNode; // Accepts text, icons, or components inside the button
    isChecked: boolean
    onToggle: () => void;
}

const CheckboxButton = ({children, isChecked, onToggle} : CheckboxButtonProps) => {

  return (
    <button
      onClick={onToggle}
      className={`${isChecked ? "text-white border-2 border-white" : "text-gray-600"}`}
    >
      {children}
    </button>
  );
};

export default CheckboxButton;
