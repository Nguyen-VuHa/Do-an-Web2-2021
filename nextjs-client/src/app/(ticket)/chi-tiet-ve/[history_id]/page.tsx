import React from 'react'
import ImageCustom from '~/components/ui/ImageCustom'

const HistoryTicketPage = () => {
  return (
    <div
      className='w-full flex justify-center items-center h-auto px-3 md:px-0 text-typography'
    >
        <div className='w-full max-w-[600px] py-10 flex flex-col items-center'>
          <div className='w-[200px] h-[100px]'>
            <ImageCustom
              alt='NO LOGO'
              src="https://www.tiendauroi.com/wp-content/uploads/2020/02/bhd-star-cinema.png"
              width={200}
              height={150}
            />
          </div>
          <div className='flex flex-col space-y-2'>
            <span>Cảm ơn bạn đã sử dụng dịch vụ của BHD Star!</span>
            <span>- Vé của bạn đã được đặt thành công và sẵn sàng cho buổi chiếu. Chúng tôi rất vui khi bạn chọn chúng tôi để trải nghiệm những bộ phim tuyệt vời.</span>
            <span>- Dưới đây là thông tin chi tiết về vé của bạn. Vui lòng kiểm tra để đảm bảo mọi thứ đúng như mong muốn.</span>
            <span>- Chúng tôi hy vọng bạn sẽ có một buổi xem phim thật tuyệt vời và đáng nhớ!</span>
          </div>
          <div className='mt-10 flex flex-col items-center'>
              <span>Mã Vé</span>
              <span className='text-warning text-xl font-semibold text-center'>7da9382a-1b87-4821-b87b-205b61b5ac9a</span>

              <div className='w-[200px] h-[200px] my-10'>
                <ImageCustom 
                  imgClassName='w-full h-full'
                  src="https://blog.tcea.org/wp-content/uploads/2022/05/qrcode_tcea.org-1.png"
                  alt='NO QR CODE'
                  width={150}
                  height={150}
                />
              </div>

              <span className='text-center italic text-sm'>Quét mã QR tại quầy hoặc với nhân viên kiểm soát để nhận vé nhé.</span>
          </div>
          <div className='mt-10 flex flex-col space-y-2 text-center text-xl'>
              <span>Thời gian chiếu</span>
              <span className='font-semibold text-instagram'>10:40 08-01-2025</span>
          </div>
          <div className='mt-10 w-full flex flex-col justify-start space-y-2'>
            <span>Phim</span>
            <span className='font-semibold text-instagram uppercase'>Bé Ma Của Anh</span>
          </div>
          <div className='w-full grid grid-cols-1 gap-4 md:grid-cols-3 mt-5 text-xs md:text-sm'>
              <div className='w-full flex flex-col justify-start space-y-2'>
                <span>Phòng Chiếu</span>
                <span className='font-semibold text-instagram'>Screen 1</span>
              </div>
              <div className='w-full flex flex-col justify-start space-y-2'>
                <span>Số Vé</span>
                <span className='font-semibold text-instagram'>1</span>
              </div>
              <div className='w-full flex flex-col justify-start space-y-2'>
                <span>Ghế</span>
                <span className='font-semibold text-instagram'>A11, A22, A33, A44</span>
              </div>
            </div>
            <div className='w-full flex flex-col justify-start space-y-2 mt-5 text-xs md:text-sm'>
                <span>Rạp chiếu</span>
                <span className='font-semibold text-instagram'>BHD STAR THE GARDEN</span>
                <a href="#" className='font-semibold text-social-x italic underline'>Tầng 4, TTTM Garden Shopping Center, Phố Mễ Trì, P.Mỹ Đình 1, Quận Nam Từ Liêm, Hà Nội</a>
            </div>
            <div className='mt-5 w-full flex flex-col justify-start space-y-2'>
              <span className="text-lg font-bold mb-2">Thông tin thanh toán</span>
              <div className='flex justify-between items-center items-center'>
                <span>Phương thức thanh toán</span>
                <span>VN Pay</span>
              </div>
              <div className='flex justify-between items-center items-center'>
                <span>Giá vé</span>
                <span>100,000</span>
              </div>
            </div>
            <div className='mt-5 w-full flex justify-between items-center space-y-2 text-lg'>
              <span>Tổng tiền</span>
              <span className='font-semibold text-success uppercase'>100,000</span>
            </div>
        </div>
    </div>
  )
}

export default HistoryTicketPage