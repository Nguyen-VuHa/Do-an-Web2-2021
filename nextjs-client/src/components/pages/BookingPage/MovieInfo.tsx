import React from 'react'
import ImageCustom from '~/components/ui/ImageCustom'

const MovieInfo = () => {
  return (
    <div className='flex w-full p-2 rounded-circle-md bg-second space-x-4'>
        <div className='w-[20%] h-full'>
            <ImageCustom 
                imgClassName='w-full h-full overflow-hidden rounded-circle-md'
                src='https://res.cloudinary.com/cgv-vi-t-nam/image/upload/v1736125013/file-system/isvktrpg6qixnul5xcqh.jpg'
                alt='NO POSTER'
                width={100}
                height={120}
            />
        </div>
        <div className='flex flex-col space-y-2 text-warning'>
            <span>404 RUN RUN: CHẠY NGAY ĐI</span>
            <span>Giá vé: 100,000 đ</span>
            <span>Thời lượng: 104 phút</span>
            <span>Suất chiếu: 9:00</span>
            <span>9:00 ~ 11:20 13/01/2024</span>
        </div>
    </div>
  )
}

export default MovieInfo