import React from 'react';
import { Divider } from 'src/style-common/Layout.Style';
import { LayoutSeat, LayoutSeatInfo, RowSeats, Screen, Seat, SeatInfo, SeatName } from './ChooseSeats.Style';

const Seats = () => {
    return (
        <LayoutSeat>
            <Screen>
                Màng Hình
            </Screen>
            <div className='mt-4'>
                <RowSeats>
                    <SeatName>A</SeatName>
                    <Seat className='choose'>
                        A1
                    </Seat>
                    <Seat className='choosed hover-none'>
                        A2
                    </Seat>
                    <Seat>
                        A3
                    </Seat>
                    <Seat>
                        A4
                    </Seat>
                    <Seat>
                        A4
                    </Seat>
                    <Seat>
                        A12
                    </Seat>
                    <Seat>
                        A4
                    </Seat>
                    <Seat>
                        A4
                    </Seat>
                    <Seat>
                        A4
                    </Seat>
                    <Seat>
                        A4
                    </Seat>
                      <Seat>
                        A4
                    </Seat>
                      <Seat>
                        A4
                    </Seat>
                </RowSeats>
            </div>
            <Divider className='mt-5'/>
            <LayoutSeatInfo>
                <SeatInfo className='choose mr-2'>
                    <Seat className='choose mr-2'>
                        XX
                    </Seat>
                    Ghế đang được chọn
                </SeatInfo>
                <SeatInfo className='mr-2'>
                    <Seat className='mr-2 choosed hover-none' />
                    Ghế đã chọn
                </SeatInfo>
                <SeatInfo>
                    <Seat className='mr-2 hover-none' />
                    Ghế trống
                </SeatInfo>

            </LayoutSeatInfo>
        </LayoutSeat>
    );
};


export default Seats;
