import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { White, YellowGray, YellowLight } from 'src/contants/cssContants';
import { Text } from 'src/style-common/Text.Style';
import { LayoutBasicInfo } from './Payment.Style';
import moment from 'moment';
import { BookTicketContext } from '../../contexts/BookTicketContext';
import HoldingTime from './HoldingTime';
import { Button } from 'src/style-common/Button.Style';
import { AuthContext } from 'src/contexts/authContext';
import { toast } from 'react-toastify';
import bookingApi from 'src/api/bookingApi';
import { ClipLoader } from 'react-spinners';
import { useHistory } from 'react-router-dom';

const ShowtimeInfomation = () => {
    const history = useHistory();

    const { cinemaDetail } = useSelector(state => state.systemCinemaState);
    const { showtimeById } = useSelector(state => state.showtimeState);
    const { movieDetail } = useSelector(state => state.movieState);

    const { state } = useContext(AuthContext);
    const { surplus, id, email, fullname } = state;

    const { stateBookTicket } = useContext(BookTicketContext);
    const { mySeat, paymentType } = stateBookTicket;

    const [isSubmit, setIsSubmit] = useState(false);

    const handlePayment = async () => {
        if(paymentType === 2) {
            if(surplus >= mySeat.length * showtimeById.fare) {
                document.body.style.pointerEvents = "none";
                setIsSubmit(true);
                let dataHistoryBooking = {
                    bookingTime: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
                    unitPrice: parseInt(showtimeById.fare),
                    totalPrice: mySeat.length * showtimeById.fare,
                    idUser: id,
                    idShowtime: showtimeById.idShowtime,
                }

                await bookingApi.createNewHistoryBookingApi(dataHistoryBooking)
                .then(async (res) => {
                    if(res && res.id) {
                        let idBooking = res.id;
                        await bookingApi.createNewHistoryTicketApi({
                            listSeat: mySeat,
                            idBooking: res.id,
                        })
                        .then(async (res) => {
                            if(res.status === 200)
                            {
                                setIsSubmit(false);
                                document.body.style.pointerEvents = "";
                                let dataSendMail = {
                                    email: email,
                                    fullName: fullname,
                                    movieName: movieDetail.movieName,
                                    idBooking: idBooking,
                                    cinema: cinemaDetail.nameCinema,
                                    address: `${cinemaDetail.wards} - ${cinemaDetail.district} - ${cinemaDetail.city}`,
                                    bookingTime: moment(new Date()).format('hh:mm DD/MM/YYYY'),
                                    paymentAmount: mySeat.length * showtimeById.fare,
                                    showtime:  `${showtimeById.showTime} - ${moment(showtimeById.premiereDate).format('DD/MM/YYYY')}`,
                                    listSeats: mySeat,
                                };

                                history.replace('/book-ticket/succeed');
                                await bookingApi.sendMailBookingSuccess(dataSendMail)
                                .then(res => {
                                    if(res) {
                                        console.log('send mail success!');
                                    }
                                })
                                .catch(() => {
                                    toast.error('Send Mail Failed!');
                                });
                            }
                            else {
                                document.body.style.pointerEvents = "";
                                setIsSubmit(false);
                            }
                        })
                    }
                })
            }   
            else 
                toast.warn('Số dư E-coin không đủ để thực hiện giao dịch!')
        }
        else {
            toast.warn('Bạn chưa chọn hình thức thanh toán!')
        }
    }

    return (
        <>
            <LayoutBasicInfo>
                <Text className='txt-gray-blue span-bold' spanColor={YellowLight}><span>{cinemaDetail && cinemaDetail.nameCinema}</span> - Phòng chiếu <span>{cinemaDetail && cinemaDetail.typeCinema}</span></Text>
                <Text className='txt-gray-blue span-bold' spanColor={YellowLight}>Suất chiếu 
                    <span> { showtimeById && showtimeById.showTime } </span> - Ngày <span>{ showtimeById && moment(showtimeById.premiereDate).format('DD/MM/YYYY') }</span>
                </Text>
            </LayoutBasicInfo>
            <LayoutBasicInfo className='mt-2'>
                <div className='d-flex w-100 flex-wrap'>
                    <Text className='txt-yellow-light flex-shrink-0'>Ghế đã chọn:  </Text>
                        {
                            mySeat && mySeat.length > 0
                            ? mySeat.map((ms, idx) => {
                                return <span key={idx} className="mr-2" style={{fontWeight: 'bold'}}>
                                    {ms},
                                </span>;
                            }) 
                            : "Chưa có ghế nào..."
                        }
                </div>
            </LayoutBasicInfo>
            <HoldingTime fare={showtimeById ? mySeat.length * showtimeById.fare : 0}/>

            <Button 
                className='w-100 mt-2' bgcolor={YellowGray}
                onClick={() => handlePayment()}
            >
                {
                    isSubmit ? <div className="d-flex">
                        <ClipLoader color={White} size={20}/>
                        <div className="ml-2">Đang xử lý...</div>
                    </div> : 'Thanh toán'
                }
            </Button>
        </>
    );
};

export default ShowtimeInfomation;
