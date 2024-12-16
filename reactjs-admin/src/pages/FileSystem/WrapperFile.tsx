import { useState } from 'react';
import { BsGrid3X3Gap } from 'react-icons/bs';
import { LiaListUlSolid } from 'react-icons/lia';
import { getDataToLocalStore, setDataToLocalStore } from '~/utils/localStorage';
import FileList from './FileList';

const KEY_SORT_TYPE = 'sort_type';

const WrapperFile = () => {
  const sortTypeLocalStore = getDataToLocalStore(KEY_SORT_TYPE);
  let sortTypeValue = 'grid';

  if (sortTypeLocalStore && sortTypeLocalStore === 'list') {
    sortTypeValue = 'list';
  }

  const [sortType, setsortType] = useState<string>(sortTypeValue);

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
      <FileList />
    </div>
  );
};

export default WrapperFile;
