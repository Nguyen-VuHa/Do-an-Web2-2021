import React, { useEffect, useState } from 'react';
import {
    LayoutDetailMovie, TitleMovieName,
    InfoMovie, GroupInfo, LabelInfo,
} from './DetailMovie.Style';
import { Button } from 'src/style-common/Button.Style';
import { useSelector } from 'react-redux';


const DetailMovie = () => {
    const { movieDetail } = useSelector(state => state.movieState);

    const [isCurrent, setIsCurrent] = useState(false);

    useEffect(() => {
        if(window.location.pathname.includes('/movie-current'))
            setIsCurrent(true);
    }, [window.location.pathname]);

    return (
        <>
            <LayoutDetailMovie>
                <TitleMovieName>{ movieDetail && movieDetail.movieName }</TitleMovieName>
                <InfoMovie>
                    <GroupInfo>
                        <LabelInfo>Đạo diễn</LabelInfo>
                        <span>{ movieDetail && movieDetail.directors }</span>
                    </GroupInfo>
                    <GroupInfo>
                        <LabelInfo>Diễn viên</LabelInfo>
                        <span>{ movieDetail && movieDetail.mainActor }</span>
                    </GroupInfo>
                    <GroupInfo>
                        <LabelInfo>Thể loại</LabelInfo>
                        <span>{ movieDetail && movieDetail.category }</span>
                    </GroupInfo>
                    <GroupInfo>
                        <LabelInfo>Thời lượng</LabelInfo>
                        <span>{ movieDetail && movieDetail.time } phút</span>
                    </GroupInfo>
                    <GroupInfo>
                        <LabelInfo>Đánh giá</LabelInfo>
                        <span>NULL điểm</span>
                    </GroupInfo>
                    <GroupInfo className="group-control pl-0">
                        {
                            isCurrent && <Button>Đặt vé</Button>
                        }
                        <Button className="ml-3">Xem trailler</Button>
                    </GroupInfo>
                </InfoMovie>
            </LayoutDetailMovie>
        </>
    );
};


export default DetailMovie;
