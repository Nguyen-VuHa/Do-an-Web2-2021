import React, { useState } from 'react';
import { Green } from 'src/contants/cssContants';
import { Button } from 'src/style-common/Button.Style';
import { Text } from 'src/style-common/Text.Style';
import ModalTransECoin from './ModalTransEcoin';

const HeaderHistoryTrans = () => {
    const [isShow, setIsShow] = useState(false);

    return (
        <>
            <ModalTransECoin isShow={isShow} setIsShow={setIsShow}/>
            <div className="pt-4 w-100 d-flex justify-content-between align-items-center">
                <Text className="fml-baloo-tammudu-2 txt-green font-params fw-bold" fontSize={30}>
                    Lịch sử giao dịch
                </Text>
                <Button onClick={() => setIsShow(true)}>
                    <span>Nạp E-coin</span>
                    <i className="fal fa-plus ml-2" style={{marginTop: '3px'}}></i>
                </Button>
            </div>
        </>
    );
};

export default HeaderHistoryTrans;
