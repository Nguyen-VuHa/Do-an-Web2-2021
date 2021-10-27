import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import './user_profile.scss';
import Images from '../../contants/image';
import SideBarProfile from './components/SideBarProfile';
import ContentProfile from './components/ContentProfile';
import userApi from '../../api/userApi';
import ModalEditImage from './components/ModalEditImage';
import ProcessLoadingFile from './components/ProcessLoadingFile';
import { useDispatch, useSelector } from 'react-redux';
import { getImageUser } from './profileSlice';
import GLOBAL_TEXT from '../../contants/titleCinema';

const UserProfile = () => {
    const [active, setActive] = useState(0);
    const [dataUser, setDataUser] = useState({});
    const layoutRef = useRef(null);
    const accessToken = localStorage.getItem('accessToken');
    const stateAvartar = useSelector((state) => state.avartar);
    const dispatch = useDispatch();
    
    useEffect(() => {
        let sizeLayout = active * 100;
        layoutRef.current.style.transform = `translateY(-${sizeLayout}%)`

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [active]);

    useEffect(() => {
        if(accessToken) {
            let fecthData = async function fecthDataUser() {
                const result = await userApi.getInfoUser(accessToken);
                setDataUser(result.data);
            }
            fecthData();

            dispatch(getImageUser(accessToken));
            
            return () => {
                fecthData = null;
            }
        }
      
    }, [accessToken, dispatch]);
    
   
    return (
        <>
            <Helmet>
                <title>My Profile | { GLOBAL_TEXT.TITLE_CINEMA }</title>
            </Helmet>
            <div className="profile-user">
                <div className="backgroun-content">
                    <div className="content-left">

                    </div>
                    <div className="content-right backgound-img">
                        <img src={ stateAvartar.imageUrl ? stateAvartar.imageUrl :  Images.DefaultAvatar } alt="Not Backgound"/>
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
            <ModalEditImage />
            <ProcessLoadingFile />
        </>
    );
};


UserProfile.propTypes = {

};


export default UserProfile;
