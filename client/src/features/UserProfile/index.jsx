import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import './user_profile.scss';
import Images from '../../contants/image';
import SideBarProfile from './components/SideBarProfile';
import ContentProfile from './components/ContentProfile';
import userApi from '../../api/userApi';

const UserProfile = () => {
    const [active, setActive] = useState(0);
    const [dataUser, setDataUser] = useState({});
    const layoutRef = useRef(null);
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        let sizeLayout = active * 100;
        layoutRef.current.style.transform = `translateY(-${sizeLayout}%)`
    }, [active]);

    useEffect(() => {
        let fecthData = async function fecthDataUser() {
            const result = await userApi.getInfoUser(accessToken);
            setDataUser(result.data);
        }
        fecthData();
        return () => {
            fecthData = null;
        }
    }, [accessToken]);
    
   
    return (
        <>
            <Helmet>
                <title>My Profile | CGV Cinemas Việt Nam</title>
            </Helmet>
            <div className="profile-user">
                <div className="backgroun-content">
                    <div className="content-left">

                    </div>
                    <div className="content-right backgound-img">
                        <img src={ Images.DefaultAvatar } alt="Not Backgound"/>
                    </div>
                </div>
                <div className="profile-content">
                    <div className="content-sidebar">
                        <SideBarProfile setActive={setActive} active={active}/>
                    </div>
                    <div className="content-form"  ref={ layoutRef }>
                        <div className="edit-profile">
                           <ContentProfile dataUser={dataUser}/>
                        </div>
                        <div className="transaction-history">

                        </div>
                        <div className="to-up-card">

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


UserProfile.propTypes = {

};


export default UserProfile;
