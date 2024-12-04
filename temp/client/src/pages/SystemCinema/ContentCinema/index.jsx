import React from 'react';
import { LayoutContent } from './ContentCinema.Style';
import CardCinema from './CardCinema';
import { useSelector } from 'react-redux';

const ContentCinema = () => {
    const { systemCinema } = useSelector(state => state.systemCinemaState);

    return (
        <LayoutContent className='container'>
            {
                systemCinema && systemCinema.length > 0
                && systemCinema.map(item => {
                    return <CardCinema key={item.id} props={item} />
                })
            }
        </LayoutContent>
    );
};

export default ContentCinema;
