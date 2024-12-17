import { IObject } from './common.type';

export interface IFileSystem {
  file_system_id: string;
  name: string;
  type: string;
  size: number | null;
  mime_type: string | null;
  path: string | null;
  updated_at: string;
}

export interface IFileSystemResponse {
  list: IFileSystem[];
  breadcrumb: IObject<any>[];
}
