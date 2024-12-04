import React, { useState } from 'react';
import isEmail from 'validator/lib/isEmail';
import isByLength from 'validator/lib/isByteLength';
import isEmpty from 'validator/lib/isEmpty';

const FormRegister = (props) => {
    const {handleSubmit} = props;

    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [c_password, setCPassword] = useState('');
    const [numberphone, setNumberPhone] = useState('');
    const [checkStatus, setCheckStatus] = useState(false);

    const [validateMsg, setValidateMsg] = useState({});

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
                setCPassword(value);
                break;
            case 'numberphone':
                const regex = /^[0-9\b]+$/;
                if (value === '' || regex.test(value)) {
                    setNumberPhone(value);
                }
                break;
            default:
                break;
        }
    }

    const validateAll = (data) => {
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

        if(!checkStatus)
            msg.checkStatus = "Bạn chưa đồng ý với điều khoảng!";
        else
            delete msg.checkStatus

        setValidateMsg(msg);
        if(Object.keys(msg).length > 0) return false;

        return true;
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();
        const data = {
            fullname,
            email,
            password,
            c_password,
            numberphone,
            checkStatus,
        }
        var messageError = await validateAll(data);
        if(messageError) {
            delete data.checkStatus;
            handleSubmit(data);
        }
    }
    
    return (
        <form className="form">
            <div className="form-group">
                <label>Họ Tên</label>
                <div className="input-text">
                    <input 
                        id="fullname" name="fullname" 
                        type="text" className="input"
                        value={fullname}
                        onChange={(e) => handleChangeInput(e)}
                    />
                    <small className="invalid-feedback" 
                        style={validateMsg.fullname ? {display: 'block'} : {display: 'none'} }
                    >{ validateMsg.fullname && validateMsg.fullname}</small>
                </div>
            </div>  
            <div className="form-group">
                <label>Email</label>
                <div className="input-text">
                    <input 
                        id="email" name="email" 
                        type="text" className="input" 
                        value={email}
                        onChange={(e) => handleChangeInput(e)}
                    />
                    <small className="invalid-feedback" 
                    style={validateMsg.email ? {display: 'block'} : {display: 'none'} }
                    >{ validateMsg.email && validateMsg.email}</small>
                </div>
            </div>  
            <div className="form-group">
                <label>Mật Khẩu</label>
                <div className="input-text">
                    <input 
                        id="password" name="password" 
                        type="password" className="input" 
                        value={password}
                        onChange={(e) => handleChangeInput(e)}
                    />
                     <small className="invalid-feedback" 
                        style={validateMsg.password ? {display: 'block'} : {display: 'none'} }
                    >{ validateMsg.password && validateMsg.password}</small>
                </div>
            </div>  
            <div className="form-group">
                <label>Xác Nhận Mật Khẩu</label>
                <div className="input-text">
                    <input 
                        id="c_password" name="c_password" 
                        type="password" className="input" 
                        value={c_password}
                        onChange={(e) => handleChangeInput(e)}
                    />
                    <small className="invalid-feedback" 
                        style={validateMsg.c_password ? {display: 'block'} : {display: 'none'} }
                    >{ validateMsg.c_password && validateMsg.c_password}</small>
                </div>
            </div> 
            <div className="form-group">
                <label>Số Điện Thoại</label>
                <div className="input-text">
                    <input 
                        id="numberphone" name="numberphone" 
                        type="text" className="input" 
                        value={numberphone}
                        onChange={(e) => handleChangeInput(e)}
                    />
                    <small className="invalid-feedback" 
                        style={validateMsg.numberphone ? {display: 'block'} : {display: 'none'} }
                    >{ validateMsg.numberphone && validateMsg.numberphone}</small>
                </div>
            </div> 
            <div className="form-group terms">
                <div className="terms-1">
                    <label className="check">
                        <input id="checked" type="checkbox" value={checkStatus} onClick={() => setCheckStatus(!checkStatus)}/>
                        <span className="checkmark" />
                    </label>
                    <p>Đồng ý với các điều khoản và điều kiện</p>
                </div>
                <div  className="terms-2">
                    <small className="invalid-feedback" 
                        style={validateMsg.checkStatus ? {display: 'block'} : {display: 'none'} }
                    >{ validateMsg.checkStatus && validateMsg.checkStatus}</small>
                </div>  
            </div> 
            <div className="form-group">
                <button 
                    type="submit" className="btn btn-submit"
                    onClick={(e) => onSubmitForm(e)}
                > Đăng Ký Thành Viên </button>
            </div>
        </form>
    );
};


FormRegister.propTypes = {

};


export default FormRegister;
