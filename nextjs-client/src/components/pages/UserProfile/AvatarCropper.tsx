import { useCallback, useEffect, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { useUserStore } from "~/stores/user.store";
import { base64ToBlob } from "~/utils/common";
import cropImageToBase64 from "~/utils/cropImage";

interface Point {
  x: number;
  y: number;
}

const AvatarCropper = () => {
  const croppedAreaPixelsRef = useRef<any>(null);

  const { avatarUpload, avatarPreview, setStateUser } = useUserStore();

  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>();

  const onCropComplete = useCallback(
    async (croppedArea: any, croppedAreaPixels: any) => {
      if (
        JSON.stringify(croppedAreaPixels) !==
        JSON.stringify(croppedAreaPixelsRef.current)
      ) {
        setCroppedAreaPixels(croppedAreaPixels);
        croppedAreaPixelsRef.current = croppedAreaPixels;
      }
    },
    [],
  );

  const cropImage = async () => {
    if (avatarUpload && croppedAreaPixels) {
      const croppedImageUrl = await cropImageToBase64(
        URL.createObjectURL(avatarUpload),
        croppedAreaPixels,
      );
      const previewURL = URL.createObjectURL(base64ToBlob(croppedImageUrl));
      URL.revokeObjectURL(avatarPreview || "");
      setStateUser("avatarPreview", previewURL);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      cropImage();
    }, 300); // Thời gian debounce (300ms)

    return () => clearTimeout(timer);
  }, [croppedAreaPixels]);

  return (
    <div className="relative w-full h-[50vh] border-2">
      <Cropper
        image={(avatarUpload && URL.createObjectURL(avatarUpload)) || ""}
        crop={crop}
        zoom={zoom}
        aspect={1}
        showGrid={false}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
      />
    </div>
  );
};

export default AvatarCropper;
