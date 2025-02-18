import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode; // Accepts text, icons, or components inside the button
}

const Button= ({children, ...props}: ButtonProps) => {

    return (
        <button {...props}>{children}</button>
    )
}

export default Button;