import { FaArrowRightLong } from 'react-icons/fa6';
import Modal from '~/components/Modal/Modal.Main';
import { ACTIVE, INACTIVE } from '~/constants/status';
import useShowtimeStore from '~/stores/showtime.store';

const ComfirmUpdateStatusModal = () => {
  const {
    showtimeDetail,
    isUpdateStatusShowtime,
    setStateShowtime,
    reqUpdateStatusShowtime,
  } = useShowtimeStore();

  return (
    <Modal
      title="Cập nhật trạng thái"
      isOpen={showtimeDetail ? true : false}
      onClose={() => {
        if (!isUpdateStatusShowtime) setStateShowtime('showtimeDetail', null);
      }}
      onSubmit={() => {
        const payload = {
          _showtime_id: showtimeDetail?.showtime_id,
          _status: showtimeDetail?.status === ACTIVE ? INACTIVE : ACTIVE,
        };

        reqUpdateStatusShowtime(payload);
      }}
      isLoading={isUpdateStatusShowtime}
    >
      <div className="flex items-center flex-col space-y-2">
        Bạn có chắc chắn thay đổi trạng thái
        <br />
        <span className="flex items-center space-x-1">
          <p>
            <b className="text-warning">{showtimeDetail?.showtime_id}</b> từ{' '}
          </p>
          <b
            className={`${
              showtimeDetail?.status === ACTIVE ? 'text-success' : 'text-danger'
            }`}
          >
            {' '}
            {showtimeDetail?.status === ACTIVE ? 'Kích hoạt' : 'Ẩn'}
          </b>
          <FaArrowRightLong size={16} />
          <b
            className={`${
              showtimeDetail?.status === ACTIVE ? 'text-danger' : 'text-success'
            }`}
          >
            {' '}
            {showtimeDetail?.status === ACTIVE ? 'Ẩn' : 'Kích hoạt'}
          </b>
        </span>
      </div>
    </Modal>
  );
};

export default ComfirmUpdateStatusModal;
