import React from "react";
import Logo from "./Logo";
import Menu from "./Menu";
import Control from "./Control";

const Header = () => {
  return (
    <div
      className="
        sticky top-0 left-0 z-[999]
        w-full h-header bg-layout
        py-header px-10 border-b-[1px] border-second
        "
    >
      <div className="container mx-auto w-full h-full flex justify-between items-center m-auto">
        {/* Logo */}
        <Logo />
        {/* Menu */}
        <Menu />
        {/* Control */}
        <Control />
      </div>
    </div>
  );
};

export default Header;
