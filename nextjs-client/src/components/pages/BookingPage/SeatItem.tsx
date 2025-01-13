import React from "react";
import { useBookingStore } from "~/stores/booking.store";
import { ISeatBooking } from "~/types/booking.type";
import { ISeatResponse } from "~/types/showtime.type";

interface SeatItemProps {
  seat: ISeatResponse;
}

const SeatItem: React.FC<SeatItemProps> = ({ seat }) => {
  const { seatBooking, setStateBooking } = useBookingStore();

  const isChoose = seatBooking.find(sBook => sBook.seat_id === seat.seat_id)

  let className = 'text-social-x bg-social-x bg-opacity-30 hover:bg-opacity-50'

  if(isChoose) {
    className = 'text-warning bg-warning bg-opacity-30 hover:bg-opacity-50'
  }

  return (
    <div
      className={`w-10 h-10 flex justify-center items-center
        rounded-circle-md ${className}
        `}
      
      onClick={() => {
        if(isChoose) {
          setStateBooking('seatBooking', seatBooking.filter(sBook => sBook.seat_id !== seat.seat_id))
        } else {
          const newSeat: ISeatBooking = {
            seat_id: seat.seat_id,
            seat_name: seat.seat_name,
          }

          setStateBooking('seatBooking', seatBooking.concat(newSeat))
        }
      }}
    >
      {seat.seat_name}
    </div>
  );
};

export default SeatItem;
