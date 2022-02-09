import React, { useEffect } from 'react';
import { TitleRaiting, Star } from './Comment.Style';

const RaitingStar = ({setRaitingStar, raitingStar}) => {

    useEffect(() => {
        if(raitingStar === 0){
            let elmRadio = document.getElementsByName('star');
            for(var i=0;i<elmRadio.length;i++)
                elmRadio[i].checked = false;
        }
    }, [raitingStar]);

    return (
        <div className="d-flex">
            <TitleRaiting>Đánh giá</TitleRaiting>
            <Star>
                <form>
                    <input className="star star-5" id="star-5" type="radio" name="star" />
                    <label className="star star-5" htmlFor="star-5" 
                        onClick={() => setRaitingStar(5)}
                    />
                    <input className="star star-4" id="star-4" type="radio" name="star" />
                    <label className="star star-4" htmlFor="star-4" 
                        onClick={() =>setRaitingStar(4)}
                    />
                    <input className="star star-3" id="star-3" type="radio" name="star" />
                    <label className="star star-3" htmlFor="star-3" 
                        onClick={() =>setRaitingStar(3)}
                    />
                    <input className="star star-2" id="star-2" type="radio" name="star" />
                    <label className="star star-2" htmlFor="star-2" 
                        onClick={() =>setRaitingStar(2)}
                    />
                    <input className="star star-1" id="star-1" type="radio" name="star" />
                    <label className="star star-1" htmlFor="star-1" 
                        onClick={() => setRaitingStar(1)}
                    />
                </form>
            </Star>
        </div>
    );
};

export default RaitingStar;
