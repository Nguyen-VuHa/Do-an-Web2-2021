import React from 'react';
import { useHistory } from "react-router-dom";
import { Helmet } from 'react-helmet';
import FormRegister from './components/FormRegister';
import './register.scss';
import authApi from '../../../api/authApi';
import { useDispatch } from 'react-redux';
import { ShowLoading, HideLoading } from '../../../components/LoadingPage/loadingSlice';

const Register = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    
    const handleSubmit = async (value) => {
        dispatch(ShowLoading());
        const result = await authApi.registerAccount(value);
        if(result.status === 200)
        {
            dispatch(HideLoading());
            history.push('/');
        }
        else
            alert(result.message);
        
    }
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
                            <FormRegister handleSubmit={handleSubmit}/>
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
