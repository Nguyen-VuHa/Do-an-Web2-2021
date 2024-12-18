import FormGroup from '~/components/FormGroup';
import Input from '~/components/Input';
import Modal from '~/components/Modal/Modal.Main';
import useFileSystemStore from '~/stores/file-system.store';
import { IObject } from '~/types/common.type';
import * as Yup from 'yup';
import editFolderSchema from '~/schemas/file-system.schema';
import { useLocation } from 'react-router-dom';

const EditFolderModal = () => {
  const location = useLocation();

  // Parse query string
  const queryParams = new URLSearchParams(location.search);
  const parent_id = queryParams.get('_p_id');

  const {
    isEditFolder,
    isEditFolderModal,
    folderForm,
    errFolderForm,
    setValueFileSystem,
    reqCreateNewFolder,
  } = useFileSystemStore();

  const handleValidateForm = async () => {
    try {
      // Chờ kết quả validate với Yup
      await editFolderSchema.validate(folderForm, { abortEarly: false });
      setValueFileSystem('errFolderForm', {});
      return true;
    } catch (err: any) {
      const errors: IObject<string> = {};

      err.inner.map((error: Yup.ValidationError) => {
        errors[error.path as string] = error.message;
      });

      setValueFileSystem('errFolderForm', errors);
      return false;
    }
  };

  const handleSubmitEditFolder = async () => {
    let isValid = await handleValidateForm();

    if (isValid) {
      const payloadFormData = new FormData();

      payloadFormData.append('type', 'folder');
      payloadFormData.append('folder_name', folderForm.folder_name);

      reqCreateNewFolder(payloadFormData, parent_id);
    }
  };

  const handleCloseModal = () => {
    setValueFileSystem('isEditFolderModal', false);
    setValueFileSystem('folderForm', {
      file_system_id: '',
      folder_name: '',
    });
    setValueFileSystem('errFolderForm', {});
  };

  return (
    <Modal
      title="Tạo mới thư mục"
      isOpen={isEditFolderModal}
      onClose={() => {
        if (!isEditFolder) handleCloseModal();
      }}
      onSubmit={() => {
        if (!isEditFolder) handleSubmitEditFolder();
      }}
      widthClass="w-[40%]"
      isLoading={isEditFolder}
    >
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          handleSubmitEditFolder();
        }}
      >
        <FormGroup
          label="Tên thư mục"
          isRequire
          element={
            <Input
              name="folder_name"
              placeholder="Nhập tên thư mục ..."
              value={folderForm.folder_name}
              onChange={(e) => {
                setValueFileSystem('folderForm', {
                  ...folderForm,
                  folder_name: e.target.value,
                });
              }}
            />
          }
          messageError={errFolderForm['folder_name']}
        />
      </form>
    </Modal>
  );
};

export default EditFolderModal;
