import React, { forwardRef } from "react";
import { FaAngleLeft } from "react-icons/fa6";

interface ButtonSlidePrevProps {
  className?: string;
  onClick?: () => void;
}

const ButtonSlidePrev = forwardRef<HTMLDivElement, ButtonSlidePrevProps>(
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
        <FaAngleLeft size={22} />
      </div>
    );
  },
);

ButtonSlidePrev.displayName = "ButtonSlidePrev";

export default ButtonSlidePrev;
