import React, { ReactNode, forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  buttonType?: "success" | "error" | "warning" | "info";
  children?: ReactNode;
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, buttonType, children, isLoading, ...props }, ref) => {
    let buttonTypeClass =
      "bg-second bg-opacity-70 text-typography hover:bg-opacity-100";

    let loadingTypeClass = "border-second";

    switch (buttonType) {
      case "success":
        buttonTypeClass =
          "bg-primary bg-opacity-30 text-primary hover:bg-opacity-50";
        loadingTypeClass = "border-primary";
        break;

      case "info":
        buttonTypeClass =
          "bg-social-x bg-opacity-30 text-social-x hover:bg-opacity-50";
        loadingTypeClass = "border-social-x";
        break;

      case "error":
        buttonTypeClass =
          "bg-instagram bg-opacity-30 text-instagram hover:bg-opacity-50";
        loadingTypeClass = "border-instagram";
        break;
      default:
        break;
    }

    return (
      <button
        ref={ref}
        className={`px-4 py-2 rounded-circle-lg font-small text-sm transition-all duration-300 ${buttonTypeClass} ${className}`}
        {...props}
      >
        {isLoading ? (
          <div className="w-full flex justify-center space-x-2 items-center">
            <span>Đang xử lý...</span>
            <div
              className={`h-5 w-5 animate-spin rounded-full border-2 border-solid border-t-transparent ${loadingTypeClass}`}
            />
          </div>
        ) : (
          children
        )}
      </button>
    );
  },
);

export default Button;
