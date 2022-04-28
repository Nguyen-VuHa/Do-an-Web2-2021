import React, { useContext } from 'react';
import { ContentTable } from 'src/style-common/Table.Style';
import { Text } from 'src/style-common/Text.Style';
import { BookTicketContext } from '../../contexts/BookTicketContext';
import { ItemTableCustom, LayoutBasicInfo } from './Payment.Style';

const PaymentType = () => {
    const { stateBookTicket, dispatchBookTicket } = useContext(BookTicketContext);
    const { paymentType } = stateBookTicket;

    return (
        <LayoutBasicInfo className='mt-2'>
            <Text className='fw-bold txt-yellow-light font-params' fontSize={20}>
                Hình thức thanh toán
            </Text>
            <ContentTable className='mt-3'>
                <ItemTableCustom 
                    className={paymentType === 1 ? 'active' : ''} 
                    onClick={() => {
                        if(paymentType !== 1) {
                            dispatchBookTicket({
                                type: 'SET_PAYMENT_TYPE',
                                payload: 1,
                            })
                        }
                    }}
                >
                    <i className="fab fa-paypal"></i>
                    Thanh toán Paypal
                </ItemTableCustom>
                <ItemTableCustom 
                    className={paymentType === 2 ? 'active' : ''}
                    onClick={() => {
                        if(paymentType !== 2) {
                            dispatchBookTicket({
                                type: 'SET_PAYMENT_TYPE',
                                payload: 2,
                            })
                        }
                    }}
                >
                    <i className="fad fa-coins"></i>
                    Thanh toán E-coin
                </ItemTableCustom>
            </ContentTable>
        </LayoutBasicInfo>
    );
};

export default PaymentType;
