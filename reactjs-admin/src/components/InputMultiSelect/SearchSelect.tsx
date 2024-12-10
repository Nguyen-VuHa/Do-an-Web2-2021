import React, { useEffect, useRef, useState } from 'react';

type SearchSelectProps = {
  value?: string;
  onChange?: (value: string) => void;
};

const SearchSelect: React.FC<SearchSelectProps> = ({ value, onChange }) => {
  const textEditorRef = useRef<HTMLDivElement | null>(null);
  const [isEdited, setIsEdited] = useState<boolean>(false);

  useEffect(() => {
    if (textEditorRef.current) {
      if (value) {
        textEditorRef.current.textContent = value;
      } else {
        if (!isEdited) textEditorRef.current.textContent = 'Nhập tìm kiếm...';
      }
    }
  }, [value, isEdited]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    // Nếu nhấn phím Enter, ngăn chặn hành vi mặc định (tạo dòng mới)
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <div
      ref={textEditorRef}
      onFocus={() => {
        if (textEditorRef.current && !value) {
          textEditorRef.current.textContent = '';
        }
      }}
      onBlur={() => {
        if (textEditorRef.current && !value) {
          textEditorRef.current.textContent = 'Nhập tìm kiếm...';
        }
      }}
      onInput={() => {
        setIsEdited(true);
        if (textEditorRef.current)
          onChange && onChange(textEditorRef.current.textContent as string);
      }}
      onKeyDown={handleKeyDown}
      className={`outline-none w-auto min-w-[100px] py-1 px-2 ${
        (!value && 'text-[#9ca3af]') || ''
      }`}
      contentEditable
    />
  );
};

export default React.memo(SearchSelect);
