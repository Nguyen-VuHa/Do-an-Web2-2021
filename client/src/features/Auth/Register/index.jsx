import React from 'react';
import { Helmet } from 'react-helmet';
import FormRegister from './components/FormRegister';
import './register.scss';

const Register = () => {
    return (
        <>
            <Helmet>
                <title>CGV Cinemas Việt Nam | Đăng Ký Thành Viên</title>
            </Helmet>
            <div className="page-register">
                <div className="container">
                    <div className="title">
                        <h3>Đăng Ký Thành Viên</h3>
                    </div>
                    <div className="layout">
                        <div className="reg-form">
                            <div className="title">
                                Đăng Ký Mới
                            </div>
                            <FormRegister />
                        </div>
                    </div>
                </div>
            </div>
        </>
        
    );
};


Register.propTypes = {

};


export default Register;
