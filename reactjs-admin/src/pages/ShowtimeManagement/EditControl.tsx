import React from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import { CiLock, CiUnlock } from 'react-icons/ci';
import { IoEye } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import ButtonIcon from '~/components/ButtonIcon';
import { ACTIVE } from '~/constants/status';
import useShowtimeStore from '~/stores/showtime.store';
import { IShowtime } from '~/types/showtime.type';

type EditControlProps = {
  data: IShowtime;
};

const EditControl: React.FC<EditControlProps> = ({ data }) => {
  const navigate = useNavigate();
  const { setStateShowtime } = useShowtimeStore();

  return (
    <div className="flex items-center space-x-1">
      <ButtonIcon
        color="primary"
        onClick={() => {
          navigate(`detail/${data.showtime_id}`);
        }}
      >
        <IoEye size={20} />
      </ButtonIcon>
      <ButtonIcon
        color="warning"
        onClick={() => {
          navigate(`update/${data.showtime_id}`);
        }}
      >
        <BsPencilSquare size={20} />
      </ButtonIcon>
      <ButtonIcon
        color={data.status === ACTIVE ? 'success' : 'danger'}
        onClick={() => {
          setStateShowtime('showtimeDetail', data);
        }}
      >
        {data.status === ACTIVE ? <CiLock size={20} /> : <CiUnlock size={20} />}
      </ButtonIcon>
    </div>
  );
};

export default EditControl;
