import { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';

interface InputSearchProps {
  loading?: boolean;
  placeholder?: string;
  value: string;
  onChangeSearchText: (searchText: string) => void;
}

const InputSearch: React.FC<InputSearchProps> = ({
  loading,
  value,
  onChangeSearchText,
  placeholder = 'Nhập từ khoá tìm kiếm ...',
}) => {
  const [isFocusInput, setIsFocusInput] = useState<boolean>(false);
  const [valueInput, setValueInput] = useState<string>(value || '');
  const [isSearchText, setIsSearchText] = useState<boolean>(false);

  useEffect(() => {
    if (!loading && valueInput) {
      const debounce = setTimeout(() => {
        onChangeSearchText && onChangeSearchText(valueInput);
        setIsSearchText(false);
      }, 500);

      return () => clearTimeout(debounce); // Cleanup debounce
    } else {
      setIsSearchText(false);
      onChangeSearchText && onChangeSearchText('');
    }
  }, [valueInput]);

  return (
    <div
      className={`flex justify-between items-center space-x-1 rounded border-[1.5px] border-stroke bg-transparent 
            font-medium outline-none transition dark:text-white
            disabled:cursor-default 
            disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
              isFocusInput ? 'border-primary dark:border-primary' : ''
            }
            ${loading ? 'pointer-events-none opacity-50' : ''}
            `}
    >
      <div className="flex-shrink-0 w-[40px] h-[40px] flex justify-center items-center">
        {((isSearchText || loading) && (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-solid border-sky border-t-transparent"></div>
        )) || (
          <CiSearch
            className={`${isFocusInput ? 'text-primary' : ''}`}
            size={26}
          />
        )}
      </div>
      <input
        className="outline-none bg-transparent py-1.5 px-3 pl-0 w-full"
        placeholder={placeholder}
        onFocus={() => {
          setIsFocusInput(true);
        }}
        onBlur={() => {
          setIsFocusInput(false);
        }}
        value={valueInput}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setIsSearchText(true);
          setValueInput(e.target.value);
        }}
      />
    </div>
  );
};

export default InputSearch;
