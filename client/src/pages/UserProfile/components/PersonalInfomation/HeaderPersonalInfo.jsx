import React from 'react';
import { Text } from 'src/style-common/Text.Style';
import { Button } from 'src/style-common/Button.Style';
import { Green } from 'src/contants/cssContants';

const HeaderPersonalInfo = () => {
    return (
        <div className="mt-4 w-100 d-flex justify-content-between align-items-center">
            <Text className="fml-baloo-tammudu-2 txt-green font-params fw-bold" fontSize={30} style={{borderBottom: `2px solid ${Green}`}}>
                Thông tin chi tiết
            </Text>
            <Button>Chỉnh sửa</Button>
        </div>
    );
};

export default HeaderPersonalInfo;
