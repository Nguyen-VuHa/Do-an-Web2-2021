import React, { useState, useContext } from 'react';
import { FormLayout, FormGroup, FormControl, TextLink } from './LoginForm.Style';
import { InputForm } from 'src/style-common/Input.Style';
import { Button } from 'src/style-common/Button.Style';
import { Link, useHistory } from 'react-router-dom';
import authApi from 'src/api/authApi';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import isByLength from 'validator/lib/isByteLength';
import { toast } from 'react-toastify';
import { AuthContext } from 'src/contexts/authContext';

const validatorLogin = (data, setValidator) => {
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

const LoginForm = ({ isDropDown, dropdownRef, setIsDropDown }) => {
    const { dispatchAuth } = useContext(AuthContext); 
    const history = useHistory(); 

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validator, setValidator] = useState(null);

    const handleLogin = async () => {
        const data = {
            email,
            password,
        }

        var valid = validatorLogin(data, setValidator);
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
                });
                setIsDropDown(false);
                history.push('/');
            }
        }
    }

    return (
        <FormLayout ref={dropdownRef} className={isDropDown ? 'show' : ''}>
            <FormGroup>
                <InputForm 
                    type="email" name="email" 
                    placeholder="Nhập Email" 
                    autoComplete='off'
                    value={email}
                    onChange={(e) => { 
                        setEmail(e.target.value) 
                        if(validator) 
                            delete validator.email
                    }}
                />
                <small className="invalid-feedback" 
                    style={validator && validator?.email ? {display: 'block'} : {display: 'none'} }
                >
                    { validator && validator.email }
                </small>
            </FormGroup>
            <FormGroup className="mt-2">
                <InputForm 
                    type="password" name="password" 
                    placeholder="Nhập mật khẩu" 
                    autoComplete='off'
                    value={password}
                    onChange={(e) => { 
                        setPassword(e.target.value) 
                        if(validator) 
                            delete validator.password
                    }}
                />
                <small className="invalid-feedback" 
                    style={validator && validator?.password ? {display: 'block'} : {display: 'none'} }
                >
                    { validator && validator.password }
                </small>
            </FormGroup>
            <FormControl className="mt-3">
                <Button 
                    type="button" 
                    className="w-50"
                    onClick={() => handleLogin()}
                >
                    Đăng nhập
                </Button>
                <TextLink>Quên mật khẩu?</TextLink>
            </FormControl>
            <Link to="/auth/register" onClick={() => setIsDropDown(false)}>
                <Button type="button" className="w-100 mt-3" >Đăng ký thành viên</Button>
            </Link>
        </FormLayout>
    );
};

export default LoginForm;
