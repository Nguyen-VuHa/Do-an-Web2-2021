import React from 'react';
import ButtonIcon from '~/components/ButtonIcon';
import { IoEye } from 'react-icons/io5';
import { BsPencilSquare } from 'react-icons/bs';
import { CiLock } from 'react-icons/ci';
import { CiUnlock } from 'react-icons/ci';

type EditControlProps = {
  data: any;
};

const EditControl: React.FC<EditControlProps> = ({ data }) => {
  return (
    <div className="flex items-center space-x-1">
      <ButtonIcon color="primary">
        <IoEye size={20} />
      </ButtonIcon>
      <ButtonIcon color="warning">
        <BsPencilSquare size={20} />
      </ButtonIcon>
      <ButtonIcon color={data.status === 'active' ? 'success' : 'danger'}>
        {data.status === 'active' ? (
          <CiLock size={20} />
        ) : (
          <CiUnlock size={20} />
        )}
      </ButtonIcon>
    </div>
  );
};

export default EditControl;
