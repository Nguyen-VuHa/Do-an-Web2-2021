import React from "react";

interface TitleProps {
  label: string;
}

const Title: React.FC<TitleProps> = ({ label }) => {
  return (
    <h3
      className={`relative text-xl text-primary font-semibold leading-none uppercase mb-[25px] pl-4 
        before:absolute before:bg-yellow before:content-[''] before:h-[22px] before:w-[4px] before:top-[-2px] before:left-0`}
    >
      {label}
    </h3>
  );
};

export default Title;
