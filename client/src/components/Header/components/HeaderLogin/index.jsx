import $ from 'jquery';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import isByLength from 'validator/lib/isByteLength';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import authApi from '../../../../api/authApi';
import { login } from '../../../../contants/loginSlice';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../../contexts/authContext';

const HeaderLogin = () => {
    const [isToggle, setIsToggle] = useState(false);
    const [validator, setValidator] = useState({});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const isLogin = useSelector((state) => state.isLogin);
    const history = useHistory();
    const { dispatchAuth } = useContext(AuthContext); 
    
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
                toast.warn(`${result.message}`)
            }
            else {
                localStorage.setItem('accessToken', result.accessToken);
                localStorage.setItem('refreshToken', result.refreshToken);
                dispatchAuth({
                    type: 'SET_USER_INFO',
                    payload: result.user,
                })
                setIsToggle(false);
                dispatch(login());
                history.push('/');
            }
        }
      
    }

    const validatorAll = (data) => {
        const msg = {};

        if(isEmpty(data.email))
            msg.email = "Tr?????ng n??y kh??ng ???????c tr???ng!";
        else if(!isEmail(data.email))
            msg.email = "Email kh??ng h???p l??? xin m???i ki???m tra l???i!";
        else
            delete msg.email

        if(isEmpty(data.password))
            msg.password = "Tr?????ng n??y kh??ng ???????c tr???ng!";
        else if(isByLength(data.password, 50))
            msg.password = "Password kh??ng ???????c v?????t qu?? 50 k?? t???!";
        else
            delete msg.password

        setValidator(msg);
        if(Object.keys(msg).length > 0) return false;

        return true;
    }
    
    return (
        <>
            <div className="btn btn-dropdown" onClick={() => handleToggleForm()}>????ng Nh???p</div>
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
                        >????ng Nh???p</button>
                        <Link to="/" className="btn-question-pass">Qu??n m???t kh???u?</Link>  
                    </div>
                    <Link to="/auth/register" onClick={() => setIsToggle(false)}>
                        <div className="btn-reg btn-success w-100" style={{ width: '100% !important' }}>????ng K?? Th??nh Vi??n</div>
                    </Link>
                </form>
            </div>
        </>
    );
};


HeaderLogin.propTypes = {

};


export default HeaderLogin;
