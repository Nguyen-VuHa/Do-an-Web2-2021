"use client";
import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useBookingAPIStore, useBookingStore } from "~/stores/booking.store";
import { useShowtimeStore } from "~/stores/showtime.store";
import { transferAmountToUSD } from "~/utils/common";
import { IBookingTicketForm } from "~/types/booking.type";
import { enqueueSnackbar } from "notistack";
import { PROCESS_SUCCESS } from "~/constants/status";

const PaypalButton: React.FC = () => {
  const { setStateBooking, seatBooking, bookingToken } =
    useBookingStore();
  const { showtimeDetail } = useShowtimeStore();
  const { isPostBookingTicket, postBookingTicket } = useBookingAPIStore();

  const totalAmount = (showtimeDetail?.unit_price || 0) * seatBooking.length;

  const handlePayment = async () => {
    const payload: IBookingTicketForm = {
      token: bookingToken,
      showtime_id: showtimeDetail?.showtime_id || "",
      movie_id: showtimeDetail?.movie.movie_id || "",
      screen_id: showtimeDetail?.screen.screen_id || -1,
      payment_method: "Paypal",
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

  return (
    <div className="relative">
      {isPostBookingTicket && (
        <div className="z-10 absolute top-0 left-0 w-ful h-full" />
      )}

      <PayPalScriptProvider
        options={{
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
        }}
      >
        <PayPalButtons
          className="w-full h-full"
          style={{
            layout: "horizontal",
            label: "paypal",
            tagline: false,
          }}
          createOrder={(data, actions) => {
            return actions.order.create({
              intent: "CAPTURE", // 🟢 Đây là trường bắt buộc
              purchase_units: [
                {
                  amount: {
                    value: transferAmountToUSD(totalAmount).toString(),
                    currency_code: "USD",
                  },
                  reference_id: "BOOKING_ORDER_ID",
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            if (!actions?.order) {
              console.error("actions.order is undefined!");
              return Promise.resolve();
            }

            const details = await actions.order.capture();
            console.log("Transaction completed by", details);
            await handlePayment();

            return;
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default PaypalButton;
