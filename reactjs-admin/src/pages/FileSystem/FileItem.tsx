import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Folder from 'src/images/icon/computer-folder.png';
import { IFileSystem } from '~/types/file-system.type';
import { formatFileSize } from '~/utils/common';
import { getDataToLocalStore } from '~/utils/localStorage';
import FileType from './FileType';
import dayjs from 'dayjs';
import ExpandableMenu from './ExpandableMenu';
import useFileSystemStore from '~/stores/file-system.store';
import { PhotoView } from 'react-photo-view';
import { getFileType } from '~/utils/detect';

type FileItemProps = {
  data: IFileSystem;
};

const FileItem: React.FC<FileItemProps> = ({ data }) => {
  const { setValueFileSystem } = useFileSystemStore();
  const navigate = useNavigate();
  const [className, setClassName] = useState<string>('');
  const [fileNameClass, setFileNameClass] = useState<string>('');
  const [iconSize, setIconSize] = useState<number>();
  const [expandableMenuClass, setExpandableMenuClass] = useState<string>('');

  const buttonViewImage = useRef<HTMLButtonElement>(null);
  const expandableMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let sortType = getDataToLocalStore('sort_type');

    if (sortType === 'grid') {
      setClassName('flex flex-col justify-between items-center space-y-2');
      setFileNameClass(
        'w-full text-center overflow-hidden text-ellipsis line-clamp-2',
      );
      setIconSize(100);
      setExpandableMenuClass('absolute top-[0] right-[5px] z-[20]');
    } else {
      setClassName('flex justify-between items-center space-x-2');
      setFileNameClass('w-full overflow-hidden text-ellipsis line-clamp-1');
      setIconSize(25);
      setExpandableMenuClass('');
    }
  }, [getDataToLocalStore('sort_type')]);

  return (
    <div
      className={`relative cursor-pointer rounded-md border-2 p-2 hover:border-warning hover:text-warning transition-all duration-300 ${className}`}
      onDoubleClick={(event: React.MouseEvent) => {
        if (
          expandableMenuRef.current &&
          expandableMenuRef.current.contains(event.target as Node)
        ) {
          return;
        }

        if (data.type === 'folder') {
          navigate(`?_p_id=${data.file_system_id}`);
        }

        if (data.type === 'file') {
          const fileType = getFileType(data.mime_type || '');

          if (fileType === 'image')
            buttonViewImage.current && buttonViewImage.current.click();
          else window.open(data.path || '', '_blank');
        }
      }}
    >
      {(data.type === 'folder' && (
        <>
          <div className={`${className}`}>
            <img src={Folder} width={iconSize} />
            <span className={`text-sm ${fileNameClass}`}>{data.name}</span>
          </div>
          <div className={`${className} flex-shrink-0`}>
            <span className="text-xs font-semibold italic text-warning">
              {dayjs(data.updated_at).format('HH:mm DD/MM/YYYY')}
            </span>
            <div className={expandableMenuClass} ref={expandableMenuRef}>
              <ExpandableMenu
                onView={() => {
                  navigate(`?_p_id=${data.file_system_id}`);
                }}
                onEdit={() => {
                  setValueFileSystem('isEditFolderModal', true);
                  setValueFileSystem('folderForm', {
                    file_system_id: data.file_system_id,
                    folder_name: data.name,
                    type: 'folder',
                  });
                }}
                onRemove={() => {
                  setValueFileSystem('isDeleteFolderModal', true);
                  setValueFileSystem('folderDelete', {
                    file_system_id: data.file_system_id,
                    folder_name: data.name,
                    type: 'folder',
                  });
                }}
              />
            </div>
          </div>
        </>
      )) || (
        <>
          <div className={`${className} max-w-full overflow-hidden`}>
            <FileType size={iconSize} mimeType={data.mime_type || ''}>
              <img
                src={data.path || ''}
                className="bg-center bg-no-repeat bg-contain"
                alt="NO FILE"
                width={iconSize}
                height={iconSize}
                style={{ height: iconSize }}
              />
              <PhotoView src={data.path || ''}>
                <button ref={buttonViewImage} className="hidden"></button>
              </PhotoView>
            </FileType>
            <span
              className={`text-sm ${fileNameClass}`}
              style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
            >
              {data.name}
            </span>
          </div>
          <div className={`${className} flex-shrink-0`}>
            <span className="text-xs font-semibold italic text-warning">
              {formatFileSize(data.size || 0)} -{' '}
              {dayjs(data.updated_at).format('HH:mm DD/MM/YYYY')}
            </span>
            <div className={expandableMenuClass} ref={expandableMenuRef}>
              <ExpandableMenu
                onView={() => {
                  const fileType = getFileType(data.mime_type || '');

                  if (fileType === 'image')
                    buttonViewImage.current && buttonViewImage.current.click();
                  else window.open(data.path || '', '_blank');
                }}
                onEdit={() => {
                  setValueFileSystem('isEditFolderModal', true);
                  setValueFileSystem('folderForm', {
                    file_system_id: data.file_system_id,
                    folder_name: data.name,
                    type: 'file',
                  });
                }}
                onRemove={() => {
                  setValueFileSystem('isDeleteFolderModal', true);
                  setValueFileSystem('folderDelete', {
                    file_system_id: data.file_system_id,
                    folder_name: data.name,
                    type: 'file',
                  });
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FileItem;
