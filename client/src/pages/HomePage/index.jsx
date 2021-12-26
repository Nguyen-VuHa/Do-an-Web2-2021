import React from 'react';
import { Helmet } from 'react-helmet';
import globalText from 'src/contants/titleCinema';
import {
    MainPage
} from './HomePage.Style';
import Advertisement from './Advertisement';

const HomePage = () => {
    return (
        <>
            <Helmet>
                <title>{ globalText.TITLE_HOMEPAGE }</title>
            </Helmet>
            <MainPage>
                <Advertisement />
            </MainPage>
        </>
    );
};

export default HomePage;
