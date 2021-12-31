import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import globalText from 'src/contants/titleCinema';
import FormRegister from './FormRegister';
import { 
    LayoutRegister, Title, Wrapper,
    LayoutFormRegister, TitleForm
} from './Register.Style';
import Promotion from './Promotion';

const MainRegister = () => {
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>{ globalText.TITLE_REGISTER }</title>
                </Helmet>
            </HelmetProvider>

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
