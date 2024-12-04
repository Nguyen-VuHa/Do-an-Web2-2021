import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from 'src/contexts/authContext';
import { ButtonTabbar } from './TabbarProfile.Style';

const TabbarProfile = () => {
    const [statusActive, setStatusActive] = useState(0);
    const {state} = useContext(AuthContext);

    useEffect(() => {
        if(window.location.pathname.includes('/profile/infomation'))
            setStatusActive(0);
        if(window.location.pathname.includes('/profile/history-transaction'))
            setStatusActive(1);
    }, [window.location.pathname]);
    
    
    return (
        <div className="d-flex w-100">
            <Link to={state?.idUser ? `/profile/infomation/${state?.idUser}` : '#'}>
                <ButtonTabbar
                    className={statusActive === 0 ? "active" : ""}
                    onClick={() => {
                        if(statusActive !== 0) 
                            setStatusActive(0)
                    }}
                >
                    Thông tin cá nhân
                </ButtonTabbar>
            </Link>
            <Link to={state?.idUser ? `/profile/history-transaction/${state?.idUser}` : '#'}>
                <ButtonTabbar
                    className={statusActive === 1 ? "active" : ""}
                    onClick={() => {
                        if(statusActive !== 1) 
                            setStatusActive(1)
                    }}
                >
                    Lịch sử giao dịch
                </ButtonTabbar>
            </Link>
            <ButtonTabbar
             className={statusActive === 2 ? "active" : ""}
                onClick={() => {
                    if(statusActive !== 2) 
                        setStatusActive(2)
                }}
            >
                Lịch sử đặt vé
            </ButtonTabbar>

        </div>
    );
};

export default TabbarProfile;
