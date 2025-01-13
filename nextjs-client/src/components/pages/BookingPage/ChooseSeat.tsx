import React from 'react'
import Button from '~/components/ui/Button'
import { GrFormNextLink } from "react-icons/gr";
import SeatMap from './SeatMap';
import MovieInfo from './MovieInfo';

const ChooseSeat = () => {
  return (
    <div className='space-y-4 w-full flex flex-col items-center'>
        {/* Map */}
        <div className='w-full px-5 grid grid-cols-1 gap-4 md:px-0 lg:grid-cols-5'>
            <div className='lg:col-span-3 w-full'>
                <SeatMap />
            </div>
            <div className='lg:col-span-2 space-y-2'>
                <MovieInfo />
                <div className='w-full p-2 bg-second rounded-circle-md space-y-2'>
                    <div className='text-warning text-lg'>Ghế bạn đang chọn</div>
                    <div className='flex flex-wrap gap-1'>
                        <Button
                            buttonType='error'
                        >
                            G13
                        </Button>
                        <Button
                        buttonType='error'
                        >
                            G13
                        </Button>
                        <Button
                            buttonType='error'
                        >
                            G13
                        </Button>
                    </div>
                </div>
                <div className='w-full flex items-center p-2 bg-second rounded-circle-md space-x-2 text-lg'>
                    <span className='text-warning'>Tổng tiền thanh toán: </span>
                    <span className='text-success font-semibold'>300,000 VNĐ</span>
                </div>
            </div>
        </div>

        {/* Next step */}
        <Button
            className='flex items-center space-x-2'
            buttonType='warning'
        >
            <span>Thanh toán</span>
            <GrFormNextLink size={22}/>
        </Button>
    </div>
  )
}

export default ChooseSeat