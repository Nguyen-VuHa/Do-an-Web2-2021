import React, { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';

const CropperImage = ({imageUrl, statusImage, setCroppedAreaPixels}) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, [setCroppedAreaPixels]);

    return (
        <div className="cropper-image">
            <Cropper
                image={imageUrl && imageUrl}
                crop={crop}
                zoom={zoom}
                aspect={4/4}
                cropShape="round"
                objectFit={ statusImage === 0 ? "contain" : statusImage === 1  ? "horizontal-cover"  : "vertical-cover" }
                showGrid={false}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
            />
        </div>
    );
};


CropperImage.propTypes = {

};


export default CropperImage;
