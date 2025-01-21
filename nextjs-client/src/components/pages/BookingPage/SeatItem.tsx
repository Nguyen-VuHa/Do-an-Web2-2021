import { useParams } from "next/navigation";
import React from "react";
import {
  SOCKET_BOOKING_TICKET,
  SOCKET_SEAT_DESELECTED,
  SOCKET_SEAT_SELECTED,
} from "~/constants/socket";
import { useBookingStore } from "~/stores/booking.store";
import useSocketStore from "~/stores/socket.store";
import { ISeatBooking } from "~/types/booking.type";
import { ISeatResponse } from "~/types/showtime.type";

interface SeatItemProps {
  seat: ISeatResponse;
}

const SeatItem: React.FC<SeatItemProps> = ({ seat }) => {
  const { showtime_id } = useParams();
  const { seatBooking, setStateBooking } = useBookingStore();
  const { socket } = useSocketStore();

  const isChoose = seatBooking.find((sBook) => sBook.seat_id === seat.seat_id);

  let className = "text-social-x bg-social-x bg-opacity-30 hover:bg-opacity-50";

  if (isChoose) {
    className = "text-warning bg-warning bg-opacity-30 hover:bg-opacity-50";
  }

  if (seat.status === 2) {
    className = "text-typography bg-typography bg-opacity-30";
  }

  return (
    <div
      className={`w-10 h-10 flex justify-center items-center cursor-pointer
        rounded-circle-md ${className}
        `}
      onClick={() => {
        if (seat.status === 1) {
          if (isChoose) {
            setStateBooking(
              "seatBooking",
              seatBooking.filter((sBook) => sBook.seat_id !== seat.seat_id),
            );

            if (socket) {
              // gửi tín hiệu xoá seats
              socket.emit(SOCKET_BOOKING_TICKET, {
                ...isChoose,
                status: SOCKET_SEAT_DESELECTED,
                showtime_id: showtime_id,
              });
            }
          } else {
            const newSeat: ISeatBooking = {
              seat_id: seat.seat_id,
              seat_name: seat.seat_name,
            };

            setStateBooking("seatBooking", seatBooking.concat(newSeat));

            if (socket) {
              // gửi tín hiệu thêm seats
              socket.emit(SOCKET_BOOKING_TICKET, {
                ...newSeat,
                status: SOCKET_SEAT_SELECTED,
                showtime_id: showtime_id,
              });
            }
          }
        }
      }}
    >
      {seat.seat_name}
    </div>
  );
};

export default SeatItem;
