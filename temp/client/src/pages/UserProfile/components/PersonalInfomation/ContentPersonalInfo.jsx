import React, { useEffect, useState } from 'react';
import InputText from 'src/custom-fields/InputText';
import { LayoutContent } from './PersonalInfomation.Style';
import { FormGroup } from 'src/style-common/Layout.Style';
import { Text } from 'src/style-common/Text.Style';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'; 
import { setAddressUser, setFullNameUser, setNumberPhoneUser, setSexUser } from 'src/reducers/profileSlice';
import InputNumber from 'src/custom-fields/InputNumber';
import InputSelect from 'src/custom-fields/InputSelect';

const ContentPersonalInfo = ({ isEdit }) => {
    const dispatch = useDispatch();
    const { profile } = useSelector(state => state.profileState);

    const [fullName, setFullName] = useState('');
    const [numberPhone, setNumberPhone] = useState('');
    const [sex, setSex] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        if(profile) {
            setFullName(profile?.fullname);
            setNumberPhone(profile?.numberphone);
            setSex(profile?.sex);
            setAddress(profile?.address);
        }
    }, [profile]);

    // debounce fullname
    useEffect(() => {
        let timeOut = setTimeout(() => {
            dispatch(setFullNameUser(fullName));
        }, 300);

        return () => clearTimeout(timeOut);
    }, [fullName]);

    // debounce numberphone
    useEffect(() => {
        let timeOut = setTimeout(() => {
            dispatch(setNumberPhoneUser(numberPhone));
        }, 300);

        return () => clearTimeout(timeOut);
    }, [numberPhone]);

    // debounce address
    useEffect(() => {
        let timeOut = setTimeout(() => {
            dispatch(setAddressUser(address));
        }, 300);

        return () => clearTimeout(timeOut);
    }, [address]);

    return (
       <>
            <LayoutContent className="mt-3">
                <FormGroup className="flex-column">
                    <Text >Mã Thành Viên</Text>
                    <InputText 
                        className="disable"
                        setValue={profile && profile?.idUser ? profile?.idUser : ''}
                    />
                </FormGroup>
                <FormGroup className="flex-column">
                    <Text >Email/Tên tài khoản</Text>
                    <InputText 
                        className="disable"
                        setValue={profile && profile?.email ? profile?.email : ''}
                    />
                </FormGroup>
                <FormGroup className="flex-column">
                    <Text >Họ tên Khách hàng</Text>
                    <InputText 
                        placeholder="Nhập họ và tên"
                        className={ isEdit ? "edit" : "disable" }
                        setValue={fullName}
                        onChangeText={(text) => {
                            setFullName(text);
                        }}
                    />
                </FormGroup>
                <FormGroup className="flex-column">
                    <Text >Số điện thoại</Text>
                    <InputNumber 
                        placeholder="Nhập số điện thoại liên lạc"
                        className={ isEdit ? "edit" : "disable" }
                        setValue={numberPhone}
                        onChangeText={(text) => {
                            setNumberPhone(text);
                        }}
                    />
                </FormGroup>
                <FormGroup className="flex-column">
                    <Text >Ngày sinh</Text>
                    <InputText 
                        className="disable"
                        setValue={profile && profile?.birthday ? moment(profile?.birthday).format('DD/MM/YYYY') : ''}
                    />
                </FormGroup>
                <FormGroup className="flex-column">
                    <Text >Giới tính</Text>
                    <InputSelect 
                        className={isEdit ? "" : "disable"}
                        disabled={isEdit}
                        placeholder={sex ? sex : "-- Chọn giới tính --"}
                        dataMap={
                            [
                                {
                                    id: 1,
                                    name: 'Nam'
                                },
                                {
                                    id: 0,
                                    name: 'Nữ'
                                },
                            ]
                        }
                        active={sex ? true : false}
                        onChange={(value) => {
                            dispatch(setSexUser(value === 1 ? 'Nam' : 'Nữ'));
                        }}
                    />
                </FormGroup>
            </LayoutContent>
            <FormGroup className="flex-column mt-3">
                <Text >Địa chỉ</Text>
                <InputText 
                    className={ isEdit ? "edit w-100" : "disable w-100" }
                    setValue={address}
                    onChangeText={(text) => {
                        setAddress(text);
                    }}
                />
            </FormGroup>
       </>
    );
};

export default ContentPersonalInfo;
