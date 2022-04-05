import React from 'react';
import { useSelector } from 'react-redux';
import { GrayWhite, YellowGray } from 'src/contants/cssContants';
import styled from 'styled-components';

const LayoutCinemaView = styled.ul`
    display: flex;
    flex-wrap: wrap;
    margin-top: 15px;
    width: 100%;
`;

const CinemaViewItem = styled.li`
    list-style: none;

    width: calc(100%/4 - 12px);
    height: 200px;

    color: ${GrayWhite};
   
    cursor: pointer;
    box-shadow: 3px 5px 21px 0px rgb(5 12 17 / 70%);

    margin-right: 12px;
    margin-bottom: 12px;

    &:hover{
        background: #2d5269e6;
    }
`;

const CinemaViewInfo = styled.div`
    padding: 12px 10px;
    width: 100%;
    height: 100%;
    background: #151f28;

    &:hover {
        background: #263247;
    }

    &.active {
        background: #2d5269e6;
    }
`;

const InfoTitle = styled.div`
    font-size: 17px;
    min-height: 48px;
    font-weight: bold;
    line-height: 24px;
    color: #e71a0f;
    text-transform: uppercase;

    i {
        margin-right: 10px;
        text-shadow: 0 0 5px #ffffff, 0 0 25px #ffffff, 0 0 50px #ffffff, 0 0 100px #ffffff;
        animation: circular 8s linear 0s infinite;
    }
`;

const InfoAddress = styled.p`
    font-size: 14px;
    line-height: 30px;
    font-weight: 500;

    i {
        margin-right: 10px;
        color: #d4dd29;
        text-shadow: 0 0 5px #8eff66, 0 0 25px #8eff66, 0 0 50px #8eff66, 0 0 100px #8eff66;
    }
`;


const CinemaView = () => {
    const { systemCinema } = useSelector(state => state.systemCinemaState);

    return (
        <LayoutCinemaView className='container'>
            {
                systemCinema && systemCinema.length > 0
                && systemCinema.map((sys_c) => {
                    return <CinemaViewItem key={sys_c.id}>
                        <CinemaViewInfo>
                            <InfoTitle>
                                <i className="fad fa-star-of-david"></i>
                                { sys_c.nameCinema }
                            </InfoTitle>
                            <InfoAddress>
                                <i className="fad fa-map-pin"></i>
                                { `${sys_c.wards} - ${sys_c.district} - ${sys_c.city}`}
                            </InfoAddress>
                        </CinemaViewInfo>
                    </CinemaViewItem>
                })
            }
        </LayoutCinemaView>
    );
};

export default CinemaView;
