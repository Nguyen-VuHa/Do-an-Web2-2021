import { useEffect, useState } from 'react';
import { FcOpenedFolder } from 'react-icons/fc';
import { getDataToLocalStore } from '~/utils/localStorage';

const FileItem = () => {
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
      setClassName('flex items-center space-x-2');
      setFileNameClass('w-[50%] overflow-hidden text-ellipsis line-clamp-1');
      setIconSize(25);
    }
  }, [getDataToLocalStore('sort_type')]);

  return (
    <div
      className={`cursor-pointer rounded-md border-2 p-2 hover:border-warning hover:text-warning transition-all duration-300 ${className}`}
    >
      <FcOpenedFolder size={iconSize} />
      <span className={`text-sm ${fileNameClass}`}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. adipiscing
        elit.
      </span>
    </div>
  );
};

export default FileItem;
