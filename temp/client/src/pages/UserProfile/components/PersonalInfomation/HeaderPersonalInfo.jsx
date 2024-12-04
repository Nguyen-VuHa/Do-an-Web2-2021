import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { White } from 'src/contants/cssContants';
import { AuthContext } from 'src/contexts/authContext';
import { getInfomationUser, setDefaultStatus, updateInfomationUser } from 'src/reducers/profileSlice';
import { Button } from 'src/style-common/Button.Style';
import { Text } from 'src/style-common/Text.Style';

const handleCheckSubmit = (profile) => {
    if(profile && Object.keys(profile).length > 0) {
        const {address, fullname, idUser, numberphone } = profile;

        if(idUser && fullname && numberphone && address)
            return true;
        else
            return false;
    }
}

const HeaderPersonalInfo = ({ isEdit, setIsEdit }) => {
    const { dispatchAuth } = useContext(AuthContext);
    const { profile, statusUpdate } = useSelector(state => state.profileState);
    const dispatch = useDispatch();
    const accessToken = localStorage.getItem('accessToken');
    
    const [isSubmit, setIsSubmit] = useState(false);

    useEffect(() => {
        if(statusUpdate === 1) {
            dispatchAuth({
                type: 'UPDATE_FULLNAME_USER_INFO',
                payload: profile.fullname,
            })
            toast.success('Cập nhật thành công!');
            dispatch(setDefaultStatus());
            setIsEdit(false);
            setIsSubmit(false);
        }
        if(statusUpdate === 2) {
            toast.error('Cập nhật thất bại!');
            dispatch(setDefaultStatus());
            setIsSubmit(false);
            dispatch(getInfomationUser());
        }
    }, [statusUpdate]);
    
    return (
        <div className="pt-4 w-100 d-flex justify-content-between align-items-center">
            <Text className="fml-baloo-tammudu-2 txt-green font-params fw-bold" fontSize={30}>
                Thông tin chi tiết
            </Text>
            <Button
                onClick={() => {
                    if(isEdit && isSubmit === false) {
                        if(handleCheckSubmit(profile)) {
                            setIsSubmit(true);
                            dispatch(updateInfomationUser(
                                {
                                    accessToken,
                                    dataProfile: profile,
                                }
                            ))
                        }
                        else
                            toast.warn('Bạn cần nhập đầy đủ thông tin!');
                    }
                    else
                        setIsEdit(true)
                }}
            >
                {
                    isSubmit ? <div className="d-flex">
                        <ClipLoader color={White} size={20}/>
                        <div className="ml-2">Đang cập nhật...</div>
                    </div> 
                    : isEdit ? 'Lưu lại' : 'Chỉnh sửa'
                }
            </Button>
        </div>
    );
};

export default HeaderPersonalInfo;
