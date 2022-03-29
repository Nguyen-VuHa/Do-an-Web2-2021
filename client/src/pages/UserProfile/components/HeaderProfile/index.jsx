import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from 'src/contexts/authContext';
import { 
    LayoutHeaderProfile, ButtonChangeBackground,
    LayoutAvatarProfile, FramePhoto, ImageView, ButtonDialog
} from './HeaderProfile.Style';
import Images from 'src/contants/image';
import { Text } from 'src/style-common/Text.Style';
import ModalEditImage from '../ModalEditImage';

const HeaderProfile = () => {
    const { state } = useContext(AuthContext);
    const { avartar, fullname } = state;

    const [isShow, setIsShow] = useState(false);

    const [sizeWindows, setSizeWindows] = useState(window.innerWidth);

    useEffect(() => {
        let handleResize = () => {
            setSizeWindows(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <ModalEditImage isShow={isShow} setIsShow={setIsShow}/>
            <LayoutHeaderProfile>
                <ButtonChangeBackground>
                    <i className={ sizeWindows > 600 ? "fal fa-camera-alt mr-2": "fal fa-camera-alt" }></i>
                    { sizeWindows > 600 && 'Thêm ảnh bìa' }
                </ButtonChangeBackground>
                <LayoutAvatarProfile>
                    <div className='d-flex flex-column justify-content-centet align-items-center'>
                        <div className="position-relative d-flex justify-content-centet align-items-center">
                            <ButtonDialog onClick={() => setIsShow(true)}>
                                <i className="fal fa-camera-alt"></i>
                            </ButtonDialog>
                            <FramePhoto>
                                <ImageView 
                                    src={avartar ? avartar : Images.DefaultAvatar}
                                    alt="Link Avartar Error"
                                />
                            </FramePhoto>
                        </div>
                        <Text className="text-center mt-3 fw-600 txt-green font-params fml-baloo-tammudu-2" fontSize={30}>
                            { fullname && fullname }
                        </Text>
                    </div>
                </LayoutAvatarProfile>
            </LayoutHeaderProfile>
        </>
    );
};

export default HeaderProfile;
