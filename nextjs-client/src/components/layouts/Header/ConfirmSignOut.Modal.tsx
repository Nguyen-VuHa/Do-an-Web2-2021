import { enqueueSnackbar } from "notistack";
import { IoClose } from "react-icons/io5";
import Button from "~/components/ui/Button";
import { PROCESS_SUCCESS } from "~/constants/status";
import { useAuthAPIStore, useAuthStore } from "~/stores/auth.store";

const ConfirmSignOutModal = () => {
  const { isModalConfirmLogout, setStateAuth } = useAuthStore();
  const { isPostSignOutAccount, postSignOutAccount } = useAuthAPIStore();

  const handleCloseModal = () => {
    if (!isPostSignOutAccount) setStateAuth("isModalConfirmLogout", false);
  };

  const handleSignOut = async () => {
    if (!isPostSignOutAccount) {
        const response = await postSignOutAccount()

        if (response.status === PROCESS_SUCCESS) {
            enqueueSnackbar(response.message, { variant: "success" });
            window.location.reload();
        } else enqueueSnackbar(response.message, { variant: "error" });
    };
  }

  return (
    <div
      className={`fixed w-full h-full top-0 left-0 ${isModalConfirmLogout ? "z-[999999]" : "z-[-999] hidden"}
        flex justify-center items-center`}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-layout bg-opacity-30" />
      <div className="w-[90%] md:w-[40%] xl:w-[30%] flex flex-col p-4 bg-second rounded-circle-md space-y-2 z-[10]">
        <div className="flex justify-end">
          <Button
            className="flex justify-center items-center !w-[40px] !h-[40px] !p-1 rounded-md"
            buttonType="error"
            onClick={() => {
              handleCloseModal();
            }}
          >
            <IoClose size={25} />
          </Button>
        </div>
        <div className="py-5 w-full">
          <div className="text-center text-instagram text-lg">
            Bạn có chắc chắn muốn đăng xuất phiên làm việc này không?
          </div>
        </div>
        <div className="flex justify-end items-center space-x-1">
          <Button
            buttonType="info"
            onClick={() => {
              handleCloseModal();
            }}
          >
            Trở lại
          </Button>
          <Button
            buttonType="error"
            isLoading={isPostSignOutAccount}
            onClick={() => {
                handleSignOut();
            }}
          >
            Đăng xuất
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmSignOutModal;
