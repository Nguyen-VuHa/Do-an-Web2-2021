/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import "~/assets/styles/input-date.scss";
import React, { useEffect, useRef, useState } from "react";
import { PiCalendarHeartFill } from "react-icons/pi";
import { generateYears, getMonthCalendar } from "~/utils/calender";
import InputSelect from "./InputSelect";
import dayjs, { Dayjs } from "dayjs";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

type Month = {
  value: number;
  name: string;
};

type InputDateProps = {
  placeholder?: string;
  classNameInput?: string;
  value?: string;
  onChange?: (dateString: string, dateValue: Dayjs) => void;
  errMessage?: string;
};

const Months: Month[] = [
  { value: 1, name: "Tháng 1" },
  { value: 2, name: "Tháng 2" },
  { value: 3, name: "Tháng 3" },
  { value: 4, name: "Tháng 4" },
  { value: 5, name: "Tháng 5" },
  { value: 6, name: "Tháng 6" },
  { value: 7, name: "Tháng 7" },
  { value: 8, name: "Tháng 8" },
  { value: 9, name: "Tháng 9" },
  { value: 10, name: "Tháng 10" },
  { value: 11, name: "Tháng 11" },
  { value: 12, name: "Tháng 12" },
];

const maxYear = 2100;
const minYear = 1900;
const years = generateYears(minYear, maxYear);
const daysOfWeek = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN"];

const InputDate: React.FC<InputDateProps> = ({
  placeholder,
  classNameInput,
  value,
  onChange,
  errMessage,
}) => {
  const selectRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [isDropDown, setIsDropDown] = useState<boolean>(false);
  const [calendars, setCalendars] = useState<number[][]>([]);
  const [month, setMonth] = useState<number>(dayjs().month() + 1);
  const [year, setYear] = useState<number>(dayjs().year());
  const [daySelect, setDaySelect] = useState<number | null>(
    value ? dayjs(value).date() : null,
  );
  const [dateString, setDateString] = useState<string>("");
  const [dateValue, setDateValue] = useState<Dayjs | null>(null);

  useEffect(() => {
    if (!value) {
      setDaySelect(null);
      setDateString("");
      setDateValue(null);
    }
  }, [value]);

  useEffect(() => {
    const calendar = getMonthCalendar(year, month);
    
    setCalendars(calendar);
  }, [year, month]);

  useEffect(() => {
    if (daySelect) {
      const dayValue = dayjs(`${year}-${month}-${daySelect}`);
      setDateString(dayValue.format("DD/MM/YYYY"));
      setDateValue(dayValue);

      if (onChange) {
        onChange(dayValue.format("YYYY-MM-DD"), dayValue);
      }
    }
  }, [daySelect]);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setIsDropDown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (isDropDown) {
      const rect = selectRef.current?.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;

      if (rect && dropdownRef.current) {
        if (windowHeight - rect.bottom < dropdownRef.current.clientHeight) {
          dropdownRef.current.style.bottom = "110%";
          dropdownRef.current.style.top = "auto";
        } else {
          dropdownRef.current.style.top = "110%";
          dropdownRef.current.style.bottom = "auto";
        }

        if (windowWidth - rect.right < dropdownRef.current.clientWidth) {
          dropdownRef.current.style.right = "0";
          dropdownRef.current.style.left = "auto";
        } else {
          dropdownRef.current.style.left = "0";
          dropdownRef.current.style.right = "auto";
        }
      }
    }
  }, [isDropDown]);

  return (
    <div className="w-full relative" ref={selectRef}>
      <div
        className={
          (classNameInput || "") +
          ` flex justify-between items-center w-full border-2 border-solid border-transparent
            rounded-circle-lg shadow-0 bg-second text-gray-place
            px-3 py-1 select-none h-[40px]
            transition-all
            font-text
            focus:!border-second
            hover:bg-hover hover:transition-all
            cursor-pointer group`
        }
        onClick={() => setIsDropDown(!isDropDown)}
      >
        <span
          className={`text-social-x ${!daySelect && "!text-gray-place"} text-md`}
        >
          {daySelect ? dateString : placeholder || "DD/MM/YYYY"}
        </span>
        <PiCalendarHeartFill className="text-[22px] cursor-pointer transition-all group-hover:text-social-x" />
      </div>
      {errMessage && (
        <small className="text-error font-extralight italic">
          {errMessage}
        </small>
      )}

      <div
        className={`absolute z-[999] w-full min-h-[100px] bg-second p-3 rounded-circle-md text-white space-y-2 input-date-dropdown ${
          isDropDown ? "show" : ""
        }`}
        ref={dropdownRef}
      >
        <div className="w-full flex justify-between items-center">
          <div>
            <button
              className="rounded bg-social-x p-1.5 bg-opacity-20 hover:bg-opacity-40 text-social-x transition-all"
              type="button"
              onClick={() => {
                if (month - 1 > 0) {
                  setMonth(month - 1);
                } else if (year > minYear) {
                  setMonth(12);
                  setYear(year - 1);
                }
              }}
            >
              <GrFormPrevious />
            </button>
          </div>
          <div className="flex space-x-2">
            <InputSelect
              className="cursor-pointer bg-second text-gray-place hover:border-primary transition-all rounded text-sm hover:text-instagram"
              placeholder="Tháng"
              data={Months}
              value={month}
              onChange={(value) => setMonth(Number(value))}
            />
            <InputSelect
              className="cursor-pointer bg-second text-gray-place hover:border-primary transition-all rounded text-sm hover:text-instagram"
              placeholder="Năm"
              data={years}
              value={year}
              onChange={(value) => setYear(Number(value))}
            />
          </div>
          <div>
            <button
              className="rounded bg-social-x p-1.5 bg-opacity-20 hover:bg-opacity-40 text-social-x transition-all"
              type="button"
              onClick={() => {
                if (month + 1 <= 12) {
                  setMonth(month + 1);
                } else if (year < maxYear) {
                  setMonth(1);
                  setYear(year + 1);
                }
              }}
            >
              <GrFormNext />
            </button>
          </div>
        </div>
        <hr />

        <div className="w-full grid grid-cols-7 gap-1">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="select-none flex justify-center items-center border-b-[1px] rounded border-social-x p-1 text-[.6rem] text-social-x"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="w-full grid grid-cols-7 gap-1">
          {calendars.map((calendar, index) =>
            calendar.map((childCalendar, indexChild) => {
              const todayStatus =
                dayjs(`${year}-${month}-${childCalendar}`).format(
                  "YYYY-MM-DD",
                ) === dayjs().format("YYYY-MM-DD");
              const dayActive =
                dayjs(`${year}-${month}-${childCalendar}`).format(
                  "YYYY-MM-DD",
                ) === dayjs(dateValue).format("YYYY-MM-DD");

              return (
                <div key={`${index}${indexChild}`}>
                  {childCalendar ? (
                    <button
                      type="button"
                      className={`select-none flex justify-center items-center rounded p-2 bg-social-x bg-opacity-20 text-social-x text-xs w-full hover:bg-opacity-70 transition-all ${
                        todayStatus &&
                        "!bg-primary !bg-opacity-40 !text-primary hover:!bg-opacity-50"
                      } ${dayActive && "!bg-instagram !bg-opacity-20 !text-instagram"}`}
                      onClick={() => {
                        setDaySelect(childCalendar);
                        setIsDropDown(false);
                      }}
                    >
                      {childCalendar}
                    </button>
                  ) : (
                    <div></div>
                  )}
                </div>
              );
            }),
          )}
        </div>
      </div>
    </div>
  );
};

export default InputDate;
