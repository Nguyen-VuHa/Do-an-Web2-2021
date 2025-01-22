import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// Kích hoạt plugin relativeTime
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

import "dayjs/locale/vi";

dayjs.locale("vi");
// Hàm xử lý
export const formatTime = (date: Date): string => {
  const now = dayjs().tz("Asia/Ho_Chi_Minh"); // Hiện tại theo múi giờ VN
  const targetDate = dayjs(date).tz("Asia/Ho_Chi_Minh").add(7, "hour"); // cộng cho đủ giờ VN :>

  // Nếu thời gian cách hiện tại ít hơn 1 tuần
  if (now.diff(targetDate, "week") < 1) {
    return targetDate.fromNow(); // Hiển thị thời gian tương đối bằng tiếng Việt
  }

  // Nếu thời gian hơn 1 tuần
  return targetDate.format("HH:mm DD-MM-YYYY"); // Định dạng cụ thể
};
