import { useEffect, useState } from 'react';
import Folder from 'src/images/icon/computer-folder.png';
import { IFileSystem } from '~/types/file-system.type';
import { getDataToLocalStore } from '~/utils/localStorage';
import FileType from './FileType';
import { formatFileSize } from '~/utils/common';
import dayjs from 'dayjs';

type FileItemProps = {
  data: IFileSystem;
};

const FileItem: React.FC<FileItemProps> = ({ data }) => {
  const [className, setClassName] = useState<string>('');
  const [fileNameClass, setFileNameClass] = useState<string>('');
  const [iconSize, setIconSize] = useState<number>();

  useEffect(() => {
    let sortType = getDataToLocalStore('sort_type');

    if (sortType === 'grid') {
      setClassName('flex flex-col items-center space-y-2');
      setFileNameClass('overflow-hidden text-ellipsis line-clamp-2');
      setIconSize(100);
    } else {
      setClassName('flex justify-between items-center space-x-2');
      setFileNameClass('w-fit overflow-hidden text-ellipsis line-clamp-1');
      setIconSize(25);
    }
  }, [getDataToLocalStore('sort_type')]);

  return (
    <div
      className={`overflow-hidden cursor-pointer rounded-md border-2 p-2 hover:border-warning hover:text-warning transition-all duration-300 ${className}`}
    >
      {(data.type === 'folder' && (
        <>
          <div className={className}>
            <img src={Folder} width={iconSize} />
            <span className={`text-sm ${fileNameClass}`}>{data.name}</span>
          </div>
          <span className="text-xs italic text-sky">
            {dayjs(data.updated_at).format('HH:mm DD/MM/YYYY')}
          </span>
        </>
      )) || (
        <>
          <div className={className}>
            <FileType size={iconSize} mimeType={data.mime_type || ''}>
              <img
                src={data.path || ''}
                className="bg-center bg-no-repeat bg-contain"
                alt="NO FILE"
                width={iconSize}
                height={iconSize}
                style={{ height: iconSize }}
              />
            </FileType>
            <span className={`text-sm ${fileNameClass}`}>{data.name}</span>
          </div>
          <span className="text-xs italic text-sky">
            {formatFileSize(data.size || 0)} -{' '}
            {dayjs(data.updated_at).format('HH:mm DD/MM/YYYY')}
          </span>
        </>
      )}
    </div>
  );
};

export default FileItem;
