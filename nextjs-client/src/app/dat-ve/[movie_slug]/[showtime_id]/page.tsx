/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import BookingSuccess from "~/components/pages/BookingPage/BookingSuccess";
import ChooseSeat from "~/components/pages/BookingPage/ChooseSeat";
import Payment from "~/components/pages/BookingPage/Payment";
import ProgressBar from "~/components/pages/BookingPage/ProgressBar";
import { useBookingStore } from "~/stores/booking.store";
import { useShowtimeStore } from "~/stores/showtime.store";
import { useUserStore } from "~/stores/user.store";
import { generateRandomString } from "~/utils/random";

const BookingMain = () => {
  const { showtime_id } = useParams();
  const { reqFetchShowtimeDetail } = useShowtimeStore();
  const { processBooking, setStateBooking, resetStateBooking, bookingToken } = useBookingStore();
  const { userInfo } = useUserStore();

  
  useEffect(() => {
    document.title = "Đặt vé - BHD Star";

    if (showtime_id) {
      reqFetchShowtimeDetail(showtime_id as string);

      const bookingToken = generateRandomString(20); // token độ dài 20 ký tự
      setStateBooking("bookingToken", bookingToken);
    }

    return () => {
      resetStateBooking();
    };
  }, []);

  useEffect(() => {
    // Kết nối SSE với cả userId và token
    if (userInfo) {
      const urlListenEventBooking =
        process.env.NEXT_PUBLIC_API_URL +
        `/status/events/booking/${userInfo.user_id}?showtime_id=${showtime_id}&token=${bookingToken}`;
      const eventSource = new EventSource(urlListenEventBooking);

      eventSource.onopen = () => {
        console.log("Connection opened");
      };

      eventSource.onmessage = (event) => {
        try {
          const dataParse = JSON.parse(event.data);
          const { data } = dataParse;
          
          setTimeout(() => {
            setStateBooking("processBooking", 4);
            setStateBooking('statusBooking', data.status)
            setStateBooking('errorMessage', data.message)
          }, 500);
        } catch (err) {
          console.error("Error parsing data:", err);
        }
      };

      eventSource.onerror = (err) => {
        console.error("Connection error:", err);
      };

      // Đóng kết nối khi component bị hủy
      return () => {
        eventSource.close();
      };
    }
  }, [userInfo, bookingToken]);

  return (
    <div className="container mx-auto py-10 space-y-10">
      <ProgressBar />
      {processBooking === 1 && <ChooseSeat />}
      {processBooking === 2 && <Payment />}
      {processBooking >= 3 && <BookingSuccess />}
    </div>
  );
};

export default BookingMain;
