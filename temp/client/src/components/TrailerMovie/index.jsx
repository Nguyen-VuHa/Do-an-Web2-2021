import React, { useContext, useEffect } from 'react';
import { TrailerContext } from 'src/contexts/trailerContenxt';
import { 
    LayoutModal, ModalBackground, 
    LayoutTrailer,VideTrailer,
    ButtonClose, Iframe
} from './TrailerMovie.Style';

const TrailerMovie = () => {
    const { stateTrailer, dispatchTrailer } = useContext(TrailerContext);

    const handleCloseModal = () => {
        dispatchTrailer({
            type: 'HIDEN_TRAILER',
            payload: null,
        })
    }

    useEffect(() => {
        let body = document.body;
        if(stateTrailer.status)
            body.classList.add('modal-open');
        else
            body.classList.remove('modal-open');

        
    }, [stateTrailer]);

    return (
        <LayoutModal className={stateTrailer.status ? 'show' : ''}>
            <ModalBackground onClick={handleCloseModal}/>
            <LayoutTrailer>
                <ButtonClose onClick={handleCloseModal}>
                    <i className="fal fa-times"></i>
                </ButtonClose>
                <VideTrailer>
                    <Iframe  title="Trailler Movie" id="iframe-trailer" frameBorder="0" src={`https://www.youtube.com/embed/${stateTrailer.idChanel}?autoplay=1`} allow="autoplay" allowFullScreen={true} />
                </VideTrailer>
            </LayoutTrailer>
        </LayoutModal>
    );
};

export default TrailerMovie;
