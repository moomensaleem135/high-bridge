import React, { useEffect, useState } from 'react';
import {
  CalendarComponent,
  Inject,
  Islamic,
} from '@syncfusion/ej2-react-calendars';

import { addClass, Internationalization } from '@syncfusion/ej2-base';

import '@syncfusion/ej2-base/styles/material.css';
// import '@syncfusion/ej2-buttons/styles/material.css';
import '@syncfusion/ej2-react-calendars/styles/material.css';

import useClickOutside from '@/hooks/useClickOutside';

import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarIcon,
} from '@/assets/svgs';

interface IslamicCalendarProps {
  onDateChange?: (date: string) => void;
  initialValue?: string;
  setStartDate?: (value: string) => void;
  endDate?: string;
  show: boolean;
  setShow: React.Dispatch<boolean>;
  className?: string;
  isDisabled?: boolean;
  isEndDate?: boolean;
}

const IslamicCalendar = ({
  initialValue,
  onDateChange,
  show,
  endDate,
  setStartDate,
  setShow,
  className,
  isDisabled,
}: IslamicCalendarProps) => {
  const ref = useClickOutside(() => {
    setShow(false);
  });

  const globalize: Internationalization = new Internationalization('en');
  const [date, setDate] = useState<string | undefined>(initialValue);

  const handleDateChange = (args: any) => {
    const formatDate = globalize.formatDate(args.value, {
      type: 'date',
      format: 'ddMMMyyyy',
      calendar: 'islamic',
    });

    setDate(
      globalize.formatDate(args.value, {
        type: 'date',
        format: 'ddMMMyyyy',
        calendar: 'islamic',
      })
    );

    if (onDateChange) {
      onDateChange(formatDate);
    }
    if (setStartDate) {
      setStartDate(formatDate);
    }
  };

  useEffect(() => {
    if (initialValue) {
      setDate(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    if (endDate) {
      const islamicDate = globalize.parseDate(endDate, {
        type: 'date',
        format: 'ddMMMyyyy',
        calendar: 'islamic',
      });
      const gregorianDate = globalize.formatDate(islamicDate, {
        type: 'date',
        format: 'ddMMMyyyy',
        calendar: 'gregorian',
      });

      const value = new Date(gregorianDate);

      value.setFullYear(value.getFullYear() + 1);

      setDate(
        globalize.formatDate(value, {
          type: 'date',
          format: 'ddMMMyyyy',
          calendar: 'islamic',
        })
      );
      handleDateChange({
        value: value,
      });
    }
  }, [endDate]);

  return (
    <div ref={ref} className="relative">
      <div
        className={`bg-field flex border-[1px] border-solid border-datePickerBorder items-center rounded-md px-3 w-full h-12 cursor-pointer ${className}`}
      >
        <input
          type="text"
          className={`p-2 w-full bg-transparent placeholder:text-subheadingColor text-inputText focus:outline-none ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          value={date}
          disabled={isDisabled}
          onFocus={() => setShow(true)}
        />
        {endDate !== '' && (
          <div className="mr-1">
            <CalendarIcon className="w-4 h-4 text-headingColor" />
          </div>
        )}
      </div>

      {show && (
        <div className="absolute z-50 top-full left-0 mt-1 bg-white text-black font-medium p-4 rounded-lg w-[296px] h-[356px] shadow-md">
          <CalendarComponent
            calendarMode="Islamic"
            change={handleDateChange}
            className={`top-12`}
            disabled={isDisabled}
          >
            <Inject services={[Islamic]} />
          </CalendarComponent>
        </div>
      )}
    </div>
  );
};

export default IslamicCalendar;
