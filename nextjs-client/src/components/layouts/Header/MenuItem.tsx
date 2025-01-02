"use client";
import { ReactNode, useState } from "react";

interface MenuItemProps {
  menuName: string;
  icon: ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = ({ menuName, icon }) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <div
      className="
                relative flex justify-center items-center
                w-header-menu h-header-menu
                text-typography rounded-circle-md cursor-pointer
                transition-all duration-300 fill-typography
                hover:fill-primary hover:bg-second
            "
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
    >
      {icon}
      <div
        className={`absolute top-[105%] bg-second p-2 w-full text-center rounded-sm text-primary transition-all ${isHover ? "opacity-1 z-1" : "opacity-0 z-[-99]"}`}
      >
        {menuName || "NO MENU"}
      </div>
    </div>
  );
};

export default MenuItem;
