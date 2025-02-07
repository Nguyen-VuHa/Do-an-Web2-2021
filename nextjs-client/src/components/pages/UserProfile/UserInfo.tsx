"use client";
import React from "react";
import Button from "~/components/ui/Button";
import ImageCustom from "~/components/ui/ImageCustom";
import { FiEdit } from "react-icons/fi";
import { useUserAPIStore, useUserStore } from "~/stores/user.store";
import { DEFAULT_AVATAR_USER } from "~/constants/user";
import FieldInput from "./FieldInput";
import { VscSaveAs } from "react-icons/vsc";
import { IoCloseSharp } from "react-icons/io5";
import Input from "~/components/ui/Input";
import InputDate from "~/components/ui/InputDate";
import InputSelect from "~/components/ui/InputSelect";
import { enqueueSnackbar } from "notistack";
import dayjs from "dayjs";
import { FaCamera } from "react-icons/fa";

const GenderDataSelect = [
  {
    value: "male",
    name: "Nam",
  },
  {
    value: "female",
    name: "Nữ",
  },
];

const UserInfo = () => {
  const { userInfo, isEditInfo, userEditForm, setStateUser } = useUserStore();
  const { isUpdateUserInfo, updateUserInfo } = useUserAPIStore();

  const handleSubmitUpdate = async () => {
    if (!isUpdateUserInfo) {
      const errorMessage = await updateUserInfo(userEditForm);

      if (errorMessage) {
        enqueueSnackbar(errorMessage, { variant: "error" });
      }
    }
  };

  return (
    <div className="w-full px-5 mt-[-50px] flex items-center flex-col md:items-start md:flex-row md:space-x-4">
      <div className="relative w-32 h-32 md:w-64 md:h-64 relative group p-3 flex-shrink-0">
        <div className="absolute inset-0 bg-social-x/30 rounded-3xl transition-opacity blur-lg"></div>
        <ImageCustom
          imgClassName="w-full h-full rounded-3xl"
          src={(userInfo && userInfo.image_url) || DEFAULT_AVATAR_USER}
          alt="NO AVATAR"
          width={100}
          height={100}
        />
        <Button
          className="
            absolute bottom-0 right-0 !p-0
            !rounded-md
            w-10 h-10
          "
          buttonType="warning"
        >
          <FaCamera size={20}/>
        </Button>
      </div>
      <div className="pt-5 md:pt-[80px] flex flex-col space-y-2">
        <div className="flex justify-center items-center space-x-4">
          <FieldInput
            isEdit={isEditInfo}
            editComponent={
              <Input
                value={userEditForm?.fullname || ""}
                onChange={(e) => {
                  setStateUser("userEditForm", {
                    ...userEditForm,
                    fullname: e.target.value,
                  });
                }}
              />
            }
          >
            <span className="text-2xl font-semibold text-social-x uppercase">
              {userInfo.fullname || "-"}
            </span>
          </FieldInput>
          {isEditInfo ? (
            <div className="flex space-x-1">
              <Button
                className="w-10 h-10 !p-1 !rounded-md"
                buttonType="error"
                onClick={() => {
                  if (!isUpdateUserInfo) {
                    setStateUser("userEditForm", null);
                    setStateUser("isEditInfo", false);
                  }
                }}
              >
                <IoCloseSharp size={18} />
              </Button>
              <Button
                className="w-10 h-10 !p-1 !rounded-md"
                buttonType="warning"
                isLoading={isUpdateUserInfo}
                loadingText=""
                onClick={() => {
                  handleSubmitUpdate();
                }}
              >
                <VscSaveAs size={18} />
              </Button>
            </div>
          ) : (
            <Button
              className="w-10 h-10 !p-1 !rounded-md"
              buttonType="info"
              onClick={() => {
                const formEditData = {
                  fullname: userInfo.fullname,
                  birth_day: userInfo.birth_day,
                  gender: userInfo.gender === "Nam" ? "male" : "female",
                };

                setStateUser("userEditForm", formEditData);
                setStateUser("isEditInfo", true);
              }}
            >
              <FiEdit size={18} />
            </Button>
          )}
        </div>
        <div className="flex flex-col space-y-2 text-warning italic text-sm font-light">
          <span>Email: {userInfo.email || "-"}</span>
          <span>SĐT Đăng ký: {userInfo.phone_number || "-"}</span>
          <FieldInput
            isEdit={isEditInfo}
            editComponent={
              <InputDate
                value={userEditForm?.birth_day || ""}
                onChange={(value) => {
                  setStateUser("userEditForm", {
                    ...userEditForm,
                    birth_day: value,
                  });
                }}
              />
            }
          >
            <span>
              Sinh nhật:{" "}
              {(userInfo.birth_day &&
                dayjs(userInfo.birth_day).format("DD-MM-YYYY")) ||
                "-"}
            </span>
          </FieldInput>
          <FieldInput
            isEdit={isEditInfo}
            editComponent={
              <InputSelect
                className="cursor-pointer px-3 py-2 bg-second text-social-x transition-all rounded-circle-lg text-sm hover:text-social-x"
                data={GenderDataSelect}
                value={userEditForm?.gender || ""}
                onChange={(value) => {
                  setStateUser("userEditForm", {
                    ...userEditForm,
                    gender: value,
                  });
                }}
              />
            }
          >
            <span>Giới tính: {userInfo.gender || "-"}</span>
          </FieldInput>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
