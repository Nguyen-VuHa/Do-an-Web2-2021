import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { GrayWhite, YellowGray } from 'src/contants/cssContants';
import styled from 'styled-components';
import { CinemaFilterContext } from '../../contexts/CinemaFilterContext';

const LayoutPlace = styled.ul`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 15px;
    width: 100%;
`;

const PlaceItem = styled.li`
    list-style: none;
    background: #263247;
    padding: 8px 20px;
    letter-spacing: 1px;
    cursor: pointer;
    box-shadow: 3px 5px 21px 0px rgb(5 12 17 / 50%);

    color: ${GrayWhite};

    margin-right: 5px;
    margin-bottom: 5px;

    &:hover, &.active {
        background: #2d5269e6;
        color: ${YellowGray};
    }

`;


const PlaceView = () => {
    const { cinemaLocation } = useSelector(state => state.systemCinemaState);

    const { stateFilter, dispatchFilter } = useContext(CinemaFilterContext);
    const { placeSelect } = stateFilter;

    
    return (
        <LayoutPlace className="container">
            <PlaceItem className={ placeSelect === 'ALL' ? 'active' : '' } 
                onClick={() => {
                    dispatchFilter({
                        type: 'SET_PLACE_SELECT',
                        payload: 'ALL'
                    })
                }}
            >
                <i className="fad fa-map-marked-alt mr-2"></i>
                Tất cả
            </PlaceItem>
            {
                cinemaLocation && cinemaLocation.length > 0
                && cinemaLocation.map((c) => {
                    return <PlaceItem 
                        key={c.id}
                        className={placeSelect === c.id ? 'active' : ''}
                        onClick={() => {
                            dispatchFilter({
                                type: 'SET_PLACE_SELECT',
                                payload: c.id,
                            });
                        }}
                    >
                        <i className="fad fa-map-marker-alt"></i>
                        { c.district }
                    </PlaceItem>
                })
            }
        </LayoutPlace>
    );
};

export default PlaceView;
