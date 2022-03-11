import React from 'react';
import { Green } from 'src/contants/cssContants';
import { Button } from 'src/style-common/Button.Style';
import { Text } from 'src/style-common/Text.Style';
import ModalTransECoin from './ModalTransEcoin';

const HeaderHistoryTrans = () => {
    return (
        <>
            <ModalTransECoin />
            <div className="pt-4 w-100 d-flex justify-content-between align-items-center">
                <Text className="fml-baloo-tammudu-2 txt-green font-params fw-bold" fontSize={30}>
                    Lịch sử giao dịch
                </Text>
                <Button data-toggle="modal" data-target="#exampleModalCenter">
                    <span>Nạp E-coin</span>
                    <i className="fal fa-plus ml-2" style={{marginTop: '3px'}}></i>
                </Button>
            </div>
        </>
    );
};

export default HeaderHistoryTrans;
