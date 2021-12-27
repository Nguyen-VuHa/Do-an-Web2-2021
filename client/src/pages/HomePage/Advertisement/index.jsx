import React from 'react';
import { 
    Layout, Warapper,
    WarapperContent, Title_3,
    ContentMovie, PosterCard, Image,
    DescriptionMovie, TitleDescription,
    TextDiscription
} from './Advertisement.Style';
import { LayoutBackground, ImageBG } from 'src/custom-fields/GlobalStyle/ImageBackground.Style';
import DetailMovie from './DetailMovie';
import { useSelector } from 'react-redux';

const Advertisement = () => {
    const {loading, movieTrend} = useSelector((state) => state.homepageState);

    return (
        <Layout>
            <LayoutBackground>
                <div></div>
                <ImageBG url={movieTrend.length > 0 && movieTrend[0].poster1} />
            </LayoutBackground>
            <Warapper>
                <WarapperContent className="container">
                    <Title_3>Top Phim Trong Tuần</Title_3>
                    <ContentMovie>
                        <PosterCard>
                            <Image src={movieTrend.length > 0 ? movieTrend[0].poster1 : ''} alt="Poster Not Found"/>
                        </PosterCard>
                        <DetailMovie detail={movieTrend}/>
                    </ContentMovie>
                </WarapperContent>
            </Warapper>
            <DescriptionMovie>
                <div className="container">
                    <TitleDescription>-- Chi Tiết --</TitleDescription>
                    <TextDiscription>
                        {movieTrend.length > 0 && movieTrend[0].describe}
                    </TextDiscription>
                </div>
            </DescriptionMovie>
        </Layout>
    );
};

export default Advertisement;
