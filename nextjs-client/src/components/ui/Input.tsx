import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  placeholder?: string;
  value?: string;
}

const Input: React.FC<InputProps> = ({
  className,
  placeholder,
  value,
  ...props
}) => {
  return (
    <input
      className={`px-5 py-2 outline-none w-full
                bg-second rounded-circle-lg text-social-x ${className || ""}`}
      placeholder={placeholder}
      value={value || ""}
      {...props}
    />
  );
};

export default Input;
