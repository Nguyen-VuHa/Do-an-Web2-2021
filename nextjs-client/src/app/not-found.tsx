"use client";
import React from "react";
import Button from "~/components/ui/Button";

const notfound = () => {
  return (
    <section className="flex items-center h-full p-16">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md flex flex-col justify-center items-center text-center">
          <h2 className="mb-8 font-extrabold text-9xl text-instagram text-opacity-70">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl text-instagram text-opacity-50">
            Rất tiếc, chúng tôi không thể tìm thấy trang này.
          </p>
          <p className="mt-4 mb-8 text-instagram">
            Nhưng đừng lo, bạn có thể tìm thấy nhiều nội dung khác trên trang
            chủ của chúng tôi.
          </p>
          <Button
            buttonType="success"
            onClick={() => {
              window.location.replace("/");
            }}
          >
            Về Trang Chủ
          </Button>
        </div>
      </div>
    </section>
  );
};

export default notfound;
