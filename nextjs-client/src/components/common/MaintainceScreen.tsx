import React from "react";
import Image from "next/image";
import MaintainceIcon from "~/assets/imgs/maintaince.gif";

const MaintainceScreen = () => {
  return (
    <div className="flex flex-col items-center min-h-screen justify-start text-center space-y-10">
      <Image src={MaintainceIcon} alt="NO IMAGE" width={300} />
      <h1
        className="text-2xxl md:text-4xl text-transparent
            bg-clip-text bg-gradient-to-r from-instagram to-youtube"
      >
        Hệ Thống Đang Bảo Trì
      </h1>
      <p
        className="text-lg md:text-xl mt-4 max-w-lg text-transparent 
            bg-clip-text bg-gradient-to-r from-instagram to-primary text-social-x"
      >
        Chúng tôi đang thực hiện nâng cấp hệ thống để mang lại trải nghiệm tốt
        hơn. Vui lòng quay lại sau hoặc liên hệ hỗ trợ nếu cần thêm thông tin.
      </p>
    </div>
  );
};

export default MaintainceScreen;
