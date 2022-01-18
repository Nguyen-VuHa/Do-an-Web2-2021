import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import Images from 'src/contants/image';
import globalText from 'src/contants/titleCinema';
import DetailCinema from './DetailCinema';
import GoogleMap from './GoogleMap';
import { 
    Layout, Container, Heading , Title,
    GridContent, BannerTicket
} from './SystemCinemaDetail.Style'; 
import { fetchSystemCinema } from 'src/reducers/systemCinemaSlice';

const SystemCinemaDetail = () => {
    const params = useParams();
    const { systemCinema } = useSelector(state => state.systemCinemaState);
    const history = useHistory();
    const dispatch = useDispatch();
    const [data, setData] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        dispatch(fetchSystemCinema());
    }, []);
    
    useEffect(() => {
        if(systemCinema && systemCinema.length > 0) {
            const detailCinema = systemCinema.filter(item => item.id === params.cinemaId);

            if(detailCinema && detailCinema.length > 0) {
                setData(detailCinema);
            }
            else
                history.push('/system-cinema/cinema');
        }
    }, [params, systemCinema]);

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>{ globalText.TITLE_SYSTEM_CINEMA }</title>
                </Helmet>
            </HelmetProvider>
            <Layout>
                <Container className="container">
                    <Heading>
                        <Link className="btn-back" to="/system-cinema/cinema">
                            <i className="fal fa-arrow-circle-left"></i>
                        </Link>
                        <Title>Hệ Thống Rạp Phim</Title>
                    </Heading>
                    
                    <GridContent>
                        <DetailCinema data={data}/>
                        <GoogleMap data={data}/>
                    </GridContent>

                    <BannerTicket>
                        <img src={Images.FARE} alt="No Banner Ticket"/>
                    </BannerTicket>
                </Container>
            </Layout>
        </>
    );
};

export default SystemCinemaDetail;
