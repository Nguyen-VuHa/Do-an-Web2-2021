import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import globalText from 'src/contants/titleCinema';
import FormRegister from './FormRegister';
import { 
    LayoutRegister, Title, Wrapper,
    LayoutFormRegister, TitleForm
} from './Register.Style';
import Promotion from './Promotion';
import LoadingRegister from 'src/components/LayoutLoading/LoadingRegister';

const MainRegister = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let timeOut = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timeOut);
    }, []);
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>{ globalText.TITLE_REGISTER }</title>
                </Helmet>
            </HelmetProvider>

            { isLoading ? <LoadingRegister /> : '' }
            <LayoutRegister>
                <div className="container">
                    <Title>Đăng ký thành viên</Title>
                    <Wrapper>
                        <LayoutFormRegister>
                            <TitleForm>Thông tin đăng ký</TitleForm>
                            <FormRegister />
                        </LayoutFormRegister>
                        <Promotion />
                    </Wrapper>
                </div>
            </LayoutRegister>
        </>
    );
};

export default MainRegister;
