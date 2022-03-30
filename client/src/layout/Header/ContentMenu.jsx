import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    ContentMenu,
    ItemMenu,
} from './Header.Style';
import { ButtonHeader } from 'src/style-common/Button.Style';

const ContentMenuHeader = () => {
    const [indexMenu, setIndexMenu] = useState(null);

    useEffect(() => {
        if(window.location.pathname === '/') 
            setIndexMenu(0);
        else if (window.location.pathname === '/system-cinema/cinema')
            setIndexMenu(1);
        else if (window.location.pathname === '/movie-showtimes/showtimes-by-movie') 
            setIndexMenu(2);    
        
        return () => setIndexMenu(null);
    }, [window.location.pathname]);

    return (
        <>
            <ContentMenu>
                <ItemMenu>
                    <Link to={ indexMenu === 0 ? '#' : '/' }>
                        <ButtonHeader content="Trang chủ" className={indexMenu === 0 ? 'active' : ''}>
                            <i className="fal fa-photo-video"></i>
                        </ButtonHeader>
                    </Link>
                </ItemMenu>
                <ItemMenu>
                    <Link to={ indexMenu === 1 ? '#' : '/system-cinema/cinema' }>
                        <ButtonHeader content="Hệ thống rạp phim" className={indexMenu === 1 ? 'active' : ''}>
                            <i className="fal fa-pallet-alt"></i>
                        </ButtonHeader>
                    </Link>
                </ItemMenu>
                <ItemMenu>
                    <Link to={ indexMenu === 2 ? '#' : '/movie-showtimes/showtimes-by-movie' }>
                        <ButtonHeader content="Lịch chiếu" className={indexMenu === 2 ? 'active' : ''}>
                            <i className="fal fa-calendar-alt"></i>
                        </ButtonHeader>
                    </Link>
                </ItemMenu>
                <ItemMenu>
                    <Link to="#">
                        <ButtonHeader content="Khuyến mãi">
                            <i className="fad fa-ad"></i>
                        </ButtonHeader>
                    </Link>
                </ItemMenu>
            </ContentMenu>
        </>
    );
};

export default ContentMenuHeader;
