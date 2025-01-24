import dayjs from "dayjs";
import { cookies } from "next/headers";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import { apiGetDetailBookingHistory } from "~/apis/user.api";
import ImageCustom from "~/components/ui/ImageCustom";
import { ACCESS_TOKEN } from "~/constants/cookies";
import { STATUS_SUCCESS } from "~/constants/status";
import { generateQRCode } from '~/utils/qrCode';

interface Params {
  history_id: string;
}

export const metadata = {
  title: "Chi tiết vé - BHD Star",
};

const HistoryTicketPage = async ({ params }: { params: Params }) => {
  const { history_id } = params;
  try {
    // Lấy cookies từ server
    const cookieStore = cookies();
    const accessToken = cookieStore.get(ACCESS_TOKEN)?.value;

    const { data, statusCode } = await apiGetDetailBookingHistory(
      history_id,
      accessToken || "",
    );

    if (statusCode !== STATUS_SUCCESS) {
      notFound();
    }

    const qrCodeBase64 = await generateQRCode(data?.booking_id || '');

    return (
      <div className="w-full flex justify-center items-center h-auto px-3 md:px-0 text-typography">
        <div className="w-full max-w-[600px] py-10 flex flex-col items-center">
          <div className="w-[200px] h-[100px]">
            <ImageCustom
              alt="NO LOGO"
              src="https://www.tiendauroi.com/wp-content/uploads/2020/02/bhd-star-cinema.png"
              width={200}
              height={150}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <span>Cảm ơn bạn đã sử dụng dịch vụ của BHD Star!</span>
            <span>
              - Vé của bạn đã được đặt thành công và sẵn sàng cho buổi chiếu.
              Chúng tôi rất vui khi bạn chọn chúng tôi để trải nghiệm những bộ
              phim tuyệt vời.
            </span>
            <span>
              - Dưới đây là thông tin chi tiết về vé của bạn. Vui lòng kiểm tra
              để đảm bảo mọi thứ đúng như mong muốn.
            </span>
            <span>
              - Chúng tôi hy vọng bạn sẽ có một buổi xem phim thật tuyệt vời và
              đáng nhớ!
            </span>
          </div>
          <div className="mt-10 flex flex-col items-center">
            <span>Mã Vé</span>
            <span className="text-warning text-xl font-semibold text-center">
              {data?.booking_id}
            </span>

            <div className="w-[200px] h-[200px] my-10">
              <Image
                className="w-full h-full"
                src={qrCodeBase64}
                alt="NO QR CODE"
                width={150}
                height={150}
              />
            </div>

            <span className="text-center italic text-sm">
              Quét mã QR tại quầy hoặc với nhân viên kiểm soát để nhận vé nhé.
            </span>
          </div>
          <div className="mt-10 flex flex-col space-y-2 text-center text-xl">
            <span>Thời gian chiếu</span>
            <span className="font-semibold text-instagram">
              {dayjs(data?.showtime).format("HH:mm DD-MM-YYYY")}
            </span>
          </div>
          <div className="mt-10 w-full flex flex-col justify-start space-y-2">
            <span>Phim</span>
            <span className="font-semibold text-instagram uppercase">
              {data?.movie_name}
            </span>
          </div>
          <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-3 mt-5 text-xs md:text-sm">
            <div className="w-full flex flex-col justify-start space-y-2">
              <span>Phòng Chiếu</span>
              <span className="font-semibold text-instagram">
                {data?.screen_name}
              </span>
            </div>
            <div className="w-full flex flex-col justify-start space-y-2">
              <span>Số ghế</span>
              <span className="font-semibold text-instagram">
                {data?.total_seat}
              </span>
            </div>
            <div className="w-full flex flex-col justify-start space-y-2">
              <span>Ghế</span>
              <span className="font-semibold text-instagram">
                {data?.seats.join(", ")}
              </span>
            </div>
          </div>
          <div className="w-full flex flex-col justify-start space-y-2 mt-5 text-xs md:text-sm">
            <span>Rạp chiếu</span>
            <span className="font-semibold text-instagram">
              {data?.cinema_name}
            </span>
            <a
              href={`https://www.google.com/maps?q=${data?.address}`}
              className="font-semibold text-social-x italic underline"
            >
              {data?.address}
            </a>
          </div>
          <div className="mt-5 w-full flex flex-col justify-start space-y-2">
            <span className="text-lg font-bold mb-2">Thông tin thanh toán</span>
            <div className="flex justify-between items-center items-center">
              <span>Phương thức thanh toán</span>
              <span>VN Pay</span>
            </div>
            <div className="flex justify-between items-center items-center">
              <span>Giá vé</span>
              <span> {data?.unit_price.toLocaleString()}</span>
            </div>
          </div>
          <div className="mt-5 w-full flex justify-between items-center space-y-2 text-lg">
            <span>Tổng tiền</span>
            <span className="font-semibold text-success uppercase">
              {data?.total_amount.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    notFound();
  }
};

export default HistoryTicketPage;
