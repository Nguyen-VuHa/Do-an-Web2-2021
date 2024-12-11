import React from 'react';
import { ColorVariant } from '~/types/common.type';

interface TagProps {
  label: string;
  color?: ColorVariant | undefined;
}

const Tag: React.FC<TagProps> = ({ label, color }) => {
  let className = 'bg-gray text-gray';
  if (color) {
    className = `bg-${color} text-${color}`;
  }

  return (
    <p
      className={`inline-flex rounded-full py-1 px-3 text-sm font-medium bg-opacity-20 ${className}`}
    >
      {label}
    </p>
  );
};

export default Tag;
