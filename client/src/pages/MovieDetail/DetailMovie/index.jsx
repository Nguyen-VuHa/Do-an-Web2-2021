import React from 'react';
import {
    LayoutDetailMovie, TitleMovieName,
    InfoMovie, GroupInfo, LabelInfo,
} from './DetailMovie.Style';
import { Button } from 'src/style-common/Button.Style';


const DetailMovie = () => {
    return (
        <>
            <LayoutDetailMovie>
                <TitleMovieName>Rừng Thế Mạng</TitleMovieName>
                <InfoMovie>
                    <GroupInfo>
                        <LabelInfo>Đạo diễn</LabelInfo>
                        <span>Trần Hữu Tấn</span>
                    </GroupInfo>
                    <GroupInfo>
                        <LabelInfo>Diễn viên</LabelInfo>
                        <span>Huỳnh Thanh Trực, Trần Phong</span>
                    </GroupInfo>
                    <GroupInfo>
                        <LabelInfo>Thể loại</LabelInfo>
                        <span>Phiêu Lưu</span>
                    </GroupInfo>
                    <GroupInfo>
                        <LabelInfo>Thời lượng</LabelInfo>
                        <span>0 phút</span>
                    </GroupInfo>
                    <GroupInfo>
                        <LabelInfo>Đánh giá</LabelInfo>
                        <span>8.7 điểm</span>
                    </GroupInfo>
                    <GroupInfo className="group-control pl-0">
                        <Button>Đặt vé</Button>
                        <Button className="ml-3">Xem trailler</Button>
                    </GroupInfo>
                </InfoMovie>
            </LayoutDetailMovie>
        </>
    );
};


export default DetailMovie;
