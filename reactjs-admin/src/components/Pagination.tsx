import React from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

type PaginationProps = {
  page: number; // Trang hiện tại
  pageSize: number; // Số hàng trên mỗi trang
  totalRows: number; // Tổng số hàng trong cơ sở dữ liệu
  className?: string;
};

const Pagination: React.FC<PaginationProps> = ({
  className,
  page,
  pageSize,
  totalRows,
}) => {
  // Tổng số trang
  const totalPages = Math.ceil(totalRows / pageSize);

  return (
    <div className={className || ''}>
      <ul className="flex">
        <li>
          <a
            className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-primary/80"
            href="#"
            aria-label="Previous"
          >
            <FaAngleLeft size={15} />
          </a>
        </li>
        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;
          return (
            <li key={pageNumber}>
              <a
                className={`mx-1 flex h-9 w-9 
                  items-center justify-center 
                  rounded-full p-0 text-sm hover:bg-primary/80
                  text-white shadow-md transition duration-150 ease-in-out
                  ${page === pageNumber ? 'bg-primary' : ''}
                  `}
                href="#"
              >
                {pageNumber}
              </a>
            </li>
          );
        })}
        <li>
          <a
            className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-primary/80"
            href="#"
            aria-label="Next"
          >
            <FaAngleRight size={15} />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
