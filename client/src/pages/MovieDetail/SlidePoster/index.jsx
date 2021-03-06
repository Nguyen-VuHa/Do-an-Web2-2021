import React, { useEffect, useRef, useState } from 'react';
import { 
    LayoutSlidePoster, ButonCarousel,
} from './SlidePoster.Style';
import SlideImagePoster from './SlideImagePoster';

const SlidePoster = () => {
    const [showButton, setShowButton] = useState(false);

    const [length, setLength] = useState(4);
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
    
        return () => {
            clearTimeout(timeout);
        }
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

            return () => setslideWidth(0);
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
            setindexImage(4 - 1);
            layoutSlideRef.current.style.transform = `translateX(-${slideWidth * (5 - 1)}px)`;
            return;
        }
        setindexImage(indexImage - 1);
        layoutSlideRef.current.style.transform = `translateX(-${indexImage === 0 ? slideWidth : slideWidth * (indexImage - 1)}px)`;
    }

    const handleNextSlide = () => {
        if(indexImage >= (4 - 1))
        {
            setindexImage(0);
            layoutSlideRef.current.style.transform = `translateX(-${slideWidth * 0}px)`
            return;
        }
        setindexImage(indexImage + 1);
        layoutSlideRef.current.style.transform = `translateX(-${indexImage === 0 ? slideWidth : slideWidth * (indexImage + 1)}px)`;
    }

    return (
        <LayoutSlidePoster 
            onMouseMove={() => setShowButton(true)}
            onMouseLeave={() => setShowButton(false)}
        >
            <ButonCarousel 
                className={showButton ? 'show left' : 'left'}
                onClick={handlePrevSlide}
            >
                <i className="far fa-chevron-left" />
            </ButonCarousel>
            <SlideImagePoster 
                layoutSlideRef={layoutSlideRef}
            />
            <ButonCarousel 
                className={showButton ? 'show right' : 'right'}
                onClick={handleNextSlide}
            >
                <i className="far fa-chevron-right" />
            </ButonCarousel>
        </LayoutSlidePoster>
    );
};

export default SlidePoster;
