import React from 'react';
import Seats from '../components/ChooseSeats/Seats';
import { Divider } from 'src/style-common/Layout.Style';
const ChooseSeatsPage = () => {
    return (
        <div className='container' style={{marginTop: '10vh'}}>
            <Seats />
        </div>
    );
};

export default ChooseSeatsPage;
