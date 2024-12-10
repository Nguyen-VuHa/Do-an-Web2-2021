import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { IoCheckmarkDoneSharp } from 'react-icons/io5';
import { ISelectOption } from '~/types/common.type';
import { fuzzySearch } from '~/utils/search';
import SearchSelect from './SearchSelect';
import ValueSelected from './ValueSelected';

interface InputMultiSelectProps {
  isSingleValue?: boolean;
  isCustomize?: boolean;
  componentCustomize?: ReactNode;
  options?: ISelectOption[];
  values?: any[];
  onSelect?: (val: any, option?: ISelectOption) => void;
  onRemove?: (val: any) => void;
}

const InputMultiSelect: React.FC<InputMultiSelectProps> = ({
  options,
  isCustomize,
  componentCustomize,
  values,
  onSelect,
  onRemove,
  isSingleValue,
}) => {
  const dropBoxRef = useRef<HTMLDivElement>(null);
  const btnSelectRef = useRef<HTMLDivElement>(null);

  const [searchText, setSearchText] = useState<string>('');
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  const [valueSelected, setValueSelected] = useState<ISelectOption[]>([]);
  const [optionData, setOptionData] = useState<ISelectOption[]>(options || []);

  useEffect(() => {
    if (options && options.length > 0) {
      setOptionData(options);
    }
  }, [options]);

  useEffect(() => {
    if (options) {
      if (searchText) {
        const handler = setTimeout(() => {
          const searchResult = fuzzySearch(options, 'label', searchText);
          setOptionData(searchResult);
        }, 500); // Delay 400ms

        // Xóa timeout cũ khi value thay đổi hoặc component unmount
        return () => {
          clearTimeout(handler);
        };
      } else {
        setOptionData(options || []);
      }
    }
  }, [searchText]);

  useEffect(() => {
    if (isDropdown) {
      document.addEventListener('mousedown', (e) => {
        if (
          btnSelectRef.current &&
          !btnSelectRef.current.contains(e.target as Node) &&
          dropBoxRef.current &&
          !dropBoxRef.current.contains(e.target as Node)
        ) {
          setIsDropdown(false);
        }
      });

      return () => {
        document.removeEventListener('mousedown', () => {});
      };
    }
  }, [isDropdown]);

  return (
    <div
      className="relative w-full rounded border 
      border-stroke pr-8 font-medium outline-none transition 
      focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
    >
      <div
        ref={btnSelectRef}
        className="w-full h-full"
        onClick={() => {
          setIsDropdown(true);
        }}
      >
        <div className="flex flex-wrap items-center p-1.5">
          <div className="flex flex-wrap space-x-1">
            {valueSelected &&
              valueSelected.map((val) => {
                return (
                  <ValueSelected
                    key={val.label}
                    label={val.label}
                    onRemove={() => {
                      onRemove && onRemove(val.value);
                      setValueSelected(
                        valueSelected.filter(
                          (valS) => valS.value !== val.value,
                        ),
                      );
                    }}
                  />
                );
              })}
          </div>
          <SearchSelect
            value={searchText}
            onChange={(value) => {
              setSearchText(value);
            }}
          />
        </div>
        <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.8">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                fill="#637381"
              ></path>
            </g>
          </svg>
        </span>
      </div>
      {isDropdown && (
        <div
          className="absolute w-full h-auto top-[110%] select-none left-0 z-999"
          ref={dropBoxRef}
        >
          <div className="p-3 pt-0 space-y-1 w-full h-fit max-h-[400px] overflow-scroll bg-white border-stroke dark:bg-form-input z-100 rounded-sm dark:border-form-strokedark border-[1.5px]">
            <div className="flex pt-3 flex-col space-y-2 sticky top-0 bg-white dark:bg-form-input">
              {isCustomize && componentCustomize}
              {isCustomize && <hr />}
            </div>
            {(optionData &&
              optionData.length > 0 &&
              optionData.map((option) => {
                const isActive = values?.includes(option.value);
                return (
                  <div
                    key={option.value}
                    onClick={() => {
                      if (!isActive) {
                        onSelect && onSelect(option.value, option);
                        let valSelect: ISelectOption[] =
                          valueSelected.concat(option);

                        if (isSingleValue) {
                          valSelect = [option];
                        }

                        setValueSelected(valSelect);
                      }
                    }}
                    className={`flex justify-between items-center
                    w-full h-full px-2 py-1.5 text-white
                    cursor-pointer hover:bg-primary/60 rounded-sm transition-all hover:text-white ${
                      isActive ? 'bg-primary/80' : ''
                    }`}
                  >
                    {option.label}
                    <div className="flex items-center space-x-2">
                      {isActive && <IoCheckmarkDoneSharp size={20} />}
                      {/* <Button className="!p-2 !w-8 !h-8 !rounded-lg !bg-danger">
                        <CgTrash size={20} />
                      </Button> */}
                    </div>
                  </div>
                );
              })) || (
              <div
                className="
                    flex justify-center items-center
                    w-full h-full px-2 py-1.5 
                    rounded-sm transition-all
                  "
              >
                {searchText
                  ? 'Không có kết quả tìm kiếm tương thích'
                  : 'Không có lựa chọn'}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(InputMultiSelect);
