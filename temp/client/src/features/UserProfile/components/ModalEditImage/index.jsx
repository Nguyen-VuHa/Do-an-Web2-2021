import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'simplebar';
import 'simplebar/dist/simplebar.css';
import userApi from '../../../../api/userApi';
import Images from '../../../../contants/image';
import getCroppedImg from '../../../../utils/cropImage';
import { postAvartar } from '../../profileSlice';
import { isLoading, isSuccess } from '../ProcessLoadingFile/processLoadingSlice';
import CropperImage from './components/CropperImage';
import ListImageUser from './components/ListImageUser';
import { getAllImageUser } from './imageUserSlice';
import './modal_edit_img.scss';

const ModalEditImage = () => {
    const state = useSelector((state) => state.processLoading);
    const imageRef = useRef(null);
    const closeRef = useRef(null);
    const dispatch = useDispatch();
    const accessToken = localStorage.getItem('accessToken');
    const [pathImage, setPathImage] = useState('');
    const [imageCropper, setimageCropper] = useState('');
    const [statusImage, setStatusImage] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const stateAvartar = useSelector((state) => state.avartar);

    useEffect(() => {
        if(stateAvartar.imageUrl)
        {
            setimageCropper(stateAvartar.imageUrl ? stateAvartar.imageUrl : '');
        }
    }, [stateAvartar]);

    useEffect(() => {
        if(accessToken) {
            dispatch(getAllImageUser(accessToken));
        }
    }, [dispatch, accessToken]);

    const handleOpenDialog = () => {
        if(state.isLoading === false)
            imageRef.current.click();
    }

    const handleChangeImage = (e) => {
        let fileImage = e.target.files;
      
        if(fileImage.length !== 0) {
            let reader = new FileReader();
            reader.readAsDataURL(fileImage[0]);
            reader.onload = async (e) => {
                if(accessToken) {
                    let imageBase64 = e.target.result;
                    let image = new Image();
                    image.src = imageBase64;
                    image.onload = function() {
                        this.width > this.height ? setStatusImage(1) :  setStatusImage(2)
                    }
                    setPathImage(imageBase64);
                }
            }
        }
    }

    const onChangeImage = (value) => {
        setimageCropper(value);
    }

    const handleRemoveImage = () => {
        setPathImage('');
    }
    
    const handleSaveChange = async () => {
        const croppedImageUrl = await getCroppedImg(pathImage, croppedAreaPixels);
        dispatch(isLoading());
        if(croppedImageUrl) {
            const resultFecth = await userApi.updateImageUser(accessToken, croppedImageUrl);
            if(resultFecth.status === 200)
            {
                setimageCropper('');
                setPathImage('');
                dispatch(isSuccess());
                dispatch(getAllImageUser(accessToken));
            }
            else {
                alert(resultFecth.message);
            }
        }
    }

    const handleSaveAvartar = async () => {
        if(accessToken) {
            const objData = {
                imgUrl: imageCropper,
            };
            const result = await dispatch(postAvartar({accessToken, objData }));
            const resultWrap = unwrapResult(result);
            if(resultWrap.stateReponse.status === 200) {
                setPathImage('');
                closeRef.current.click();
            }
        }
    }

    return (
        <div className="modal fade" tabIndex={-1} role="dialog" id="modalEditorImage" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="modalEditorImage">Cập Nhật Ảnh Đại Diện</h5>
                    <div className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                    </div>
                </div>
                <div className="modal-body content-editor">
                    <div className={pathImage ? "update-image" : "update-image active"}>
                        <div className="editor-image" data-simplebar style={{width: '100%', maxHeight: '67vh'}} >
                            <div className="header">
                                <h3>Ảnh Đã Tải Lên</h3>
                                <div className="btn btn-success" onClick={() => handleOpenDialog()}>
                                    <i className="fal fa-plus mr-3"></i>
                                    Tải ảnh lên
                                </div>
                                <input 
                                    id="selectedFile" ref={imageRef} 
                                    type="file" accept=".png, .jpg, .jpeg ,svg" style={{display: 'none'}}
                                    onChange={(e) => handleChangeImage(e)}
                                    value=""
                                />
                            </div>
                            <ListImageUser onChangeImage={onChangeImage}/>
                        </div>
                        <div className="img-user">
                            <div>
                                <div className="circle-img">
                                    <img src={imageCropper ? imageCropper : Images.DefaultAvatar} alt="Not Avartar"/>
                                </div>
                                <div className="back-image">
                                    <img src={imageCropper ? imageCropper : Images.DefaultAvatar} alt="Not Avartar"/>
                                </div>
                            </div>
                            <p>
                                Ảnh đại diện của bạn hiển thị công khai và đã đồng bộ với các ứng dụng hoặc web app thuộc website CGV.
                            </p>
                        </div>
                    </div>
                    <div className={pathImage ? "edit-image active" : "edit-image"}>
                        <div className="editor-croppie">
                            <CropperImage imageUrl={pathImage} statusImage={statusImage} setCroppedAreaPixels={setCroppedAreaPixels}/>
                        </div>
                        <div className="group-edit-btn">
                            <button type="button" className="btn btn-danger mr-2" onClick={() => handleRemoveImage()}>Remove</button>
                            <button type="button" className="btn btn-success" onClick={() => handleSaveChange()}>Save Changes</button>
                        </div>
                    </div>
                </div>
                <div className={pathImage ? "modal-footer enable" : "modal-footer"}>
                    <button type="button" className="btn btn-danger" data-dismiss="modal" ref={closeRef}>Thoát</button>
                    <button type="button" className="btn btn-success" onClick={handleSaveAvartar}>Lưu Lại</button>
                </div>
                </div>
            </div>
        </div>
    );
};


ModalEditImage.propTypes = {

};


export default ModalEditImage;
