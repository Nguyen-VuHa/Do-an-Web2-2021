import React from 'react';
import './cinema_item.scss';
import Images from '../../../../../../contants/image';
import { Link } from 'react-router-dom';

const CinemaItem = ({ data }) => {

    return (
        <>
            <Link to={`/cinema-system/cinema/${data.id}`}>
                <div className="item-cinema">
                    <div className="layout-bg">
                        <div 
                            className="borders-bg" 
                            style={{background: `url('${ Images.BorderItem }')`,  
                            backgroundSize: '100%', '--image-url': `url('${ Images.BorderItem }')`}}
                        >
                        </div>
                    </div>
                    <div className="content-item">
                        <div className="logo">
                            <img src={Images.LOGO_BHD} alt="Not Logo"/>
                        </div>
                        <div className="name-cinema">
                            { data.nameCinema }
                        </div>
                        <ul class="info-cinema">
                            <li>{ `${data.district} - ${data.city}` }</li>
                            <li>Phòng chiếu { data.typeCinema  }</li>
                        </ul>
                    </div>
                </div>
            </Link>
        </>
    );
};


CinemaItem.propTypes = {

};


export default CinemaItem;
