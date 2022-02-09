import React, { useContext } from 'react';
import { 
    LayoutDetail, Title_4, DetailContent,
    DetailItem, DetailTitle 
} from './Advertisement.Style';
import { Button } from 'src/style-common/Button.Style';
import { TrailerContext } from 'src/contexts/trailerContenxt';
import { Link } from 'react-router-dom';

const DetailMovie = ({ detail }) => {
    const { dispatchTrailer } = useContext(TrailerContext);
    
    return (
        <LayoutDetail>
            <Title_4
                style={{
                    color: 'crimson',
                    margin: '25px 40px'
                }}
            >{ detail.length > 0 ? detail[0].movieName : 'DEFAULT' }</Title_4>
            <DetailContent>
                <DetailItem>
                    <DetailTitle>Đạo diễn</DetailTitle>
                    <span>{ detail.length > 0 ? detail[0].directors : 'DEFAULT' }</span>
                </DetailItem>
                <DetailItem>
                    <DetailTitle>Diễn viên</DetailTitle>
                    <span>{ detail.length > 0 ? detail[0].mainActor : 'DEFAULT' }</span>
                </DetailItem>
                <DetailItem>
                    <DetailTitle>Thể loại</DetailTitle>
                    <span>{ detail.length > 0 ? detail[0].category : 'DEFAULT' }</span>
                </DetailItem>
                <DetailItem>
                    <DetailTitle>Thời lượng</DetailTitle>
                    <span>{ detail.length > 0 ? detail[0].time  : 'DEFAULT'} phút</span>
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
                    <Link to={`/movie/movie-current/${detail.length > 0 && detail[0]?.movieId}`}>
                        <Button>
                            Mua vé ngày
                        </Button>
                    </Link>
                   
                    <Button 
                        className="ml-2"
                        onClick={() => {
                            if(detail.length > 0) {
                                dispatchTrailer({
                                    type: 'SHOW_TRAILER',
                                    payload: detail[0]?.trailer
                                });
                            }
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
