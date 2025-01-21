import React from 'react'

const NotificationItem = () => {
  return (
    <div
        className='p-2 flex space-x-2 cursor-pointer select-none rounded-md bg-layout bg-opacity-30
        text-typography text-sm
        hover:bg-warning hover:bg-opacity-50 hover:text-warning transition-all duration-300'
    >
        <div className='flex-shrink-0 w-[25%] h-full'>

        </div>
        <div className='flex flex-col space-y-2'>
            <span 
                className='overflow-hidden text-ellipsis line-clamp-3'
            >Vé của bạn đã được xác nhận. Hãy kiểm tra email của bạn để biết thông tin chi tiết.</span>
            <span className='text-xs italic text-success'>17:20 20/11/2024</span>
        </div>
    </div>
  )
}

export default NotificationItem