import React from 'react';
import {
    Image, LayoutSlide, SlideItem
} from './SlidePoster.Style';
import Images from 'src/contants/image';

const SlidePromotion = (props) => {
   
    return (
        <LayoutSlide ref={props.layoutSlideRef}>
            <SlideItem className="slider">
                <Image src={ Images.BANNER_1 }alt="Not Banner"/>
            </SlideItem>
            <SlideItem className="slider">
                <Image src={ Images.BANNER_2 }alt="Not Banner"/>
            </SlideItem>
            <SlideItem className="slider">
                <Image src={ Images.BANNER_3 }alt="Not Banner"/>
            </SlideItem>
            <SlideItem className="slider">
                <Image src={ Images.BANNER_4 }alt="Not Banner"/>
            </SlideItem>
            <SlideItem className="slider">
                <Image src={ Images.BANNER_5 }alt="Not Banner"/>
            </SlideItem>
        </LayoutSlide>
    );
};

export default SlidePromotion;
