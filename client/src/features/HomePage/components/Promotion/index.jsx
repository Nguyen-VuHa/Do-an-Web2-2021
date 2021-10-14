import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

const Promotion = () => {
    const [windowSize, setwindowSize] = useState(window.innerWidth);
    const [slideWidth, setslideWidth] = useState(0);
    const [indexImage, setindexImage] = useState(0);
    const [lenght, setlenght] = useState(5);
    const slideImageRef = useRef(null);

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
      }, [indexImage, lenght]);

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
    }, [windowSize]);
  

    // useEffect(() => {
    //     setInterval(function AutoNextSlide() {
    //         if(indexImage >= (5 - 1))
    //         {
    //             setindexImage(0);
    //             slideImageRef.current.style.transform = `translateX(-${slideWidth * 0}px)`
    //             return;
    //         }
    //         setindexImage(indexImage + 1);
    //         slideImageRef.current.style.transform = `translateX(-${indexImage === 0 ? slideWidth : slideWidth * (indexImage + 1)}px)`;
    //     }, 4500);

    // }, []);

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
        <section className="promotion">
            <div className="btn-prev" onClick={() => handlePrevSlide()}>
                <AiFillCaretLeft />
            </div>
            <div className="slider-promotion" ref={slideImageRef}>
                <div className="slider" >
                    <img 
                        src="https://www.octoapp.cimbbank.com.vn/content/dam/cimbvietnam/amp/news_and_promo/Octo-CGV-website-banner-1583x527.jpg"
                        alt="Not Banner"
                    />
                </div>
                <div className="slider">
                    <img src="https://vanhanhmall.com/wp-content/uploads/2019/01/Happy-New-Year-website-banner.jpg"  alt="Not Banner"/>
                </div>
                <div className="slider">
                    <img src="https://thienmochuong.com/wp-content/uploads/2020/02/banner-vi%CC%81a-tha%CC%82%CC%80n-ta%CC%80i-.jpg"  alt="Not Banner"/>
                </div>
                <div className="slider">
                    <img src="https://storage.googleapis.com/cdn.nhanh.vn/store/7136/artCT/43138/qua-tet-totoshop.png"  alt="Not Banner"/>
                </div>
                <div className="slider">
                    <img src="https://www.cgv.vn/media/site/cache/1/980x415/b58515f018eb873dafa430b6f9ae0c1e/c/g/cgv-vincom-caolanh-3.png" alt="Not Banner"/>
                </div>
            </div>
            <div className="btn-next" onClick={() => handleNextSlide()}>
                <AiFillCaretRight />
            </div>
        </section>
    );
};


Promotion.propTypes = {

};


export default Promotion;
