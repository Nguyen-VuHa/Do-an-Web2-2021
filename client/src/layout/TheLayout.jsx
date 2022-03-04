import React, { useContext, useEffect } from 'react';
import LoadingTopBar from 'src/components/LoadingTopBar';
import { LoadingContextProvider } from 'src/contexts/loadingContext';
import Header from './Header';
import Footer from './Footer';
import TheContent from './TheContent';
import authApi from 'src/api/authApi';
import { AuthContext } from 'src/contexts/authContext';
import userApi from 'src/api/userApi';

const TheLayout = () => { 
    const { state, dispatchAuth } = useContext(AuthContext);
    const { isLogin } = state;
    
    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        const fecthDataUser = async (refreshToken) => {
            const dataUser = await authApi.getInfoUser(refreshToken);
        
            if(dataUser.status === 200)
            {
                dispatchAuth({
                    type: 'SET_USER_INFO',
                    payload: dataUser.data,
                })
                
                const numOfNotify = await userApi.getCountNotify(accessToken);

                if(numOfNotify.status === 200) {
                    dispatchAuth({
                        type: 'SET_NUMBER_OF_NOTIFY',
                        payload: numOfNotify.count,
                    })
                }
            }
        }

        if(refreshToken && isLogin === true) {
            fecthDataUser(refreshToken);
        }
    }, [isLogin]);


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
