/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useSnackbar } from "notistack";
import React, { useCallback, useState } from "react";
import * as Yup from "yup";
import Button from "~/components/ui/Button";
import ErrorFormGroup from "~/components/ui/ErrorFormGroup";
import Input from "~/components/ui/Input";
import { PROCESS_SUCCESS } from "~/constants/status";
import { signUpSchema } from "~/schema/auth.schema";
import { useAuthAPIStore, useAuthStore } from "~/stores/auth.store";
import { ISignUpForm, ISignUpPayload } from "~/types/auth.type";
import { IObject } from "~/types/common.type";
import ModalNotifyVerify from "./ModalNotifyVerify";

// Định nghĩa component sẽ được tải động (chỉ ở client)
const InputDate = dynamic(() => import("~/components/ui/InputDate"), {
  ssr: false, // Tắt SSR (render server-side)
});

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
  const { enqueueSnackbar } = useSnackbar();

  const [isModalRemember, setIsModalRemember] = useState<boolean>(false);

  const { signUpForm, errorSignUpForm, setSignUpForm, setStateAuth } =
    useAuthStore();
  const { isPostSignUpAccount, postSignUpAccount } = useAuthAPIStore();

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

  const validSignUpForm = async () => {
    try {
      await signUpSchema.validate(signUpForm, { abortEarly: false });
      setStateAuth("errorSignUpForm", {});
      return true;
      // Tiến hành login hoặc xử lý sau khi validate thành công
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const newErrors: IObject<string> = {};
        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });

        setStateAuth("errorSignUpForm", newErrors);
        return false;
      }
    }
  };

  const handleSubmitSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isPostSignUpAccount) return;

    const isValid = await validSignUpForm();

    if (isValid) {
      const payloadSignUp: ISignUpPayload = {
        ...signUpForm,
      };

      const resPost = await postSignUpAccount(payloadSignUp);

      if (resPost.status === PROCESS_SUCCESS) {
        enqueueSnackbar(resPost.message, { variant: "success" });
        setIsModalRemember(true);
        // router.replace("dang-nhap");
      } else enqueueSnackbar(resPost.message, { variant: "error" });
    }
  };

  return (
    <>
      <ModalNotifyVerify isModal={isModalRemember} />
      <form onSubmit={handleSubmitSignUp} className="w-full space-y-2">
        {InputList.map((ipl) => {
          return (
            <div key={ipl.id} className="space-y-2">
              <Input
                placeholder={ipl.placeholder}
                type={ipl.type || "text"}
                name={ipl.name}
                onChange={(e) => {
                  delete errorSignUpForm[e.target.name];
                  setStateAuth("errorSignUpForm", errorSignUpForm);
                  handleChangeInput(e);
                }}
                value={signUpForm[ipl.name as keyof ISignUpForm]}
              />
              <ErrorFormGroup message={errorSignUpForm[ipl.name]} />
            </div>
          );
        })}
        <div className="space-y-2">
          <InputDate
            value={signUpForm.birth_date}
            onChange={(date) => {
              setSignUpForm({
                birth_date: date,
              });
            }}
          />
          <ErrorFormGroup message={errorSignUpForm["birth_date"]} />
        </div>
        <div className="flex flex-col items-end space-y-2">
          <Link href="dang-nhap">
            <div className="text-social-x italic text-sm underline hover:text-facebook transition-all">
              Bạn đã có tài khoản?
            </div>
          </Link>
          <Button
            className="w-full"
            buttonType="info"
            isLoading={isPostSignUpAccount}
          >
            Đăng ký
          </Button>
        </div>
      </form>
    </>
  );
};

export default React.memo(FormSignUp);
