import { FaArrowRightLong } from 'react-icons/fa6';
import Modal from '~/components/Modal/Modal.Main';
import { ACTIVE } from '~/constants/status';
import useCinemaStore from '~/stores/cinema.store';

const ComfirmUpdateStatusModal = () => {
  const {
    cinemaUpdateStatus,
    isUpdateCinemaStatus,
    reqDeleteCinema,
    reqUnDoDeleteCinema,
    setStateCinema,
  } = useCinemaStore();

  return (
    <Modal
      title="Cập nhật trạng thái"
      isOpen={cinemaUpdateStatus ? true : false}
      onClose={() => {
        if (!isUpdateCinemaStatus) setStateCinema('cinemaUpdateStatus', null);
      }}
      onSubmit={() => {
        if (!isUpdateCinemaStatus) {
          if (cinemaUpdateStatus?.status === ACTIVE) {
            reqDeleteCinema();
          } else {
            reqUnDoDeleteCinema();
          }
        }
      }}
      isLoading={isUpdateCinemaStatus}
    >
      <div className="flex items-center flex-col space-y-2">
        Bạn có chắc chắn thay đổi trạng thái
        <br />
        <span className="flex items-center space-x-1">
          <p>
            <b className="text-warning">{cinemaUpdateStatus?.cinema_name}</b> từ{' '}
          </p>
          <b
            className={`${
              cinemaUpdateStatus?.status === ACTIVE
                ? 'text-success'
                : 'text-danger'
            }`}
          >
            {' '}
            {cinemaUpdateStatus?.status === ACTIVE ? 'Kích hoạt' : 'Ẩn'}
          </b>
          <FaArrowRightLong size={16} />
          <b
            className={`${
              cinemaUpdateStatus?.status === ACTIVE
                ? 'text-danger'
                : 'text-success'
            }`}
          >
            {' '}
            {cinemaUpdateStatus?.status === ACTIVE ? 'Ẩn' : 'Kích hoạt'}
          </b>
        </span>
      </div>
    </Modal>
  );
};

export default ComfirmUpdateStatusModal;
