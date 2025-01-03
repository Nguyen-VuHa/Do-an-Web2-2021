import React from "react";

interface ImageDetailProps {
  imageURL: string;
}

const ImageDetail: React.FC<ImageDetailProps> = ({ imageURL }) => {
  return (
    <div className="absolute z-[-1] grid grid-cols-[0fr_1fr] w-full h-full top-0 left-0 bg-layout md:grid-cols-[0.3fr_0.7fr]">
      <div></div>
      <div
        className="relative w-full h-full bg-cover bg-no-repeat transition-all duration-500 ease-in-out"
        style={{
          backgroundImage: `url(${imageURL})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-layout to-[rgba(17,22,31, 0.3)]"></div>
        <div className="absolute inset-0 top-0 bg-gradient-to-t from-layout to-[rgba(17,22,31, 0.3)]"></div>
      </div>
    </div>
  );
};

export default ImageDetail;
