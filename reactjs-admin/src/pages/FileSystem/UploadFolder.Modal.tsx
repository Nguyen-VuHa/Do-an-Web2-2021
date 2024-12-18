import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { apiUploadFileSystem } from '~/apis/file-system.api';
import Modal from '~/components/Modal/Modal.Main';
import useFileSystemStore from '~/stores/file-system.store';
import { IObject } from '~/types/common.type';
import { base64ToFile, formatFileSize } from '~/utils/common';
import TreeFolder from './TreeFolder';

const UploadFolder = () => {
  const location = useLocation();

  // Parse query string
  const queryParams = new URLSearchParams(location.search);
  const parent_id = queryParams.get('_p_id');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    isUploadFolderModal,
    folderUpload,
    setValueFileSystem,
    reqFetchFileSystems,
  } = useFileSystemStore();
  const [totalFile, setTotalFile] = useState<number>(0);
  const [totalSize, setTotalSize] = useState<number>(0);
  const [itemLoadingProcess, setItemLoadingProcess] = useState<string[]>([]);
  const [isProcessSaveFile, setIsProcessSaveFile] = useState<boolean>(false);

  useEffect(() => {
    if (fileInputRef.current) {
      fileInputRef.current.webkitdirectory = true;
    }
  }, [fileInputRef]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const structure: IObject<any> = {};

    const MAX_FILE_COUNT = 50; // Giới hạn số lượng file tối đa
    const MAX_TOTAL_SIZE = 100 * 1024 * 1024; // Giới hạn tổng dung lượng file là 100MB
    let totalSize = 0;

    if (!files) return;

    // Kiểm tra số lượng file và dung lượng
    if (files && files.length > MAX_FILE_COUNT) {
      toast.error(`Bạn chỉ được phép tải lên tối đat ${MAX_FILE_COUNT} files.`);
      return;
    }

    // Duyệt qua các file để tính tổng dung lượng
    for (let i = 0; i < files.length; i++) {
      totalSize += files[i].size;
    }

    if (totalSize > MAX_TOTAL_SIZE) {
      toast.error(`Tổng kích thước tệp tin không được vượt quá 100MB.`);
      return;
    }

    setTotalFile(files.length);
    setTotalSize(totalSize);
    // Hàm để đọc nội dung của file
    const readFileContent = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function (e) {
          resolve(e.target?.result as string); // Nội dung file
        };
        reader.onerror = reject;
        reader.readAsDataURL(file); // Đọc file dưới dạng URL
      });
    };

    // Duyệt qua các file được chọn và xây dựng cấu trúc
    const promises = Array.from(files || []).map(async (file) => {
      // Bỏ qua file .DS_Store
      if (file.name === '.DS_Store') {
        return; // Nếu là .DS_Store, bỏ qua file này
      }

      const pathParts = file.webkitRelativePath.split('/');
      let currentDir: IObject<any> = structure;

      // Duyệt qua các phần của đường dẫn để xây dựng cấu trúc lồng nhau
      for (let i = 0; i < pathParts.length - 1; i++) {
        const part = pathParts[i];
        if (!currentDir[part]) {
          currentDir[part] = {}; // Nếu thư mục con chưa tồn tại, tạo mới
        }
        currentDir = currentDir[part] as IObject<any>; // Di chuyển vào thư mục con
      }

      // Đọc nội dung của file và thêm vào đối tượng
      const fileContent = await readFileContent(file);
      currentDir[pathParts[pathParts.length - 1]] = fileContent;
    });

    // Chờ tất cả các file được xử lý xong và cập nhật trạng thái
    Promise.all(promises).then(() => {
      setValueFileSystem('folderUpload', structure); // Cập nhật cấu trúc thư mục
    });
  };

  const handleCloseModal = () => {
    setValueFileSystem('isUploadFolderModal', false);
    setValueFileSystem('folderUpload', {});
  };

  // Mock API
  const createFolder = async (
    name: string,
    parentId: string | null,
  ): Promise<string> => {
    const folderData = new FormData();

    folderData.append('type', 'folder');
    folderData.append('folder_name', name);

    if (parentId) {
      folderData.append('parent_file_system_id', parentId);
    }

    const res = await apiUploadFileSystem(folderData);
    return Promise.resolve(res.data?.file_system_id || '');
  };

  const createFile = async (
    name: string,
    parentId: string | null,
    content: string,
  ): Promise<string> => {
    // Giả lập trả về ID mới
    const fileConvert = base64ToFile(content, name);

    const fileData = new FormData();

    fileData.append('type', 'file');
    fileData.append('file', fileConvert, name);

    if (parentId) {
      fileData.append('parent_file_system_id', parentId);
    }

    const res = await apiUploadFileSystem(fileData);
    return Promise.resolve(res.data?.file_system_id || '');
  };

  // Hàm xử lý đệ quy
  const processStructure = async (
    data: IObject<any>,
    parentId: string | null = null,
  ): Promise<void> => {
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'object') {
        // Nếu value là object (folder)
        let folderKeyLoading = key + '-loading';

        setItemLoadingProcess((prev) => [...prev, folderKeyLoading]);
        const folderId = await createFolder(key, parentId);

        if (folderId === '') {
          setItemLoadingProcess([]);
          toast.error(
            'Tiến trình tải thư mục lên đã thất bại! vui lòng thử lại sau.',
          );
          return;
        }

        setItemLoadingProcess((prev) =>
          [...prev, key].filter((itemId) => itemId !== folderKeyLoading),
        );
        await processStructure(value, folderId); // Đệ quy xử lý các phần tử con
      } else {
        // Nếu value là string (file)
        let fileKeyLoading = key + '-loading';

        setItemLoadingProcess((prev) => [...prev, fileKeyLoading]);
        const file_id = await createFile(key, parentId, value); // Gọi API tạo file

        if (file_id === '') {
          setItemLoadingProcess([]);
          toast.error(
            'Tiến trình tải thư mục lên đã thất bại! vui lòng thử lại sau.',
          );
          return;
        }

        setItemLoadingProcess((prev) =>
          [...prev, key].filter((itemId) => itemId !== fileKeyLoading),
        );
      }
    }
  };

  const handleUploadFile = async () => {
    if (Object.keys(folderUpload).length > 0) {
      setIsProcessSaveFile(true);
      await processStructure(folderUpload, parent_id);
      setIsProcessSaveFile(false);
      reqFetchFileSystems(parent_id);
      setItemLoadingProcess([]);
      handleCloseModal();
    }
  };

  return (
    <Modal
      title="Tải lên thư mục"
      isOpen={isUploadFolderModal}
      onClose={() => {
        if (!isProcessSaveFile) handleCloseModal();
      }}
      onSubmit={() => {
        if (!isProcessSaveFile) handleUploadFile();
      }}
      widthClass="w-[40%]"
      isLoading={isProcessSaveFile}
    >
      {isProcessSaveFile && (
        <div className="min-h-[300px] overflow-y-auto">
          {Object.keys(folderUpload).length > 0 && (
            <TreeFolder data={folderUpload} keys={itemLoadingProcess} />
          )}
        </div>
      )}

      {!isProcessSaveFile && (
        <div
          id="FileUpload"
          className="relative block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
        >
          <input
            type="file"
            multiple
            ref={fileInputRef}
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
            {(Object.keys(folderUpload).length > 0 && (
              <>
                <span className="text-md text-center leading-[2rem]">
                  Thư mục{' '}
                  <b className="text-warning">{Object.keys(folderUpload)[0]}</b>{' '}
                  <br />
                  chứa <b className="text-warning">{totalFile}</b> tệp tin{' '}
                  <b className="text-warning">({formatFileSize(totalSize)})</b>{' '}
                  <br />
                  Click <b className="text-warning">Xác nhận</b> để tải lên thư
                  mục
                </span>
                <span className="text-danger text-center italic text-sm">
                  (Quá trình tải lên có thể lâu vui lòng không tắt trình duyệt
                  khi đang thực hiện)
                </span>
              </>
            )) || (
              <span className="text-primary">Nhấn để tải tệp từ máy tính</span>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default UploadFolder;
