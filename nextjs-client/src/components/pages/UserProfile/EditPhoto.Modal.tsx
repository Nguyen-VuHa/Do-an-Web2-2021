"use client";
import React from "react";
import UploadAvatar from "./UploadAvatar";
import EditAvatar from "./EditAvatar";
import Button from "~/components/ui/Button";
import { useUserAPIStore, useUserStore } from "~/stores/user.store";
import { enqueueSnackbar } from "notistack";
import { IUpdatePhotoUserRequest } from "~/types/user.type";

const EditPhotoModal = () => {
  const { avatarSelected, userInfo, isModalEditAvatar, setStateUser } =
    useUserStore();
  const { isUpdatePhotoUser, updatePhotoUser } = useUserAPIStore();

  const handleUpdatePhotoUser = () => {
    console.log(userInfo, avatarSelected);

    if (!userInfo || !avatarSelected) return;

    if (userInfo.image_url === avatarSelected) {
      enqueueSnackbar("Vui lòng chọn ảnh khác ảnh hiện tại của bạn!", {
        variant: "info",
      });
      return;
    }

    const data: IUpdatePhotoUserRequest = {
      image_url: avatarSelected,
      photo_type: "avatar",
    };

    updatePhotoUser(data);
  };
  return (
    <div
      className={`fixed top-0 left-0 flex justify-center items-center
            w-full h-full z-[999999] ${isModalEditAvatar ? "z-[999999]" : "z-[-999] hidden"}
          `}
    >
      <div
        className="absolute w-full h-full bg-layout bg-opacity-30"
        onClick={() => {}}
      />
      <div className="relative p-4 bg-second rounded-circle-md w-[80%] max-md:w-[90%] max-h-[90%] overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <UploadAvatar />
          <EditAvatar />
        </div>
        <div className="flex space-x-2 float-right mt-5">
          <Button
            buttonType="error"
            onClick={() => {
              if (!isUpdatePhotoUser) setStateUser("isModalEditAvatar", false);
            }}
          >
            Thoát
          </Button>
          <Button
            buttonType="info"
            isLoading={isUpdatePhotoUser}
            onClick={() => handleUpdatePhotoUser()}
          >
            Lưu thay đổi
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditPhotoModal;
