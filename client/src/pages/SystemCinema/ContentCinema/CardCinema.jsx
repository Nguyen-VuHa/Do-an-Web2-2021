import React from 'react';
import { Link } from 'react-router-dom';
import { 
    LayoutCard, ContentCard,
    Logo, NameCinema, InfoCinema
} from './ContentCinema.Style';
import Images from 'src/contants/image';

const CardCinema = ({ props }) => {
    const { nameCinema, district, city, typeCinema  } = props;

    return (
        <Link to="#">
            <LayoutCard>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <ContentCard>
                    <Logo>
                        <img src={ Images.LOGO_BHD } alt="No Logo"/>
                    </Logo>
                    <NameCinema>{ nameCinema }</NameCinema>
                    <InfoCinema>
                        <li>{ district } - { city }</li>
                        <li>Phòng chiếu { typeCinema }</li>
                    </InfoCinema>
                </ContentCard>
            </LayoutCard>
        </Link>
    );
};


export default CardCinema;
