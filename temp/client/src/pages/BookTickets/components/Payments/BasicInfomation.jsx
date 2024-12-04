import React from 'react';
import { useSelector } from 'react-redux';
import { Text } from 'src/style-common/Text.Style';
import { GroupInfo, InfoMovie, LabelInfo, LayoutBasicInfo, PhotoMovie } from './Payment.Style';

const BasicInfomation = () => {
    const { movieDetail } = useSelector(state => state.movieState);
    const { showtimeById } = useSelector(state => state.showtimeState);

    return (
        <LayoutBasicInfo>
            <Text className='fw-bold txt-yellow-light font-params' fontSize={20}>
                Thông tin cơ bản
            </Text>

            <div className='mt-3 d-flex'>
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
            </div>
        </LayoutBasicInfo>
    );
};

export default BasicInfomation;
