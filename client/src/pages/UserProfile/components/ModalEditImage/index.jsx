import { unwrapResult } from '@reduxjs/toolkit';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'simplebar';
import 'simplebar/dist/simplebar.css';
import userApi from 'src/api/userApi';
import Images from 'src/contants/image';
import { AuthContext } from 'src/contexts/authContext';
import { getAllImageUser, updateAvartar, setDefaultStatus } from 'src/reducers/profileSlice';
import getCroppedImg from 'src/utils/cropImage';
import CropperImage from './components/CropperImage';
import ListImageUser from './components/ListImageUser';
import { ButtonClose, ContentModal, LayoutModal, ModalBackground, ModalBody, ModalFooter, ModalHeader } from 'src/style-common/Modal.Style';
import { Text } from 'src/style-common/Text.Style';
import { BlueGray, White } from 'src/contants/cssContants';
import { Button } from 'src/style-common/Button.Style';
import { Col } from 'src/style-common/Layout.Style';
import { BackgroundImage, CircleImage, EditorCroppie, ImageUserView } from './EditImage.Style';
import { ClipLoader } from 'react-spinners';

const ButtonHideModal = ({ onClick }) => {
    return <ButtonClose
        onClick={(e) => onClick && onClick(e)}
    >
        <i className="fal fa-times"></i>
    </ButtonClose>
}

