import Modal from '~/components/Modal/Modal.Main';
import { ACTIVE, INACTIVE } from '~/constants/status';
import useMovieStore from '~/stores/movie.store';
import { FaArrowRightLong } from 'react-icons/fa6';

const ComfirmUpdateStatusModal = () => {
  const { movieUpdateStatus, setMovieUpdateStatus, reqUpdateStatusMovie } =
    useMovieStore();

  return (
    <Modal
      title="Cập nhật trạng thái"
      isOpen={movieUpdateStatus ? true : false}
      onClose={() => {
        setMovieUpdateStatus(null);
      }}
      onSubmit={() => {
        const payload = {
          _movie_id: movieUpdateStatus?.movie_id,
          _status: movieUpdateStatus?.status === ACTIVE ? INACTIVE : ACTIVE,
        };

        reqUpdateStatusMovie(payload);
      }}
    >
      <div className="flex items-center flex-col space-y-2">
        Bạn có chắc chắn thay đổi trạng thái
        <br />
        <span className="flex items-center space-x-1">
          <p>
            <b className="text-warning">{movieUpdateStatus?.title}</b> từ{' '}
          </p>
          <b
            className={`${
              movieUpdateStatus?.status === ACTIVE
                ? 'text-success'
                : 'text-danger'
            }`}
          >
            {' '}
            {movieUpdateStatus?.status === ACTIVE ? 'Kích hoạt' : 'Ẩn'}
          </b>
          <FaArrowRightLong size={16} />
          <b
            className={`${
              movieUpdateStatus?.status === ACTIVE
                ? 'text-danger'
                : 'text-success'
            }`}
          >
            {' '}
            {movieUpdateStatus?.status === ACTIVE ? 'Ẩn' : 'Kích hoạt'}
          </b>
        </span>
      </div>
    </Modal>
  );
};

export default ComfirmUpdateStatusModal;
