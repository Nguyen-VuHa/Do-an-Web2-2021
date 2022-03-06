import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import LoadingInfoUser from 'src/components/LayoutLoading/LoadingInfoUser';
import { getInfomationUser } from 'src/reducers/profileSlice';
import ContentPersonalInfo from '../components/PersonalInfomation/ContentPersonalInfo';
import HeaderPersonalInfo from '../components/PersonalInfomation/HeaderPersonalInfo';

const PersonalInfomationPage = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const accessToken = localStorage.getItem('accessToken');
    const { loading } = useSelector(state => state.profileState);

    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        if(params && params.idUser && accessToken) {
            dispatch(getInfomationUser({userId: params.idUser, accessToken}))
        }
    }, []);


    
    return (
        <div className='position-relative w-100'>
            { loading ? <LoadingInfoUser /> : '' }
            
            <HeaderPersonalInfo isEdit={isEdit} setIsEdit={setIsEdit}/>
            <ContentPersonalInfo isEdit={isEdit}/>
        </div>
    );
};

export default PersonalInfomationPage;
