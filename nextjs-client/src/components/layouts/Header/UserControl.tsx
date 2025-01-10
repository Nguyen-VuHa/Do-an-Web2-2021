import React, { useEffect, useRef, useState } from "react";
import Notification from "./Notification";
import ImageCustom from "~/components/ui/ImageCustom";
import { RiLogoutCircleLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { useAuthStore } from "~/stores/auth.store";

const UserControl = () => {
  const { setStateAuth } = useAuthStore();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

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
    <div className="flex space-x-2 max-md:hidden">
      <Notification />
      <div className="relative">
        <div
          className="max-w-[150px] h-10 bg-second cursor-pointer rounded-full flex justify-start text-typography items-center bg-second
          hover:bg-opacity-50 hover:bg-social-x hover:text-social-x transtion-all duration-300 select-none"
          onClick={() => {
            setIsActive(!isActive);
          }}
          ref={buttonRef}
        >
          <div className="w-10 h-10 overflow-hidden p-1">
            <ImageCustom
              imgClassName="w-full h-full"
              src="https://bhdstar.vn/wp-content/themes/loodo-starter/inc/imgs/bhdIcon.png"
              alt="NO AVATAR"
              width={20}
              height={20}
            />
          </div>
          <span className="text-sm pr-2">Nguyễn Vũ Hạ</span>
        </div>
        <div
          ref={dropdownRef}
          className={`
                        absolute top-[105%] right-0 bg-second p-2 rounded-circle-md space-y-1 shadow-2xl w-[250px]
                        transition-all duration-300
                        ${isActive ? "visible opacity-100 z-[100]" : "invisible opacity-0 z-[-99]"}
                    `}
        >
          <div className="px-3 py-2 text-social-x bg-social-x bg-opacity-20 cursor-pointer hover:bg-opacity-50 rounded-md transition-all flex text-sm space-x-2">
            <CgProfile size={20} />
            <span>Thông tin cá nhân</span>
          </div>
          <div className="px-3 py-2 text-social-x bg-social-x bg-opacity-20 cursor-pointer hover:bg-opacity-50 rounded-md transition-all flex text-sm space-x-2">
            <IoSettingsOutline size={20} />
            <span>Cài đặt</span>
          </div>
          <div
            className="px-3 py-2 text-instagram bg-instagram bg-opacity-20 cursor-pointer hover:bg-opacity-50 rounded-md transition-all flex text-sm space-x-2"
            onClick={() => {
              setStateAuth("isModalConfirmLogout", true);
              setIsActive(false);
            }}
          >
            <RiLogoutCircleLine size={20} />
            <span>Đăng xuất tài khoản</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserControl;
