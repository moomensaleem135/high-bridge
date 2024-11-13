import moment from 'moment-hijri';
import { Dispatch, SetStateAction } from 'react';

export const getRandomInt = (min: number = 1, max: number = 10000000) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};
export const getRandomElement = (arr: Array<any>) =>
  arr[Math.floor(Math.random() * arr?.length)];

export const formatAmount = (amount: string | number): string => {
  let num: number;

  // Convert the input to a number
  if (typeof amount === 'string') {
    num = parseFloat(amount.replace(/,/g, ''));
  } else {
    num = amount;
  }

  // Check if the conversion is successful and the result is a number
  if (isNaN(num)) {
    return '$0.00';
  }

  // Format the number to two decimal places and add the dollar sign in American standard
  const formattedAmount = num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  return `$${formattedAmount}`;
};

export const formatFileSize = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024; // Base unit for conversion
  const dm = decimals < 0 ? 0 : decimals; // Decimal places
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']; // Units

  const i = Math.floor(Math.log(bytes) / Math.log(k)); // Determine unit index
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]; // Format size
};

export const fileToNewBlob = (file: File): Blob => {
  // Create a new Blob from the file's contents
  return new Blob([file], { type: file.type });
};

export interface EvaluateType {
  type: string;
  score: number;
}

export function evaluatePasswordStrength(password: string): EvaluateType {
  let score = 0;

  if (!password) return { type: 'Weak', score: score };

  // Check password length
  if (password?.length > 8) score += 1;
  // Contains lowercase
  if (/[a-z]/.test(password)) score += 1;
  // Contains uppercase
  if (/[A-Z]/.test(password)) score += 1;
  // Contains numbers
  if (/\d/.test(password)) score += 1;
  // Contains special characters
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  switch (score) {
    case 0:
    case 1:
    case 2:
      return { type: 'Weak', score: score };
    case 3:
      return { type: 'Medium', score: score };
    case 4:
      return { type: 'Strong', score: score };
    case 5:
      return { type: 'Very Strong', score: score };
    default:
      return { type: '', score: -1 };
  }
}

export function formatDate(dateString: string) {
  if (dateString !== '') {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
}

export const calculateZakat = (
  amount: number,
  year?: string,
  date?: string
) => {
  const yearVal = date?.split(' ');

  let leap;
  if (yearVal) {
    leap = Number(yearVal[2]) % 4;
  }

  if (year !== 'lunar') {
    if (leap === 0) {
      return (amount * 2.5775) / 100; //calculate leap year zakat
    } else {
      return (amount * 2.577) / 100; //calculate non-leap year zakat
    }
  } else {
    return (amount * 2.5) / 100; // 2.5% of the total amount
  }
};

export const formatHijriDate = (date: moment.Moment): string => {
  const day = date.iDate().toString().padStart(2, '0');
  const month = date.iMonth() + 1;
  const year = date.iYear();
  const hijriMonths: string[] = [
    'Muharram',
    'Safar',
    "Rabi' al-Awwal",
    "Rabi' al-Thani",
    'Jumada al-Awwal',
    'Jumada al-Thani',
    'Rajab',
    "Sha'ban",
    'Ramadan',
    'Shawwal',
    "Dhul-Qi'dah",
    'Dhul-Hijjah',
  ];
  const monthName = hijriMonths[month - 1];
  return `${day} ${monthName} ${year}`;
};

export const handleDateChange = (
  date: Date,
  calendarType: string,
  setSelectedDate: Dispatch<SetStateAction<string | null>>,
  setStartDate: Dispatch<SetStateAction<string>>,
  DateChange: (dateVal: string) => void
) => {
  const momentDate = moment(date); // Convert to moment date for handling

  // Format dates based on the selected calendar type
  const selectedDateFormatted =
    calendarType === 'solar'
      ? momentDate.format('DD MMMM YYYY') // Format Gregorian date
      : formatHijriDate(momentDate.subtract(1, 'day')); // Format Hijri date

  // Calculate start date (1 year before)
  const startDateMoment =
    calendarType === 'solar'
      ? momentDate.subtract(1, 'years') // Subtract 1 Gregorian year
      : momentDate.subtract(1, 'iYear'); // Subtract 1 Hijri year

  const endDateMoment = calendarType === 'solar' ? momentDate : momentDate;

  const startDateFormatted =
    calendarType === 'solar'
      ? startDateMoment.format('DD MMMM YYYY') // Format Gregorian date
      : formatHijriDate(startDateMoment); // Format Hijri date

  const endDateFormatted =
    calendarType === 'solar'
      ? endDateMoment.format('DD MMMM YYYY')
      : formatHijriDate(endDateMoment);

  setSelectedDate(selectedDateFormatted);
  setStartDate(startDateFormatted);
  DateChange(selectedDateFormatted);

  //setEndDate(endDateFormatted)
};

export function s2ab(s: any) {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
  return buf;
}
