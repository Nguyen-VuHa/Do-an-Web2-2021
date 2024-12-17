import Breadcrumb from '~/components/Breadcrumb';
import FileControl from './FileControl';
import WrapperFile from './WrapperFile';
import useFileSystemStore from '~/stores/file-system.store';
import { useEffect } from 'react';

const FileSystem = () => {
  const { reqFetchFileSystems } = useFileSystemStore();

  useEffect(() => {
    reqFetchFileSystems(null);
  }, []);

  return (
    <>
      <Breadcrumb pageName="Tệp tin hệ thống" />

      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-5 space-y-10">
        <FileControl />
        <WrapperFile />
      </div>
    </>
  );
};

export default FileSystem;
