import React, { ReactNode } from "react";

interface SocialButton {
  className?: string;
  link?: string;
  icon?: ReactNode;
}

const SocialButton: React.FC<SocialButton> = ({
  link = "#",
  className,
  icon,
}) => {
  return (
    <a
      href={link}
      target="_blank"
      className={`relative flex justify-center items-center
        w-10 h-10 rounded-full 
        transition-all duration-500 translate-y-0 
        hover:translate-y-[-10px] shadow-[0px_7px_5px_rgba(0,0,0,0.5)] ${className}`}
    >
      {icon}
    </a>
  );
};

export default SocialButton;
