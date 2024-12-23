import dayjs from 'dayjs';
import Folder from 'src/images/icon/computer-folder.png';
import useFileSystemStore from '~/stores/file-system.store';
import { IFileSystem } from '~/types/file-system.type';
import { formatFileSize } from '~/utils/common';
import { getFileType } from '~/utils/detect';

const ICON_SIZE = 100;

interface FileListProps {
  onSingleSelect?: (fileData: IFileSystem) => void;
}

const FileList: React.FC<FileListProps> = ({ onSingleSelect }) => {
  const { fileSystems, reqFetchFileSystems } = useFileSystemStore();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-2">
      {fileSystems.map((file) => {
        const fileType = getFileType(file.mime_type || '');

        if (file.type === 'folder' || fileType === 'image') {
          return (
            <div
              key={file.file_system_id}
              className={`relative flex flex-col justify-center space-y-2 items-center cursor-pointer rounded-md border-2 p-2 hover:border-warning hover:text-warning transition-all duration-300`}
              onDoubleClick={() => {
                if (file.type === 'folder') {
                  reqFetchFileSystems(file.file_system_id);
                }

                if (file.type === 'file') {
                  onSingleSelect && onSingleSelect(file);
                }
              }}
            >
              {(file.type === 'folder' && (
                <>
                  <img src={Folder} width={ICON_SIZE} />
                  <span
                    className={`text-sm w-full text-center overflow-hidden text-ellipsis line-clamp-2`}
                  >
                    {file.name}
                  </span>
                </>
              )) || (
                <>
                  <div
                    className={`flex flex-col justify-between items-center space-y-2`}
                  >
                    <img
                      src={file.path || ''}
                      className="bg-center bg-no-repeat bg-contain"
                      alt="NO FILE"
                      width={ICON_SIZE}
                      height={ICON_SIZE}
                      style={{ height: ICON_SIZE }}
                    />
                    <span
                      className={`text-sm w-full text-center overflow-hidden text-ellipsis line-clamp-2`}
                      style={{
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                      }}
                    >
                      {file.name}
                    </span>
                  </div>
                  <span className="text-center text-xs font-semibold italic text-warning">
                    {formatFileSize(file.size || 0)} -{' '}
                    {dayjs(file.updated_at).format('HH:mm DD/MM/YYYY')}
                  </span>
                </>
              )}
            </div>
          );
        }
      })}
    </div>
  );
};

export default FileList;
