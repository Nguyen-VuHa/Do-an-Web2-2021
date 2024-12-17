import { FileSystemResponseDTO } from '../dtos/admin-file-system.dto';
import { IObject } from './common';

export enum FileSystemType {
  FILE = 'file',
  FOLDER = 'folder',
}

export interface IFileSystemReponse {
  breadcrumb: IObject<any>[];
  list: FileSystemResponseDTO[];
}
