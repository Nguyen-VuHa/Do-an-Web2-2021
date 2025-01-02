import React, { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  buttonType?: "success" | "error" | "warning" | "info";
  children?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  className,
  buttonType,
  children,
  ...props
}) => {
  let buttonTypeClass =
    "bg-second bg-opacity-70 text-typography hover:bg-opacity-100";

  switch (buttonType) {
    case "success":
      buttonTypeClass =
        "bg-primary bg-opacity-30 text-primary hover:bg-opacity-50";
      break;

    case "success":
      buttonTypeClass =
        "bg-primary bg-opacity-30 text-primary hover:bg-opacity-50";
      break;
    default:
      break;
  }

  return (
    <button
      className={`px-4 py-2 rounded-circle-lg font-small text-sm transition-all duration-300 ${buttonTypeClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
