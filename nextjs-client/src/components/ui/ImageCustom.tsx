"use client";
import React, { useState } from "react";
import Image from "next/image";
import { BsCardImage } from "react-icons/bs";

interface ImageCustomProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  isLoading?: boolean;
}

const ImageCustom: React.FC<ImageCustomProps> = ({
  src,
  alt,
  width,
  height,
  isLoading,
}) => {
  const [isFetchImage, setIsFetchImage] = useState<boolean>(true);

  const handleImageLoad = () => {
    setIsFetchImage(false);
  };

  return (
    <div className="w-full h-full">
      {/* Skeleton Loader */}
      {(isLoading || isFetchImage) && (
        <div className="absolute inset-0 bg-second animate-pulse text-facebook rounded-lg flex justify-center items-center">
          <BsCardImage size={60} />
        </div>
      )}

      {/* Image Component from Next.js */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        onLoadingComplete={handleImageLoad}
        style={{ visibility: isLoading || isFetchImage ? "hidden" : "visible" }}
      />
    </div>
  );
};

export default ImageCustom;
