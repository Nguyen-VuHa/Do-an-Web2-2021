"use client"
import React from 'react'
import NotificationItem from './NotificationItem'
import { TbBellXFilled } from "react-icons/tb";

const NotificationList = () => {
  return (
    <div 
        className='w-full h-auto max-h-[600px] overflow-hidden hover:overflow-auto '
    >
        <div className='flex flex-col justify-center items-center space-y-2 px-4 pt-10 text-social-x'>
          <TbBellXFilled size={60} />
          <span className='text-lg'>Không có thông báo nào.</span>
        </div>
        <div className='px-4 pb-4 space-y-2'>
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
        </div>
    </div>
  )
}

export default NotificationList