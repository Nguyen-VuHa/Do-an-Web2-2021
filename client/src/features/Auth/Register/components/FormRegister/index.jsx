import React from 'react';


const FormRegister = () => {
    return (
        <form className="form">
            <div className="form-group invalid">
                <label>Họ Tên</label>
                <div className="input-text">
                    <input id="fullname" name="fullname" type="text" className="input" />
                    <small className="invalid-feedback"></small>
                </div>
            </div>  
            <div className="form-group">
                <label>Email</label>
                <div className="input-text">
                    <input id="email" name="email" type="text" className="input" />
                    <small className="invalid-feedback"></small>
                </div>
            </div>  
            <div className="form-group">
                <label>Mật Khẩu</label>
                <div className="input-text">
                    <input id="password" name="password" type="password" className="input" />
                    <small className="invalid-feedback"></small>
                </div>
            </div>  
            <div className="form-group">
                <label>Xác Nhận Mật Khẩu</label>
                <div className="input-text">
                    <input id="c_password" type="password" className="input" />
                    <small className="invalid-feedback"></small>
                </div>
            </div> 
            <div className="form-group">
                <label>Số Điện Thoại</label>
                <div className="input-text">
                    <input id="numberphone" name="numberphone" type="text" className="input" />
                    <small className="invalid-feedback"></small>
                </div>
            </div> 
            <div className="form-group terms">
                <label className="check">
                    <input id="checked" type="checkbox" />
                    <span className="checkmark" />
                </label>
                <p>Đồng ý với các điều khoản và điều kiện</p>
                <small className="invalid-feedback"></small>
            </div> 
            <div className="form-group">
                <button type="button" className="btn btn-submit">Đăng Ký Thành Viên</button>
            </div>
        </form>
    );
};


FormRegister.propTypes = {

};


export default FormRegister;
