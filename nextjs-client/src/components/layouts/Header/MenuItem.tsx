"use client";
import Link from "next/link";
import { ReactNode, useState } from "react";

interface MenuItemProps {
  menuName: string;
  icon: ReactNode;
  active?: boolean;
  path?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  menuName,
  icon,
  active,
  path,
}) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <Link href={path || "#"}>
      <div
        className={`relative flex justify-center items-center
          w-header-menu h-header-menu
          text-typography rounded-circle-md cursor-pointer
          transition-all duration-300 fill-typography
          hover:fill-primary hover:bg-second ${active ? "!fill-primary bg-primary bg-opacity-10" : ""}`}
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
    </Link>
  );
};

export default MenuItem;
