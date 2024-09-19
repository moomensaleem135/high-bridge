'use client';

import React from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';
import { ClockIcon } from '@/assets/svgs';

interface TimePickerProps {
  onTimeChange: (time: string) => void;
  initialTime?: string;
  placeHolder?: string;
  dataCy?: string;
  dataCyList?: string;
  dataTestId?: string;
}

const generateTimeOptions = () => {
  const options = [];
  for (let hour = 1; hour <= 12; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const minuteString = minute.toString().padStart(2, '0');
      options.push(`${hour}:${minuteString} AM`);
      options.push(`${hour}:${minuteString} PM`);
    }
  }
  return options;
};

const TimePicker: React.FC<TimePickerProps> = ({
  onTimeChange,
  initialTime,
  placeHolder = 'Select Time',
  dataCy,
  dataCyList,
}) => {
  const [selectedTime, setSelectedTime] = React.useState<string | undefined>(
    initialTime
  );

  React.useEffect(() => {
    setSelectedTime(initialTime);
  }, [initialTime]);

  const handleChange = (time: string) => {
    setSelectedTime(time);
    onTimeChange(time);
  };

  const timeOptions = generateTimeOptions();

  return (
    <Select onValueChange={handleChange} value={selectedTime}>
      <SelectTrigger data-cy={dataCy}>
        <div className="flex flex-row gap-x-2">
          <ClockIcon className="text-headingColor h-4 w-4 mt-0.5" />
          <SelectValue placeholder={placeHolder} />
        </div>
      </SelectTrigger>
      <SelectContent className="overflow-y-auto max-h-60">
        {timeOptions.map((time) => (
          <SelectItem
            key={time}
            value={time}
            data-cy={dataCyList}
          >
            <span>{time}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TimePicker;
