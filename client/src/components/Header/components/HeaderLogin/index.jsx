import $ from 'jquery';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import isByLength from 'validator/lib/isByteLength';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import authApi from '../../../../api/authApi';
import { login } from '../../../../contants/loginSlice';

const HeaderLogin = () => {
    const [isToggle, setIsToggle] = useState(false);
    const [validator, setValidator] = useState({});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const isLogin = useSelector((state) => state.isLogin);
    const history = useHistory();
    
    const handleToggleForm = () => {
        setIsToggle(!isToggle);
    }
   
    const handleClickOutside = (event) => {
        if(!$(event.target).closest('.btn-dropdown').length)
        { 
            if(!$(event.target).closest('.dropdown_menu').length) {
                setIsToggle(false);
            }
        }
    }

    useEffect(() => {
        if(!isLogin) {
            window.addEventListener('click', handleClickOutside);
        }

        return () => {
            window.removeEventListener('click', handleClickOutside);
        }
    }, [isLogin]);

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        const data = {
            email,
            password,
        }
        var valid = validatorAll(data);
        if(valid) {
            const result = await authApi.loginAccount(data);
            if(result.status === 'error'){
                alert(result.message);
            }
            else {
                localStorage.setItem('accessToken', result.accessToken);
                localStorage.setItem('refreshToken', result.refreshToken);
                localStorage.setItem('user-info', JSON.stringify(result.user));
                setIsToggle(false);
                dispatch(login());
                history.push('/');
            }
        }
      
    }

    const validatorAll = (data) => {
        const msg = {};

        if(isEmpty(data.email))
            msg.email = "Trường này không được trống!";
        else if(!isEmail(data.email))
            msg.email = "Email không hợp lệ xin mời kiểm tra lại!";
        else
            delete msg.email

        if(isEmpty(data.password))
            msg.password = "Trường này không được trống!";
        else if(isByLength(data.password, 50))
            msg.password = "Password không được vượt quá 50 ký tự!";
        else
            delete msg.password

        setValidator(msg);
        if(Object.keys(msg).length > 0) return false;

        return true;
    }
    
    return (
        <>
            <div className="btn btn-dropdown" onClick={() => handleToggleForm()}>Đăng Nhập</div>
            <div className="dropdown_menu" id="dropdown_menu">
                <form 
                    id="form-login" 
                    className={isToggle ? 'form-login active' : 'form-login'}
                >
                    <div className="form-group">
                        <input 
                            type="email"
                            name="email" className="input_text" placeholder="Email" 
                            value={email}
                            onChange={(e) => { 
                                setEmail(e.target.value) 
                                delete validator.email
                            }}
                        />
                        <small className="invalid-feedback" 
                            style={validator.email ? {display: 'block'} : {display: 'none'} }
                        >{ validator.email && validator.email}</small>
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            name="password" className="input_text" placeholder="Password" 
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                                delete validator.password
                            }}
                        />
                        <small className="invalid-feedback" 
                            style={validator.password ? {display: 'block'} : {display: 'none'} }
                        >{ validator.password && validator.password}</small>
                    </div>
                    <div className="form-submit">
                        <button 
                            type="submit" className="btn btn-success"
                            onClick={(e) => handleSubmitLogin(e)}
                        >Đăng Nhập</button>
                        <Link to="/" className="btn-question-pass">Quên mật khẩu?</Link>  
                    </div>
                    <Link to="/auth/register" onClick={() => setIsToggle(false)}>
                        <div className="btn btn-success w-100">Đăng Ký Thành Viên</div>
                    </Link>
                </form>
            </div>
        </>
    );
};


HeaderLogin.propTypes = {

};


export default HeaderLogin;
