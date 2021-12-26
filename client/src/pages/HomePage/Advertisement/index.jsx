import React from 'react';
import { 
    Layout, Warapper,
    WarapperContent, Title_3,
    ContentMovie, PosterCard, Image,
    DetailMovie, Title_4, DetailContent,
    DetailItem, DetailTitle
} from './Advertisement.Style';
import { LayoutBackground, ImageBG } from 'src/custom-fields/GlobalStyle/ImageBackground.Style';

const Advertisement = () => {
    return (
        <Layout>
            <LayoutBackground>
                <div></div>
                <ImageBG url={'https://res.cloudinary.com/cgv-vi-t-nam/image/upload/v1637389662/poster_movie/xrpppgese4uyj8moqobu.jpg'} />
            </LayoutBackground>
            <Warapper>
                <WarapperContent className="container">
                    <Title_3>Top Phim Trong Tuần</Title_3>
                    <ContentMovie>
                        <PosterCard>
                            <Image src="https://res.cloudinary.com/cgv-vi-t-nam/image/upload/v1637389662/poster_movie/xrpppgese4uyj8moqobu.jpg" alt="Poster Not Found"/>
                        </PosterCard>
                        <DetailMovie>
                            <Title_4
                                style={{
                                    color: 'crimson',
                                    margin: '25px 40px'
                                }}
                            >Thiên Thần Hộ Mệnh</Title_4>
                            <DetailContent>
                                <DetailItem>
                                    <DetailTitle>Đạo diễn</DetailTitle>
                                    <span>Victor Vũ</span>
                                </DetailItem>
                            </DetailContent>
                        </DetailMovie>
                    </ContentMovie>
                </WarapperContent>
            </Warapper>
        </Layout>
    );
};

export default Advertisement;
