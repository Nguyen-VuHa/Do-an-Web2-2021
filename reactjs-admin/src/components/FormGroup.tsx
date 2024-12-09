import React, { ReactNode } from 'react';

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
  return (
    <div className={`w-full ${className || ''}`} {...props}>
      <label className="mb-2.5 block text-black dark:text-white">
        {label} {isRequire && <span className="text-meta-1">*</span>}
      </label>
      {element}
      {messageError && (
        <span className="text-xs text-danger italic">{messageError}</span>
      )}
    </div>
  );
};

export default FormGroup;
