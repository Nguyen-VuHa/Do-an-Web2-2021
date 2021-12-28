import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    LayoutCard, CardImage, CardContent,
    ContentBox, ButtonCard, LayoutButton
} from 'src/custom-fields/GlobalStyle/CardMovie.Style';

const MovieCard = ({ className, setWidthItem }) => {
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
                <img src="https://res.cloudinary.com/cgv-vi-t-nam/image/upload/v1634557387/poster_movie/yybymmqgw8fqa7neaxqb.jpg" alt="No Item" />
            </CardImage>
            <CardContent
                className={isHover ? 'hover' : ''}
            >
                <ContentBox>
                    <h3>VÙNG ĐẤT CÂM LẶNG II</h3>
                    <p>20/11/1999</p>
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
