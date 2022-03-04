import React, { useContext } from 'react';
import { AuthContext } from 'src/contexts/authContext';
import { 
    LayoutHeaderProfile, ButtonChangeBackground,
    LayoutAvatarProfile, FramePhoto, ImageView, ButtonDialog
} from './HeaderProfile.Style';
import Images from 'src/contants/image';
import { Text } from 'src/style-common/Text.Style';

const HeaderProfile = () => {
    const { state } = useContext(AuthContext);
    const { avartar, fullname } = state;

    return (
        <LayoutHeaderProfile>
            <ButtonChangeBackground>
                <i className="fal fa-camera-alt mr-2"></i>
                Thêm ảnh bìa
            </ButtonChangeBackground>
            <LayoutAvatarProfile>
                <div>
                    <div className="position-relative d-flex justify-content-centet align-items-center">
                        <ButtonDialog>
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
    );
};

export default HeaderProfile;
