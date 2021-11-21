import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Images from '../../../../contants/image';
import { useOnScreen } from '../../../../hooks/IntersectionImage';

const Promotion = () => {
    const [windowSize, setwindowSize] = useState(window.innerWidth);
    const [slideWidth, setslideWidth] = useState(0);
    const [indexImage, setindexImage] = useState(0);
    const [promotionRef, visiblePormotion] = useOnScreen({ threshold: 0.2 });
    const [statusLoading, setStatusLoading] = useState(false);
    const [lenght, setlenght] = useState(5);
    const slideImageRef = useRef(null);

    useEffect(() => {
        if(visiblePormotion) 
            setStatusLoading(true);
    }, [visiblePormotion]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if(indexImage >= (lenght - 1))
            {
                setindexImage(0);
                slideImageRef.current.style.transform = `translateX(-${slideWidth * 0}px)`
                return;
            }
            setindexImage(indexImage + 1);
            slideImageRef.current.style.transform = `translateX(-${indexImage === 0 ? slideWidth : slideWidth * (indexImage + 1)}px)`;
        }, 5000);
    
        return () => clearTimeout(timeout);
    }, [indexImage, lenght, slideWidth]);

    useEffect(() => {
        window.addEventListener('resize', function() {
            setwindowSize(window.innerWidth);
        });

        const slideImage = document.querySelectorAll(".slider");

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
            setindexImage(5 - 1);
            slideImageRef.current.style.transform = `translateX(-${slideWidth * (5 - 1)}px)`;
            return;
        }
        setindexImage(indexImage - 1);
        slideImageRef.current.style.transform = `translateX(-${indexImage === 0 ? slideWidth : slideWidth * (indexImage - 1)}px)`;
    }

    const handleNextSlide = () => {
        if(indexImage >= (5 - 1))
        {
            setindexImage(0);
            slideImageRef.current.style.transform = `translateX(-${slideWidth * 0}px)`
            return;
        }
        setindexImage(indexImage + 1);
        slideImageRef.current.style.transform = `translateX(-${indexImage === 0 ? slideWidth : slideWidth * (indexImage + 1)}px)`;
    }


    return (
        <section className="promotion" ref={ !statusLoading ? promotionRef : null }>
            <div className="btn-prev" onClick={() => handlePrevSlide()}>
                <i className="far fa-chevron-left"></i>
            </div>
            <div className="slider-promotion" ref={slideImageRef}>
                <div className="slider" >
                    {
                        !statusLoading ? 
                            visiblePormotion ? <img src={ Images.BANNER_1 }alt="Not Banner"/>
                            : <span className="skeleton-box" style={{width: '100%', height: '100%'}}></span>
                        : <img src={ Images.BANNER_1 }alt="Not Banner"/>
                    }
                </div>
                <div className="slider">
                    {
                        !statusLoading ? 
                            visiblePormotion ? <img src={ Images.BANNER_2 }  alt="Not Banner"/>
                            : <span className="skeleton-box" style={{width: '100%', height: '100%'}}></span>
                        : <img src={ Images.BANNER_2 }  alt="Not Banner"/>
                    }
                </div>
                <div className="slider">
                    {
                        !statusLoading ? 
                            visiblePormotion ?  <img src={ Images.BANNER_3 }  alt="Not Banner"/>
                            : <span className="skeleton-box" style={{width: '100%', height: '100%'}}></span>
                        :  <img src={ Images.BANNER_3 }  alt="Not Banner"/>
                    }
                </div>
                <div className="slider">
                    {
                        !statusLoading ? 
                            visiblePormotion ?   <img src={ Images.BANNER_4 }  alt="Not Banner"/>
                            : <span className="skeleton-box" style={{width: '100%', height: '100%'}}></span>
                        :   <img src={ Images.BANNER_4 }  alt="Not Banner"/>
                    }
                  
                </div>
                <div className="slider">
                    {
                        !statusLoading ? 
                            visiblePormotion ? <img src={ Images.BANNER_5 } alt="Not Banner"/>
                            : <span className="skeleton-box" style={{width: '100%', height: '100%'}}></span>
                        :    <img src={ Images.BANNER_5 } alt="Not Banner"/>
                    }
                </div>
            </div>
            <div className="btn-next" onClick={() => handleNextSlide()}>
                <i className="far fa-chevron-right"></i>
            </div>
        </section>
    );
};


Promotion.propTypes = {

};


export default Promotion;
