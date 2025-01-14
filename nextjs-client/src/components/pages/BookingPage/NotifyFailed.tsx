import { useRouter } from "next/navigation";
import React from "react";
import Button from "~/components/ui/Button";
import { VscError } from "react-icons/vsc";

const NotifyFailed = () => {
  const router = useRouter();
  return (
    <>
      <VscError size={100} className="fill-youtube" />
      <span className="text-2xl text-center font-semibold text-youtube">
        Tiến trình đặt vé thất bại Oops!
      </span>
      <div className="text-center flex flex-col text-youtube italic">
        <span>
          Oops! Rất tiếc, việc đặt vé của bạn chưa thành công. <br /> Vui lòng
          thử lại sau. Cảm ơn bạn đã thông cảm!
        </span>
      </div>
      <Button
        buttonType="error"
        onClick={() => {
          router.replace("/");
        }}
      >
        Về trang chủ
      </Button>
    </>
  );
};

export default NotifyFailed;
