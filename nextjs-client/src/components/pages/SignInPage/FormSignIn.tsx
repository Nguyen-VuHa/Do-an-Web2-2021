/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import React, { useCallback } from "react";
import * as Yup from "yup";
import Button from "~/components/ui/Button";
import ErrorFormGroup from "~/components/ui/ErrorFormGroup";
import Input from "~/components/ui/Input";
import { PROCESS_SUCCESS } from "~/constants/status";
import { signInSchema } from "~/schema/auth.schema";
import { useAuthAPIStore, useAuthStore } from "~/stores/auth.store";
import { ISignInPayload } from "~/types/auth.type";
import { IObject } from "~/types/common.type";

const FormSignIn = () => {
  const router = useRouter();
  const { signInForm, errorSignInForm, setSignInForm, setStateAuth } =
    useAuthStore();
  const { isPostSignInAccount, postSignInAccount } = useAuthAPIStore();
  
  const searchParams = useSearchParams();
  const paramRedirect = searchParams.get('redirect'); // Lấy giá trị của `redirect`


  const handleChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setSignInForm({
        [name]: value,
      });
    },
    [],
  );

  const validSignInForm = async () => {
    try {
      await signInSchema.validate(signInForm, { abortEarly: false });
      setStateAuth("errorSignInForm", {});
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

        setStateAuth("errorSignInForm", newErrors);
        return false;
      }
    }
  };

  const handleSubmitSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isPostSignInAccount) return;

    const isValid = await validSignInForm();

    if (isValid) {
      // postSignInAccount
      const payloadSignIn: ISignInPayload = {
        ...signInForm,
      };

      const resPost = await postSignInAccount(payloadSignIn);

      if (resPost.status === PROCESS_SUCCESS) {
        enqueueSnackbar(resPost.message, { variant: "success" });

        if(paramRedirect) {
          window.location.replace(paramRedirect);
        } else {
          window.location.replace("/");
        }
      } else {
        if(resPost.message === '1') {
          router.push('/notify/verify')
          return 
        }
        enqueueSnackbar(resPost.message, { variant: "error" });
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmitSignIn} className="w-full space-y-2">
        <Input
          placeholder="Tài khoản hoặc địa chỉ Email"
          name="email"
          onChange={(e) => {
            delete errorSignInForm[e.target.name];
            setStateAuth("errorSignInForm", errorSignInForm);
            handleChangeInput(e);
          }}
          value={signInForm["email"]}
        />
        <ErrorFormGroup message={errorSignInForm["email"]} />
        <Input
          placeholder="Mật khẩu"
          type="password"
          name="password"
          onChange={(e) => {
            delete errorSignInForm[e.target.name];
            setStateAuth("errorSignInForm", errorSignInForm);
            handleChangeInput(e);
          }}
          value={signInForm["password"]}
        />
        <ErrorFormGroup message={errorSignInForm["password"]} />
        <div className="flex flex-col items-end space-y-2">
          <a
            href="#"
            className="text-social-x italic text-sm underline hover:text-facebook transition-all"
          >
            Bạn quên mật khẩu?
          </a>
          <Button
            className="w-full"
            type="submit"
            buttonType="info"
            isLoading={isPostSignInAccount}
          >
            Đăng nhập
          </Button>
        </div>
      </form>
    </>
  );
};

export default FormSignIn;
