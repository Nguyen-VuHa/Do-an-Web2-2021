import { ISeat } from '~/types/seat.type';
import { IoClose } from 'react-icons/io5';
import useSeatStore from '~/stores/seat.store';
import { FiEdit3 } from 'react-icons/fi';

interface SeatMapItem {
  data: ISeat;
  isHover: boolean;
}

const SeatMapItem: React.FC<SeatMapItem> = ({ data, isHover }) => {
  const { seatMap, setStateSeat } = useSeatStore();
  return (
    <>
      {isHover && (
        <div className="absolute bottom-[100%] flex w-full">
          <div
            className=" bg-rose w-full bg-opacity-40 flex justify-center items-center text-rose"
            onClick={() => {
              if (data.id < 0) {
                setStateSeat(
                  'seatMap',
                  seatMap.filter((seat) => seat.id !== data.id),
                );
              } else {
                setStateSeat(
                  'seatMap',
                  seatMap.map((seat) =>
                    seat.id === data.id ? { ...seat, status: 0 } : seat,
                  ),
                );
              }
            }}
          >
            <IoClose size={16} />
          </div>
          <div
            className=" bg-sky w-full bg-opacity-40 flex justify-center items-center text-sky"
            onClick={() => {
              setStateSeat('isChangeSeatNameModal', true);
              setStateSeat('seatUpdate', data);
            }}
          >
            <FiEdit3 size={16} />
          </div>
        </div>
      )}

      <div className="w-full h-full flex justify-center items-center bg-success bg-opacity-40 text-success font-semibold">
        {data.label}
      </div>
    </>
  );
};

export default SeatMapItem;
