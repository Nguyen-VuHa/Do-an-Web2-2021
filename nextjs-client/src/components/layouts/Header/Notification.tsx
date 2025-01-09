import React, { useEffect, useRef, useState } from "react";
import { PiBellRingingLight } from "react-icons/pi";

const Notification = () => {
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
    <div className="relative">
      <div
        className="w-10 h-10 bg-second cursor-pointer rounded-full flex justify-center items-center text-warning bg-warning bg-opacity-30
    hover:bg-opacity-50 transtion-all duration-300"
        ref={buttonRef}
        onClick={() => {
          setIsActive(!isActive);
        }}
      >
        <PiBellRingingLight size={22} />
      </div>
      <div
        ref={dropdownRef}
        className={`
                  absolute top-[105%] right-0 w-auto bg-second p-4 rounded-circle-md space-y-3 shadow-2xl w-[350px]
                  transition-all duration-300
                  ${isActive ? "visible opacity-100 z-[100]" : "invisible opacity-0 z-[-99]"}
              `}
      >
        <span>Chưa Làm</span>
      </div>
    </div>
  );
};

export default Notification;
