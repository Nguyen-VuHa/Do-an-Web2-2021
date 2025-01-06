import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";
import { CgMenuRight } from "react-icons/cg";
import CinemaIcon from "~/assets/imgs/cinema.svg";
import MovieDashboardIcon from "~/assets/imgs/movie-dashboard.svg";
import ShowtimeIcon from "~/assets/imgs/showtime.svg";
import Button from "~/components/ui/Button";

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
    icon: <MovieDashboardIcon width={30} height={30} />,
    path: "/",
  },
  {
    id: 2,
    menuName: "Hệ thống rạp",
    icon: <CinemaIcon width={30} height={30} />,
    path: "/he-thong-rap",
  },
  {
    id: 3,
    menuName: "Lịch chiếu phim",
    icon: <ShowtimeIcon width={30} height={30} />,
    path: "/lich-chieu",
  },
];

const MobileMenu = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const pathname = usePathname();

  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsActive(false); // Đóng dropdown nếu click ngoài
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative md:hidden">
      <Button
        ref={buttonRef}
        className="w-[50px] h-[45px] !p-1 flex justify-center items-center"
        onClick={() => {
          setIsActive(!isActive);
        }}
      >
        <CgMenuRight size={25} />
      </Button>

      {/* Dropdown */}
      <div
        ref={dropdownRef}
        className={`
                    absolute top-[105%] right-0 w-auto bg-second p-4 rounded-circle-md space-y-3 shadow-2xl
                    transition-all duration-300
                    ${isActive ? "visible opacity-100 z-[100]" : "invisible opacity-0 z-[-99]"}
                `}
      >
        <div className="flex items-center space-x-1">
          <Link
            href="dang-nhap"
            onClick={() => {
              setIsActive(false);
            }}
          >
            <Button className="whitespace-nowrap" buttonType="success">
              Đăng nhập
            </Button>
          </Link>
          <Link
            href="dang-ky"
            onClick={() => {
              setIsActive(false);
            }}
          >
            <Button className="whitespace-nowrap hover:!bg-layout">
              Đăng ký
            </Button>
          </Link>
        </div>
        <hr />
        <div className="flex flex-col space-y-1">
          {MenuData.map((menu) => {
            const active =
              menu.path === "/"
                ? pathname === "/"
                : pathname.includes(menu.path);

            return (
              <Link
                key={menu.id}
                href={menu.path || "#"}
                onClick={() => {
                  setIsActive(false);
                }}
              >
                <div
                  className={`relative flex items-center space-x-2 w-full px-3 py-2
                                    text-typography rounded-circle-md cursor-pointer
                                    transition-all duration-300 fill-typography
                                    hover:fill-primonary hover:bg-layout ${active ? "!fill-primary !text-primary bg-primary bg-opacity-10" : ""}`}
                >
                  {menu.icon}
                  <span>{menu.menuName}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
