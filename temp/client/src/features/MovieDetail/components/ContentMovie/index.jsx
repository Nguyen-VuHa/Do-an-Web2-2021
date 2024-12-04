import React, { memo, useContext } from 'react';
import { Link } from 'react-router-dom';
import { TrailerContext } from '../../../../contexts/trailerContenxt';
import './content_movie.scss';


const ContentMovie = ({ data , type}) => {
    const { dispatch } = useContext(TrailerContext);

    const handleViewTrailer = () => {
        if(data.length > 0) {
            dispatch({
                type: 'SHOW_TRAILER',
                payload: {
                    status: true,
                    idChanel: data && data[0].trailer,
                }
            });
        }
    }

    return (
        <>
            <div className="info-movie">
                {
                    data.length > 0 ?  <h4>{data &&  data[0]?.movieName}</h4>
                    : <span className="skeleton-box" style={{width: '100%', height: '30px', marginBottom: '30px'}}></span>
                }
                <ul className="list-info-movie">
                    <li className="group-film"> 
                        {
                            data.length > 0 ?  <>
                                    <label className="group__title">Đạo diễn</label>
                                    <span>{data &&  data[0]?.directors}</span>
                                </>
                            :  <>
                                <label className="group__title skeleton-box" style={{width: '15%', height: '16px', marginRight: '20px'}}></label>
                                <span className="skeleton-box" style={{width: '50%', height: '16px'}}></span>
                            </>
                        }
                    </li>
                    <li className="group-film"> 
                        {
                            data.length > 0 ?  <>
                                <label className="group__title">Diễn viên</label>
                                    <span>{data &&  data[0]?.mainActor}</span> 
                                </>
                            :  <>
                                <label className="group__title skeleton-box" style={{width: '15%', height: '16px', marginRight: '20px'}}></label>
                                <span className="skeleton-box" style={{width: '90%', height: '16px'}}></span>
                            </>
                        }
                    </li>
                    <li className="group-film"> 
                        {
                            data.length > 0 ?  <>
                                    <label className="group__title">Thể loại</label>
                                    <span>{data &&  data[0]?.category}</span>
                                </>
                            :  <>
                                <label className="group__title skeleton-box" style={{width: '15%', height: '16px', marginRight: '20px'}}></label>
                                <span className="skeleton-box" style={{width: '40%', height: '16px'}}></span>
                            </>
                        }
                    </li>
                    <li className="group-film"> 
                     
                        {
                            data.length > 0 ?  <>
                                    <label className="group__title">Thời lượng</label>
                                    <span>{data &&  data[0]?.time} phút</span>
                                </>
                            :  <>
                                <label className="group__title skeleton-box" style={{width: '15%', height: '16px', marginRight: '20px'}}></label>
                                <span className="skeleton-box" style={{width: '30%', height: '16px'}}></span>
                            </>
                        }
                    </li>
                        <li className="group-film">
                        {
                            data.length > 0 ?  <>
                                    <label className="group__title">Đánh giá</label>
                                    <span><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star-half-alt" /><i className="far fa-star" /></span>
                                </>
                            :  <>
                                <label className="group__title skeleton-box" style={{width: '15%', height: '16px', marginRight: '20px'}}></label>
                                <span className="skeleton-box" style={{width: '70%', height: '16px'}}></span>
                            </>
                        }
                    </li>
                    <li className="group-button">
                        {
                            type === 0 ? '' :   <Link to="#" className="btn btn-success">Đặt Vé</Link>
                        }
                        <button 
                            className="btn btn-success btn-modal ml-2" 
                            onClick={() => handleViewTrailer()}
                        >Xem Trailer</button>
                    </li>
                </ul>
            </div>
        </>
    );
};


ContentMovie.propTypes = {

};


export default memo(ContentMovie);
