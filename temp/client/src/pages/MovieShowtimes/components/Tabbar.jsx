import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { ButtonTabbar } from 'src/style-common/Button.Style';

const TabBar = () => {
    const match = useRouteMatch();
    const [isActive, setIsActive] = useState(0);

    useEffect(() => {
        if(window.location.pathname === `${match.url}/showtimes-by-movie`) 
            setIsActive(0)
        if(window.location.pathname === `${match.url}/showtimes-by-cinema`) 
            setIsActive(1)
    }, [window.location.pathname]);

    return (
        <div className="d-flex align-items-center w-100 mt-5 container">
            <Link className="text-decorection-none" to={`${match.url}/showtimes-by-movie`}>
                <ButtonTabbar 
                    className={isActive === 0 ? "active" : ""}
                >
                    Lịch chiếu theo phim
                </ButtonTabbar>
            </Link>
            <Link className="text-decorection-none" to={`${match.url}/showtimes-by-cinema`}>
                <ButtonTabbar 
                    className={isActive === 1 ? "active" : ""}
                >
                    Lịch chiếu theo rạp
                </ButtonTabbar>
            </Link>
            
        </div>
    );
};


export default TabBar;
