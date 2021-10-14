import React from 'react';
import { Link } from 'react-router-dom';

const MovieList = () => {
    return (
        <section className="movie-list">
            <div className="movie-current current">
                <h3 className="current__title">Phim Hiện Đang Chiếu</h3>
                <div className="current__warapper">
                    <div className="card-movie">
                        <div className="card-img">
                            <img src="https://cdnb.artstation.com/p/assets/images/images/017/317/689/large/toan-juno-final.jpg?1555483923" alt="Card Movie" />
                        </div>
                        <div className="card-content">
                            <div className="contentBox">
                                <h3>Fast & Furious 9<br />
                                    <span>Huyền Thoại Tốc Độ</span>
                                </h3>
                                <p>Khởi chiếu: 5/12/2021</p>
                            </div>
                        </div>
                        <div className="btn-card">
                            <Link to="/" className="btn">Mua vé</Link>
                        </div>
                    </div>
                    <div className="card-movie">
                        <div className="card-img">
                            <img src="https://cdnb.artstation.com/p/assets/images/images/017/317/689/large/toan-juno-final.jpg?1555483923" alt="Card Movie" />
                        </div>
                        <div className="card-content">
                            <div className="contentBox">
                                <h3>Fast & Furious 9<br />
                                    <span>Huyền Thoại Tốc Độ</span>
                                </h3>
                                <p>Khởi chiếu: 5/12/2021</p>
                            </div>
                        </div>
                        <div className="btn-card">
                            <Link to="/" className="btn">Mua vé</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="movie-current current mt-4">
                <h3 className="current__title">Comming Soon</h3>
                <div className="current__warapper">
                    <div className="card-movie">
                        <div className="card-img">
                            <img src="https://cdnb.artstation.com/p/assets/images/images/017/317/689/large/toan-juno-final.jpg?1555483923" alt="Card Movie" />
                        </div>
                        <div className="card-content">
                            <div className="contentBox">
                                <h3>Fast & Furious 9<br />
                                    <span>Huyền Thoại Tốc Độ</span>
                                </h3>
                                <p>Khởi chiếu: 5/12/2021</p>
                            </div>
                        </div>
                        <div className="btn-card">
                            <Link to="/" className="btn">Mua vé</Link>
                        </div>
                    </div>
                    <div className="card-movie">
                        <div className="card-img">
                            <img src="https://cdnb.artstation.com/p/assets/images/images/017/317/689/large/toan-juno-final.jpg?1555483923" alt="Card Movie" />
                        </div>
                        <div className="card-content">
                            <div className="contentBox">
                                <h3>Fast & Furious 9<br />
                                    <span>Huyền Thoại Tốc Độ</span>
                                </h3>
                                <p>Khởi chiếu: 5/12/2021</p>
                            </div>
                        </div>
                        <div className="btn-card">
                            <Link to="/" className="btn">Mua vé</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};


MovieList.propTypes = {

};


export default MovieList;
