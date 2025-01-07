import React from 'react'
import ImageCustom from '~/components/ui/ImageCustom'
import CinemaInfoItem from './CinemaInfoItem'

const CinemaDetaiLeftContent = () => {
  return (
    <div className='col-span-3 space-y-4 bg-second p-4 rounded-circle-md'>
        <CinemaInfoItem 
            title="Địa điểm:"
            content="Tầng 4, TTTM Garden Shopping Center, Phố Mễ Trì, P.Mỹ Đình 1, Quận Nam Từ Liêm, Hà Nội"
        />
        <CinemaInfoItem 
            title="Số điện thoại:"
            content="1900 2099 hoặc 024 3206 8678"
        />
        <CinemaInfoItem 
            title="Email:"
            content="cskh@bhdstar.vn"
        />
        <CinemaInfoItem 
            title="Phòng chiếu:"
            content="6 Phòng chiếu 2D & 3D. Ghế First Class"
        />
        <hr />
        <div>
            <ImageCustom 
                src='https://bhdstar.vn/wp-content/uploads/2023/12/t5_20230903093748782.jpg'
                imgClassName='w-full rounded-circle-md'
                alt='NO FARE'
                width={1024}
                height={720}
            />
        </div>
        <div className='text-instagram text-lg font-semibold'>CÁC QUY ĐỊNH GIÁ VÉ</div>
        <div className='text-warning space-y-1'>
            <p>- Giá vé trẻ em áp dụng cho trẻ em có chiều cao dưới 1,3m. Yêu cầu trẻ em có mặt khi mua vé. Trẻ em dưới 0,7m sẽ được miễn phí vé khi mua cùng 01 vé người lớn đi kèm theo. Không áp dụng kèm với chương trình khuyến mãi ưu đãi về giá vé khác.</p>
            <p>- Giá vé thành viên U22 chỉ áp dụng cho thành viên dưới 22 tuổi khi mua vé. Không áp dụng kèm với chương trình khuyến mãi ưu đãi về giá vé khác. Mỗi thẻ thành viên U22 được áp dụng giá vé ưu đãi tối đa 02 vé/ngày.</p>
            <p>- Ngày lễ: 1/1, Giổ Tổ Hùng Vương 10/3 Âm Lịch, 30/4, 1/5, 02 Ngày Lễ Quốc Khánh.</p>
            <p>- Giá vé Tết Âm Lịch sẽ được áp dụng riêng.</p>
            <p>- Suất chiếu đặc biệt áp dụng giá vé theo khung giờ của ngày. Không áp dụng các giá vé ưu đãi dành cho  Privilege Voucher/ Staff Voucher, Happy Day. Trong trường hợp Suất chiếu đặc biệt cùng ngày với Happy Day sẽ áp dụng giá vé của Thứ 3.
            </p>
        </div>
    </div>
  )
}

export default CinemaDetaiLeftContent