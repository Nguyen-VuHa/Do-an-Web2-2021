import EmptyFolder from 'src/images/icon/empty-folder.png';
import useFileSystemStore from '~/stores/file-system.store';
import BreadCrumb from './BreadCrumb';
import FileList from './FileList';
import { IFileSystem } from '~/types/file-system.type';

interface WrapperFileProps {
  onSingleSelect?: (fileData: IFileSystem) => void;
}

const WrapperFile: React.FC<WrapperFileProps> = ({ onSingleSelect }) => {
  const { fileSystems, breadcrumb, isFetchFileSystem } = useFileSystemStore();

  return (
    <div className="space-y-5 min-h-10">
      {/* <div className="flex justify-between items-end">
        <div className="flex space-x-2">

        </div>
      </div> */}
      <BreadCrumb breadcrumb={breadcrumb} />
      {isFetchFileSystem && (
        <div className="w-full p-10 flex flex-col items-center text-rose text-lg space-y-5">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-solid border-rose border-t-transparent"></div>
          <span>Đang tải dữ liệu ...</span>
        </div>
      )}

      {!isFetchFileSystem && fileSystems.length > 0 ? (
        <FileList onSingleSelect={onSingleSelect} />
      ) : (
        <div className="w-full p-10 flex flex-col items-center text-lg space-y-5">
          <img src={EmptyFolder} width={120} />
          <span>THƯ MỤC RỖNG</span>
        </div>
      )}
    </div>
  );
};

export default WrapperFile;
