import { CgClose } from 'react-icons/cg';
import ButtonIcon from '../ButtonIcon';
import WrapperFile from './WrapperFile';
import { useEffect } from 'react';
import useFileSystemStore from '~/stores/file-system.store';
import { IFileSystem } from '~/types/file-system.type';

interface MediaSelectProps {
  onSingleSelect?: (fileData: IFileSystem) => void;
  isOpen: boolean;
  onClose: () => void;
}

const MediaSelect: React.FC<MediaSelectProps> = ({
  onSingleSelect,
  isOpen,
  onClose,
}) => {
  const { reqFetchFileSystems } = useFileSystemStore();

  useEffect(() => {
    reqFetchFileSystems(null);
  }, []);

  return (
    <div
      className={`fixed w-full h-full top-0 left-0 flex justify-center items-center dark:bg-boxdark/50 bg-strokedark/30 ${
        isOpen ? 'z-[10000] transition-all' : 'hidden z-[-10]'
      }`}
    >
      <div
        className={`modal w-[70%] max-sm:w-[90%] max-h-[95%] rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark overflow-auto`}
      >
        <div className="space-y-5 border-b border-stroke p-2 dark:border-strokedark">
          <div className="w-full space-x-10 flex justify-between items-end">
            <h3 className="font-semibold text-2xl text-primary">
              Thư viện ảnh
            </h3>
            <ButtonIcon
              color="danger"
              onClick={() => {
                onClose();
              }}
            >
              <CgClose size={22} />
            </ButtonIcon>
          </div>
        </div>
        <div className="p-2">
          <WrapperFile onSingleSelect={onSingleSelect} />
        </div>
      </div>
    </div>
  );
};

export default MediaSelect;
