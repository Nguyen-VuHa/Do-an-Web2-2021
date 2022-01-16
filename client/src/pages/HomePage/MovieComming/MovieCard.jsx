import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    LayoutCard, CardImage, CardContent,
    ContentBox, ButtonCard, LayoutButton
} from 'src/style-common/CardMovie.Style';
import moment from 'moment';

const MovieCard = ({ className, setWidthItem, data }) => {
    const [isHover, setIsHover] = useState(false);
    const layoutRef = useRef(null);

    useEffect(() => {
        if(layoutRef && layoutRef.current) {
            setWidthItem && setWidthItem(layoutRef.current.offsetWidth);
        }
    }, [layoutRef, layoutRef.current?.offsetWidth]);
    
    return (
        <LayoutCard 
            className={className}
            ref={layoutRef}
            onMouseMove={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <CardImage>
                <img src={data?.poster1} alt="No Item" />
            </CardImage>
            <CardContent
                className={isHover ? 'hover' : ''}
            >
                <ContentBox>
                    <h3>{ data?.movieName }</h3>
                    <p>{moment(data?.premiereDate).format('DD/MM/YYYY')}</p>
                </ContentBox>
            </CardContent>
            <LayoutButton>
                <Link to="#">
                    <ButtonCard>Mua vé</ButtonCard>
                </Link>
            </LayoutButton>
        </LayoutCard>
    );
};

export default MovieCard;
