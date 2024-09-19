import React, { useEffect, useState } from 'react';
import Datepicker from 'tailwind-datepicker-react';
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarIcon,
} from '@/assets/svgs';
import { IOptions } from 'tailwind-datepicker-react/types/Options';
import useClickOutside from '@/hooks/useClickOutside';

interface DatePickerProps {
  onDateChange: (date: string) => void;
  initialValue?: string;
  show: boolean;
  setShow: React.Dispatch<boolean>;
}

const options: IOptions = {
  title: '',
  autoHide: true,
  todayBtn: false,
  clearBtn: false,
  maxDate: new Date(),
  minDate: new Date('1950-01-01'),
  theme: {
    background: 'bg-background',
    todayBtn: 'bg-calendar-active',
    clearBtn: '',
    icons:
      'hover:bg-transparent active:outline-0 active:!border-0 focus:!outline-0 focus:!ring-0 ',
    text: 'text-heading',
    disabledText: 'text-calendar-text',
    input: '',
    inputIcon: '',
    selected: 'bg-primary hover:bg-primary cypress-active ',
  },
  icons: {
    prev: () => (
      <div className="border-2 border-calendar-text rounded-lg p-1">
        <ArrowLeftIcon className="fill-none" />
      </div>
    ),
    next: () => (
      <div className="border-2 border-calendar-text rounded-lg p-1">
        <ArrowRightIcon className="fill-none" />
      </div>
    ),
  },
  datepickerClassNames: 'top-12 cypress-test ',
  language: 'en',
};

const DatePicker = ({
  initialValue,
  onDateChange,
  show,
  setShow,
}: DatePickerProps) => {
  const ref = useClickOutside(() => {
    setShow(false);
  });
  const [date, setDate] = useState<string>();

  const handleDateChange = (selectedDate: Date) => {
    setDate(selectedDate.toDateString());
    if (onDateChange) {
      onDateChange(selectedDate.toDateString());
    }
  };

  const handleClose = (state: boolean) => {
    setShow(state);
  };

  useEffect(() => {
    if (initialValue) {
      setDate(initialValue);
      options.defaultDate = new Date(initialValue);
    }
  }, [initialValue]);

  return (
    <div ref={ref} className="relative">
      <Datepicker
        options={options}
        onChange={handleDateChange}
        show={show}
        setShow={handleClose}
      >
        <div className="bg-accent flex items-center rounded-lg px-3  w-full cursor-pointer">
          <div className="mr-1">
            <CalendarIcon className="w-4 h-4 text-headingColor" />
          </div>
          <input
            type="text"
            className="p-2 w-full bg-transparent  placeholder:text-subheadingColor text-subheadingColor focus:outline-none cursor-pointer"
            placeholder="Select Date(s)..."
            value={date}
          />
          <div className="-mr-1">
            <ArrowDownIcon className="w-4 h-4 text-headingColor" />
          </div>
        </div>
      </Datepicker>
    </div>
  );
};

export default DatePicker;
