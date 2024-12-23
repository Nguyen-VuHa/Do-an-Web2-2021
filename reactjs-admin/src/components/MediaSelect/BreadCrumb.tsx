import React from 'react';
import useFileSystemStore from '~/stores/file-system.store';
import { IObject } from '~/types/common.type';

type BreadCrumbProps = {
  breadcrumb: IObject<any>[];
};

const BreadCrumb: React.FC<BreadCrumbProps> = ({ breadcrumb }) => {
  const { reqFetchFileSystems } = useFileSystemStore();
  return (
    <nav className="w-full flex space-x-1 text-sm text-gray-600">
      {breadcrumb.map((item, index) => (
        <span key={item.id} className="flex items-center">
          {/* Render link cho các item ngoại trừ item cuối */}
          {index < breadcrumb.length - 1 ? (
            <>
              <div
                className="font-semibold text-warning hover:text-rose max-w-[150px] transition-all cursor-pointer overflow-hidden text-ellipsis line-clamp-1"
                title={item.name}
                onClick={() => {
                  reqFetchFileSystems(item.id);
                }}
              >
                {item.name}
              </div>
              <span className="mx-1">/</span>
            </>
          ) : (
            // Render tên cho item cuối
            <span
              className="font-semibold max-w-[150px] overflow-hidden text-ellipsis line-clamp-1"
              title={item.name}
            >
              {item.name}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default BreadCrumb;
