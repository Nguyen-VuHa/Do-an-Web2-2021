import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { 
    MovieDetailLayout, LayoutContent,
    LayoutSlidePoster, LayoutContentMovie,
    DescriptionMovie, TitleDescription, TextDescription
} from './MovieDetail.Style';
import { LayoutBackground, ImageBG } from 'src/style-common/ImageBackground.Style';
import Breadcrumb from './Breadcrumb';
import SlidePoster from './SlidePoster';
import DetailMovie from './DetailMovie';

const MovieDetail = () => {
    return (
        <>
             <HelmetProvider>
                <Helmet>
                    <title>Movie Detail | BHD STAR</title>
                </Helmet>
            </HelmetProvider>

            <MovieDetailLayout>
                <LayoutBackground>
                    <div></div>
                    <ImageBG url="https://res.cloudinary.com/cgv-vi-t-nam/image/upload/v1635526318/poster_movie/dzfeavoow4acgu9atmwr.jpg" />
                </LayoutBackground>
                <div className="container" style={{zIndex: '1'}}>
                    <Breadcrumb />
                    <LayoutContent>
                        <LayoutSlidePoster>
                            <SlidePoster />
                        </LayoutSlidePoster>
                        <LayoutContentMovie>
                            <DetailMovie />
                        </LayoutContentMovie>
                    </LayoutContent>
                    <DescriptionMovie className="container">
                        <TitleDescription>Chi Tiết</TitleDescription>
                        <TextDescription>
                        Phim được thực hiện dựa trên các sự kiện có thật xảy ra tại một trong những cung đường trekking nổi tiếng nhất nước ta: Tà Năng - Phan Dũng. Đây cũng là tác phẩm đầu tiên của điện ảnh Việt Nam làm về chủ đề sinh tồn. Phim mới Rừng Thế Mạng khởi chiếu tại các rạp chiếu phim từ 31.12.2021.
                        </TextDescription>
                    </DescriptionMovie>
                </div>
            </MovieDetailLayout>
        </>
    );
};


export default MovieDetail;
