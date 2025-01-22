'use client'
import React from 'react'
import Button from '~/components/ui/Button'
import ImageCustom from '~/components/ui/ImageCustom'
import { FiEdit } from "react-icons/fi";
import { useUserStore } from '~/stores/user.store';
import { DEFAULT_AVATAR_USER } from "~/constants/user";

const UserInfo = () => {
    const { userInfo } = useUserStore();
  return (
    <div className='w-full px-5 mt-[-50px] flex items-center flex-col md:items-start md:flex-row md:space-x-4'>
        <div className='w-64 h-64 relative group p-3 flex-shrink-0'>
            <div className="absolute inset-0 bg-social-x/30 rounded-3xl transition-opacity blur-lg"></div>
            <ImageCustom 
                imgClassName='w-full h-full rounded-3xl'
                src={userInfo && userInfo.image_url || DEFAULT_AVATAR_USER}
                alt='NO AVATAR'
                width={100}
                height={100}
            />
        </div>
        <div className='pt-5 md:pt-[80px] flex flex-col space-y-2'>
            <div className='flex justify-center items-center space-x-4'>
                <span className='text-2xl font-semibold text-social-x uppercase'>{ userInfo.fullname || '-' }</span>
                <Button
                    className='w-10 h-10 !p-1 !rounded-md'
                    buttonType='info'
                >
                   <FiEdit size={18} />
                </Button>
            </div>
            <div className='flex flex-col space-y-2 text-warning italic text-sm font-light'>
                <span>Email: {userInfo.email || '-'}</span>
                <span>SĐT Đăng ký: {userInfo.phone_number || '-'}</span>
                <span>Ngày sinh: {userInfo.birth_day || '-'}</span>
                <span>Giới tính: {userInfo.gender || '-'}</span>
            </div>
        </div>
    </div>
  )
}

export default UserInfo