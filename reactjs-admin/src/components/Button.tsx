import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  loading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button: React.FC<ButtonProps> = ({
  className,
  loading,
  onClick,
  ...props
}) => {
  return (
    <button
      className={`w-full flex justify-center items-center 
        cursor-pointer rounded-sm border border-primary 
        bg-primary space-x-1 px-3 py-1.5 text-white 
        transition hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed ${
          className || ''
        }`}
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (!loading) onClick && onClick(e);
      }}
      {...props}
    >
      {loading ? (
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-solid border-white border-t-transparent"></div>
      ) : (
        props.children
      )}
    </button>
  );
};

export default Button;
