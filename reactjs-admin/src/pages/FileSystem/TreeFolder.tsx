import React, { useState } from 'react';
import { IObject } from '~/types/common.type';
import { BsCheck } from 'react-icons/bs';

// Định nghĩa kiểu dữ liệu thư mục

interface TreeFolderProps {
  data: IObject<any>;
  parentId?: string | null;
  keys?: string[];
}

const TreeFolder: React.FC<TreeFolderProps> = ({
  data,
  keys,
  parentId = null,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <ul className="pl-5">
      {Object.entries(data).map(([key, value]) => {
        if (typeof value === 'object') {
          // Nếu value là object thì đó là folder
          return (
            <li key={key}>
              <div
                className={`flex items-center cursor-pointer ${
                  (keys?.includes(key) && 'text-success') || ''
                }`}
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className={`mr-2 ${isOpen ? 'rotate-90' : ''}`}>▶</span>
                <div className="flex items-center space-x-2">
                  <strong>{key}</strong>
                  {keys?.includes(key + '-loading') && (
                    <div className="h-3 w-3 animate-spin rounded-full border-2 border-solid border-success border-t-transparent"></div>
                  )}
                  {keys?.includes(key) && <BsCheck size={22} />}
                </div>
              </div>
              {isOpen && <TreeFolder keys={keys} data={value} parentId={key} />}
            </li>
          );
        } else {
          // Nếu value là string thì đó là file
          return (
            <li key={key}>
              <div
                className={`flex items-center space-x-2 ${
                  (keys?.includes(key) && 'text-success') || ''
                }`}
              >
                <span>{key}</span>
                {keys?.includes(key + '-loading') && (
                  <div className="h-3 w-3 animate-spin rounded-full border-2 border-solid border-success border-t-transparent"></div>
                )}
                {keys?.includes(key) && <BsCheck size={22} />}
              </div>
            </li>
          );
        }
      })}
    </ul>
  );
};

export default TreeFolder;
