import clsx from 'clsx';
import React from 'react';
import { ColorVariant } from '~/types/common.type';

interface TagProps {
  label: string;
  color?: ColorVariant | undefined;
}

const Tag: React.FC<TagProps> = ({ label, color }) => {
  let className = clsx(
    'inline-flex rounded-full py-1 px-3 text-sm font-medium bg-opacity-20',
    {
      [`bg-${color}`]: color,
      [`text-${color}`]: color,
      'bg-gray text-gray': !color, // fallback khi không có color
    },
  );

  return (
    <>
      <p
        className={`inline-flex rounded-full py-1 px-3 text-sm font-medium bg-opacity-20 ${className}`}
      >
        {label}
      </p>
    </> 
  );
};

export default Tag;
