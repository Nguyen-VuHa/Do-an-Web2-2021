import Link from "next/link";
import React from "react";
import Button from "~/components/ui/Button";
import Input from "~/components/ui/Input";
import InputDate from "~/components/ui/InputDate";

export const metadata = {
  title: "Đăng ký thành viên - BHD Star",
};

const SignUpPage = () => {
  return (
    <div className="container mx-auto flex flex-col justify-center items-center py-20 space-y-10 max-w-[350px]">
      <h2
        className="text-3xl font-medium text-transparent
            bg-clip-text bg-gradient-to-r from-social-x to-instagram"
      >
        Đăng Ký Tài Khoản
      </h2>
      <form action="#" className="w-full space-y-2">
        <Input placeholder="Địa chỉ Email" />
        <Input placeholder="Mật khẩu" type="password" />
        <Input placeholder="Nhập lại mật khẩu" type="password" />
        <Input placeholder="Họ & Tên" />
        <Input placeholder="Số điện thoại" />
        <InputDate />
        <div className="flex flex-col items-end space-y-2">
          <Link href="dang-nhap">
            <div className="text-social-x italic text-sm underline hover:text-facebook transition-all">
              Bạn đã có tài khoản?
            </div>
          </Link>
          <Button className="w-full" type="button" buttonType="info">
            Đăng ký
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
