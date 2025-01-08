"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { TbArrowNarrowLeftDashed } from "react-icons/tb";
import Button from "~/components/ui/Button";

interface CinemaDetailHeaderProps {
  title: string;
}

const CinemaDetailHeader: React.FC<CinemaDetailHeaderProps> = ({ title }) => {
  const router = useRouter();

  return (
    <div className="relative px-5 lg:px-0">
      <Button
        className="absolute top-[-30px] md:top-0 ml-5 left-0 md:w-[50px] md:h-[50px] lg:ml-0 flex justify-center items-center !p-0
                hover:-translate-x-1 transition-all duration-300 animate-back-pulse w-[35px] h-[35px]
                "
        buttonType="warning"
        onClick={() => {
          router.back();
        }}
      >
        <TbArrowNarrowLeftDashed size={28} />
      </Button>

      <h1 className="text-2xl md:text-4xl font-semibold gradient-text text-center py-2">
        {title}
      </h1>
    </div>
  );
};

export default CinemaDetailHeader;
