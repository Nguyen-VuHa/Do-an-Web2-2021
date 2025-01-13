/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import ChooseSeat from "~/components/pages/BookingPage/ChooseSeat";
import Payment from "~/components/pages/BookingPage/Payment";
import ProgressBar from "~/components/pages/BookingPage/ProgressBar";
import { useBookingStore } from "~/stores/booking.store";
import { useShowtimeStore } from "~/stores/showtime.store";

const BookingMain = () => {
  const { showtime_id } = useParams();
  const { reqFetchShowtimeDetail } = useShowtimeStore();
  const { processBooking } = useBookingStore()

  useEffect(() => {
    document.title = 'Đặt vé - BHD Star';
    
    if (showtime_id) {
      reqFetchShowtimeDetail(showtime_id as string);
    }
  }, []);

  return (
    <div className="container mx-auto py-10 space-y-10">
      <ProgressBar />
      { processBooking === 1 && <ChooseSeat />}
      { processBooking === 2 && <Payment />}
    </div>
  );
};

export default BookingMain;
