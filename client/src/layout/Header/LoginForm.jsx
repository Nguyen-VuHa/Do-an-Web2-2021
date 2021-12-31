import React, { useState } from 'react';
import { FormLayout, FormGroup, FormControl, TextLink } from './LoginForm.Style';
import { InputForm } from 'src/style-common/Input.Style';
import { Button } from 'src/style-common/Button.Style';
import { Link } from 'react-router-dom';

const LoginForm = ({ isDropDown, dropdownRef, setIsDropDown }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


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
                        // delete validator.email
                    }}
                />
                <small className="invalid-feedback" 
                    // style={validator.email ? {display: 'block'} : {display: 'none'} }
                >
                    {/* { validator.email && validator.email} */}
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
                        // delete validator.email
                    }}
                />
                <small className="invalid-feedback" 
                    // style={validator.email ? {display: 'block'} : {display: 'none'} }
                >
                    {/* { validator.email && validator.email} */}
                </small>
            </FormGroup>
            <FormControl className="mt-3">
                <Button type="button" className="w-50">Đăng nhập</Button>
                <TextLink>Quên mật khẩu?</TextLink>
            </FormControl>
            <Link to="/auth/register" onClick={() => setIsDropDown(false)}>
                <Button type="button" className="w-100 mt-3" >Đăng ký thành viên</Button>
            </Link>
        </FormLayout>
    );
};

export default LoginForm;
