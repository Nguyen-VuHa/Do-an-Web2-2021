import React, { useContext } from 'react';
import { 
    LayoutDetail, Title_4, DetailContent,
    DetailItem, DetailTitle 
} from './Advertisement.Style';
import { Button } from 'src/custom-fields/GlobalStyle/Button.Style';
import { TrailerContext } from 'src/contexts/trailerContenxt';

const DetailMovie = ({ detail }) => {
    const { dispatchTrailer } = useContext(TrailerContext);
    
    return (
        <LayoutDetail>
            <Title_4
                style={{
                    color: 'crimson',
                    margin: '25px 40px'
                }}
            >{ detail.length > 0 && detail[0].movieName }</Title_4>
            <DetailContent>
                <DetailItem>
                    <DetailTitle>Đạo diễn</DetailTitle>
                    <span>{ detail.length > 0 && detail[0].directors }</span>
                </DetailItem>
                <DetailItem>
                    <DetailTitle>Diễn viên</DetailTitle>
                    <span>{ detail.length > 0 && detail[0].mainActor }</span>
                </DetailItem>
                <DetailItem>
                    <DetailTitle>Thể loại</DetailTitle>
                    <span>{ detail.length > 0 && detail[0].category }</span>
                </DetailItem>
                <DetailItem>
                    <DetailTitle>Thời lượng</DetailTitle>
                    <span>{ detail.length > 0 && detail[0].time } phút</span>
                </DetailItem>
                <DetailItem>
                    <DetailTitle>Đánh giá</DetailTitle>
                    <span>
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star-half-alt" />
                        <i className="far fa-star" />
                    </span>
                </DetailItem>
                <DetailItem className="pl-0">
                    <Button>Mua vé ngày</Button>
                    <Button 
                        className="ml-2"
                        onClick={() => {
                            dispatchTrailer({
                                type: 'SHOW_TRAILER',
                                payload: detail[0]?.trailer
                            })
                        }}
                    >
                        Xem trailer
                    </Button>
                </DetailItem>
            </DetailContent>
        </LayoutDetail>
    );
};

export default DetailMovie;
