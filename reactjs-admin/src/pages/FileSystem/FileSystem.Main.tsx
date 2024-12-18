import Breadcrumb from '~/components/Breadcrumb';
import FileControl from './FileControl';
import WrapperFile from './WrapperFile';
import useFileSystemStore from '~/stores/file-system.store';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import UploadFolder from './UploadFolder.Modal';
import EditFolderModal from './EditFolder.Modal';
import UploadFileModal from './UploadFile.Modal';
import UploadPosterModal from './UploadPoster.Modal';

const FileSystem = () => {
  const location = useLocation();

  // Parse query string
  const queryParams = new URLSearchParams(location.search);
  const { isUploadFolderModal, isUploadPosterModal, reqFetchFileSystems } =
    useFileSystemStore();

  useEffect(() => {
    const parent_id = queryParams.get('_p_id');

    reqFetchFileSystems(parent_id);
  }, [location]);

  return (
    <>
      <Breadcrumb pageName="Tệp tin hệ thống" />

      {isUploadFolderModal && <UploadFolder />}
      <EditFolderModal />
      <UploadFileModal />
      {isUploadPosterModal && <UploadPosterModal />}

      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-5 space-y-10">
        <FileControl />
        <WrapperFile />
      </div>
    </>
  );
};

export default FileSystem;
