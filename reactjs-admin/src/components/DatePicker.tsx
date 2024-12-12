import React from 'react';

interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  className,
  value,
  onChange,
  ...props
}) => {
  return (
    <input
      type="date"
      className={`custom-input-date custom-input-date-1 w-full
      rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-3 
      font-medium outline-none transition focus:border-primary
      active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
        className || ''
      } ${(value && 'dark:text-white') || ''}`}
      onChange={onChange}
      value={value}
      {...props}
    />
  );
};

export default DatePicker;
