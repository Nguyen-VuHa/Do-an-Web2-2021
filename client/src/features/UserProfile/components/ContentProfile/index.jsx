import React, { useState } from 'react';
import FormProfile from './components/FormProfile';
import userApi from '../../../../api/userApi';


const ContentProfile = ({ dataUser }) => {
    const [isEditor, setIsEditor] = useState(false);
    const accessToken = localStorage.getItem('accessToken');
    let userInfo = JSON.parse(localStorage.getItem('user-info'));
    const [valueSubmit, setvalueSubmit] = useState({});

    const handleSaveInfo = async () => {
        if(accessToken) {
            const result = await userApi.updateProfile(accessToken, valueSubmit);
            if(result.status === 200)
            {
                setIsEditor(!isEditor);
                userInfo = {
                    ...userInfo,
                    fullname: valueSubmit.fullname,
                }
                localStorage.setItem('user-info', JSON.stringify(userInfo));
            }
            else {
                alert(result.message);
            }
        }
    }
    return (
        <>
            <div className="content">
                <span />
                <span />
                <span />
                <span />
                <div>
                    <div className="title">
                        <h3>Thông Tin Cá Nhân</h3> 
                        <div>
                            <div 
                                className={!isEditor ? "btn btn-update mr-3" : "btn btn-update hide mr-3"}
                                onClick={() => setIsEditor(!isEditor)}
                            >
                                Cập Nhật Thông Tin
                            </div>
                            <div className={isEditor ? "btn btn-save" : "btn btn-save hide"} onClick={() => handleSaveInfo()}>
                                Lưu Lại
                            </div>
                        </div>
                    </div>
                    <div className="form-info">
                       <FormProfile isEditor={isEditor} dataUser={dataUser} setvalueSubmit={setvalueSubmit}/>
                    </div>
                </div>
            </div>
        </>
    );
};


ContentProfile.propTypes = {

};


export default ContentProfile;
