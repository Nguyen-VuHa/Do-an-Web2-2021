import { useState } from 'react';
import { BsGrid3X3Gap } from 'react-icons/bs';
import { LiaListUlSolid } from 'react-icons/lia';
import { getDataToLocalStore, setDataToLocalStore } from '~/utils/localStorage';
import FileList from './FileList';
import useFileSystemStore from '~/stores/file-system.store';
import EmptyFolder from 'src/images/icon/empty-folder.png';

const KEY_SORT_TYPE = 'sort_type';

const WrapperFile = () => {
  const sortTypeLocalStore = getDataToLocalStore(KEY_SORT_TYPE);
  let sortTypeValue = 'grid';

  if (sortTypeLocalStore && sortTypeLocalStore === 'list') {
    sortTypeValue = 'list';
  }

  const [sortType, setsortType] = useState<string>(sortTypeValue);
  const { fileSystems, isFetchFileSystem } = useFileSystemStore();

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-end">
        <div className="text-2xl font-semibold text-warning">
          Tất cả tệp tin
        </div>

        <div className="flex space-x-2">
          <div
            className={`cursor-pointer p-2
            bg-opacity-20  rounded-md transition-all 
            hover:bg-rose hover:text-rose hover:bg-opacity-10 ${
              (sortType === 'grid' && 'bg-rose text-rose bg-opacity-20') || ''
            }`}
            onClick={() => {
              setDataToLocalStore(KEY_SORT_TYPE, 'grid');
              setsortType('grid');
            }}
          >
            <BsGrid3X3Gap size={22} />
          </div>
          <div
            className={`cursor-pointer p-2
              bg-opacity-20  rounded-md transition-all 
              hover:bg-rose hover:text-rose hover:bg-opacity-10 ${
                (sortType === 'list' && 'bg-rose text-rose bg-opacity-20') || ''
              }`}
            onClick={() => {
              setDataToLocalStore(KEY_SORT_TYPE, 'list');
              setsortType('list');
            }}
          >
            <LiaListUlSolid size={22} />
          </div>
        </div>
      </div>
      {isFetchFileSystem && (
        <div className="w-full p-10 flex flex-col items-center text-rose text-lg space-y-5">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-solid border-rose border-t-transparent"></div>
          <span>Đang tải dữ liệu ...</span>
        </div>
      )}

      {(!isFetchFileSystem && fileSystems.length > 0 && <FileList />) || (
        <div className="w-full p-10 flex flex-col items-center text-rose text-lg space-y-5">
          <img src={EmptyFolder} width={120} />
          <span>THƯ MỤC RỖNG</span>
        </div>
      )}
    </div>
  );
};

export default WrapperFile;
