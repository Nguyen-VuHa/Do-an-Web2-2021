import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import BasicInfomation from '../components/Payments/BasicInfomation';
import PaymentType from '../components/Payments/PaymentType';
import styled from 'styled-components';
import ShowtimeInfomation from '../components/Payments/ShowtimeInfomation';

const LayoutBasicInfo = styled.div`
    width: 65%;
    height: auto;
`;

const LayoutShowTimeInfo = styled.div`
    width: 35%;
    height: auto;
    margin-left: 15px;
`;

const PaymentPage = () => {
    const history = useHistory();
    const { movieDetail } = useSelector(state => state.movieState);
    const { showtimeById } = useSelector(state => state.showtimeState);

    useEffect(() => {
        if(!movieDetail && !showtimeById) {
            history.goBack();
        }
    }, []);

    return (
        <div className='container d-flex' style={{marginTop: '10vh'}}>
            <LayoutBasicInfo>
                <BasicInfomation />
                <PaymentType />
            </LayoutBasicInfo>
            <LayoutShowTimeInfo>
                <ShowtimeInfomation />
            </LayoutShowTimeInfo>
        </div>
    );
};

export default PaymentPage;
