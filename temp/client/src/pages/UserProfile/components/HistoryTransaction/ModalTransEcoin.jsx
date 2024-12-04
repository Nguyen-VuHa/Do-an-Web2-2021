import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BlueGray, White } from 'src/contants/cssContants';
import InputText from 'src/custom-fields/InputText';
import { Button } from 'src/style-common/Button.Style';
import { FormGroup } from 'src/style-common/Layout.Style';
import { ButtonClose, ContentModal, LayoutModal, ModalBackground, ModalBody, ModalFooter, ModalHeader } from 'src/style-common/Modal.Style';
import { Text } from 'src/style-common/Text.Style';
import { createNewRechargeMoneyUser, getWalletPersonalUser, setDefaultStatus } from 'src/reducers/profileSlice';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { AuthContext } from 'src/contexts/authContext';
import userApi from 'src/api/userApi';
import authApi from 'src/api/authApi';
import { uuidv4 } from 'src/utils/generalUUID';

function randomMoney(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}

const ButtonHideModal = ({ onClick }) => {
    return <ButtonClose
        onClick={(e) => onClick && onClick(e)}
    >
        <i className="fal fa-times"></i>
    </ButtonClose>
}



const ModalTransECoin = ({ isShow, setIsShow }) => {
    const dispatch = useDispatch();
    const {  dispatchAuth } = useContext(AuthContext);

    const { loading, statusRecharge } = useSelector(state => state.profileState);
 
    const [seriNumber, setSeriNumber] = useState('');
    const [idCard, setIdCard] = useState('');

    useEffect(() => {
        if(isShow) {
            setSeriNumber(uuidv4(10));
            setIdCard(uuidv4(14));
        }
    }, [isShow]);

    useEffect(() => {
        let body = document.body;
        if(isShow)
            body.classList.add('modal-open');
        else
            body.classList.remove('modal-open');

    }, [isShow]);

    const handleCheck = () => {
        if(seriNumber && idCard) return true;

        return false;
    }

    const handleSetDefaultText = () => {
        setSeriNumber('');
        setIdCard('');
    }

    const handleSubmitPayment = () => {
        if(handleCheck() && loading === false) {
            document.body.style.pointerEvents = "none";

            let dataRequest = {
                denominations: randomMoney(100000, 5000000),
                code: idCard,
                seriNumber: seriNumber,
            }

            dispatch(createNewRechargeMoneyUser(dataRequest))
        }
    }

    useEffect(() => {
        const getCountNotify = async () => {
            const dataUser = await authApi.getInfoUser(localStorage.getItem('refreshToken'));

            if(dataUser.status === 200) {
                dispatchAuth({
                    type: 'SET_USER_INFO',
                    payload: dataUser.data,
                })
            }

            const numOfNotify = await userApi.getCountNotify(localStorage.getItem('accessToken'));

            if(numOfNotify.status === 200) {
                dispatchAuth({
                    type: 'SET_NUMBER_OF_NOTIFY',
                    payload: numOfNotify.count,
                })
            }
        }

        if(statusRecharge === 1) {
            document.body.style.pointerEvents = "";
            handleSetDefaultText();
            toast.success('Nạp tiền thành công');
            setIsShow(false);
            dispatch(getWalletPersonalUser());
            dispatch(setDefaultStatus());
            getCountNotify();
        }

        if(statusRecharge === 2) {
            document.body.style.pointerEvents = "";
            toast.error('Nạp tiền thất bại');
        }
    }, [statusRecharge]);

    return (
        <LayoutModal
            className={ isShow ? "show" : ""}
        >
            <ModalBackground 
                onClick={() => {
                    handleSetDefaultText();
                    setIsShow(false);
                }}
            />
            <ContentModal className='mb' bgColor={BlueGray}>
                <ButtonHideModal 
                    onClick={() => {
                        handleSetDefaultText();
                        setIsShow(false);
                    }}
                />
                <ModalHeader>
                    <div className="d-flex p-3">
                        <Text className="fw-bold txt-yellow-gray font-params" fontSize={25}>Hệ thống giao dịch</Text>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <FormGroup className="flex-column w-100">
                        <Text >Số Seri</Text>
                        <InputText 
                            disabled={true}
                            className="edit mt-4"
                            placeholder="Nhập mã số seri..."
                            onChangeText={(text) => setSeriNumber(text)}
                            setValue={seriNumber}
                        />
                    </FormGroup>
                    <FormGroup className="flex-column w-100 mt-4">
                        <Text >Nhập mã thẻ</Text>
                        <InputText 
                            disabled={true}
                            className="edit mt-4"
                            placeholder="Nhập mã số thẻ..."
                            onChangeText={(text) => setIdCard(text)}
                            setValue={idCard}
                        />
                    </FormGroup>
                </ModalBody>
                <ModalFooter className='mt-4'>
                    <Button
                        className={handleCheck() ? "" : "submit"}
                        onClick={handleSubmitPayment}
                    >
                        {
                            loading ? <div className="d-flex">
                                <ClipLoader color={White} size={20}/>
                                <div className="ml-2">Đang xử lý...</div>
                            </div> 
                            : 'Xác nhận thanh toán'
                        }
                    </Button>
                </ModalFooter>
            </ContentModal>
        </LayoutModal>
    );
};

export default ModalTransECoin;
