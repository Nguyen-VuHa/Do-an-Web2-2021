import React from 'react';
import { useSelector } from 'react-redux';
import { imageUserSelectors } from '../../imageUserSlice';

const ListImageUser = ({ onChangeImage }) => {
    const imgList = useSelector(imageUserSelectors.selectAll);

    const handleClickImage = (urlImage) => {
        onChangeImage(urlImage);
    }

    return (
        <div className="warrap-img">
            {
                imgList && imgList.map(item => {
                    return  <div className="item-img" key={item.id} onClick={() => handleClickImage(item.imgUrl)}>
                                <img src={item.imgUrl} alt="Not Avartar" />
                            </div>
                })
            }
        </div>
    );
};


ListImageUser.propTypes = {

};


export default ListImageUser;
