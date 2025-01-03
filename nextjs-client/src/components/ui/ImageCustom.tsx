/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BsCardImage } from "react-icons/bs";

interface ImageCustomProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  isLoading?: boolean;
  imgClassName?: string;
}

const ImageCustom: React.FC<ImageCustomProps> = ({
  src,
  alt,
  width,
  height,
  isLoading,
  imgClassName,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isFetchImage, setIsFetchImage] = useState<boolean>(true);
  const wrapperIMGRef = useRef<HTMLDivElement>(null);

  const handleImageLoad = () => {
    setIsFetchImage(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Ngừng theo dõi sau khi ảnh được tải
        }
      },
      {
        root: null, // Viewport mặc định
        threshold: 0.1, // 10% phần tử xuất hiện trong viewport
      },
    );

    if (wrapperIMGRef.current) {
      observer.observe(wrapperIMGRef.current);
    }

    return () => {
      if (wrapperIMGRef.current) {
        observer.unobserve(wrapperIMGRef.current);
      }
    };
  }, []);

  return (
    <div ref={wrapperIMGRef} className="w-full h-full">
      {/* Skeleton Loader */}
      {(isLoading || isFetchImage || !isVisible) && (
        <div className="absolute inset-0 bg-second animate-pulse text-facebook rounded-lg flex justify-center items-center">
          <BsCardImage size={60} />
        </div>
      )}

      {/* Image Component from Next.js */}
      {isVisible && (
        <Image
          className={imgClassName || ""}
          src={src}
          alt={alt}
          width={width}
          height={height}
          onLoadingComplete={handleImageLoad}
          style={{
            visibility: isLoading || isFetchImage ? "hidden" : "visible",
          }}
        />
      )}
    </div>
  );
};

export default ImageCustom;
