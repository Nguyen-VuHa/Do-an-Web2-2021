import React from 'react';
import { Text } from 'src/style-common/Text.Style';
import { Button } from 'src/style-common/Button.Style';
import { Green } from 'src/contants/cssContants';
import { useSelector } from 'react-redux';

const HeaderPersonalInfo = ({ isEdit, setIsEdit }) => {
    const { profile } = useSelector(state => state.profileState);
    
    // console.log(profile);
    return (
        <div className="pt-4 w-100 d-flex justify-content-between align-items-center">
            <Text className="fml-baloo-tammudu-2 txt-green font-params fw-bold" fontSize={30} style={{borderBottom: `2px solid ${Green}`}}>
                Thông tin chi tiết
            </Text>
            <Button
                onClick={() => {
                    if(isEdit) {
                        
                        setIsEdit(false)
                    }
                    else
                        setIsEdit(true)
                }}
            >
                { isEdit ? 'Lưu lại' : 'Chỉnh sửa' }
            </Button>
        </div>
    );
};

export default HeaderPersonalInfo;
