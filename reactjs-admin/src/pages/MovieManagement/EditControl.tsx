import React from 'react';
import ButtonIcon from '~/components/ButtonIcon';
import { IoEye } from 'react-icons/io5';
import { BsPencilSquare } from 'react-icons/bs';
import { CiLock } from 'react-icons/ci';
import { CiUnlock } from 'react-icons/ci';
import useMovieStore from '~/stores/movie.store';
import { useNavigate } from 'react-router-dom';

type EditControlProps = {
  data: any;
};

const EditControl: React.FC<EditControlProps> = ({ data }) => {
  const navigate = useNavigate();
  const { setMovieUpdateStatus } = useMovieStore();
  return (
    <div className="flex items-center space-x-1">
      <ButtonIcon
        color="primary"
        onClick={() => {
          navigate(`detail/${data.movie_id}`);
        }}
      >
        <IoEye size={20} />
      </ButtonIcon>
      <ButtonIcon
        color="warning"
        onClick={() => {
          navigate(`update/${data.movie_id}`);
        }}
      >
        <BsPencilSquare size={20} />
      </ButtonIcon>
      <ButtonIcon
        color={data.status === 'active' ? 'success' : 'danger'}
        onClick={() => {
          setMovieUpdateStatus(data);
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
