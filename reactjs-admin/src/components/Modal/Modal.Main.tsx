import React, { ReactNode } from 'react';
import ButtonIcon from '../ButtonIcon';
import { CgClose } from 'react-icons/cg';
import Button from '../Button';

type ModalProps = {
  isOpen: boolean;
  isLoading?: boolean;
  title?: string;
  widthClass?: string;
  onClose: () => void;
  onSubmit?: () => void;
  children?: ReactNode;
};

const Modal: React.FC<ModalProps> = ({
  title,
  isOpen,
  isLoading,
  onClose,
  onSubmit,
  widthClass,
  children,
}) => {
  return (
    <div
      className={`fixed w-full h-full top-0 left-0 flex justify-center items-center dark:bg-boxdark/50 bg-strokedark/30 ${
        isOpen ? 'z-[10000] transition-all' : 'hidden z-[-10]'
      }`}
    >
      <div
        className={`modal w-[30%] max-sm:w-[90%] rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark overflow-auto ${widthClass}`}
      >
        <div className="space-y-5 border-b border-stroke p-2 dark:border-strokedark">
          <div className="w-full space-x-10 flex justify-between items-end">
            <h3 className="font-semibold text-2xl text-primary">
              {title || 'Title Modal'}
            </h3>
            <ButtonIcon
              color="danger"
              onClick={() => {
                !isLoading && onClose();
              }}
            >
              <CgClose size={22} />
            </ButtonIcon>
          </div>
        </div>
        <div className="p-4 border-b border-stroke p-2 dark:border-strokedark">
          {children}
        </div>
        <div className="p-4 flex justify-end items-center space-x-2 w-full">
          <Button
            className="w-fit dark:!bg-graydark dark:text-white text-[#6c7b90] !bg-gray border-none"
            onClick={() => !isLoading && onClose()}
          >
            <span>Thoát</span>
          </Button>
          <Button
            className="w-fit border-none"
            loading={isLoading}
            onClick={() => {
              if (!isLoading) {
                onSubmit && onSubmit();
              }
            }}
          >
            Xác nhận
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
