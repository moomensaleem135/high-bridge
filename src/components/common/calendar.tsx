import React, { useState, useEffect, useRef } from 'react';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import hijri from 'react-date-object/calendars/arabic';
import gregorian from 'react-date-object/calendars/gregorian';
import { ClockIcon } from '@/assets/svgs';

type CalendarType = 'lunar' | 'solar';

const calendars = {
  lunar: hijri,
  solar: gregorian,
};

const locales: Record<CalendarType, any> = {
  lunar: {
    name: 'ar',
    months: [
      ['Muharram'],
      ['Safar'],
      ["Rabi' al-Awwal"],
      ["Rabi' al-Thani"],
      ['Jumada al-Awwal'],
      ['Jumada al-Thani'],
      ['Rajab'],
      ["Sha'ban"],
      ['Ramadan'],
      ['Shawwal'],
      ["Dhul-Qi'dah"],
      ['Dhul-Hijjah'],
    ],
    weekDays: [
      ['Saturday', 'Sat'],
      ['Sunday', 'Sun'],
      ['Monday', 'Mon'],
      ['Tuesday', 'Tue'],
      ['Wednesday', 'Wed'],
      ['Thursday', 'Thu'],
      ['Friday', 'Fri'],
    ],
    digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  },
  solar: {
    name: 'en',
    months: [
      ['January'],
      ['February'],
      ['March'],
      ['April'],
      ['May'],
      ['June'],
      ['July'],
      ['August'],
      ['September'],
      ['October'],
      ['November'],
      ['December'],
    ],
    weekDays: [
      ['Saturday', 'Sat'],
      ['Sunday', 'Sun'],
      ['Monday', 'Mon'],
      ['Tuesday', 'Tue'],
      ['Wednesday', 'Wed'],
      ['Thursday', 'Thu'],
      ['Friday', 'Fri'],
    ],
    digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    meridiems: ['AM', 'PM'],
  },
};

interface CalendarProps {
  year: string;
  onDateChange?: (date: Date) => void;
  dateVal?: string;
}

const Calendar: React.FC<CalendarProps> = ({ year, onDateChange, dateVal }) => {
  const [calendarType, setCalendarType] = useState<CalendarType | string>(
    'solar'
  );
  const [value, setValue] = useState<DateObject | null>(null);
  const datePickerRef = useRef<any>(null);

  useEffect(() => {
    setCalendarType(year);
    handleDateChange(value); //added this line 10/11/24
  }, [year]);

  useEffect(() => {
    if (dateVal && !value) {
      const parts = dateVal.split(' ');
      const day = parseInt(parts[0], 10);
      const yearStr = parseInt(parts[parts?.length - 1], 10);
      const monthString = parts.slice(1, parts?.length - 1).join(' ');

      let monthIndex: number | undefined;

      if (locales.solar.months.some((month: any) => month[0] === monthString)) {
        monthIndex = locales.solar.months.findIndex(
          (month: any) => month[0] === monthString
        );
        if (monthIndex !== -1) {
          const dateObject = new DateObject({
            day,
            month: monthIndex ? monthIndex + 1 : 0, // +1 because months are 0-indexed
            year: yearStr,
            calendar: gregorian,
          });
          handleDateChange(dateObject);
        }
      } else if (
        locales.lunar.months.some((month: any) => month[0] === monthString)
      ) {
        monthIndex = locales.lunar.months.findIndex(
          (month: any) => month[0] === monthString
        );
        if (monthIndex !== -1) {
          const dateObject = new DateObject({
            day,
            month: monthIndex ? monthIndex + 1 : 0, // +1 because months are 0-indexed
            year: yearStr,
            calendar: hijri,
          });
          handleDateChange(dateObject);
        }
      } else {
        console.error(`Unknown month "${monthString}" in date: ${dateVal}`);
      }
    }
  }, [dateVal]);

  const handleIconClick = () => {
    if (datePickerRef.current) {
      datePickerRef.current.openCalendar();
    }
  };

  const handleDateChange = (date: DateObject | null) => {
    //added | null 10/11/24
    setValue(date);
    if (onDateChange && date) {
      onDateChange(date.toDate());
    }
  };

  return (
    <div className="bg-field flex border-[1px] border-solid border-[#66666659] bg-inputBg items-center rounded-md px-3 w-full h-12 cursor-pointer relative text-black">
      <DatePicker
        ref={datePickerRef}
        value={value}
        calendar={calendars[calendarType as keyof typeof calendars]}
        locale={locales[calendarType as keyof typeof locales]}
        format="DD MMMM YYYY"
        onChange={handleDateChange}
        placeholder="Select date"
      />
      <ClockIcon
        className="absolute right-2 cursor-pointer"
        onClick={handleIconClick}
      />
    </div>
  );
};

export default Calendar;
