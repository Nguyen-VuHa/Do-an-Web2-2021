import React from "react";
import Button from "~/components/ui/Button";

const NotifyVerifyPage = () => {
  return (
    <section className="flex items-center h-full p-16">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="text-center">
          <h2 className="mb-8 font-extrabold text-9xl text-warning text-opacity-70">
            Oops!
          </h2>
          <p className="text-xl font-semibold md:text-2xl text-warning text-opacity-50">
            Có vẻ như tài khoản của bạn chưa được xác thực!
          </p>
          <p className="mt-4 mb-8 text-warning">
            Nhưng đừng lo, bây giờ bạn truy cập vào hộp thư Email <br /> để thực
            hiện xác thực theo hướng dẫn nhé.
          </p>
          <a href="https://mail.google.com">
            <Button buttonType="info">Đi đến hộp thư Email</Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default NotifyVerifyPage;
