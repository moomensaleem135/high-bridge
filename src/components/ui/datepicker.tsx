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
  onDateChange?: (date: string) => void;
  setStartDate?: (value: string) => void;
  endDate?: string;
  initialValue?: string;
  show: boolean;
  setShow: React.Dispatch<boolean>;
  className?: string;
  isEndDate?: boolean;
  isDisabled?: boolean;
}

const options: IOptions = {
  title: '',
  autoHide: true,
  todayBtn: false,
  clearBtn: false,
  maxDate: new Date('2026-01-01'),
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
  setStartDate,
  endDate,
  className,
  isEndDate,
  isDisabled,
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
    if (setStartDate) {
      setStartDate(selectedDate.toDateString());
    }
  };

  const handleClose = (state: boolean) => {
    setShow(state);
  };

  React.useEffect(() => {
    setDate(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (endDate) {
      const date = new Date(endDate);
      date.setFullYear(date.getFullYear() + 1);
      setDate(date.toString().split(' ').slice(0, 4).join(' '));
      handleDateChange(date);
    }
    if (initialValue) {
      setDate(initialValue);
      options.defaultDate = new Date(initialValue);
    }
  }, [initialValue, endDate]);

  return (
    <div ref={ref} className="relative">
      <Datepicker
        options={options}
        onChange={handleDateChange}
        show={show}
        setShow={handleClose}
      >
        <div
          className={`bg-field flex border-[1px] border-solid border-[#66666659] items-center rounded-md px-3 w-full h-12 cursor-pointer ${className}`}
        >
          {/* <div className="mr-1">
            <CalendarIcon className="w-4 h-4 text-headingColor" />
          </div> */}
          <input
            type="text"
            className={`p-2 w-full bg-transparent  placeholder:text-subheadingColor text-inputText focus:outline-none ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            //placeholder="Select Date(s)..."
            disabled={isDisabled}
            value={date}
          />
          {/* <div className="-mr-1">
            <ArrowDownIcon className="w-4 h-4 text-headingColor" />
          </div> */}
          {isEndDate === false && (
            <div className="mr-1">
              <CalendarIcon className="w-4 h-4 text-headingColor" />
            </div>
          )}
        </div>
      </Datepicker>
    </div>
  );
};

export default DatePicker;

// import React, { useEffect, useState } from 'react';
// import Datepicker from 'tailwind-datepicker-react';
// import {
//   ArrowDownIcon,
//   ArrowLeftIcon,
//   ArrowRightIcon,
//   CalendarIcon,
// } from '@/assets/svgs';
// import { IOptions } from 'tailwind-datepicker-react/types/Options';
// import useClickOutside from '@/hooks/useClickOutside';
// import moment from 'moment-hijri';

// interface DatePickerProps {
//   onDateChange?: (date: string) => void;
//   setStartDate?: (value: string) => void;
//   endDate?: string;
//   initialValue?: string;
//   show: boolean;
//   setShow: React.Dispatch<boolean>;
//   className?: string;
//   isEndDate?: boolean;
//   year: string;
//   isDisabled?: boolean;
// }

// const options: IOptions = {
//   title: '',
//   autoHide: true,
//   todayBtn: false,
//   clearBtn: false,
//   maxDate: new Date('2026-01-01'),
//   minDate: new Date('1950-01-01'),
//   theme: {
//     background: 'bg-background',
//     todayBtn: 'bg-calendar-active',
//     clearBtn: '',
//     icons:
//       'hover:bg-transparent active:outline-0 active:!border-0 focus:!outline-0 focus:!ring-0 ',
//     text: 'text-heading',
//     disabledText: 'text-calendar-text',
//     input: '',
//     inputIcon: '',
//     selected: 'bg-primary hover:bg-primary cypress-active ',
//   },
//   icons: {
//     prev: () => (
//       <div className="border-2 border-calendar-text rounded-lg p-1">
//         <ArrowLeftIcon className="fill-none" />
//       </div>
//     ),
//     next: () => (
//       <div className="border-2 border-calendar-text rounded-lg p-1">
//         <ArrowRightIcon className="fill-none" />
//       </div>
//     ),
//   },
//   datepickerClassNames: 'top-12 cypress-test ',
//   language: 'en',
// };

// const DatePicker = ({
//   initialValue,
//   onDateChange,
//   show,
//   setShow,
//   setStartDate,
//   endDate,
//   className,
//   isEndDate,
//   year,
//   isDisabled,
// }: DatePickerProps) => {
//   const ref = useClickOutside(() => {
//     setShow(false);
//   });
//   const [date, setDate] = useState<string>();
//   const [hijri, setHijri] = useState<string | null>(null);

//   const formatDate = (date: Date): string => {
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   };

//   const handleDateChange = (selectedDate: Date) => {
//     const formattedDate =
//       hijri === 'lunar'
//         ? moment(selectedDate).format('iDD-iMM-iYYYY')
//         : formatDate(selectedDate);

//     if (onDateChange) {
//       console.log('format change', formattedDate);
//       onDateChange(formattedDate);
//     }
//     if (setStartDate) {
//       console.log('format set', formattedDate);
//       setStartDate(formattedDate);
//     }
//   };

//   const handleClose = (state: boolean) => {
//     setShow(state);
//   };

//   React.useEffect(() => {
//     setHijri(year);
//   }, [year]);

//   React.useEffect(() => {
//     setDate(initialValue);
//   }, [initialValue]);

//   useEffect(() => {
//     if (endDate) {
//       console.log('end date :', endDate);
//       let date;
//       if (hijri === 'lunar') {
//         const hijriDate = moment(endDate, 'iDD-iMM-iYYYY', true);

//         if (hijriDate.isValid()) {
//           const nextHijriYear = hijriDate.clone().add(1, 'iYear');
//           date = nextHijriYear.toDate();
//         }
//       } else {
//         const georgionDate = moment(endDate, 'DD-MM-YYYY', true);
//         if (georgionDate.isValid()) {
//           const nextGeorgionDate = georgionDate.clone().add(1, 'years');
//           date = nextGeorgionDate.toDate();
//         }
//       }
//       if (date) {
//         console.log('in if to change');
//         handleDateChange(date);
//       }
//     }

//     if (initialValue) {
//       setDate(initialValue);
//       options.defaultDate = new Date(initialValue);
//     }
//   }, [initialValue, endDate]);

//   return (
//     <div ref={ref} className="relative">
//       <Datepicker
//         options={options}
//         onChange={handleDateChange}
//         show={show}
//         setShow={handleClose}
//       >
//         <div
//           className={`bg-field flex border-[1px] border-solid border-[#66666659] items-center rounded-md px-3 w-full h-12 cursor-pointer ${className}`}
//         >
//           {/* <div className="mr-1">
//             <CalendarIcon className="w-4 h-4 text-headingColor" />
//           </div> */}
//           <input
//             type="text"
//             className={`p-2 w-full bg-transparent  placeholder:text-subheadingColor text-inputText focus:outline-none ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
//             //placeholder="Select Date(s)..."
//             disabled={isDisabled}
//             value={date}
//           />
//           {/* <div className="-mr-1">
//             <ArrowDownIcon className="w-4 h-4 text-headingColor" />
//           </div> */}
//           {isEndDate === false && (
//             <div className="mr-1">
//               <CalendarIcon className="w-4 h-4 text-headingColor" />
//             </div>
//           )}
//         </div>
//       </Datepicker>
//     </div>
//   );
// };

// export default DatePicker;
