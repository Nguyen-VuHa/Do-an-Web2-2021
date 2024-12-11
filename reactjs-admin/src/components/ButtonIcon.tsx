import React from 'react';
import { ColorVariant } from '~/types/common.type';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  loading?: boolean;
  color?: ColorVariant;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const ButtonIcon: React.FC<ButtonProps> = ({
  className,
  color,
  loading,
  onClick,
  ...props
}) => {
  let classNameColor = 'bg-gray text-gray';

  if (color) {
    classNameColor = `bg-${color} text-${color}`;
  }

  return (
    <button
      className={`w-full flex justify-center items-center !w-10 !h-10
        cursor-pointer rounded-md hover:bg-opacity-10 transition-all
        space-x-1 bg-opacity-20 ${className || ''} ${classNameColor}`}
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (!loading) onClick && onClick(e);
      }}
      type={'button'}
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

export default ButtonIcon;
