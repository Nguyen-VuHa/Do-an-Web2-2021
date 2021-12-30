import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { 
    ContentMenu,
    ItemMenu,
} from './Header.Style';
import { ButtonHeader } from 'src/style-common/Button.Style';

const ContentMenuHeader = () => {
    const [indexMenu, setIndexMenu] = useState(null);
    const match = useRouteMatch();

    useEffect(() => {
        if(match.url === '/') 
            setIndexMenu(0);

        return () => setIndexMenu(null);
    }, [match]);

    

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
                    <Link to="#">
                        <ButtonHeader content="Hệ thống rạp phim">
                            <i className="fal fa-pallet-alt"></i>
                        </ButtonHeader>
                    </Link>
                </ItemMenu>
                <ItemMenu>
                    <Link to="#">
                        <ButtonHeader content="Lịch chiếu">
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
