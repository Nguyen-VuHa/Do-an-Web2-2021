"use client";

import React from "react";
import Button from "../ui/Button";
import { IoClose } from "react-icons/io5";
import { useGlobalStore } from "~/stores/global.store";

const ViewTrailer = () => {
  const { isModalViewTrailer, trailerID, setStateGlobal } = useGlobalStore();

  const handleCloseModal = () => {
    setStateGlobal("isModalViewTrailer", false);
    setStateGlobal("trailerID", "");
    // Không cần thay đổi URL, chỉ cần đóng modal
  };

  return (
    <div
      className={`fixed top-0 left-0 flex justify-center items-center
            w-full h-full ${isModalViewTrailer ? "z-[999999]" : "z-[-999] hidden"}
        `}
    >
      {/* Background */}
      <div
        className="absolute w-full h-full bg-layout bg-opacity-30"
        onClick={() => {
          handleCloseModal();
        }}
      />

      {/* Layout view trailer */}
      <div className="relative p-2 bg-second rounded-circle-md w-[60%] h-[40rem] max-md:w-[90%] max-lg:h-[25rem] max-md:h-[18.75rem] max-sm:h-[15.625rem]">
        <Button
          className="absolute flex justify-center items-center !w-[40px] !h-[40px] !p-1 top-[-10px] right-[-10px] rounded-md"
          buttonType="error"
          onClick={() => {
            handleCloseModal();
          }}
        >
          <IoClose size={25} />
        </Button>
        <iframe
          className="w-full h-full rounded-circle-md"
          title="Trailer Movie"
          allow="autoplay"
          allowFullScreen={true}
          loading="lazy"
          src={`https://www.youtube.com/embed/${trailerID}?autoplay=1`}
        />
      </div>
    </div>
  );
};

export default ViewTrailer;
