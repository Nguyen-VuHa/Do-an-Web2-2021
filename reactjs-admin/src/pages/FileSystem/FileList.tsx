import { useEffect, useState } from 'react';
import { getDataToLocalStore } from '~/utils/localStorage';
import FileItem from './FileItem';
import useFileSystemStore from '~/stores/file-system.store';

const FileList = () => {
  const { fileSystems } = useFileSystemStore();
  const [className, setClassName] = useState<string>('');

  useEffect(() => {
    let sortType = getDataToLocalStore('sort_type');

    if (sortType === 'grid') {
      setClassName(
        'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-2',
      );
    } else {
      setClassName('flex flex-col space-y-1');
    }
  }, [getDataToLocalStore('sort_type')]);

  return (
    <div className={className}>
      {fileSystems.map((file) => {
        return <FileItem key={file.file_system_id} data={file} />;
      })}
    </div>
  );
};

export default FileList;
