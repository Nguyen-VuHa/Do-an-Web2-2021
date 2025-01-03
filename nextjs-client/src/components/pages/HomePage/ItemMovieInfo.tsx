"use client"

import React from "react";
import { getRandomWidth } from "~/utils/random";

interface ItemMovieInfoProps {
  title?: string;
  content?: string;
  isLoading?: boolean;
}

const ItemMovieInfo: React.FC<ItemMovieInfoProps> = ({
  title = "TITLE",
  content = "CONTENT",
  isLoading,
}) => {
  return (
    <div className="flex space-x-4">
      <label
        className={`text-social-x w-[6.25rem] flex-shrink-0 ${isLoading ? "bg-second rounded-circle-md animate-pulse !text-transparent" : ""}`}
      >
        {title}
      </label>
      <span
        className={`text-typography ${isLoading ? "bg-second rounded-circle-md animate-pulse !text-transparent" : ""}`}
        style={(isLoading && { width: getRandomWidth() }) || {}}
      >
        {content}
      </span>
    </div>
  );
};

export default ItemMovieInfo;
