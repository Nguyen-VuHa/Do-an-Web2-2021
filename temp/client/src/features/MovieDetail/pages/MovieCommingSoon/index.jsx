import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import SideBar from '../../components/SideBar';
import GLOBAL_TEXT from '../../../../contants/titleCinema';
import SlideImage from '../../components/SlideImage';
import ContentMovie from '../../components/ContentMovie';
import { useHistory, useLocation, useParams } from 'react-router';
import { useSelector } from 'react-redux';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const MovieCoomingSoon = () => {
    const backgoundRef = useRef(null);
    const [dataRender, setDataRender] = useState([]);
    const [imageRender, setimageRender] = useState({});
    const history = useHistory();
    const params = useParams();
    const location = useQuery();
    const { data } = useSelector((state) => state.movieDetail);
    const { movieComing } = data;

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, []);

    useEffect(() => {
        if(movieComing) {
            const data = movieComing.filter(item => item.movieId === params.movieId);
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
    }, [movieComing]);

    
    return (
        <>
            <Helmet>
                <title> { location.get("name") ? location.get("name").replaceAll('-', ' ') : 'Movie Detail' }   | { GLOBAL_TEXT.TITLE_CINEMA }</title>
            </Helmet>
            <div className="movie-detail">
                <div className="container content">
                    <SideBar movieName={ dataRender && dataRender[0]?.movieName } type={0} />
                    <div className="layout-content">
                        <SlideImage imageRender={imageRender}/>
                        <ContentMovie data={dataRender} type={0}/>
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
                </div>
                <div className="bg-movie-detail">
                    <div className="bg-left" />
                    <div className="bg-right" ref={backgoundRef}/>
                </div>
            </div>
        </>
    );
};


MovieCoomingSoon.propTypes = {

};


export default MovieCoomingSoon;
