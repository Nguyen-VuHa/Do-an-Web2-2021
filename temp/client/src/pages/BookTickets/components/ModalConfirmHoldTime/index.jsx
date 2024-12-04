import React from 'react';
import { useHistory } from 'react-router-dom';
import { BlueGray } from 'src/contants/cssContants';
import { Button } from 'src/style-common/Button.Style';
import { ContentModal, LayoutModal, ModalBackground, ModalBody, ModalFooter, ModalHeader } from 'src/style-common/Modal.Style';
import { Text } from 'src/style-common/Text.Style';

const ModalConfirmHoldTime = ({ isShow, setIsShow }) => {
    const history = useHistory();

    return (
        <LayoutModal
            className={isShow ? 'show' : ''}
        >
            <ModalBackground />
            <ContentModal className='mb' bgColor={BlueGray}>
                <ModalHeader>
                    <div className="d-flex p-3">
                        <Text className="fw-bold txt-yellow-gray font-params" fontSize={25}>Thông báo thời gian</Text>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <Text className="fw-bold txt-red-error font-params fml-baloo-tammudu-2" fontSize={21}>Thời gian giữ ghế của bạn đã hết hạn!</Text>
                    <Text className="fw-bold txt-yellow-light fml-baloo-tammudu-2 mt-4">Bạn đã quá hạn thời gian 5 phút cho phần giữ ghế! Xin mời bạn Thao tác lại quá trình đặt ghế! Xin cảm ơn!</Text>
                </ModalBody>
                <ModalFooter className='mt-4'>
                    <Button
                        onClick={() => {
                            setIsShow(false);
                            history.replace('/');
                        }}
                    >
                        Xác nhận
                    </Button>
                </ModalFooter>
            </ContentModal>
        </LayoutModal>
    );
};

export default ModalConfirmHoldTime;
