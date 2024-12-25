import React from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import { CiLock, CiUnlock } from 'react-icons/ci';
import { IoEye } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import ButtonIcon from '~/components/ButtonIcon';
import useCinemaStore from '~/stores/cinema.store';

type EditControlProps = {
  data: any;
};

const EditControl: React.FC<EditControlProps> = ({ data }) => {
  const navigate = useNavigate();
  const { setStateCinema } = useCinemaStore();

  return (
    <div className="flex items-center space-x-1">
      <ButtonIcon
        color="primary"
        onClick={() => {
          navigate(`detail/${data.slug}`);
        }}
      >
        <IoEye size={20} />
      </ButtonIcon>
      <ButtonIcon
        color="warning"
        onClick={() => {
          navigate(`update/${data.slug}`);
        }}
      >
        <BsPencilSquare size={20} />
      </ButtonIcon>
      <ButtonIcon
        color={data.status === 'active' ? 'success' : 'danger'}
        onClick={() => {
          setStateCinema('cinemaUpdateStatus', data);
        }}
      >
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
