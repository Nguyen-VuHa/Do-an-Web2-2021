import React, { useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import AreaSystem from './pages/AreaSystem';
import CinemaSystemEdit from './pages/CinemaSystemEdit';
import CinemaSystemView from './pages/CinemaSystem';
import './system_cinema.scss';

const CinemaSystemPage = () => {
    const [isActive, setisActive] = useState(true);
    const [isFecth, setisFecth] = useState(false);
    const contentRef = useRef(null);
    const buttonRef = useRef(null);

    return (
        <>
            <div className="cinema-system">
                <Helmet>
                    <title>Cinema System Manager | CGV Việt Nam</title>
                </Helmet>
                <div className="control-header">
                    <div className="group-ctrl">
                        <div className={ isActive ? "btn btn-area active" : "btn btn-area" } onClick={() => {
                            setisActive(true)
                            contentRef.current.style.transform = `translateX(0%)`;
                        }}>Cụm Khu Vực</div>
                        <div className={ !isActive ? "btn btn-cinema active" : "btn btn-cinema" } onClick={() => {
                            setisActive(false)
                            console.log(contentRef)
                            contentRef.current.style.transform = `translateX(-100%)`;
                        }}>Cụm Rạp Phim</div>
                    </div>
                </div>
                <div className="content" ref={contentRef}>
                    <div className="area-system">
                        <AreaSystem/> 
                    </div>
                    <div className="cinema-system">
                        <CinemaSystemView buttonRef={buttonRef} setisFecth={setisFecth} isFecth={isFecth}/>
                    </div>
                </div>
            </div>
            <CinemaSystemEdit buttonRef={ buttonRef } setisFecth={setisFecth}/>
        </>
    );
};


CinemaSystemPage.propTypes = {

};


export default CinemaSystemPage;
