/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Link from "next/link";
import React, { useCallback } from "react";
import Button from "~/components/ui/Button";
import Input from "~/components/ui/Input";
import InputDate from "~/components/ui/InputDate";
import useAuthStore from "~/stores/auth.store";
import { ISignUpForm } from "~/types/auth.type";

type InputListType = {
  id: number;
  placeholder: string;
  name: string;
  type?: string;
};

const InputList: InputListType[] = [
  {
    id: 1,
    placeholder: "Địa chỉ Email",
    name: "email",
  },
  {
    id: 2,
    placeholder: "Mật khẩu",
    name: "password",
    type: "password",
  },
  {
    id: 3,
    placeholder: "Nhập lại mật khẩu",
    name: "confirm_password",
    type: "password",
  },
  {
    id: 4,
    placeholder: "Họ & Tên",
    name: "fullname",
  },
  {
    id: 5,
    placeholder: "Số điện thoại",
    name: "phone_number",
  },
];

const FormSignUp = () => {
  const { signUpForm, setSignUpForm } = useAuthStore();

  const handleChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      if (name === "phone_number") {
        // field cần xử lý đặc biệt
        // Loại bỏ tất cả ký tự không phải là số
        const numericValue = value.replace(/\D/g, ""); // \D sẽ khớp với tất cả ký tự không phải là số

        setSignUpForm({
          [name]: numericValue,
        });
        return;
      }

      setSignUpForm({
        [name]: value,
      });
    },
    [],
  );

  return (
    <form action="#" className="w-full space-y-2">
      {InputList.map((ipl) => {
        return (
          <Input
            key={ipl.id}
            placeholder={ipl.placeholder}
            type={ipl.type || "text"}
            name={ipl.name}
            onChange={(e) => {
              handleChangeInput(e);
            }}
            value={signUpForm[ipl.name as keyof ISignUpForm]}
          />
        );
      })}
      <InputDate
        value={signUpForm.birth_date}
        onChange={(date) => {
          setSignUpForm({
            birth_date: date,
          });
        }}
      />
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
  );
};

export default React.memo(FormSignUp);
