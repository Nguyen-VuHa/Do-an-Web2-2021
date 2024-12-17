import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IObject } from '~/types/common.type';

type BreadCrumbProps = {
  breadcrumb: IObject<any>[];
};

const BreadCrumb: React.FC<BreadCrumbProps> = ({ breadcrumb }) => {
  const navigate = useNavigate();
  return (
    <nav className="flex space-x-1 text-sm text-gray-600">
      {breadcrumb.map((item, index) => (
        <span key={item.id} className="flex items-center">
          {/* Render link cho các item ngoại trừ item cuối */}
          {index < breadcrumb.length - 1 ? (
            <>
              <div
                className="font-semibold text-warning hover:text-rose transition-all cursor-pointer"
                onClick={() => {
                  navigate(`?_p_id=${item.id}`);
                }}
              >
                {item.name}
              </div>
              <span className="mx-1">/</span>
            </>
          ) : (
            // Render tên cho item cuối
            <span className="font-semibold">{item.name}</span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default BreadCrumb;
