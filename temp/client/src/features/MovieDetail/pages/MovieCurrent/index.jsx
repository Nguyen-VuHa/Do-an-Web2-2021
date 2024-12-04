import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router';
import GLOBAL_TEXT from '../../../../contants/titleCinema';
import CommentMovie from '../../components/CommentMovie';
import { getAllComments } from '../../components/CommentMovie/commentSlice';
import ContentMovie from '../../components/ContentMovie';
import SideBar from '../../components/SideBar';
import SlideImage from '../../components/SlideImage';
import socketIO from 'socket.io-client';

// const ENDPOINT='ws://localhost:8900';
const ENDPOINT='/';
let socket;


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const MovieCurrent = () => {
    const backgoundRef = useRef(null);
    const [dataRender, setDataRender] = useState([]);
    const [imageRender, setimageRender] = useState({});
    const history = useHistory();
    const params = useParams();
    const location = useQuery();
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.movieDetail);
    const { movieCurrent } = data;

    useEffect(() => {
        socket =  socketIO(ENDPOINT, { transports:['websocket']});

        socket.on('connect', () => {});

        socket.emit('addComments', {idComments: params.movieId});

        socket.emit('joinRoom', {idComments: params.movieId});

        socket.on('getComments', (idComments, Uuid) => {
            const timeOutFetc = setTimeout(() => {
                dispatch(getAllComments(params.movieId));
            }, 1500);

            return () =>  clearTimeout(timeOutFetc);
        });

        return () => {
            socket.on('disconnect', () => {});
            socket.emit('leaveRoom', {id: params.movieId})
        }
    }, []);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, []);

    useEffect(() => {
        dispatch(getAllComments(params.movieId));
     }, [dispatch]);

    useEffect(() => {
        if(movieCurrent) {
            const data = movieCurrent.filter(item => item.movieId === params.movieId);
            if(data.length > 0) {
                setDataRender(data);
                setimageRender({
                    poster1: data[0].poster1,
                    poster2: data[0].poster2,
                    poster3: data[0].poster3,
                    poster4: data[0].poster4,
                })
                const style = `
                    background: url(${data[0].poster1}) 0% 0% / cover no-repeat;
                    width: 100%;
                    height: 100%;
                    position: relative;
                    transition: all 0.5s ease 0s;
                `;
                backgoundRef.current.style = style;
            }
            else {
                history.push('/movie-error');
            }
        }
       
    }, [movieCurrent]);

    return (
        <>
            <Helmet>
                <title> { location.get("name") ? location.get("name").replaceAll('-', ' ') : 'Movie Detail' }   | { GLOBAL_TEXT.TITLE_CINEMA }</title>
            </Helmet>
            <div className="movie-detail">
                <div className="container content">
                    <SideBar movieName={ dataRender && dataRender[0]?.movieName } type={1} />
                    <div className="layout-content">
                        <SlideImage imageRender={imageRender}/>
                        <ContentMovie data={dataRender}/>
                    </div>
                    <div className="description-movie">
                        <div className="container">
                            <h5 className="title">Chi Tiết</h5>
                            <div id="text_describe">
                                {
                                    dataRender && dataRender[0]?.describe
                                }
                            </div>
                        </div>
                    </div>
                    <CommentMovie />
                </div>
                <div className="bg-movie-detail">
                    <div className="bg-left" />
                    <div className="bg-right" ref={backgoundRef}/>
                </div>
            </div>
        </>
        
    );
};


MovieCurrent.propTypes = {

};


export default MovieCurrent;
