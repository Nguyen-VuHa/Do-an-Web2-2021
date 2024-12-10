interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  type?: string;
  value?: string;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({
  className,
  type,
  value,
  placeholder,
  ...props
}) => {
  return (
    <input
      className={`w-full rounded border-[1.5px] border-stroke bg-transparent 
            py-1.5 px-3 font-medium outline-none transition focus:border-primary text-white
            active:border-primary disabled:cursor-default 
            disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
              className || ''
            }`}
      type={type || 'text'}
      value={value}
      placeholder={placeholder || 'Nhập gì đó ...'}
      {...props}
    />
  );
};

export default Input;
