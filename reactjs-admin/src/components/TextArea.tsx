import React from 'react';

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  value?: string;
  placeholder?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  className,
  value,
  placeholder,
  ...props
}) => {
  return (
    <textarea
      placeholder={placeholder || 'Nhập đoạn text...'}
      className={`w-full rounded border-[1.5px] border-stroke bg-transparent dark:text-white
         py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary
          disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
            className || ''
          }`}
      {...props}
    ></textarea>
  );
};

export default TextArea;
