"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ShowtimeTabs() {
  const pathname = usePathname();
  const [path, setPath] = useState<string>("");

  useEffect(() => {
    setPath(pathname);
  }, [pathname]);

  return (
    <ul className="mb-5 flex list-none flex-row border-b-0 ps-0">
      <li className="w-full md:w-fit">
        <Link
          href="lich-theo-phim"
          className={`my-2 block border-x-0 border-b-2 border-t-0 border-transparent text-center px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500
            ${path.includes("lich-theo-phim") ? "border-warning !text-warning bg-warning bg-opacity-10" : ""} 
        text-white/50 hover:bg-neutral-700/60 transition-all rounded-tr-circle-md rounded-tl-circle-md`}
          prefetch={false}
        >
          Lịch theo phim
        </Link>
      </li>
      <li className="w-full md:w-fit">
        <Link
          href="lich-theo-rap"
          className={`my-2 block border-x-0 border-b-2 border-t-0 border-transparent text-center px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500
            ${path.includes("lich-theo-rap") ? "border-warning !text-warning bg-warning bg-opacity-10" : ""} text-white/50 hover:bg-neutral-700/60 transition-all rounded-tr-circle-md rounded-tl-circle-md`}
          prefetch={false}
        >
          Lịch theo rạp
        </Link>
      </li>
    </ul>
  );
}
