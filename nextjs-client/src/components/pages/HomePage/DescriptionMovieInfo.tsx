"use client"

import React from "react";
import StarPoint from '~/assets/imgs/star.gif';
import Image from 'next/image';

interface DescriptionMovieInfoProps {
  content?: string;
  isLoading?: boolean;
}

const DescriptionMovieInfo: React.FC<DescriptionMovieInfoProps> = ({
  content,
  isLoading,
}) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-end space-x-2">
        <Image 
          src={StarPoint}
          alt="NO IMAGE"
          width={40}
          height={40}
        /> 
        <span className={`font-semibold text-2xl text-social-x ${isLoading ? "bg-second rounded-circle-md animate-pulse !text-transparent" : ""}`}>
          Chi tiết
        </span>
      </div>
      
      {
        !isLoading && <p className="leading-8 text-typography">{content}</p>
      }
      {
        isLoading && <div className="flex flex-col space-y-2">
          <span className="bg-second rounded-circle-md animate-pulse" style={{width: "50%", height: "25px"}}></span>
          <span className="bg-second rounded-circle-md animate-pulse" style={{width: "25%", height: "25px"}}></span>
          <span className="bg-second rounded-circle-md animate-pulse" style={{width: "10%", height: "25px"}}></span>
        </div>

      }
    </div>
  );
};

export default DescriptionMovieInfo;
