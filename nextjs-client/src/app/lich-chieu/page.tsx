import { redirect } from "next/navigation";

export const metadata = {
  title: "Lịch chiếu - BHD Star",
};

const ShowtimeMain = () => {
  redirect("/lich-chieu/lich-theo-phim");
};

export default ShowtimeMain;
