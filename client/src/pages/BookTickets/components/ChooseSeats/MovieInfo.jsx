import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { YellowGray, YellowLight } from 'src/contants/cssContants';
import { Button } from 'src/style-common/Button.Style';
import { Text } from 'src/style-common/Text.Style';
import { BookTicketContext } from '../../contexts/BookTicketContext';
import { GroupBoxMovie, GroupInfo, InfoMovie, LabelInfo, LayoutMovieInfo, PhotoMovie } from './ChooseSeats.Style';
import HoldingTime from './HoldingTime';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

const MovieInfo = () => {
    const { movieDetail } = useSelector(state => state.movieState);
    const { cinemaDetail } = useSelector(state => state.systemCinemaState);
    const { showtimeById } = useSelector(state => state.showtimeState);

    const { stateBookTicket } = useContext(BookTicketContext);
    const { mySeat } = stateBookTicket;

    const history = useHistory();

    return (
        <>
            <LayoutMovieInfo>
                <GroupBoxMovie className='d-flex'>
                    <PhotoMovie>
                        <img src={movieDetail && movieDetail.poster1} alt="No Poster"/>
                    </PhotoMovie>
                    <InfoMovie>
                        <GroupInfo>
                            <LabelInfo>Đạo diễn</LabelInfo>
                            <span>{movieDetail && movieDetail.directors}</span>
                        </GroupInfo>
                        <GroupInfo>
                            <LabelInfo>Diễn viên</LabelInfo>
                            <span>{movieDetail && movieDetail.mainActor}</span>
                        </GroupInfo>
                        <GroupInfo>
                            <LabelInfo>Thể loại</LabelInfo>
                            <span>{movieDetail && movieDetail.category}</span>
                        </GroupInfo>
                        <GroupInfo>
                            <LabelInfo>Thời lượng</LabelInfo>
                            <span>{movieDetail && movieDetail.time} phút</span>
                        </GroupInfo>
                        <GroupInfo>
                            <LabelInfo>Giá vé</LabelInfo>
                            <span>{showtimeById && parseInt(showtimeById.fare).toLocaleString() } đ</span>
                        </GroupInfo>
                    </InfoMovie>
                </GroupBoxMovie>

                <GroupBoxMovie className='mt-2'>
                    <Text className='txt-gray-blue span-bold' spanColor={YellowLight}><span>{cinemaDetail && cinemaDetail.nameCinema}</span> - Phòng chiếu <span>{cinemaDetail && cinemaDetail.typeCinema}</span></Text>
                    <Text className='txt-gray-blue span-bold' spanColor={YellowLight}>Suất chiếu 
                        <span> { showtimeById && showtimeById.showTime } </span> - Ngày <span>{ showtimeById && moment(showtimeById.premiereDate).format('DD/MM/YYYY') }</span>
                    </Text>
                </GroupBoxMovie>

                <GroupBoxMovie className='mt-2'>
                    <div className='d-flex w-100 flex-wrap'>
                        <Text className='txt-yellow-light flex-shrink-0'>Ghế bạn chọn:  </Text>
                        
                            {
                                mySeat && mySeat.length > 0
                                ? mySeat.map((ms, idx) => {
                                    return <span key={idx} className="mr-2">
                                        {ms},
                                    </span>;
                                }) 
                                : "Chưa có ghế nào..."
                            }
                    </div>
                </GroupBoxMovie>
                <HoldingTime fare={showtimeById ? mySeat.length * showtimeById.fare : 0}/>

                <Button 
                    className='w-100 mt-2' bgcolor={YellowGray}
                    onClick={() => {
                        if(mySeat && mySeat.length > 0)
                            history.push('/book-ticket/payment');
                    }}
                >
                    Tiếp tục
                </Button>
            </LayoutMovieInfo>
        </>
    );
};

export default MovieInfo;
