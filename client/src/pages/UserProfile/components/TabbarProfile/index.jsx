import React, { useState } from 'react';
import { ButtonTabbar } from './TabbarProfile.Style';

const TabbarProfile = () => {
    const [statusActive, setStatusActive] = useState(0);

    return (
        <div className="d-flex w-100">
            <ButtonTabbar
                className={statusActive === 0 ? "active" : ""}
                onClick={() => {
                    if(statusActive !== 0) 
                        setStatusActive(0)
                }}
            >
                Thông tin cá nhân
            </ButtonTabbar>
            <ButtonTabbar
                className={statusActive === 1 ? "active" : ""}
                onClick={() => {
                    if(statusActive !== 1) 
                        setStatusActive(1)
                }}
            >
                Lịch sử giao dịch
            </ButtonTabbar>
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
