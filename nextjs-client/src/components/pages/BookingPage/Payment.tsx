/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import { GrFormPreviousLink } from "react-icons/gr";
import VNPayIcon from "~/assets/imgs/vnpay-icon.png";
import Button from "~/components/ui/Button";
import { useBookingAPIStore, useBookingStore } from "~/stores/booking.store";
import { useShowtimeStore } from "~/stores/showtime.store";
import MovieInfo from "./MovieInfo";
import { IBookingTicketForm } from "~/types/booking.type";
import { PROCESS_SUCCESS } from "~/constants/status";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";
import PaypalButton from "./PaypalButton";

const Payment = () => {
  const { setStateBooking, processBooking, seatBooking, bookingToken } =
    useBookingStore();
  const { showtimeDetail } = useShowtimeStore();
  const { isPostBookingTicket, postBookingTicket } = useBookingAPIStore();

  const totalAmount = (showtimeDetail?.unit_price || 0) * seatBooking.length;

  const handlePayment = async () => {
    const payload: IBookingTicketForm = {
      token: bookingToken,
      showtime_id: showtimeDetail?.showtime_id || "",
      movie_id: showtimeDetail?.movie.movie_id || "",
      payment_method: "VN Pay",
      screen_id: showtimeDetail?.screen.screen_id || -1,
      seats: seatBooking,
    };

    const resBooking = await postBookingTicket(payload);

    if (resBooking.status === PROCESS_SUCCESS) {
      setStateBooking("processBooking", 3);
      enqueueSnackbar(resBooking.message, { variant: "success" });
    } else {
      enqueueSnackbar(resBooking.message, { variant: "error" });
    }
  };

  useEffect(() => {
    if (seatBooking.length <= 0) {
      setStateBooking("processBooking", 1);
    }
  }, [seatBooking]);

  return (
    <div className="space-y-4 w-full flex flex-col items-center">
      <div className="w-full md:w-[50%] space-y-1">
        <MovieInfo />
        <div className="w-full p-2 bg-second rounded-circle-md space-y-2">
          <div className="text-warning text-lg">Vị trí ghế ngồi</div>
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
        <div className="flex flex-col justify-center items-center space-y-2">
          <Button
            className="w-full h-[50px] flex flex-col justify-center items-center space-y-2 rounded-sm bg-typography bg-opacity-70"
            onClick={() => {
              handlePayment();
            }}
            isLoading={isPostBookingTicket}
          >
            <Image width={100} height={80} alt="NO LOGO" src={VNPayIcon} />
          </Button>
          <PaypalButton />
        </div>
      </div>
      <Button
        className="flex items-center space-x-2"
        buttonType="warning"
        onClick={() => {
          if (!isPostBookingTicket)
            setStateBooking("processBooking", processBooking - 1);
        }}
      >
        <GrFormPreviousLink size={22} />
        <span>Quay lại chọn ghế</span>
      </Button>
    </div>
  );
};

export default Payment;
