import ButtonControl from './ButtonControl';
import { BsFileEarmarkPlusFill } from 'react-icons/bs';
import { FaFileUpload } from 'react-icons/fa';
import { RiFolderUploadFill } from 'react-icons/ri';
import { AiFillFolderAdd } from 'react-icons/ai';
import useFileSystemStore from '~/stores/file-system.store';

const ButtonControlData = [
  {
    id: 1,
    icon: <BsFileEarmarkPlusFill size={28} />,
    label: 'Tạo mới Poster',
  },
  {
    id: 2,
    icon: <FaFileUpload size={28} />,
    label: 'Tải lên tệp tin',
  },
  {
    id: 3,
    icon: <RiFolderUploadFill size={28} />,
    label: 'Tải lên thư mục',
  },
  {
    id: 4,
    icon: <AiFillFolderAdd size={28} />,
    label: 'Tạo mới thư mục',
  },
];

const FileControl = () => {
  const { setValueFileSystem } = useFileSystemStore();

  const handleClickBtnControl = (id: number) => {
    switch (id) {
      case 1:
        setValueFileSystem('isUploadPosterModal', true);
        break;
      case 2:
        setValueFileSystem('isUploadFileModal', true);
        break;
      case 3:
        setValueFileSystem('isUploadFolderModal', true);
        break;
      case 4:
        setValueFileSystem('isEditFolderModal', true);
        break;

      default:
        break;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {ButtonControlData.map((buttonData) => {
        return (
          <ButtonControl
            key={buttonData.id}
            icon={buttonData.icon}
            label={buttonData.label}
            onClick={() => handleClickBtnControl(buttonData.id)}
          />
        );
      })}
    </div>
  );
};

export default FileControl;
