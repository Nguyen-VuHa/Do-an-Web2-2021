import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/vi';

const MovieList = () => {
    const { data } = useSelector((state) => state.homepage);
    const { movieCurrent, movieComing } = data;

    return (
        <section className="movie-list">
            <div className="movie-current current">
                <h3 className="current__title">Phim Hiện Đang Chiếu</h3>
                <div className="current__warapper">
                    {
                        movieCurrent && movieCurrent.map((data) => {
                            return  <div className="card-movie" key={data.movieId}>
                                        <div className="card-img">
                                            <img src={data.poster1} alt="Card Movie" />
                                        </div>
                                        <div className="card-content">
                                            <div className="contentBox">
                                                <h3>{data.movieName}</h3>
                                                <p>{ moment.utc(data.premiereDate).format('L') } đến { moment.utc(data.endDate).format('L') }</p>
                                            </div>
                                        </div>
                                        <div className="btn-card">
                                            <Link to="/" className="btn">Mua vé</Link>
                                        </div>
                                    </div>
                        })
                    }
                </div>
            </div>
            <div className="movie-current current mt-4">
                <h3 className="current__title">Comming Soon</h3>
                <div className="current__warapper">
                    { 
                        movieComing && movieComing.map((data) => {
                            return  <div className="card-movie" key={data.movieId}>
                                        <div className="card-img">
                                            <img src={data.poster1} alt="Card Movie" />
                                        </div>
                                        <div className="card-content">
                                            <div className="contentBox">
                                                <h3>{data.movieName}</h3>
                                                <p>Khởi chiếu: { moment.utc(data.premiereDate).format('L') }</p>
                                            </div>
                                        </div>
                                        <div className="btn-card">
                                            <Link to="/" className="btn">Mua vé</Link>
                                        </div>
                                    </div>
                        })
                    }
                </div>
            </div>
        </section>
    );
};


MovieList.propTypes = {

};


export default MovieList;
