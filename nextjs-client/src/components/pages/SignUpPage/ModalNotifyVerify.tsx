import { useRouter } from "next/navigation";
import React from "react";
import Button from "~/components/ui/Button";

type ModalNotifyVerifyProps = {
  isModal: boolean;
};

const ModalNotifyVerify: React.FC<ModalNotifyVerifyProps> = ({ isModal }) => {
  const router = useRouter();
  return (
    <div
      className={`fixed w-full h-full top-0 left-0 ${isModal ? "z-[999999]" : "z-[-999] hidden"}
        flex justify-center items-center`}
      style={{ marginTop: 0 }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-layout bg-opacity-30" />
      <div className="w-[90%] md:w-[40%] xl:w-[30%] flex flex-col p-4 bg-second rounded-circle-md space-y-2 z-[10]">
        <div className="flex justify-end"></div>
        <div className="py-5 w-full">
          <div className="text-center text-social-x text-lg">
            Cảm ơn bạn đã đăng ký thành viên của BHD. <br /> Vui lòng kiểm tra
            hộp thư Email để hoàn tất quá trình xác thực tài khoản của bạn.
          </div>
        </div>
        <div className="flex justify-end items-center space-x-3">
          <a href="https://mail.google.com">
            <div className="text-social-x italic text-sm underline hover:text-facebook transition-all">
              Đi đến hộp thư Email
            </div>
          </a>
          <Button
            buttonType="success"
            onClick={() => {
              router.replace("dang-nhap");
            }}
          >
            Vâng, đã hiểu
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalNotifyVerify;
