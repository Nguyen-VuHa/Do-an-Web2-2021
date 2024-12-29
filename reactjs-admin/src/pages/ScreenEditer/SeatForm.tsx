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
import { useParams } from 'react-router-dom';
import { ISeat } from '~/types/seat.type';

const getRowLabel = (index: number) => {
  return String.fromCharCode(65 + index); // Chuyển đổi 0 -> A, 1 -> B, ...
};

const SeatForm = () => {
  const { screen_id } = useParams();

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
        id: -(index + 1),
        x,
        y,
        label,
        status: 1,
      };
    });

    setStateSeat('seatMap', seatList);
  };

  const handleAddSeat = () => {
    let seatValid: ISeat | null = null;

    let isSeatUpdate = false;
    for (let x = 0; x < MAX_COL_SEAT - 1; x++) {
      let isSeatValid = false;

      for (let y = 0; y < MAX_ROW_SEAT - 1; y++) {
        let isMatch = seatMap.find(seat => seat.x === y && seat.y === x)
        
        if(isMatch && isMatch.status === 0) { // trường hợp nếu tìm thấy mà item đó đang bị delete thì set lại status hiện và đổi tên ghế

          seatValid = {
            id: isMatch.id,
            x: isMatch.x,
            y: isMatch.y,
            label: `${x}${y}`,
            status: 1,
          }
          isSeatValid = true
          isSeatUpdate = true
          break;
        }

        if(!isMatch) {
          const seatID = seatMap.length + 1;
          seatValid = {
            id: seatID === 0 ? -999 : -seatID,
            x: y,
            y: x,
            label: `${x}${y}`,
            status: 1,
          }

          isSeatValid = true
          break;
        }
      }

      if (isSeatValid)
        break;
    }

    if(!seatValid) {
      toast.error("Số lượng ghế đã đạt giới hạn trong 1 rạp chiếu")
      return;
    }

    if(isSeatUpdate) 
      setStateSeat('seatMap', seatMap.map(seat => seat.id === seatValid.id ? {...seat, ...seatValid} : seat))
    else
      setStateSeat('seatMap', seatMap.concat(seatValid))

    toast.success(`Đã thêm thành công ghế ${seatValid.label} ở vị trí cột ${seatValid.y + 1} - hàng ${seatValid.x + 1 }`)
  }

  return (
    <>
      {!screen_id && (
        <>
          <div className="my-4.5 flex flex-col gap-6 xl:flex-row">
            <FormGroup
              label="Chiều ngang ghế (Tối đa 20)"
              element={
                <Input
                  placeholder="Ví dụ: 12..."
                  name="colSeat"
                  value={(colSeat && colSeat.toString()) || ''}
                  onChange={handleChangeInput}
                />
              }
              messageError={
                colSeat > MAX_ROW_SEAT
                  ? `Chiều ngang không dược vượt quá ${MAX_ROW_SEAT}`
                  : ''
              }
            />
            <FormGroup
              label="Chiều dọc ghế (Tối đa 25)"
              element={
                <Input
                  placeholder="Ví dụ: 20..."
                  name="rowSeat"
                  value={(rowSeat && rowSeat.toString()) || ''}
                  onChange={handleChangeInput}
                />
              }
              messageError={
                rowSeat > MAX_COL_SEAT
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
        </>
      )}

      {
        screen_id && <div className="flex justify-center mt-5">
          <Button
            className="!w-fit"
            onClick={() => {
              handleAddSeat();
            }}
          >
            Thêm ghế mới
          </Button>
        </div>
      }

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
