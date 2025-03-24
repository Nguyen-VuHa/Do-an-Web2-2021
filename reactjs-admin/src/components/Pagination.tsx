import React from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

type PaginationProps = {
  page: number;
  pageSize: number;
  totalRows: number;
  className?: string;
  onChange?: (pageIndex: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  className,
  page,
  pageSize,
  totalRows,
  onChange,
}) => {
  const totalPages = Math.ceil(totalRows / pageSize);

  const generatePages = () => {
    const pages: (number | 'dots')[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1); // always show first page

      const start = Math.max(2, page - 2);
      const end = Math.min(totalPages - 1, page + 2);

      if (start > 2) {
        pages.push('dots'); // leading dots
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push('dots'); // trailing dots
      }

      pages.push(totalPages); // always show last page
    }

    return pages;
  };

  return (
    <div className={className || ''}>
      <ul className="flex">
        <li>
          <a
            className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-primary/80"
            href="#"
            aria-label="Previous"
            onClick={() => {
              if (page > 1) {
                onChange && onChange(page - 1);
              }
            }}
          >
            <FaAngleLeft size={15} />
          </a>
        </li>

        {generatePages().map((item, index) =>
          item === 'dots' ? (
            <li key={`dots-${index}`}>
              <span className="mx-1 flex h-9 w-9 items-center justify-center text-sm text-blue-gray-400">
                ...
              </span>
            </li>
          ) : (
            <li key={item}>
              <a
                className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full p-0 text-sm hover:bg-primary/80 text-white shadow-md transition duration-150 ease-in-out ${
                  page === item ? 'bg-primary' : ''
                }`}
                href="#"
                onClick={() => {
                  onChange && onChange(item);
                }}
              >
                {item}
              </a>
            </li>
          )
        )}

        <li>
          <a
            className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-primary/80"
            href="#"
            aria-label="Next"
            onClick={() => {
              if (page < totalPages) {
                onChange && onChange(page + 1);
              }
            }}
          >
            <FaAngleRight size={15} />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
