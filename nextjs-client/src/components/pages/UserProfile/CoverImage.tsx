'use client'
import React from "react";
import ImageCustom from "~/components/ui/ImageCustom";
import { useUserStore } from "~/stores/user.store";

const CoverImage = () => {
  const { userInfo } = useUserStore();


  return (
    <div className="relative w-full h-auto min-h-[120px] md:h-[350px] bg-social-x/20  z-[-1] rounded-circle-md p-2">
      <div className="absolute w-[106%] h-[105%] left-[-3%] inset-1 rounded-lg border-2 border-transparent opacity-50 bg-gradient-to-r from-warning via-instagram to-social-x blur-2xl"></div>
      {
        userInfo.cover_image_url && <ImageCustom 
          imgClassName='w-full h-full rounded-circle-md overflow-hidden opacity-90'
          alt='NO COVER IMAGE'
          src={userInfo.cover_image_url}
          width={1280}
          height={720}
      />
      }
    </div>
  );
};

export default CoverImage;
