import React, { forwardRef } from "react";
import { FaAngleRight } from "react-icons/fa6";

interface ButtonSlideNextProps {
  className?: string;
  onClick?: () => void;
}

const ButtonSlideNext = forwardRef<HTMLDivElement, ButtonSlideNextProps>(
  ({ className, onClick }, ref) => {
    return (
      <div
        ref={ref}
        onClick={() => {
          if (onClick) {
            onClick();
          }
        }}
        className={`cursor-pointer w-10 h-10 rounded-full bg-warning flex justify-center items-center text-warning bg-opacity-30 hover:bg-opacity-50 transition-all ${className}`}
      >
        <FaAngleRight size={22} />
      </div>
    );
  },
);

ButtonSlideNext.displayName = "ButtonSlideNext";

export default ButtonSlideNext;
