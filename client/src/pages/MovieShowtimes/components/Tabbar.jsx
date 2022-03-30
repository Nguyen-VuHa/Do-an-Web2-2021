import React from 'react';
import { ButtonTabbar } from 'src/style-common/Button.Style';

const TabBar = () => {
    return (
        <div className="d-flex align-items-center w-100 mt-5 container">
            <ButtonTabbar className="active">Lịch chiếu theo phim</ButtonTabbar>
            <ButtonTabbar>Lịch chiếu theo rạp</ButtonTabbar>
        </div>
    );
};


export default TabBar;
