import React from "react";

type InputSelectProps = {
  placeholder?: string;
  className?: string;
  data: { value: string | number; name: string }[];
  value: string | number;
  onChange?: (
    value: string,
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => void;
};

function InputSelect({
  placeholder,
  className,
  data,
  value,
  onChange,
}: InputSelectProps) {
  return (
    <select
      className={`${className || ""} p-1 outline-none bg-layout-second`}
      value={value}
      onChange={(e) => {
        if (onChange) onChange(e.target.value, e); // value string, event object
      }}
    >
      <option className="hidden text-input-place" value="">
        {placeholder}
      </option>
      {data &&
        data.length > 0 &&
        data.map((d) => {
          return (
            <option key={d.value} value={d.value}>
              {d.name}
            </option>
          );
        })}
    </select>
  );
}

export default InputSelect;
