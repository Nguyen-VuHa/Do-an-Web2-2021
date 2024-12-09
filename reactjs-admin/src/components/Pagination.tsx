import React from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

type PaginationProps = {
  className?: string;
};

const Pagination: React.FC<PaginationProps> = ({ className }) => {
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
        <li>
          <a
            className="mx-1 flex h-9 w-9 items-center justify-center rounded-full bg-primary p-0 text-sm text-white shadow-md transition duration-150 ease-in-out"
            href="#"
          >
            1
          </a>
        </li>
        <li>
          <a
            className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-primary/80"
            href="#"
          >
            2
          </a>
        </li>
        <li>
          <a
            className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-primary/80"
            href="#"
          >
            3
          </a>
        </li>
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
