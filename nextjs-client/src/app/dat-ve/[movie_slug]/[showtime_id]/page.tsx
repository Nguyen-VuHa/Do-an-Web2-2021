/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import BookingSuccess from "~/components/pages/BookingPage/BookingSuccess";
import ChooseSeat from "~/components/pages/BookingPage/ChooseSeat";
import Payment from "~/components/pages/BookingPage/Payment";
import ProgressBar from "~/components/pages/BookingPage/ProgressBar";
import {
  SOCKET_BOOKING_SEAT_DELETED,
  SOCKET_BOOKING_SEAT_IN_ROOM,
  SOCKET_BOOKING_SEAT_LIST,
  SOCKET_DISCONNECTION,
  SOCKET_JOIN_BOOKING_ROOM,
  SOCKET_LEAVE_BOOKING_ROOM,
  SOCKET_SEAT_DESELECTED,
  SOCKET_SEAT_SELECTED,
} from "~/constants/socket";
import { useBookingStore } from "~/stores/booking.store";
import { useShowtimeStore } from "~/stores/showtime.store";
import useSocketStore from "~/stores/socket.store";
import { useUserStore } from "~/stores/user.store";
import { ISeatBooking } from "~/types/booking.type";
import { generateRandomString } from "~/utils/random";

const BookingMain = () => {
  const { showtime_id } = useParams();
  const { reqFetchShowtimeDetail, seatMap, setStateShowtime } =
    useShowtimeStore();
  const { processBooking, setStateBooking, resetStateBooking, seatBooking } =
    useBookingStore();
  const { userInfo } = useUserStore();
  const { socket } = useSocketStore();

  const [seatSocketChanged, setSeatSocketChanged] = useState<any>(null)
  const [seatListFirlLoad, setSeatListFirlLoad] = useState<any>(null)
  const [seatDeleted, setSeatDeleted] = useState<any>(null)

  useEffect(() => {
    if(seatListFirlLoad && seatListFirlLoad.length > 0) {
      seatListFirlLoad.map((dt) => {
        if (dt[userInfo.user_id]) {
          const seats = dt[userInfo.user_id] as ISeatBooking[];

          const updatedSeats = [...seatBooking, ...seats].filter(
            (value, index, self) =>
              index === self.findIndex((t) => t.seat_id === value.seat_id),
          );

          setStateBooking("seatBooking", updatedSeats);
        } else {
          const userIds = Object.keys(dt); // Lấy tất cả các user_id (key)

          const seatSelected: ISeatBooking[] = [];

          for (const userId of userIds) {
            if (dt[userId] && Array.isArray(dt[userId])) {
              // Kiểm tra xem dt[userId] có phải là mảng không
              const seats = dt[userId] as ISeatBooking[]; // Lấy giá trị mảng ghế
              seatSelected.push(...seats);
            }
          }

          const seatMapUpdate = seatMap;

          seatSelected.forEach((seatSelect) => {
            seatMapUpdate.forEach((seatUpdate, index) => {
              if (seatSelect.seat_id === seatUpdate.seat_id) {
                seatMapUpdate[index].status = 2;
                return;
              }
            });
          });

          setStateShowtime("seatMap", seatMapUpdate);
        }
      });
    }
  }, [seatListFirlLoad])
  
  useEffect(() => {
    if(seatSocketChanged) {
      switch (seatSocketChanged.seat.status) {
        case SOCKET_SEAT_SELECTED:
          if (userInfo.user_id === seatSocketChanged.user_id) { 
            const addSeat = [...seatBooking, seatSocketChanged.seat as ISeatBooking];
            setStateBooking("seatBooking", addSeat);
          } else {
            setStateShowtime("seatMap", seatMap.map(seatM => seatM.seat_id === seatSocketChanged.seat.seat_id ? {...seatM, status: 2} : seatM));
          }
          break;
        case SOCKET_SEAT_DESELECTED:
          if (userInfo.user_id === seatSocketChanged.user_id) { 
            let seatTemp = seatBooking;
              seatTemp = seatBooking.filter(
                (seat) => seat.seat_id !== seatSocketChanged.seat.seat_id,
              );
            setStateBooking("seatBooking", seatTemp);
           } else {
            setStateShowtime("seatMap", seatMap.map(seatM => seatM.seat_id === seatSocketChanged.seat.seat_id ? {...seatM, status: 1} : seatM));
           }
          break;
        default:
          break;
      }
    }
  }, [seatSocketChanged])
  
  useEffect(() => {
    if(seatDeleted) {
      if (seatDeleted[userInfo.user_id]) {
        const seats = seatDeleted[userInfo.user_id] as ISeatBooking[];

        const idsToRemoveValues = seats.map(item => item.seat_id);

        const updatedSeats = seatBooking.filter(item => !idsToRemoveValues.includes(item.seat_id));

        setStateBooking("seatBooking", updatedSeats);
      } else {
        const userIds = Object.keys(seatDeleted); // Lấy tất cả các user_id (key)

        const seatSelected: ISeatBooking[] = [];

        for (const userId of userIds) {
          if (seatDeleted[userId] && Array.isArray(seatDeleted[userId])) {
            // Kiểm tra xem dt[userId] có phải là mảng không
            const seats = seatDeleted[userId] as ISeatBooking[]; // Lấy giá trị mảng ghế
            seatSelected.push(...seats);
          }
        }

        const seatMapUpdate = seatMap;

        seatSelected.forEach((seatSelect) => {
          seatMapUpdate.forEach((seatUpdate, index) => {
            if (seatSelect.seat_id === seatUpdate.seat_id) {
              seatMapUpdate[index].status = 1;
              return;
            }
          });
        });

        setStateShowtime("seatMap", seatMapUpdate);
      }
    }
  }, [seatDeleted])
  

  useEffect(() => {
    if (socket) {
      // neus co socket thi join room booking
      socket.emit(SOCKET_JOIN_BOOKING_ROOM, showtime_id);

      socket.on(SOCKET_BOOKING_SEAT_LIST, (data) => {
        setSeatListFirlLoad(data);
      });

      socket.on(SOCKET_BOOKING_SEAT_IN_ROOM, (data) => {
        setSeatSocketChanged(data);
      });

      socket.on(SOCKET_BOOKING_SEAT_DELETED, (data) => {
        setSeatDeleted(data)
      })

      socket.on(SOCKET_DISCONNECTION, () => {
        // Đảm bảo gửi tín hiệu rời phòng khi socket bị ngắt kết nối
        socket.emit(SOCKET_LEAVE_BOOKING_ROOM, showtime_id);
      });

      return () => {
        socket.emit(SOCKET_LEAVE_BOOKING_ROOM, showtime_id);
      };
    }
  }, [socket]);

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

  // useEffect(() => {
  //   // Kết nối SSE với cả userId và token
  //   if (userInfo) {
  //     const urlListenEventBooking =
  //       process.env.NEXT_PUBLIC_API_URL +
  //       `/status/events/booking/${userInfo.user_id}?showtime_id=${showtime_id}&token=${bookingToken}`;
  //     const eventSource = new EventSource(urlListenEventBooking);

  //     eventSource.onopen = () => {
  //       console.log("Connection opened");
  //     };

  //     eventSource.onmessage = (event) => {
  //       try {
  //         const dataParse = JSON.parse(event.data);
  //         const { data } = dataParse;

  //         setTimeout(() => {
  //           setStateBooking("processBooking", 4);
  //           setStateBooking("statusBooking", data.status);
  //           setStateBooking("errorMessage", data.message);
  //         }, 500);
  //       } catch (err) {
  //         console.error("Error parsing data:", err);
  //       }
  //     };

  //     eventSource.onerror = (err) => {
  //       console.error("Connection error:", err);
  //     };

  //     // Đóng kết nối khi component bị hủy
  //     return () => {
  //       eventSource.close();
  //     };
  //   }
  // }, [userInfo, bookingToken]);

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
