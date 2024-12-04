import moment from 'moment';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShowTimesByMovie, setNameMovie } from 'src/reducers/showtimeSlice';
import { Button } from 'src/style-common/Button.Style';
import { CardContent, CardImage, ContentBox, LayoutButton, LayoutCard } from 'src/style-common/CardMovie.Style';

const MovieCard = ({ className, setWidthItem, data }) => {
    const { movieId } = useSelector(state => state.showtimeState);

    const layoutRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if(layoutRef && layoutRef.current) {
            setWidthItem && setWidthItem(layoutRef.current.offsetWidth);
        }
    }, [layoutRef, layoutRef.current?.offsetWidth]);
    
    return (
        <LayoutCard 
            className={className}
            ref={layoutRef}
        >
            <CardImage>
                <img src={data?.poster1} alt="No Item" />
            </CardImage>
            <CardContent
                className="hover"
            >
                <ContentBox>
                    <h3>{ data?.movieName }</h3>
                    <p>từ {moment(data?.premiereDate).format('DD/MM/YYYY')} đến {moment(data?.endDate).format('DD/MM/YYYY')}</p>
                </ContentBox>
            </CardContent>
            <LayoutButton>
                <Button 
                    className={movieId === data.movieId ? "w-100 active" : "w-100"}
                    onClick={() => {
                        if(movieId !== data.movieId)
                        {
                            dispatch(fetchShowTimesByMovie(data.movieId));
                            dispatch(setNameMovie({
                                movieName: data.movieName,
                                movieId: data.movieId,
                            }))
                        }
                    }}
                >
                    Xem xuất chiếu
                </Button>
            </LayoutButton>
        </LayoutCard>
    );
};

export default MovieCard;
