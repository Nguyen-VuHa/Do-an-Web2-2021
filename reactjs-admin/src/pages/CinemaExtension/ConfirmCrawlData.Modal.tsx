import Modal from '~/components/Modal/Modal.Main';
import useCinemaStore from '~/stores/cinema.store';

const ConfirmCrawlDataModal = () => {
  const { isModalConfirmCrawl, setStateCinema, reqCrawlCinemaDetail } =
    useCinemaStore();
  return (
    <Modal
      title="Tiến trình thu thập dữ liệu"
      isOpen={isModalConfirmCrawl}
      onClose={() => {
        setStateCinema('isModalConfirmCrawl', false);
      }}
      onSubmit={() => {
        setStateCinema('isModalConfirmCrawl', false);
        reqCrawlCinemaDetail();
      }}
      widthClass="w-[40%]"
    >
      <div className="flex items-center flex-col space-y-2">
        Quá trình thu thập dữ liệu có thể xảy ra khá lâu...
        <br />
        <span className="flex italic items-center text-danger font-semibold text-md text-center space-x-1">
          (Vui lòng không tắt trình duyệt cho đến khi tiến trình thu thập hoàn
          tất)
        </span>
      </div>
    </Modal>
  );
};

export default ConfirmCrawlDataModal;
