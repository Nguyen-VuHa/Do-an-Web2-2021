import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import authApi from 'src/api/authApi';
import ComboboxDate from 'src/custom-fields/ComboboxDate';
import { Button } from 'src/style-common/Button.Style';
import { InputForm } from 'src/style-common/Input.Style';
import isByLength from 'validator/lib/isByteLength';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import { FormGroup, LayoutForm, TextMessage, TitleLabel } from './FormRegister.Style';
import moment from 'moment';

const FormRegister = () => {
    const [isSubmit, setIsSubmit] = useState(false);
    const history = useHistory();

    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [c_password, setCPassword] = useState('');
    const [birthDay, setBirthDay] = useState('');
    const [numberphone, setNumberPhone] = useState('');

    const [validateMsg, setValidateMsg] = useState({});

    const validateForm = (data) => {
        const msg = {};
    
        if(isEmpty(data.fullname))
            msg.fullname = "Trường này không được trống!";
        else if(isByLength(data.fullname, 80))
            msg.fullname = "Họ tên không hợp lệ! Trên 80 ký tự";
        else
            delete msg.fullname
    
        if(isEmpty(data.email))
            msg.email =  "Trường này không được trống!";
        else if(!isEmail(data.email))
            msg.email = "Email không hợp lệ!";
        else
            delete msg.email;
    
        if(isEmpty(data.password))
            msg.password = "Trường này không được trống!";
        else if(isByLength(data.password, 50))
            msg.password = "Password không được vượt quá 50 ký tự!";
        else
            delete msg.password
    
        if(isEmpty(data.c_password))
            msg.c_password = "Trường này không được trống!";
        else if(data.c_password !== password && password.length !== 0)
            msg.c_password = "Password nhập lại bị sai!";
        else
            delete msg.c_password
    
        if(isEmpty(data.numberphone))
            msg.numberphone = "Trường này không được trống!";
        else if(data.numberphone.length <= 8 || data.numberphone.length >= 12)
            msg.numberphone = "Số điện thoại không hợp lệ!";
        else
            delete msg.numberphone

        if(isEmpty(data.birthDay))
            msg.birthDay = "Trường này không được trống!";
        else
            delete msg.birthDay

        setValidateMsg(msg);
        if(Object.keys(msg).length > 0) return false;
    
        return true;
    }

    const handleChangeInput = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;

        switch (name) {
            case 'fullname':
                delete validateMsg.fullname
                setFullname(value);
                break;
            case 'email':
                delete validateMsg.email
                setEmail(value);
                break;
            case 'password':
                delete validateMsg.password
                setPassword(value);
                break;
            case 'c_password':
                delete validateMsg.c_password
                setCPassword(value);
                break;
            case 'numberphone':
                const regex = /^[0-9\b]+$/;
                if (value === '' || regex.test(value)) {
                    delete validateMsg.numberphone
                    setNumberPhone(value);
                }
                break;
            default:
                break;
        }
    }

    const submitForm = async () => {
        if(isSubmit === false) {
            const data = {
                fullname,
                email,
                password,
                c_password,
                numberphone,
                birthDay,
            };
            var messageError = await validateForm(data);
            if(messageError) {
                setIsSubmit(true);
                const result = await authApi.registerAccount(data);
                if(result.status === 200)
                {
                    toast.success("Successfully!!! Đăng ký thành công!");
                    setIsSubmit(false);
                    history.push('/');
                }
                else
                {
                    console.log(result);
                    toast.error(`Error!!! ${result.message}`);
                    setIsSubmit(false);
                }
            }
        }
    }

    return (
        <LayoutForm className='mt-4'>
            <FormGroup>
                <TitleLabel>Họ & Tên :</TitleLabel>
                <div className="d-flex flex-column w-100">
                    <InputForm 
                        name="fullname" 
                        type="text"
                        value={fullname}
                        onChange={(e) => handleChangeInput(e)}
                        autoComplete='off'
                    />
                    <TextMessage 
                        className={validateMsg.fullname ? "invalid-feedback show" : "invalid-feedback"}
                    >
                        { validateMsg.fullname && validateMsg.fullname}
                    </TextMessage>
                </div>
            </FormGroup>
            <FormGroup className="mt-2">
                <TitleLabel>Email :</TitleLabel>
                <div className="d-flex flex-column w-100">
                    <InputForm 
                        type="email" name="email" 
                        value={email}
                        onChange={(e) => handleChangeInput(e)}
                        autoComplete='off'
                    />
                    <TextMessage 
                        className={validateMsg.email ? "invalid-feedback show" : "invalid-feedback"}
                    >
                        { validateMsg.email && validateMsg.email}
                    </TextMessage>
                </div>
            </FormGroup>
            <FormGroup className="mt-2">
                <TitleLabel>Mật khẩu :</TitleLabel>
                <div className="d-flex flex-column w-100">
                    <InputForm 
                        type="password"  name="password" 
                        value={password}
                        onChange={(e) => handleChangeInput(e)}
                    />
                    <TextMessage 
                        className={validateMsg.password ? "invalid-feedback show" : "invalid-feedback"}
                    >
                        { validateMsg.password && validateMsg.password}
                    </TextMessage>
                </div>
            </FormGroup>
            <FormGroup className="mt-2">
                <TitleLabel>Confirm password :</TitleLabel>
                <div className="d-flex flex-column w-100">
                    <InputForm 
                        type="password" name="c_password"
                        value={c_password}
                        onChange={(e) => handleChangeInput(e)}
                    />
                    <TextMessage 
                        className={validateMsg.c_password ? "invalid-feedback show" : "invalid-feedback" }
                    >
                        { validateMsg.c_password && validateMsg.c_password}
                    </TextMessage>
                </div>
            </FormGroup>
            <FormGroup className="mt-2">
                <TitleLabel>Ngày sinh:</TitleLabel>
                <div className="d-flex flex-column w-100">
                    <ComboboxDate 
                        onChange={(date) => {
                            delete validateMsg.birthDay
                            setBirthDay(date);
                        }}
                    />
                    <TextMessage 
                        className={validateMsg.birthDay ? "invalid-feedback show" : "invalid-feedback" }
                    >
                        { validateMsg.birthDay && validateMsg.birthDay}
                    </TextMessage>
                </div>
            </FormGroup>
            <FormGroup className="mt-2">
                <TitleLabel>Số điện thoại :</TitleLabel>
                <div className="d-flex flex-column w-100">
                    <InputForm 
                        name="numberphone" 
                        type="text"
                        value={numberphone}
                        onChange={(e) => handleChangeInput(e)}
                        autoComplete='off'
                    />
                    <TextMessage 
                        className={validateMsg.numberphone ? "invalid-feedback show" : "invalid-feedback" }
                    >
                        { validateMsg.numberphone && validateMsg.numberphone}
                    </TextMessage>
                </div>
            </FormGroup>
            <Button 
                className={isSubmit ? "mt-2 submit" : "mt-2"}
                type="button"
                onClick={submitForm}
            >
                {
                    isSubmit ? 
                    <>
                        <ClipLoader size={20} color="#FFFFFF"/>
                        <span className='ml-2'>Waiting...</span>
                    </>
                    : 'Đăng ký thành viên' 
                }
            </Button>
        </LayoutForm>
    );
};

export default FormRegister;
