import React from "react";
import TabControl from "./TabControl";
import HistoryBooking from "./HistoryBooking";

const ProfileTab = () => {
  return (
    <div className="mt-10 space-y-2">
      <TabControl />
      <HistoryBooking />
    </div>
  );
};

export default ProfileTab;
