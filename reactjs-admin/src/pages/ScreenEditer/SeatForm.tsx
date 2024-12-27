import { useCallback } from 'react';
import toast from 'react-hot-toast';
import BGScreen from 'src/images/icon/bg-screen.png';
import Button from '~/components/Button';
import FormGroup from '~/components/FormGroup';
import Input from '~/components/Input';
import { MAX_COL_SEAT, MAX_ROW_SEAT } from '~/constants/seat';
import useSeatStore from '~/stores/seat.store';
import { stringToInt } from '~/utils/convert';
import SeatMap from './SeatMap';

const getRowLabel = (index: number) => {
  return String.fromCharCode(65 + index); // Chuyển đổi 0 -> A, 1 -> B, ...
};

const SeatForm = () => {
  const { rowSeat, colSeat, seatMap, setStateSeat } = useSeatStore();

  const handleChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const numberClean = value.replace(/\D/g, '');

      setStateSeat(name, stringToInt(numberClean));
    },
    [],
  );

  const handleGenerateSeatMap = () => {
    if (!rowSeat || !colSeat) {
      toast.error('Vui lòng nhập chiều dài và chiều ngang ghế');

      return;
    }

    if (rowSeat > MAX_ROW_SEAT || colSeat > MAX_COL_SEAT) {
      toast.error('Giá trị ngang hoặc dọc của ghế không hợp lệ');

      return;
    }

    const seatList = Array.from({ length: rowSeat * colSeat }, (_, index) => {
      const offsetX = Math.floor((MAX_COL_SEAT - colSeat) / 2); // Bù trừ để ghế căn giữa
      const y = Math.floor(index / colSeat); // Chỉ số dòng
      const x = (index % colSeat) + offsetX; // Chỉ số cột trong dòng (có bù trừ)
      const label = `${getRowLabel(y)}${(index % colSeat) + 1}`; // Nhãn ghế theo dòng (chữ cái) và số thứ tự

      return {
        id: index + 1,
        x,
        y,
        label,
      };
    });

    setStateSeat('seatMap', seatList);
  };

  return (
    <>
      <div className="my-4.5 flex flex-col gap-6 xl:flex-row">
        <FormGroup
          label="Chiều ngang ghế (Tối đa 20)"
          element={
            <Input
              placeholder="Ví dụ: 12..."
              name="rowSeat"
              value={(rowSeat && rowSeat.toString()) || ''}
              onChange={handleChangeInput}
            />
          }
          messageError={
            rowSeat > MAX_ROW_SEAT
              ? `Chiều ngang không dược vượt quá ${MAX_ROW_SEAT}`
              : ''
          }
        />
        <FormGroup
          label="Chiều dọc ghế (Tối đa 25)"
          element={
            <Input
              placeholder="Ví dụ: 20..."
              name="colSeat"
              value={(colSeat && colSeat.toString()) || ''}
              onChange={handleChangeInput}
            />
          }
          messageError={
            colSeat > MAX_COL_SEAT
              ? `Chiều dọc không dược vượt quá ${MAX_COL_SEAT}`
              : ''
          }
        />
      </div>
      <div className="flex justify-center">
        <Button
          className="!w-fit"
          onClick={() => {
            handleGenerateSeatMap();
          }}
        >
          Tạo bản đồ ghế
        </Button>
      </div>
      {seatMap.length > 0 && (
        <div className="py-6.5 space-y-5 overflow-hidden">
          <img className="w-full mb-30" src={BGScreen} />
          <div className="overflow-scroll">
            <SeatMap />
          </div>
        </div>
      )}
    </>
  );
};

export default SeatForm;
