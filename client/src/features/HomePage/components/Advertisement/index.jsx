import React, { useEffect, useRef, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { TrailerContext } from '../../../../contexts/trailerContenxt';

const Advertisement = () => {
    const backgoundRef = useRef(null);
    const { data } = useSelector((state) => state.homepage);
    const { movieTrending } = data;
    const { dispatch } = useContext(TrailerContext);

    useEffect(() => {
        if(movieTrending) {
            const style = `
            background: url(${movieTrending[0]?.poster1}) 0% 0% / cover no-repeat;
            width: 100%;
            height: 100%;
            position: relative;
            transition: all 0.5s ease 0s;
            `;
            backgoundRef.current.style = style;
        }
    }, [movieTrending]);

    const handleViewTrailer = () => {
        dispatch({
            type: 'SHOW_TRAILER',
            payload: {
                status: true,
                idChanel: movieTrending[0]?.trailer,
            }
        });
    }

    return (
        <section className="advertisement">
            <div>
                <div className="advertisement-bg">
                    <div className="bg-home" />
                    <div className="bg-advertisement" ref={backgoundRef}/>
                </div>
                <div className="warapper">
                    <div className="content container">
                        <h3>Top Phim Trong Tuần</h3>
                        <div className="content__movie">
                            <div className="card-top">
                                <div className="card-img">
                                    <img src={movieTrending &&  movieTrending[0]?.poster1} alt="" />
                                </div>
                            </div>
                            <div className="content__info">
                                <h4>{movieTrending &&  movieTrending[0]?.movieName}</h4>
                                <ul className="list-info-movie">
                                    <li className="group-film"> 
                                        <label className="group__title" htmlFor>Đạo diễn</label>
                                        <span>{movieTrending &&  movieTrending[0]?.directors}</span>
                                    </li>
                                        <li className="group-film"> 
                                        <label className="group__title" htmlFor>Diễn viên</label>
                                        <span>{movieTrending &&  movieTrending[0]?.mainActor}</span>
                                    </li>
                                    <li className="group-film"> 
                                        <label className="group__title" htmlFor>Thể loại</label>
                                        <span>{movieTrending &&  movieTrending[0]?.category}</span>
                                    </li>
                                    <li className="group-film"> 
                                        <label className="group__title" htmlFor>Thời lượng</label>
                                        <span>{movieTrending &&  movieTrending[0]?.time} phút</span>
                                    </li>
                                        <li className="group-film"> 
                                        <label className="group__title" htmlFor>Đánh giá</label>
                                        <span><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star-half-alt" /><i className="far fa-star" /></span>
                                    </li>
                                    <li className="group-button">
                                        <Link to="/" className="btn btn-success">Mua vé ngay</Link>
                                        <button 
                                            className="btn btn-success btn-modal ml-2" 
                                            onClick={() => handleViewTrailer()}
                                        >Xem trailer</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="description-movie">
                <div className="container">
                    <h5 className="title">Chi Tiết</h5>
                    <div id="text_describe">
                        {movieTrending &&  movieTrending[0]?.describe}
                    </div>
                </div>
            </div>
        </section>
    );
};


Advertisement.propTypes = {

};


export default Advertisement;
