import React from 'react';
import { Green, YellowGray } from 'src/contants/cssContants';
import styled from 'styled-components';
import moment from 'moment';
import { useHistory, useRouteMatch } from 'react-router-dom';

const TitleCinema = styled.div`
    position: relative;

    margin: 0;
    height: 100%;
    display: table-cell;
    text-align: center;
    vertical-align: middle;

    white-space: nowrap;

    border-width: 5px;

    background-color: rgba(166, 178, 201, 0.5);

    transform: skew(340deg);
    text-transform: none;
    z-index: 1;
    padding: 10px;

    width: auto;
    font-weight: bold;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.002em;
    white-space: pre-wrap;
    
    font-size: 16px;
    font-family: 'Roboto';
    color: ${Green};

    border-bottom: 1px solid ${Green};
`;

const LayoutShowTimes = styled.div`
    display: flex;
    flex-wrap: wrap;

    width: 100%;
    height: auto;
    margin: 20px 0; 
`;

const ButtonShowTime = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

   
    padding: 5px 10px;

    width: auto;
    height: 45px;

    cursor: pointer;
    font-size: 15px;

    border-radius: 5px;
    background:  rgba(166, 178, 201, 0.5);
    text-decoration: none;
    color: ${YellowGray};

    margin-bottom: 5px;
    margin-right: 5px; 

    transition: all .35s ease;
    
    &:hover {
        background:  rgba(166, 178, 201,1);
        color: #f2ff00;
    }
`;

const ListShowTimes = ({ data }) => {
    const history = useHistory();

    return (
        <>
            <TitleCinema>
                { data.nameCinema }
            </TitleCinema>   
            <LayoutShowTimes>
                {
                    data && data?.MovieShowTimes.length > 0
                    && data.MovieShowTimes.map((mv, idx) => {
                        return <ButtonShowTime 
                            key={idx}
                            onClick={() => {
                                const { MovieShowTimes, id } = data;
                                const { R_Movie, idShowtime } = MovieShowTimes[0];
                                const { movieId } = R_Movie
                                history.push(`/book-ticket/choose-seats?movieId=${movieId}&cinemaId=${id}&showtimeId=${idShowtime}`);
                            }}
                        >
                            {`${mv.showTime} - ${moment(mv.premiereDate).format('DD/MM/YYYY')}`}
                        </ButtonShowTime>
                    })
                }
            </LayoutShowTimes>
        </>
    );
};

export default ListShowTimes;
