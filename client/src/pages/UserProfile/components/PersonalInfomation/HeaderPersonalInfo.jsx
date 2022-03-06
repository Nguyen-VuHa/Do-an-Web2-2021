import React, { useEffect, useState } from 'react';
import { Text } from 'src/style-common/Text.Style';
import { Button } from 'src/style-common/Button.Style';
import { White, Green } from 'src/contants/cssContants';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getInfomationUser, setDefaultStatus, updateInfomationUser } from 'src/reducers/profileSlice';
import { ClipLoader } from 'react-spinners';

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
    const { profile, statusUpdate } = useSelector(state => state.profileState);
    const dispatch = useDispatch();
    const accessToken = localStorage.getItem('accessToken');
    
    const [isSubmit, setIsSubmit] = useState(false);

    useEffect(() => {
        if(statusUpdate === 1) {
            toast.success('Cập nhật thành công!');
            dispatch(setDefaultStatus());
            setIsEdit(false);
            setIsSubmit(false);
        }
        if(statusUpdate === 2) {
            toast.error('Cập nhật thất bại!');
            dispatch(setDefaultStatus());
            setIsSubmit(false);
            dispatch(getInfomationUser({userId: profile.idUser, accessToken}));
        }
    }, [statusUpdate]);
    
    return (
        <div className="pt-4 w-100 d-flex justify-content-between align-items-center">
            <Text className="fml-baloo-tammudu-2 txt-green font-params fw-bold" fontSize={30} style={{borderBottom: `2px solid ${Green}`}}>
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
