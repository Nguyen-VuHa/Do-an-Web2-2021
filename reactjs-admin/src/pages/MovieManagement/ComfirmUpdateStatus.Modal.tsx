import Modal from '~/components/Modal/Modal.Main';
import { ACTIVE, INACTIVE } from '~/constants/status';
import useMovieStore from '~/stores/movie.store';

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
      <p className="text-center">
        Bạn có chắc chắn thay đổi <br /> trạng thái cho{' '}
        <b className="text-warning">'{movieUpdateStatus?.title}'</b> <br />{' '}
        thành trạng thái
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
      </p>
    </Modal>
  );
};

export default ComfirmUpdateStatusModal;
