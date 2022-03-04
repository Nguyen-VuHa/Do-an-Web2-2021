import React from 'react';
import InputText from 'src/custom-fields/InputText';
import { LayoutContent } from './PersonalInfomation.Style';
import { FormGroup } from 'src/style-common/Layout.Style';
import { Text } from 'src/style-common/Text.Style';
 
const ContentPersonalInfo = () => {
    return (
       <>
            <LayoutContent className="mt-3">
                <FormGroup className="flex-column">
                    <Text className="fml-baloo-tammudu-2">Mã Thành Viên</Text>
                    <InputText 

                    />
                </FormGroup>
                <FormGroup className="flex-column">
                    <Text className="fml-baloo-tammudu-2">Email/Tên tài khoản</Text>
                    <InputText 

                    />
                </FormGroup>
                <FormGroup className="flex-column">
                    <Text className="fml-baloo-tammudu-2">Họ tên Khách hàng</Text>
                    <InputText 

                    />
                </FormGroup>
                <FormGroup className="flex-column">
                    <Text className="fml-baloo-tammudu-2">Số điện thoại</Text>
                    <InputText 

                    />
                </FormGroup>
                <FormGroup className="flex-column">
                    <Text className="fml-baloo-tammudu-2">Ngày sinh</Text>
                    <InputText 

                    />
                </FormGroup>
                <FormGroup className="flex-column">
                    <Text className="fml-baloo-tammudu-2">Giới tính</Text>
                    <InputText 

                    />
                </FormGroup>
            </LayoutContent>
            <FormGroup className="flex-column mt-3">
                <Text className="fml-baloo-tammudu-2">Địa chỉ</Text>
                <InputText 
                    className="w-100"
                />
            </FormGroup>
       </>
    );
};

export default ContentPersonalInfo;
