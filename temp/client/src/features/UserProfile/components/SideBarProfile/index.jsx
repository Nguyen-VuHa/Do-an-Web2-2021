import React, { useContext, useRef } from 'react';
import { useSelector } from 'react-redux';
import Images from '../../../../contants/image';
import { AuthContext } from '../../../../contexts/authContext';

const SideBarProfile = ({ active, setActive }) => {
    const colorTextRef = useRef(null);
    const { state } = useContext(AuthContext);
    const { fullname } = state;
    const stateAvartar = useSelector((state) => state.avartar);

    const handleInfoUser = () => {
        setActive(0);
        colorTextRef.current.style.color = '#2bd2ff';
    }
    
    const handleTransHistory = () => {
        setActive(1);
        colorTextRef.current.style.color = '#ff1f71';
    }

    const handleToUpCard = () => {
        setActive(2);
        colorTextRef.current.style.color = '#ff4f4f';
    }

    return (
        <>
            <div className="avartar">
                <div className="img-btn">
                    <img src={ stateAvartar.imageUrl ? stateAvartar.imageUrl : Images.DefaultAvatar } alt="Not Avartar"/>
                </div>
                <div className="choose-dialog" id="upload-aphoto">
                    <input id='selectedFile' className="display-none" type='file' accept=".png, .jpg, .jpeg, .svg"/>
                    <div className="btn-choose" data-toggle="modal" data-target="#modalEditorImage"><i className="fal fa-camera-alt"></i></div>
                </div>
            </div>
            <h3 className="title-fullname" ref={colorTextRef}>{ fullname }</h3>
            <p className="price">Số dư TK: <b className="surplus">2.000.000 E-coin</b></p>
            <div className="group-btn">
                <div className={active === 0 ? "btn active" : "btn"} onClick={() => handleInfoUser()}><div>Thông Tin Cá Nhân</div></div>
                <div className={active === 1 ? "btn active" : "btn"} onClick={() => handleTransHistory()}><div >Lịch Sử Giao Dịch</div></div>
                <div className={active === 2 ? "btn active" : "btn"} onClick={() => handleToUpCard()}><div >Nạp E-coin</div></div>
            </div>
        </>
    );
};


SideBarProfile.propTypes = {

};


export default SideBarProfile;
