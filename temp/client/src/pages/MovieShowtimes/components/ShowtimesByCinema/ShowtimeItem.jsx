import React, { useContext } from 'react';
import { Green, YellowGray } from 'src/contants/cssContants';
import styled from 'styled-components';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from 'src/contexts/authContext';

const MovieInfo = styled.div`
    position: relative;
    overflow: hidden;
    background-color: transparent;
    box-shadow: 0 5px 15px rgb(0 0 0 / 20%);

    display: flex;
    flex-direction: column;
    align-items: center;

    width: 200px;
    border-radius: 5px;
    margin: 20px 0;
    margin-right: 60px;

    cursor: pointer;
    transition: transform 0.2s linear;
`;

const ImageMovie = styled.img`
    width: 100%;
    height: 300px;
    object-fit: cover;
    object-position: top;
`;


const MovieNameLayout = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 70px;

    display: flex;
    justify-content: center;
    align-items: center;

    z-index: 10;
    flex-direction: column;
    backdrop-filter: blur(15px);
    box-shadow: 0 -10px 10px rgb(0 0 0 / 10%);
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: bottom 0.3s;
    transition-delay: 0.5s;
`;

const MovieName = styled.div`
    color: #ff1414;
    text-shadow: 0 0 5px #d4dd29, 0 0 25px #d4dd29, 0 0 50px #d4dd29, 0 0 100px #d4dd29;

    display: flex;
    flex-direction: column;
    text-align: center;
    top: 0;
    margin: 5px 0px;
    width: 100%;
`;

const LayoutShowTimes = styled.div`
    display: flex;
    flex-wrap: wrap;

    width: auto ;
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

const Line = styled.div`
    width: 100%;
    height: 3px;
    background: linear-gradient(45deg, #ff0, #f0f, #f00, #00f, #0f0);
    margin-top: 20px;
    border-radius: 5px;
    animation: animate 5s linear infinite;
`;

const ShowTimeItem = ({ data }) => {
    const history = useHistory();
    const { state } = useContext(AuthContext);
    const { id } = state; 

    return (
        <>
            <div className='d-flex'>
                <MovieInfo>
                    <ImageMovie src={ data.poster1 } alt="no poster"/>
                    <MovieNameLayout>
                        <MovieName>{ data.movieName }</MovieName>
                    </MovieNameLayout>
                </MovieInfo>   
                <LayoutShowTimes> 
                    {
          
                        data && data?.MovieShowTimes.length > 0
                        && data.MovieShowTimes.map((mv, idx) => {
                            return <ButtonShowTime 
                                key={idx}
                                onClick={() => {
                                    if(localStorage.getItem('accessToken') && id) { 
                                        history.push(`/book-ticket/choose-seats?movieId=${mv.showTime_idMovie}&cinemaId=${mv.showTime_idCinema}&showtimeId=${mv.idShowtime}&userId=${id}`);
                                    }
                                    else {
                                        toast.warn('Bạn chưa đăng nhập!');
                                    }
                                   
                                }}
                            >
                                {`${mv.showTime} - ${moment(mv.premiereDate).format('DD/MM/YYYY')}`}
                            </ButtonShowTime>
                        })
                    }
                </LayoutShowTimes>

            </div>
            <Line />
        </>
    );
};

export default ShowTimeItem;
