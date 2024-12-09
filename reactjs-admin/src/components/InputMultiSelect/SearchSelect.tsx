import React, { useEffect, useRef } from 'react';

type SearchSelectProps = {
  value?: string;
  onChange?: (value: string) => void;
};

const SearchSelect: React.FC<SearchSelectProps> = ({ value, onChange }) => {
  const textEditorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (textEditorRef.current) {
      textEditorRef.current.textContent = value || 'Nhập tìm kiếm...';
    }
  }, [value]);

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
