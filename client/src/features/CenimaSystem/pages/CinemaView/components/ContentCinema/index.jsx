import React from 'react';
import { useSelector } from 'react-redux';
import CinemaItem from '../CinemaItem';


const ContentCinema = () => {
    const { cinemas } = useSelector((state) => state.cinemas);

    return (
        <div className="wrapper-item">
            {
                cinemas.length > 0 ? 
                    cinemas.map((item) => {
                        return <CinemaItem key={item.id} data={item}/>
                    })
                : ''
            }
        </div>
    );
};


ContentCinema.propTypes = {

};


export default ContentCinema;
