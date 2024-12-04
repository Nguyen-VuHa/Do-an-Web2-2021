import React from 'react';
import {
    Image, LayoutSlide, SlideItem
} from './SlidePoster.Style';
import { useSelector } from 'react-redux';

const SlidePromotion = (props) => {
    const { movieDetail } = useSelector(state => state.movieState);

    return (
        <LayoutSlide ref={props.layoutSlideRef}>
            <SlideItem className="slider">
                <Image src={ movieDetail && movieDetail.poster1 } alt="Not Poster"/>
            </SlideItem>
            <SlideItem className="slider">
                <Image src={ movieDetail && movieDetail.poster2 } alt="Not Poster"/>
            </SlideItem>
            <SlideItem className="slider">
                <Image src={ movieDetail && movieDetail.poster3 } alt="Not Poster"/>
            </SlideItem>
            <SlideItem className="slider">
                <Image src={ movieDetail && movieDetail.poster4 } alt="Not Poster"/>
            </SlideItem>
        </LayoutSlide>
    );
};

export default SlidePromotion;
