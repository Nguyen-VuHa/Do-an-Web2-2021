import { enqueueSnackbar } from "notistack";
import { GrFormNextLink } from "react-icons/gr";
import Button from "~/components/ui/Button";
import { useBookingStore } from "~/stores/booking.store";
import { useShowtimeStore } from "~/stores/showtime.store";
import { getRandomWidth } from "~/utils/random";
import MovieInfo from "./MovieInfo";
import SeatMap from "./SeatMap";

const ChooseSeat = () => {
  const { seatBooking, setStateBooking, processBooking } = useBookingStore();
  const { showtimeDetail, isFetchShowtimeDetail } = useShowtimeStore();

  const totalAmount = (showtimeDetail?.unit_price || 0) * seatBooking.length;
  return (
    <div className="space-y-4 w-full flex flex-col items-center">
      {/* Map */}
      <div className="w-full px-5 grid grid-cols-1 gap-4 md:px-0 lg:grid-cols-5">
        <div className="relative lg:col-span-3 w-full space-y-2">
          {isFetchShowtimeDetail && (
            <div className="absolute rounded-circle-md flex justify-center items-center top-0 left-0 w-full h-full z-[10] bg-second">
              <div
                className={`h-20 w-20 animate-spin rounded-full border-4 border-solid border-t-transparent border-social-x`}
              />
            </div>
          )}

          <SeatMap />
          <div className="bg-second p-2 rounded-circle-md flex flex-wrap gap-5 justify-center items-center">
            <div className="flex justify-center items-center space-x-2">
              <div
                className="w-10 h-10 flex justify-center items-center
                  rounded-circle-md text-social-x bg-social-x bg-opacity-30 hover:bg-opacity-50"
              >
                AA
              </div>
              <span className="text-social-x">Ghế thường</span>
            </div>
            <div className="flex justify-center items-center space-x-2">
              <div
                className="w-10 h-10 flex justify-center items-center
                  rounded-circle-md text-warning bg-warning bg-opacity-30 hover:bg-opacity-50"
              >
                AA
              </div>
              <span className="text-warning">Ghế bạn chọn</span>
            </div>
            <div className="flex justify-center items-center space-x-2">
              <div
                className="w-10 h-10 flex justify-center items-center
                  rounded-circle-md text-typography bg-typography bg-opacity-30 hover:bg-opacity-50"
              >
                AA
              </div>
              <span className="text-typography">Ghế đã đặt</span>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 space-y-2">
          {/* Next step */}
          <Button
            className="flex justify-center items-center space-x-2 !w-full !rounded-circle-md"
            buttonType="warning"
            onClick={() => {
              if (seatBooking.length > 0) {
                setStateBooking("processBooking", processBooking + 1);
              } else {
                enqueueSnackbar("Vui lòng chọn ghế trước khi thanh toán", {
                  variant: "info",
                });
              }
            }}
          >
            <span>Đi đến thanh toán</span>
            <GrFormNextLink size={22} />
          </Button>
          {isFetchShowtimeDetail && (
            <div className="flex p-2 rounded-circle-md space-x-1 animate-pulse bg-second">
              <div className="h-48 w-32 rounded-md bg-gradient-to-r from-social-x to-instagram bg-[length:100%_300%]"></div>
              <div className="space-y-2 w-full">
                <div className="h-9 w-[40%] rounded-md bg-gradient-to-r from-social-x to-instagram bg-[length:100%_300%]"></div>
                <div
                  className={`h-5 rounded-md bg-gradient-to-r from-social-x to-instagram bg-[length:100%_300%]`}
                  style={{ width: `${getRandomWidth()}px` }}
                ></div>
                <div
                  className={`h-5 rounded-md bg-gradient-to-r from-social-x to-instagram bg-[length:100%_300%]`}
                  style={{ width: `${getRandomWidth()}px` }}
                ></div>
                <div
                  className={`h-5 rounded-md bg-gradient-to-r from-social-x to-instagram bg-[length:100%_300%]`}
                  style={{ width: `${getRandomWidth()}px` }}
                ></div>
                <div
                  className={`h-5 rounded-md bg-gradient-to-r from-social-x to-instagram bg-[length:100%_300%]`}
                  style={{ width: `${getRandomWidth()}px` }}
                ></div>
              </div>
            </div>
          )}
          {!isFetchShowtimeDetail && <MovieInfo />}
          <div className="w-full p-2 bg-second rounded-circle-md space-y-2">
            <div className="text-warning text-lg">
              Ghế bạn đang chọn - {seatBooking.length} Ghế
            </div>
            <div className="flex flex-wrap gap-1">
              {seatBooking.length > 0 &&
                seatBooking.map((seat) => {
                  return (
                    <Button
                      className="!rounded-circle-md"
                      key={seat.seat_id}
                      buttonType="info"
                    >
                      {seat.seat_name}
                    </Button>
                  );
                })}
            </div>
          </div>
          <div className="w-full flex items-center p-2 bg-second rounded-circle-md space-x-2 text-lg">
            <span className="text-warning">Tổng tiền thanh toán: </span>
            <span className="text-success font-semibold">
              {totalAmount.toLocaleString()} VNĐ
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseSeat;
