"use client";
import React from "react";
import Button from "~/components/ui/Button";

const PageError = () => {
  return (
    <section className="flex items-center h-full p-16">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl text-instagram text-opacity-70">
            <span className="sr-only">Error</span>403
          </h2>
          <p className="text-2xl font-semibold md:text-3xl text-instagram text-opacity-50">
            Rất tiếc, xác thực tài khoản thất bại.
          </p>
          <p className="mt-4 mb-8 text-instagram">
            Nhưng đừng lo, bạn có thể tiến hành đăng nhập lại và vào email để
            xác thực nhé.
          </p>
          <Button
            buttonType="success"
            onClick={() => {
              window.location.replace("/dang-nhap");
            }}
          >
            Đi đến trang đăng nhập
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PageError;
