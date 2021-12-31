import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { 
    Layout, TitleMovie,
    LayoutCarousel, ButonCarousel, 
    LayoutSlideCarousel, SlickList, SlickTrack, SlickSlide,
    DefaultItem
} from 'src/style-common/MovieCarousel.Style';
import MovieCard from './MovieCard';
import Images from 'src/contants/image';

const MovieCurrent = () => {
    const {loading, movieCurrent } = useSelector((state) => state.homepageState);
    
    const layoutSlideRef = useRef(null);
    const sizeSlickRef = useRef(null);

    const [count, setCount] = useState(0);
    const [items, setItems] = useState(1);
    const [index, setIndex] = useState(0);
    const [widthItem, setWidthItem] = useState(0);

    const [windowSize, setwindowSize] = useState(window.innerWidth);

    useEffect(() => {
        if(movieCurrent && movieCurrent.length > 0) {
            setCount(movieCurrent.length);
        }
    }, [movieCurrent]);

    useLayoutEffect(() => {
        window.addEventListener('resize', function() {
                setwindowSize(window.innerWidth);
                let item = 1;
                if(window.innerWidth > 1024) 
                    item = 5
                else if (window.innerWidth <=  1024 && window.innerWidth >= 764) 
                    item = 3
                else if (window.innerWidth < 764 && window.innerWidth >= 600) 
                    item = 2
                else
                    item = 1;
                
                setItems(item);
                setWidthItem(Math.ceil(sizeSlickRef.current?.offsetWidth / item) + 10);
                layoutSlideRef.current.style.transform = `translate3d(0px, 0px, 0px)`;
                setIndex(0);
        });

        return () => {
            window.removeEventListener('resize', function() {
                setwindowSize(null);
            });
        }
    }, [window.innerWidth]);

    useEffect(() => {
        if(sizeSlickRef && sizeSlickRef.current) {
            let item = 1;
            if(windowSize > 1024) 
                item = 5
            else if (windowSize <=  1024 && windowSize >= 764) 
                item = 3
            else if (windowSize < 764 && windowSize >= 600) 
                item = 2
            else
                item = 1
            
            setItems(item);
            setWidthItem(Math.ceil(sizeSlickRef.current?.offsetWidth / item) + 10);
        }
    }, [sizeSlickRef]);

    const handlePrevSlide = () => {
        if(index <= 0)
        { 
            return;
        }
        layoutSlideRef.current.style.transform = `translate3d(-${(widthItem) * (index - 1)}px, 0px, 0px)`;
        setIndex(index - 1);
    }

    const handleNextSlide = () => {
        if(index >= (count - items + 1))
        {
            return;
        }
        layoutSlideRef.current.style.transform = `translate3d(-${(widthItem) * (index + 1)}px, 0px, 0px)`;
        setIndex(index + 1);
    }

    return (
        <Layout>
            <TitleMovie>-- Phim hiện đang chiếu --</TitleMovie>
            <LayoutCarousel>
                {
                    count > 5  
                    && <ButonCarousel 
                        className="left"
                        onClick={handlePrevSlide}
                    >
                        <i className="far fa-chevron-left" />
                    </ButonCarousel>
                }
                <LayoutSlideCarousel ref={sizeSlickRef}>
                    <SlickList>
                        <SlickTrack 
                            width={count * (widthItem * 2)}
                            ref={layoutSlideRef}
                        >
                            {
                                movieCurrent && movieCurrent.length > 0
                                ? movieCurrent.map(item => {
                                    return  <SlickSlide 
                                                key={item.movieId}
                                                width={(widthItem)}
                                            >
                                                <MovieCard data={item}/>
                                            </SlickSlide>
                                })
                                : <DefaultItem>
                                    <img src={Images.MOVIE_DEFAULT } alt='NOT ITEM'/>
                                    <span className='ml-4'>Không có phim hiện đang chiếu!</span>
                                </DefaultItem>
                            }
                        </SlickTrack>
                    </SlickList>
                </LayoutSlideCarousel>
                {
                    count > 5  
                    &&  <ButonCarousel 
                        className="right"
                        onClick={handleNextSlide}
                    >
                        <i className="far fa-chevron-right" />
                    </ButonCarousel>
                }
            </LayoutCarousel>
           
        </Layout>
    );
};


export default MovieCurrent;
