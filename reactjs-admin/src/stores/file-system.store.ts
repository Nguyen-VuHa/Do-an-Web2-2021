import toast from 'react-hot-toast';
import { create } from 'zustand';
import {
  apiFetchFileSystem,
  apiRenameFileSystem,
  apiUploadFileSystem,
} from '~/apis/file-system.api';
import { STATUS_SUCCESS } from '~/constants/statusCode';
import { IObject } from '~/types/common.type';
import { IFileSystem, IFolderForm } from '~/types/file-system.type';

interface FileSystemState {
  isUploadFolderModal: boolean;
  isUploadFileModal: boolean;
  isUploadPosterModal: boolean;
  isEditFolderModal: boolean;
  isEditFolder: boolean;
  isFetchFileSystem: boolean;
  fileSystems: IFileSystem[];
  breadcrumb: IObject<any>[];
  setValueFileSystem: (key: string, value: any) => void;
  reqFetchFileSystems: (parent_id: string | null) => Promise<void>;

  // handle multiple folder update
  folderUpload: IObject<any>;
  folderForm: IFolderForm;
  errFolderForm: IObject<any>;

  reqCreateNewFolder: (
    formData: FormData,
    parent_id: string | null,
  ) => Promise<void>;

  fileUpload: FileList | null;

  posterUpload: File | null;
  posterPreview: string | null;
  posterFileName: string;

  reqRenameFile: (data: IFolderForm, parent_id: string) => Promise<void>;
}

const useFileSystemStore = create<FileSystemState>((set, get) => ({
  isUploadFolderModal: false,
  isUploadFileModal: false,
  isUploadPosterModal: false,
  isEditFolderModal: false,
  isEditFolder: false,
  isFetchFileSystem: false,
  fileSystems: [],
  breadcrumb: [],
  folderUpload: {},
  folderForm: {
    file_system_id: '',
    folder_name: '',
    type: '',
  },
  errFolderForm: {},
  fileUpload: null,
  posterUpload: null,
  posterPreview: null,
  posterFileName: '',
  setValueFileSystem: (key, value) => {
    set({
      [key]: value,
    });
  },
  reqFetchFileSystems: async (parent_id) => {
    set({
      isFetchFileSystem: true,
    });
    try {
      const params: IObject<string> = {};

      if (parent_id) {
        params['_p_id'] = parent_id;
      }

      const res = await apiFetchFileSystem(params);

      if (res.statusCode === STATUS_SUCCESS) {
        set({
          fileSystems: res.data?.list || [],
          breadcrumb: res.data?.breadcrumb || [],
        });
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error(error?.toString() as string);
    } finally {
      set({
        isFetchFileSystem: false,
      });
    }
  },
  reqCreateNewFolder: async (formData, parent_id) => {
    set({
      isEditFolder: true,
    });
    try {
      const res = await apiUploadFileSystem(formData);

      if (res.statusCode === STATUS_SUCCESS) {
        toast.success(res.message);
        get().reqFetchFileSystems(parent_id);
        set({
          folderForm: {
            file_system_id: '',
            folder_name: '',
            type: '',
          },
          errFolderForm: {},
          isEditFolderModal: false,
        });
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error(error?.toString() as string);
    } finally {
      set({
        isEditFolder: false,
      });
    }
  },
  reqRenameFile: async (data, parent_id) => {
    set({
      isEditFolder: true,
    });
    try {
      const res = await apiRenameFileSystem(
        {
          file_name: data.folder_name,
        },
        data.file_system_id || '',
      );

      if (res.statusCode === STATUS_SUCCESS) {
        toast.success(res.message);
        get().reqFetchFileSystems(parent_id);
        set({
          folderForm: {
            file_system_id: '',
            folder_name: '',
            type: '',
          },
          errFolderForm: {},
          isEditFolderModal: false,
        });
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error(error?.toString() as string);
    } finally {
      set({
        isEditFolder: false,
      });
    }
  },
}));

export default useFileSystemStore;
