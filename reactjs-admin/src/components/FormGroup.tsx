import React, { ReactNode } from 'react';
import useGlobalStore from '~/stores/global.store';

type FormGroupProps = {
  label: string;
  element: ReactNode;
  messageError?: string;
  isRequire?: boolean;
  className?: string;
};

const FormGroup: React.FC<FormGroupProps> = ({
  label = 'TITLE FORM GROUP',
  element,
  messageError,
  isRequire,
  className,
  ...props
}) => {
  const { isFormGroupLoading } = useGlobalStore();

  return (
    <div
      className={`form-group w-full ${className || ''} ${
        (isFormGroupLoading && 'animate-pulse') || ''
      }`}
      {...props}
    >
      <label
        className={`mb-2.5 block bg-gray-200 rounded-full ${
          (isFormGroupLoading &&
            'text-transparent bg-gray dark:bg-graydark w-fit') ||
          ''
        }`}
      >
        {label} {isRequire && <span className="text-meta-1">*</span>}
      </label>
      <div
        className={`w-full ${
          (isFormGroupLoading &&
            'text-black bg-gray dark:bg-graydark h-[30px]') ||
          ''
        }`}
      >
        {!isFormGroupLoading && element}
      </div>
      {messageError && messageError != '' && (
        <span className="text-xs text-danger italic">{messageError}</span>
      )}
    </div>
  );
};

export default FormGroup;
