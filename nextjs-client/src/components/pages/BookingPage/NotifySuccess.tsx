import { useRouter } from "next/navigation";
import React from "react";
import { IoShieldCheckmark } from "react-icons/io5";
import Button from "~/components/ui/Button";

const NotifySuccess = () => {
  const router = useRouter();
  return (
    <>
      <IoShieldCheckmark size={100} className="fill-primary" />
      <span className="text-2xl text-center font-semibold text-primary">
        Chúc mừng bạn đã đặt vé thành công 🎉
      </span>
      <div className="text-center flex flex-col text-success italic">
        <span>
          Thông tin chi tiết về vé của bạn đã được gửi đến địa chỉ email mà bạn
          đã cung cấp. <br /> Vui lòng kiểm tra hộp thư (bao gồm cả mục thư rác
          nếu không thấy email trong hộp thư chính).
        </span>
        <span>
          Ngoài ra, bạn cũng có thể truy cập trang Lịch sử đặt vé trên tài khoản
          của mình để xem thông tin vé bất kỳ lúc nào.
        </span>
      </div>
      <Button
        buttonType="success"
        onClick={() => {
          router.replace("/");
        }}
      >
        Về trang chủ
      </Button>
    </>
  );
};

export default NotifySuccess;
