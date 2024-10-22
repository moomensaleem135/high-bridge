'use-client';
import React, { FormEvent } from 'react';
import dropDown from '../../assets/pngs/dropdownIcon.png';
import CalendarMenu from './calendar-menu';
import MonthMenu from './month-menu';
import { useState, useRef, useEffect } from 'react';

const Form: React.FC = () => {
  const [calendar, setCalendar] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [showCalendarDropdown, setCalendarShowDropdown] =
    useState<boolean>(false);
  const [showMonthDropdonw, setShowMonthDropdown] = useState<boolean>(false);

  const ref = useRef(null);

  const handleCalendarChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    setMonth('');
  }, [calendar]);

  return (
    <div className="bg-[#F8F8F8] w-[34vw] h-[42vh] flex items-center justify-center rounded-3xl border-[1px] border-solid border-[#666666] border-opacity-30">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-start items-center h-[93%] gap-[1.5rem] w-[85%]"
      >
        <div className="flex justify-evenly items-center flex-col h-[5vh]">
          <h3 className="text-3xl font-bold">Profile Setup</h3>
        </div>

        <div className="flex flex-col justify-between items-start w-[95%] h-[8vh]">
          <label>According to which calendar do you pay zakat?</label>
          <div
            className="flex justify-between items-center w-[100%] border-solid border-[1px] border-[#666666] border-opacity-30 rounded-md focus-within:outline focus-within:outline-1 focus-within:outline-black cursor-pointer pr-3"
            onClick={(e) => {
              setCalendarShowDropdown(!showCalendarDropdown);
            }}
          >
            <input
              type="text"
              value={calendar}
              className="bg-transparent w-[100%] h-[5vh] outline-none p-3"
            />
            <img src={dropDown.src} />
          </div>
          {showCalendarDropdown && (
            <CalendarMenu
              setCalednar={setCalendar}
              showCalendarDropdown={showCalendarDropdown}
              setCalendarShowDropdown={setCalendarShowDropdown}
            />
          )}
        </div>
        <div
          className="flex flex-col justify-between items-start w-[95%] h-[8vh]"
          onClick={(e) => setShowMonthDropdown(!showMonthDropdonw)}
        >
          <label>Which month do you pay zakat?</label>
          <div className="flex justify-between items-center w-[100%] border-solid border-[1px] border-[#666666] border-opacity-30 rounded-md focus-within:outline focus-within:outline-1 focus-within:outline-black cursor-pointer pr-3">
            <input
              type="text"
              disabled={calendar === '' ? true : false}
              value={month}
              className="bg-transparent w-[100%] h-[5vh] outline-none p-3"
            />
            <img src={dropDown.src} />
          </div>
          {showMonthDropdonw && (
            <MonthMenu setMonth={setMonth} calendar={calendar} />
          )}
        </div>
        <div className="flex justify-evenly items-center">
          <div className="flex justify-between items-center w-[100%] border-solid border-[1px] border-[#666666] border-opacity-30 rounded-md focus-within:outline focus-within:outline-1 focus-within:outline-black cursor-pointer pr-3">
            <label>Which month do you pay zakat?</label>
            <input
              type="text"
              disabled={calendar === '' ? true : false}
              value={month}
              className="bg-transparent w-[100%] h-[5vh] outline-none p-3"
            />
          </div>
        </div>

        <div className="w-[95%] bg-black h-[5vh] rounded-md ">
          <button
            type="submit"
            className="text-white text-center w-[100%] h-full"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
