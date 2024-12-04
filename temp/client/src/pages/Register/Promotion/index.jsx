import React, { useEffect, useRef, useState } from 'react';
import { 
    LayoutPromotion, ButonCarousel,
} from './Promotion.Style';
import SlidePromotion from './SlidePromotion';

const Promotion = () => {
    const [showButton, setShowButton] = useState(false);

    const [length, setLength] = useState(5);
    const [slideWidth, setslideWidth] = useState(0);
    const [indexImage, setindexImage] = useState(0);

    const layoutSlideRef = useRef(null);

    const [windowSize, setwindowSize] = useState(window.innerWidth);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if(indexImage >= (length - 1))
            {
                setindexImage(0);
                layoutSlideRef.current.style.transform = `translateX(-${slideWidth * 0}px)`
                return;
            }
            setindexImage(indexImage + 1);
            layoutSlideRef.current.style.transform = `translateX(-${indexImage === 0 ? slideWidth : slideWidth * (indexImage + 1)}px)`;
        }, 5000);
    
        return () => clearTimeout(timeout);
    }, [indexImage, length, slideWidth]);

    useEffect(() => {
        window.addEventListener('resize', function() {
            setwindowSize(window.innerWidth);
        });

        const slideImage = document.querySelectorAll(".slider");

        if(slideImage.length > 0) {
            var slideWidth = slideImage[0].clientWidth; 
            
            setslideWidth(slideWidth);
            slideImage.forEach((img, index) => {
                img.style.left = index * 100 + "%";
            });

            layoutSlideRef.current.style.transform = `translateX(-${slideWidth * indexImage}px)`;
        }

        return () => {
            window.removeEventListener('resize', function() {
                setwindowSize(null);
            });
        }
    }, [windowSize, indexImage]);

    const handlePrevSlide = () => {
        if(indexImage <= 0)
        {
            setindexImage(5 - 1);
            layoutSlideRef.current.style.transform = `translateX(-${slideWidth * (5 - 1)}px)`;
            return;
        }
        setindexImage(indexImage - 1);
        layoutSlideRef.current.style.transform = `translateX(-${indexImage === 0 ? slideWidth : slideWidth * (indexImage - 1)}px)`;
    }

    const handleNextSlide = () => {
        if(indexImage >= (5 - 1))
        {
            setindexImage(0);
            layoutSlideRef.current.style.transform = `translateX(-${slideWidth * 0}px)`
            return;
        }
        setindexImage(indexImage + 1);
        layoutSlideRef.current.style.transform = `translateX(-${indexImage === 0 ? slideWidth : slideWidth * (indexImage + 1)}px)`;
    }

    return (
        <LayoutPromotion 
            onMouseMove={() => setShowButton(true)}
            onMouseLeave={() => setShowButton(false)}
        >
            <ButonCarousel 
                className={showButton ? 'show left' : 'left'}
                onClick={handlePrevSlide}
            >
                <i className="far fa-chevron-left" />
            </ButonCarousel>
            <SlidePromotion 
                layoutSlideRef={layoutSlideRef}
            />
            <ButonCarousel 
                className={showButton ? 'show right' : 'right'}
                onClick={handleNextSlide}
            >
                <i className="far fa-chevron-right" />
            </ButonCarousel>
        </LayoutPromotion>
    );
};


export default Promotion;
