import React from 'react';
import LoadingTopBar from 'src/components/LoadingTopBar';
import { LoadingContextProvider } from 'src/contexts/loadingContext';
import Header from './Header';
import Footer from './Footer';
import TheContent from './TheContent';

const TheLayout = () => {
    return (
        <LoadingContextProvider>
            <LoadingTopBar /> 
            <>
                <Header />
                <TheContent />
                <Footer />
            </>
        </LoadingContextProvider>
    );
};

export default TheLayout;
