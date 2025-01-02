"use client";
import React, { ReactNode } from "react";
import MenuItem from "./MenuItem";
import MovieDashboardIcon from "~/assets/imgs/movie-dashboard.svg";
import CinemaIcon from "~/assets/imgs/cinema.svg";
import ShowtimeIcon from "~/assets/imgs/showtime.svg";
import { usePathname } from "next/navigation";

interface IMenuData {
  id: number;
  menuName: string;
  icon: ReactNode;
  path: string;
}

const MenuData: IMenuData[] = [
  {
    id: 1,
    menuName: "Trang Chủ",
    icon: <MovieDashboardIcon width={40} height={40} />,
    path: "/",
  },
  {
    id: 2,
    menuName: "Hệ thống rạp",
    icon: <CinemaIcon width={40} height={40} />,
    path: "/he-thong-rap",
  },
  {
    id: 3,
    menuName: "Lịch chiếu phim",
    icon: <ShowtimeIcon width={40} height={40} />,
    path: "/lich-chieu",
  },
];

const Menu = () => {
  const pathname = usePathname();

  return (
    <nav className="w-fit h-full select-none flex justify-between items-center space-x-1">
      {MenuData.map((menu) => {
        return (
          <MenuItem
            key={menu.id}
            active={
              menu.path === "/"
                ? pathname === "/"
                : pathname.includes(menu.path)
            }
            menuName={menu.menuName}
            icon={menu.icon}
            path={menu.path}
          />
        );
      })}
    </nav>
  );
};

export default Menu;
