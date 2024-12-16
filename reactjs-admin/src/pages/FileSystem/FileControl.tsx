import ButtonControl from './ButtonControl';
import { BsFileEarmarkPlusFill } from 'react-icons/bs';
import { FaFileUpload } from 'react-icons/fa';
import { RiFolderUploadFill } from 'react-icons/ri';
import { AiFillFolderAdd } from 'react-icons/ai';

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
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {ButtonControlData.map((buttonData) => {
        return (
          <ButtonControl
            key={buttonData.id}
            icon={buttonData.icon}
            label={buttonData.label}
          />
        );
      })}
    </div>
  );
};

export default FileControl;
