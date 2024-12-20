import { useLocation } from 'react-router-dom';
import Modal from '~/components/Modal/Modal.Main';
import useFileSystemStore from '~/stores/file-system.store';

const ConfirmDeleteModal = () => {
  const location = useLocation();

  // Parse query string
  const queryParams = new URLSearchParams(location.search);
  const parent_id = queryParams.get('_p_id');

  const {
    folderDelete,
    isDeleteFolderModal,
    isDeleteFolder,
    setValueFileSystem,
    reqDeleteFile,
  } = useFileSystemStore();

  const handleCloseModal = () => {
    setValueFileSystem('isDeleteFolderModal', false);
    setValueFileSystem('folderDelete', {
      file_system_id: '',
      folder_name: '',
      type: '',
    });
  };

  const handleDeleteFolder = () => {
    if (folderDelete && folderDelete.file_system_id) {
      reqDeleteFile(folderDelete.file_system_id, parent_id || '');
    }
  };
  return (
    <Modal
      title={`Xác nhận xoá ${
        folderDelete.type === 'file' ? 'tệp tin' : 'thư mục'
      }`}
      isOpen={isDeleteFolderModal}
      onClose={() => {
        if (!isDeleteFolder) handleCloseModal();
      }}
      onSubmit={() => {
        if (!isDeleteFolder) handleDeleteFolder();
      }}
      widthClass="w-[35%]"
      isLoading={isDeleteFolder}
    >
      <div className="flex items-center flex-col space-y-1">
        <span>
          {folderDelete.type === 'file' ? 'Tệp tin' : 'Thư mục'}:{' '}
          <b className="text-warning">{folderDelete.folder_name}</b>
        </span>
        <span className="text-sm italic text-danger text-center">
          Sau khi xóa,{' '}
          {folderDelete.type === 'file'
            ? 'dữ liệu tệp tin'
            : 'toàn bộ dữ liệu trong thư mục'}{' '}
          này sẽ <b>không thể khôi phục</b>. <br />
          Bạn có chắc chắn muốn tiếp tục không?
        </span>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;