const ModalEditImage = ({ isShow, setIsShow }) => {
    const imageRef = useRef(null);
    const dispatch = useDispatch();

    const { statusUpdateAvartar } = useSelector(state => state.profileState);

    const { state, dispatchAuth } = useContext(AuthContext);
    const { avartar } = state;

    const [pathImage, setPathImage] = useState('');
    const [imageCropper, setimageCropper] = useState('');
    const [statusImage, setStatusImage] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const [isSubmit, setIsSubmit] = useState(false);

    useEffect(() => {
        if(isShow) 
            document.body.classList.add('modal-open');
        else
            document.body.classList.remove('modal-open');
    }, [isShow]);

    useEffect(() => {
        dispatch(getAllImageUser());    
    }, []);

    useEffect(() => {
        setimageCropper(avartar);
    }, [state]);

    useEffect(() => {
        if(statusUpdateAvartar === 1) {
            dispatchAuth({
                type: 'SET_AVARTAR_USER',
                payload: imageCropper,
            })
            setPathImage('');
            dispatch(setDefaultStatus());
            toast.success('Cập nhật ảnh đại diện thành công!');
            handleCloseModal();
        }
        if(statusUpdateAvartar === 2) {
            setPathImage('');
            dispatch(setDefaultStatus());
            toast.error('Cập nhật ảnh đại diện thất bại!');
        }
    }, [statusUpdateAvartar]);

    const handleCloseModal = () => {
        setPathImage('');
        setPathImage('');
        setIsShow(false);
    }

    const handleOpenDialog = () => {
        imageRef.current.click();
    }

    const handleChangeImage = (e) => {
        let fileImage = e.target.files;
      
        if(fileImage.length !== 0) {
            let reader = new FileReader();
            reader.readAsDataURL(fileImage[0]);
            reader.onload = async (e) => {
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

    const onChangeImage = (value) => {
        setimageCropper(value);
    }

    const handleRemoveImage = () => {
        setPathImage('');
    }
    
    const handleSaveChange = async () => {
        setIsSubmit(true);
        document.body.style.pointerEvents = "none";
        const croppedImageUrl = await getCroppedImg(pathImage, croppedAreaPixels);
        if(croppedImageUrl) {
            const resultFecth = await userApi.updateImageUser(croppedImageUrl);
            if(resultFecth.status === 200)
            {
                toast.success('Xử lý hình ảnh thành công!');
                setimageCropper('');
                setPathImage('');
                dispatch(getAllImageUser());
                setIsSubmit(false);
                document.body.style.pointerEvents = "";
            }
            else {
                alert(resultFecth.message);
                setIsSubmit(false);
                document.body.style.pointerEvents = "";
            }
        }
    }

    const handleSaveAvartar = () => {
        const data = {
            imgUrl: imageCropper,
        };

        dispatch(updateAvartar(data));
    }

    return (
        <LayoutModal
            className={ isShow ? "show" : "" }
        >
            <ModalBackground 
                onClick={() => handleCloseModal()}
            />
            <ContentModal bgColor={BlueGray}>
                <ButtonHideModal 
                    onClick={() => handleCloseModal()}
                />
                <ModalHeader>
                    <div className="d-flex p-3">
                        <Text className="fw-bold txt-yellow-gray font-params" fontSize={25}>Cập nhật ảnh đại diện</Text>
                    </div>
                </ModalHeader>
                <ModalBody>
                {
                    pathImage ? 
                    <>
                        <EditorCroppie>
                            <CropperImage imageUrl={pathImage} statusImage={statusImage} setCroppedAreaPixels={setCroppedAreaPixels}/>
                        </EditorCroppie>
                    </>
                    : <>
                        <Col className='column-2'>
                            <div>
                                <div className="d-flex justify-content-between align-items-center py-3">
                                    <Text className='fw-bold txt-green font-params' fontSize={25}>Ảnh Đã Tải Lên</Text>
                                    <Button className="btn-back" onClick={() => handleOpenDialog()}>
                                        <i className="fal fa-plus mr-3"></i>
                                        Tải ảnh lên
                                    </Button>
                                    <input 
                                        id="selectedFile" ref={imageRef} 
                                        type="file" accept=".png, .jpg, .jpeg ,svg" style={{display: 'none'}}
                                        onChange={(e) => handleChangeImage(e)}
                                        value=""
                                    />
                                </div>
                                <div className="editor-image" data-simplebar style={{width: '100%', maxHeight: '67vh'}} >
                                    <ListImageUser onChangeImage={onChangeImage}/>
                                </div>
                            </div>
                            <ImageUserView>
                                <div className="w-100 h-100 d-flex justify-content-center align-items-center flex-column position-relative">
                                    <CircleImage>
                                        <img src={imageCropper ? imageCropper : Images.DefaultAvatar} alt="Not Avartar"/>
                                    </CircleImage>
                                    <BackgroundImage>
                                        <img src={imageCropper ? imageCropper : Images.DefaultAvatar} alt="Not Avartar"/>
                                    </BackgroundImage>
                                </div>
                                <Text className='text-center mt-5'>
                                    Ảnh đại diện của bạn hiển thị công khai và đã đồng bộ với các ứng dụng hoặc web app thuộc website BHD Star.
                                </Text>
                            </ImageUserView>
                        </Col>
                    </>
                }
                </ModalBody>
                <ModalFooter className='mt-4'>
                    {
                        pathImage ? 
                        <>
                            <Button className="btn-error mr-2" onClick={() => handleRemoveImage()}>
                                {
                                    isSubmit ? 
                                    <div className="d-flex align-items-center">
                                        <ClipLoader color={White} size={20}/>
                                        <div className="ml-2">Đang xử lý...</div>
                                    </div> 
                                    : 'Hủy'
                                }
                            </Button>
                            <Button onClick={() => handleSaveChange()}>
                                {
                                    isSubmit ? 
                                    <div className="d-flex align-items-center">
                                        <ClipLoader color={White} size={20}/>
                                        <div className="ml-2">Đang xử lý...</div>
                                    </div> 
                                    : 'Lưu ảnh'
                                }
                            </Button>
                        </>
                        :
                        <>
                            <Button
                                className='btn-back mr-2'
                                onClick={() => handleCloseModal()}
                            >
                                Thoát
                            </Button>
                            <Button
                                onClick={handleSaveAvartar}
                            >
                                Cập nhật
                            </Button>
                        </>
                    }
                </ModalFooter>
            </ContentModal>
        </LayoutModal>
        // <div className="modal fade" tabIndex={-1} role="dialog" id="modal-edit-images" aria-hidden="true">
        //     <div className="modal-dialog modal-lg" role="document">
        //         <div className="modal-content">
        //         <div className="modal-header">
        //             <h5 className="modal-title" id="modal-edit-images">Cập Nhật Ảnh Đại Diện</h5>
        //             <div className="close" data-dismiss="modal" aria-label="Close">
        //             <span aria-hidden="true">×</span>
        //             </div>
        //         </div>
        //         <div className="modal-body content-editor">
        //             <div className={pathImage ? "update-image" : "update-image active"}>
                        // <div className="editor-image" data-simplebar style={{width: '100%', maxHeight: '67vh'}} >
                        //     <div className="header">
                        //         <h3>Ảnh Đã Tải Lên</h3>
                        //         <div className="btn btn-success" onClick={() => handleOpenDialog()}>
                        //             <i className="fal fa-plus mr-3"></i>
                        //             Tải ảnh lên
                        //         </div>
                        //         <input 
                        //             id="selectedFile" ref={imageRef} 
                        //             type="file" accept=".png, .jpg, .jpeg ,svg" style={{display: 'none'}}
                        //             onChange={(e) => handleChangeImage(e)}
                        //             value=""
                        //         />
                        //     </div>
                        //     <ListImageUser onChangeImage={onChangeImage}/>
                        // </div>
        //                 <div className="img-user">
                            // <div>
                            //     <div className="circle-img">
                            //         <img src={imageCropper ? imageCropper : Images.DefaultAvatar} alt="Not Avartar"/>
                            //     </div>
                            //     <div className="back-image">
                            //         <img src={imageCropper ? imageCropper : Images.DefaultAvatar} alt="Not Avartar"/>
                            //     </div>
                            // </div>
                            // <p>
                            //     Ảnh đại diện của bạn hiển thị công khai và đã đồng bộ với các ứng dụng hoặc web app thuộc website BHD Star.
                            // </p>
        //                 </div>
        //             </div>
        //             <div className={pathImage ? "edit-image active" : "edit-image"}>
                        // <div className="editor-croppie">
                        //     <CropperImage imageUrl={pathImage} statusImage={statusImage} setCroppedAreaPixels={setCroppedAreaPixels}/>
                        // </div>
        //                 <div className="group-edit-btn">
                            // <button type="button" className="btn btn-danger mr-2" onClick={() => handleRemoveImage()}>Remove</button>
                            // <button type="button" className="btn btn-success" onClick={() => handleSaveChange()}>Save Changes</button>
        //                 </div>
        //             </div>
        //         </div>
        //         <div className={pathImage ? "modal-footer enable" : "modal-footer"}>
                    // <button type="button" className="btn btn-danger" data-dismiss="modal" ref={closeRef}>Thoát</button>
                    // <button type="button" className="btn btn-success" onClick={handleSaveAvartar}>Lưu Lại</button>
        //         </div>
        //         </div>
        //     </div>
        // </div>
    );
};


ModalEditImage.propTypes = {

};


export default ModalEditImage;
