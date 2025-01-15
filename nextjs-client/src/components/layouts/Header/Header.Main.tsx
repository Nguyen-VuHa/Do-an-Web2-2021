/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import { apiGetCookieAccessToken } from "~/apis/auth.api";
import useSocketStore from "~/stores/socket.store";
import { useUserAPIStore } from "~/stores/user.store";
import { connectSocket } from "~/utils/socket";
import ConfirmSignOutModal from "./ConfirmSignOut.Modal";
import Control from "./Control";
import Logo from "./Logo";
import Menu from "./Menu";
import MobileMenu from "./MobileMenu";
import UserControl from "./UserControl";

const Header = () => {
  const [isLogin, setisLogin] = useState<number>(0); // 0 dang kiem tra, 1 chua dang nhap, 2 da dang nhap
  const { getUserInfo } = useUserAPIStore();
  const { setSocket } = useSocketStore();

  useEffect(() => {
    const checkingLogin = async () => {
      const isLogin = await apiGetCookieAccessToken();

      if (isLogin) {
        await getUserInfo();
        const socketConnect = await connectSocket();

        if (socketConnect) {
          setSocket(socketConnect);
        }
        
        setisLogin(2);
        return;
      }

      setisLogin(1);
    };

    checkingLogin();
  }, []);
  

  return (
    <>
      <ConfirmSignOutModal />
      <div
        className="
        sticky top-0 left-0 z-[999]
        w-full h-header bg-layout
        py-header px-10 border-b-[1px] border-second max-sm:px-8
        "
      >
        <div className="container mx-auto w-full h-full flex justify-between items-center m-auto">
          {/* Logo */}
          <Logo />
          {/* Menu */}

          <Menu />
          {/* Control */}
          {isLogin === 0 && (
            <div className="animate-pulse bg-second rounded-circle-md w-64 h-full"></div>
          )}
          {isLogin === 1 && <Control />}
          {isLogin === 2 && <UserControl />}

          {/* Menu Mobile */}
          <MobileMenu />
        </div>
      </div>
    </>
  );
};

export default Header;
