import React, { useEffect, useState } from 'react';
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
import LoadingMovieDetail from 'src/components/LayoutLoading/LoadingMovieDetail';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getMovieDetailById } from 'src/reducers/movieSlice';

const MovieDetail = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { loading, movieDetail, error } = useSelector(state => state.movieState);
    const history = useHistory();
    
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if(params && params.movieId) {
            dispatch(getMovieDetailById(params.movieId));
        }
    }, []);

    useEffect(() => {
        if(error) {
            history.push('/error/404');
        }
    }, [error]);

    useEffect(() => {
        if(loading === false) {
            let timeOut = setTimeout(() => {
                setIsLoading(false);
            }, 1000);

            return () => clearTimeout(timeOut);
        }
    }, [loading]);

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>{ movieDetail && `${movieDetail.movieName} | BHD STAR CINEPLEX` }</title>
                </Helmet>
            </HelmetProvider>

            { isLoading ? <LoadingMovieDetail /> : '' }
            <MovieDetailLayout>
                <LayoutBackground>
                    <div></div>
                    <ImageBG url={movieDetail && movieDetail.poster1} />
                </LayoutBackground>
                <div className="container" style={{zIndex: '1'}}>
                    <Breadcrumb movieName={movieDetail && movieDetail.movieName}/>
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
                            {
                                movieDetail && movieDetail.describe ? movieDetail.describe : 'DEFAULT'
                            }
                        </TextDescription>
                    </DescriptionMovie>
                </div>
            </MovieDetailLayout>
        </>
    );
};


export default MovieDetail;
