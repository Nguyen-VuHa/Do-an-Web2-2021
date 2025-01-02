import React, { ReactNode } from 'react'
import MenuItem from './MenuItem'
import MovieDashboardIcon from '~/assets/imgs/movie-dashboard.svg'
import CinemaIcon from '~/assets/imgs/cinema.svg'
import ShowtimeIcon from '~/assets/imgs/showtime.svg'

interface IMenuData {
    id: number;
    menuName: string;
    icon: ReactNode;
}

const MenuData: IMenuData[]  = [
    {
        id: 1,
        menuName: 'Trang Chủ',
        icon: <MovieDashboardIcon width={40} />,
    },
    {
        id: 2,
        menuName: 'Hệ thống rạp',
        icon: <CinemaIcon width={40} />,
    },
    {
        id: 3,
        menuName: 'Lịch chiếu phim',
        icon: <ShowtimeIcon width={40} />,
    }
]

const Menu = () => {
  return (
    <nav className='w-fit h-full select-none flex justify-between items-center space-x-1'>
        {
            MenuData.map((menu) => {
                return  <MenuItem 
                    key={menu.id}
                    menuName={menu.menuName}
                    icon={menu.icon}
                />
            })
        }
       
    </nav>
  )
}

export default Menu