import React, { useEffect, useRef, useState } from 'react';
import './slide_image.scss';

const SlideImage = ({ imageRender }) => {
    const slideImageRef = useRef(null);
    const [windowSize, setwindowSize] = useState(window.innerWidth);
    const [slideWidth, setslideWidth] = useState(0);
    const [indexImage, setindexImage] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => { 
            handleNextSlide();
        }, 3500);

        return () => clearTimeout(timeout);
    }, [indexImage]);

    useEffect(() => {
        window.addEventListener('resize', function() {
            setwindowSize(window.innerWidth);
        });

        const slideImage = document.querySelectorAll(".slider-poster");

        if(slideImage.length > 0) {
            var slideWidth = slideImage[0].clientWidth; 
            
            setslideWidth(slideWidth);
            // setindexImage(modalSlide.indexImage);
            slideImage.forEach((img, index) => {
                img.style.left = index * 100 + "%";
            });

            slideImageRef.current.style.transform = `translateX(-${slideWidth * indexImage}px)`;
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
            slideImageRef.current.style.transform = `translateX(-${slideWidth * (5 - 1)}px)`;
            return;
        }
        setindexImage(indexImage - 1);
        slideImageRef.current.style.transform = `translateX(-${indexImage === 0 ? slideWidth : slideWidth * (indexImage - 1)}px)`;
    }

    const handleNextSlide = () => {
        if(indexImage >= (4 - 1))
        {
            setindexImage(0);
            slideImageRef.current.style.transform = `translateX(-${slideWidth * 0}px)`
            return;
        }
        setindexImage(indexImage + 1);
        slideImageRef.current.style.transform = `translateX(-${indexImage === 0 ? slideWidth : slideWidth * (indexImage + 1)}px)`;
    }


    return (
        <div className="slide-poster">
            <div className="btn-prev" onClick={handlePrevSlide}>
                <i className="far fa-chevron-left"></i>
            </div>
            <div className="poster-carousel" ref={slideImageRef}>
                <div className="slider-poster" >
                    {
                        Object.keys(imageRender).length > 0 ? <img src={ imageRender?.poster1 } alt="Not Poster"/>
                        : <span className="skeleton-box" style={{width: '100%', height: '100%'}}></span>
                    }
                </div>
                <div className="slider-poster">
                    {
                        Object.keys(imageRender).length > 0 ? <img src={ imageRender?.poster2 } alt="Not Poster"/>
                        : <span className="skeleton-box" style={{width: '100%', height: '100%'}}></span>
                    }
                </div>
                <div className="slider-poster">
                    {
                        Object.keys(imageRender).length > 0 ? <img src={ imageRender?.poster3 } alt="Not Poster"/>
                        : <span className="skeleton-box" style={{width: '100%', height: '100%'}}></span>
                    }
                </div>
                <div className="slider-poster">
                    {
                        Object.keys(imageRender).length > 0 ? <img src={ imageRender?.poster4 } alt="Not Poster"/>
                        : <span className="skeleton-box" style={{width: '100%', height: '100%'}}></span>
                    }
                </div>
            </div>
            <div className="btn-next" onClick={handleNextSlide}>
                <i className="far fa-chevron-right"></i>
            </div>
        </div>
    );
};


SlideImage.propTypes = {

};


export default SlideImage;
  


