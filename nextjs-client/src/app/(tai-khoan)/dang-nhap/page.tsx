import React from "react";
import Button from "~/components/ui/Button";
import Input from "~/components/ui/Input";

export const metadata = {
  title: "Đăng nhập tài khoản - BHD Star",
};

const SignInPage = () => {
  return (
    <div className="container mx-auto flex flex-col justify-center items-center py-20 space-y-10 max-w-[350px]">
      <h2
        className="text-3xl font-medium text-transparent
            bg-clip-text bg-gradient-to-r from-social-x to-instagram"
      >
        Đăng Nhập Tài Khoản
      </h2>
      <form action="#" className="w-full space-y-2">
        <Input placeholder="Tài khoản hoặc địa chỉ Email" />
        <Input placeholder="Mật khẩu" type="password" />
        <div className="flex flex-col items-end space-y-2">
          <a
            href="#"
            className="text-social-x italic text-sm underline hover:text-facebook transition-all"
          >
            Bạn quên mật khẩu?
          </a>
          <Button className="w-full" type="button" buttonType="info">
            Đăng nhập
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
