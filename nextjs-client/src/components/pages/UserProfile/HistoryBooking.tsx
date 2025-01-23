/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect } from "react";
import HistoryBookingItem from "./HistoryBookingItem";
import HistoryBookingLoading from "./HistoryBookingLoading";
import { useUserAPIStore, useUserStore } from "~/stores/user.store";

const HistoryBooking = () => {
  const { isFetchBookingHistory, getUserBookingHistory } = useUserAPIStore();
  const { bookingHistory } = useUserStore();

  useEffect(() => {
    getUserBookingHistory();
  }, []);

  return (
    <div className="flex flex-col space-y-2 px-1 md:px-0">
      {isFetchBookingHistory && <HistoryBookingLoading />}
      {!isFetchBookingHistory && (
        <>
          {bookingHistory.length > 0 ? (
            bookingHistory.map((booking) => {
              return (
                <HistoryBookingItem key={booking.booking_id} data={booking} />
              );
            })
          ) : (
            <div className="text-center py-20 text-2xl text-instagram">
              Lịch sử đặt vé rỗng.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HistoryBooking;
