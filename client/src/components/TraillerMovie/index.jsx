import React, { useContext } from 'react';
import { TrailerContext } from '../../contexts/trailerContenxt';
import './trailler_movie.scss';

const TraillerMovie = () => {
    const { state, dispatch } = useContext(TrailerContext);

    const handleCloseModal = () => {
        dispatch({
            type: 'HIDEN_TRAILER',
            payload: '',
        })
    }

    return (
        <div className={state.status ? "modal-trailler show" : "modal-trailler"}>
            <div className="modal-bg" onClick={() => handleCloseModal()}></div>
            <div className="content-trailer">
                <div className="btn-close" onClick={() => handleCloseModal()}><i className="fal fa-times"></i></div>
                <div className="content-video-trailler">
                    <iframe title="Trailler Movie" id="trailerIframe" className="trailerIframe" frameBorder="0" src={`https://www.youtube.com/embed/${state.idChanel}?autoplay=1`} allow="autoplay" allowFullScreen={true} />
                </div>
            </div>
        </div>
    );
};


TraillerMovie.propTypes = {

};


export default TraillerMovie;
