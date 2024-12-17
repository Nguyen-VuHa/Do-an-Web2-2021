import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Folder from 'src/images/icon/computer-folder.png';
import { IFileSystem } from '~/types/file-system.type';
import { formatFileSize } from '~/utils/common';
import { getDataToLocalStore } from '~/utils/localStorage';
import FileType from './FileType';

type FileItemProps = {
  data: IFileSystem;
};

const FileItem: React.FC<FileItemProps> = ({ data }) => {
  const navigate = useNavigate();
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
      onDoubleClick={() => {
        if (data.type === 'folder') {
          navigate(`?_p_id=${data.file_system_id}`);
        }
      }}
    >
      {(data.type === 'folder' && (
        <>
          <div className={className}>
            <img src={Folder} width={iconSize} />
            <span className={`text-sm ${fileNameClass}`}>{data.name}</span>
          </div>
          <span className="text-xs font-semibold italic text-warning">
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
          <span className="text-xs font-semibold italic text-warning">
            {formatFileSize(data.size || 0)} -{' '}
            {dayjs(data.updated_at).format('HH:mm DD/MM/YYYY')}
          </span>
        </>
      )}
    </div>
  );
};

export default FileItem;
