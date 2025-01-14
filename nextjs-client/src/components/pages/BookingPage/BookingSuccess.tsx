/* eslint-disable react-hooks/exhaustive-deps */
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";
import { useBookingStore } from "~/stores/booking.store";
import { useGlobalStore } from "~/stores/global.store";
import NotifyFailed from "./NotifyFailed";
import NotifyWaiting from "./NotifyWaiting";
import NotifySuccess from "./NotifySuccess";

const BookingSuccess = () => {

  const { processBooking, statusBooking, errorMessage } = useBookingStore();

  const { setStateGlobal } = useGlobalStore();


  useEffect(() => {
    if (processBooking === 3) {
      setStateGlobal("isDisableScreen", true);
    } else {
      setStateGlobal("isDisableScreen", false);
    }
  }, [processBooking]);

  useEffect(() => {
    if (statusBooking === "success") {
      enqueueSnackbar(errorMessage, { variant: "success" });
    }

    if (statusBooking === "failed") {
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  }, [errorMessage, statusBooking]);

  console.log(processBooking);

  return (
    <div className="px-5 md:px-0 flex flex-col space-y-5 justify-center items-center">
      {processBooking === 3 && <NotifyWaiting />}

      {processBooking > 3 && (
        <>
          {statusBooking === "success" ? <NotifySuccess /> : <NotifyFailed />}
        </>
      )}
    </div>
  );
};

export default BookingSuccess;
