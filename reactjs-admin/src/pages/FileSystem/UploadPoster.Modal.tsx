import { useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { apiUploadFileSystem } from '~/apis/file-system.api';
import FormGroup from '~/components/FormGroup';
import Input from '~/components/Input';
import Modal from '~/components/Modal/Modal.Main';
import useFileSystemStore from '~/stores/file-system.store';
import { convertURLToBlob } from '~/utils/convert';
import CropperImage from './CropperImage';

const UploadPosterModal = () => {
  const location = useLocation();

  // Parse query string
  const queryParams = new URLSearchParams(location.search);
  const parent_id = queryParams.get('_p_id');

  const [isProcessUploadPoster, setIsProcessUploadPoster] =
    useState<boolean>(false);

  const {
    isUploadPosterModal,
    posterPreview,
    posterFileName,
    posterUpload,
    reqFetchFileSystems,
    setValueFileSystem,
  } = useFileSystemStore();

  const handleCloseModal = () => {
    setValueFileSystem('isUploadPosterModal', false);
    setValueFileSystem('posterPreview', null);
    setValueFileSystem('posterUpload', null);
    setValueFileSystem('posterFileName', '');
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files) {
      const file = event.target.files[0]; // Chỉ lấy tệp đầu tiên nếu người dùng chọn nhiều tệp
      if (!file) return;
      if (!file.type.startsWith('image/')) {
        toast.error('Chỉ chập nhận tệp hình ảnh, vui lòng chọn đúng loại tệp.');
        return;
      }

      setValueFileSystem('posterUpload', file); // Lưu URL hình ảnh
      setValueFileSystem('posterFileName', file.name);
    }
  };

  const handleUploadPoster = async () => {
    if (posterPreview) {
      setIsProcessUploadPoster(true);

      const blogConvert = await convertURLToBlob(posterPreview);

      const fileData = new FormData();

      fileData.append('type', 'file');
      fileData.append(
        'file',
        blogConvert,
        posterFileName || posterUpload?.name,
      );

      if (parent_id) {
        fileData.append('parent_file_system_id', parent_id);
      }

      const res = await apiUploadFileSystem(fileData);

      setIsProcessUploadPoster(false);
      if (res.error) {
        toast.error(res.error);
        return;
      }

      reqFetchFileSystems(parent_id);
      handleCloseModal();
    }
  };

  return (
    <Modal
      title="Tải lên tệp tin"
      isOpen={isUploadPosterModal}
      onClose={() => {
        if (!isProcessUploadPoster) handleCloseModal();
      }}
      onSubmit={() => {
        if (!isProcessUploadPoster) handleUploadPoster();
      }}
      widthClass="w-[80%]"
      isLoading={isProcessUploadPoster}
    >
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-2">
        {isProcessUploadPoster && (
          <div className="absolute top-0 left-0 w-full h-full z-[9999999] bg-primary/10 flex flex-col justify-center space-y-5 items-center">
            <div className="h-20 w-20 animate-spin rounded-full border-4 border-solid border-rose border-t-transparent"></div>
            <span className="text-rose font-semibold text-xl">
              Đang xử lý hình ảnh...
            </span>
          </div>
        )}
        <div className="p-2 space-y-2">
          <FormGroup
            label="Tên tệp tin"
            element={
              <Input
                placeholder="Nhập tên tệp tin..."
                value={posterFileName}
                onChange={(e) => {
                  setValueFileSystem('posterFileName', e.target.value);
                }}
              />
            }
          />
          <div className="relative block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              value={''}
              className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
            />
            <div className="flex flex-col items-center justify-center space-y-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                    fill="#3C50E0"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                    fill="#3C50E0"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                    fill="#3C50E0"
                  />
                </svg>
              </span>
              {(posterUpload && (
                <span className="text-warning">{posterUpload.name}</span>
              )) || (
                <span className="text-primary">
                  Nhấn để tải ảnh lên từ máy tính
                </span>
              )}
            </div>
          </div>
          <CropperImage />
        </div>
        <div className="p-2 flex justify-center items-center">
          {posterPreview && (
            <img src={posterPreview} className="w-[330px] h-[500px]" />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default UploadPosterModal;
