import React, { useContext, useEffect, useState } from 'react';
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
import Comment from './Comment';
import { getAllComments } from 'src/reducers/commentSlice';
import socketIO from 'socket.io-client';

// const ENDPOINT='ws://localhost:8900';
const ENDPOINT='/';
let socket;

const MovieDetail = () => {
    const params = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const { loading, movieDetail, error } = useSelector(state => state.movieState);
    const [isLoading, setIsLoading] = useState(true);
    const [isCurrent, setIsCurrent] = useState(false);
    const [idFecthComments, setIdFecthComments] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        socket =  socketIO(ENDPOINT, { transports:['websocket']});

        socket.on('connect', () => {});

        socket.emit('addComments', {idComments: params.movieId});

        socket.emit('joinRoom', {idComments: params.movieId});

        socket.on('getComments', (idComments, Uuid) => {
            setIdFecthComments(Uuid);
        });

        return () => {
            socket.on('disconnect', () => {});
            socket.emit('leaveRoom', {id: params.movieId})
        }
    }, []);

    useEffect(() => {
        if(idFecthComments) {
            const timeOutFetc = setTimeout(() => {
                dispatch(getAllComments(params.movieId));
            }, 1000);
    
            return () => clearTimeout(timeOutFetc);
        }
    }, [idFecthComments]);

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

    useEffect(() => {
        if(window.location.pathname.includes('/movie-current'))
            setIsCurrent(true);
    }, [window.location.pathname]); 


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
            {
                isCurrent 
                ? <div className="container">
                    <Comment />
                </div>
                : ''
            }
        </>
    );
};


export default MovieDetail;
