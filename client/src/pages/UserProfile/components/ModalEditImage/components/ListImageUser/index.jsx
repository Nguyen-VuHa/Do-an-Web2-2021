import React from 'react';
import { useSelector } from 'react-redux';
import { WarrapImage } from '../../EditImage.Style';

const ListImageUser = ({ onChangeImage }) => {
    const { userAvatar } = useSelector(state => state.profileState);

    const handleClickImage = (urlImage) => {
        onChangeImage(urlImage);
    }

    return (
        <WarrapImage>
            {
                userAvatar && userAvatar.length > 0 && userAvatar.map(item => {
                    return  <div className="item-img" key={item.id} onClick={() => handleClickImage(item.imgUrl)}>
                                <img src={item.imgUrl} alt="Not Avartar" />
                            </div>
                })
            }
        </WarrapImage>
    );
};


ListImageUser.propTypes = {

};


export default ListImageUser;
