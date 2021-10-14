import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';

const HeaderLogin = () => {
    const [isToggle, setIsToggle] = useState(false);

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
        window.onclick = function(event) {
            handleClickOutside(event);
        }
    }, []);
    
    return (
        <>
            <div className="btn btn-dropdown" onClick={() => handleToggleForm()}>Đăng Nhập</div>
            <div className="dropdown_menu" id="dropdown_menu">
                <form 
                    id="form-login" 
                    className={isToggle ? 'form-login active' : 'form-login'}
                >
                    <div className="form-group">
                    <input id="email" type="email" name="email" className="input_text" placeholder="Email" />
                    <small className="invalid-feedback"></small>
                    </div>
                    <div className="form-group">
                    <input id="password" type="password" name="password" className="input_text" placeholder="Password" />
                    <small className="invalid-feedback"></small>
                    </div>
                    <div className="form-submit">
                        <button type="button" className="btn btn-success">Đăng Nhập</button>
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
