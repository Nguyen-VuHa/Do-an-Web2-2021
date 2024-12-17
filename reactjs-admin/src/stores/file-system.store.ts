import toast from 'react-hot-toast';
import { create } from 'zustand';
import { apiFetchFileSystem } from '~/apis/file-system.api';
import { STATUS_SUCCESS } from '~/constants/statusCode';
import { IOject } from '~/types/common.type';
import { IFileSystem } from '~/types/file-system.type';

interface FileSystemState {
  isFetchFileSystem: boolean;
  fileSystems: IFileSystem[];
  reqFetchFileSystems: (parent_id: string | null) => Promise<void>;
}

const useFileSystemStore = create<FileSystemState>((set, get) => ({
  isFetchFileSystem: false,
  fileSystems: [],
  reqFetchFileSystems: async (parent_id) => {
    set({
      isFetchFileSystem: true,
    });
    try {
      const params: IOject<string> = {};

      if (parent_id) {
        params['_p_id'] = parent_id;
      }

      const res = await apiFetchFileSystem(params);

      if (res.statusCode === STATUS_SUCCESS) {
        set({
          fileSystems: res.data || [],
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
