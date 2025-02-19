import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode; // Accepts text, icons, or components inside the button
}

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
