import Button from "~/components/Button";
import Input from "~/components/Input";
import useSeatStore from "~/stores/seat.store";
import { convertToUpperCase } from "~/utils/convert";

interface ChangeSeatNameModalProps {
  isOpen?: boolean;
}

const ChangeSeatNameModal: React.FC<ChangeSeatNameModalProps> = ({ isOpen }) => {
  const { seatUpdate, seatMap, setStateSeat } = useSeatStore()
  
  return (
    <div
      className={`fixed w-full h-full top-0 left-0 flex justify-center items-center dark:bg-boxdark/50 bg-strokedark/30
        ${isOpen ? 'z-[10000] transition-all' : 'hidden z-[-10]'}`}
    >
      <div className="w-[300px] flex flex-col justify-center items-center bg-strokedark bg-opacity-80 px-3 py-2 rounded-lg space-y-2">
        <Input 
          placeholder="Nhập tên ghế ..."
          value={seatUpdate?.label}
          onChange={(e) => {
            const value = e.target.value.replace(' ', '');

            if (value.length <= 3) {
              setStateSeat('seatUpdate', {
                ...seatUpdate,
                label: convertToUpperCase(value)
              })
            }
          }}
        />
        <div className="p-4 flex justify-end items-center space-x-2 w-full">
          <Button
            className="dark:!bg-graydark dark:text-white text-[#6c7b90] !bg-gray border-none"
            onClick={() => {
              setStateSeat('isChangeSeatNameModal', false)
              setStateSeat('seatUpdate', null)
            }}
          >
            <span>Thoát</span>
          </Button>
          <Button
            className="border-none"
            onClick={() => {
              if(seatUpdate?.label) {
                setStateSeat('seatMap', seatMap.map(seat => {
                  if(seat.id === seatUpdate?.id) {
                    return {
                      ...seat,
                      ...seatUpdate,
                    }
                  } else {
                    return seat;
                  }
                }))
                setStateSeat('isChangeSeatNameModal', false)
                setStateSeat('seatUpdate', null)
              }
            }}
          >
            Lưu lại
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChangeSeatNameModal;
