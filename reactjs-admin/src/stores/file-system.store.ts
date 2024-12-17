import toast from 'react-hot-toast';
import { create } from 'zustand';
import { apiFetchFileSystem } from '~/apis/file-system.api';
import { STATUS_SUCCESS } from '~/constants/statusCode';
import { IObject } from '~/types/common.type';
import { IFileSystem } from '~/types/file-system.type';

interface FileSystemState {
  isUploadFolderModal: boolean;
  isFetchFileSystem: boolean;
  fileSystems: IFileSystem[];
  breadcrumb: IObject<any>[];
  setValueFileSystem: (key: string, value: any) => void;
  reqFetchFileSystems: (parent_id: string | null) => Promise<void>;

  // handle multiple folder update
  folderUpload: IObject<any>;
}

const useFileSystemStore = create<FileSystemState>((set, get) => ({
  isUploadFolderModal: false,
  isFetchFileSystem: false,
  fileSystems: [],
  breadcrumb: [],
  folderUpload: {},
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
}));

export default useFileSystemStore;
