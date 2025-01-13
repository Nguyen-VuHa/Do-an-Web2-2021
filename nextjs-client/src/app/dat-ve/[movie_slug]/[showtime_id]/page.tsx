"use client";
import React from "react";
import ChooseSeat from "~/components/pages/BookingPage/ChooseSeat";
import ProgressBar from "~/components/pages/BookingPage/ProgressBar";

const BookingMain = () => {
  return (
    <div className="container mx-auto py-10 space-y-10">
      <ProgressBar />
      <ChooseSeat />
    </div>
  );
};

export default BookingMain;
