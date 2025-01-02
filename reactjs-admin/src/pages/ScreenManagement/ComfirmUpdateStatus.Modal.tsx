import { FaArrowRightLong } from 'react-icons/fa6';
import Modal from '~/components/Modal/Modal.Main';
import { ACTIVE, INACTIVE } from '~/constants/status';
import useScreenStore from '~/stores/screen.store';

const ComfirmUpdateStatusModal = () => {
  const {
    isUpdateStatusScreen,
    screenDetail,
    setStateScreen,
    reqUpdateStatusScreen,
  } = useScreenStore();

  return (
    <Modal
      title="Cập nhật trạng thái"
      isOpen={screenDetail ? true : false}
      onClose={() => {
        if (!isUpdateStatusScreen) setStateScreen('screenDetail', null);
      }}
      onSubmit={() => {
        const payload = {
          _screen_id: screenDetail?.screen_id,
          _status: screenDetail?.status === ACTIVE ? INACTIVE : ACTIVE,
        };

        reqUpdateStatusScreen(payload);
      }}
      isLoading={isUpdateStatusScreen}
    >
      <div className="flex items-center flex-col space-y-2">
        Bạn có chắc chắn thay đổi trạng thái
        <br />
        <span className="flex flex-wrap justify-center items-center space-x-1">
          <p>
            <b className="text-warning">{screenDetail?.screen_name}</b> từ{' '}
          </p>
          <b
            className={`${
              screenDetail?.status === ACTIVE ? 'text-success' : 'text-danger'
            }`}
          >
            {' '}
            {screenDetail?.status === ACTIVE ? 'Kích hoạt' : 'Ẩn'}
          </b>
          <FaArrowRightLong size={16} />
          <b
            className={`${
              screenDetail?.status === ACTIVE ? 'text-danger' : 'text-success'
            }`}
          >
            {' '}
            {screenDetail?.status === ACTIVE ? 'Ẩn' : 'Kích hoạt'}
          </b>
        </span>
      </div>
    </Modal>
  );
};

export default ComfirmUpdateStatusModal;
