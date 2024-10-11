import React, { useState } from 'react';
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

interface CalendarDropdownProps {
  setYear?: (value: string) => void;
  initialValue: string;
  onYearChange: (yearVal: string) => void;
}

const CalendarSelect: React.FC<CalendarDropdownProps> = ({
  setYear,
  initialValue,
  onYearChange,
}) => {
  const [selectedYear, setSelectedYear] = React.useState<string | undefined>(
    initialValue
  );

  React.useEffect(() => {
    console.log('initials', initialValue);
    setSelectedYear(initialValue);
    if (initialValue !== '') {
      handleChange(initialValue);
    }
  }, [initialValue]);

  const handleChange = (year: string) => {
    setSelectedYear(year);
    onYearChange(year);
    setYear ? setYear(year) : '';
  };

  return (
    <Select onValueChange={handleChange} value={selectedYear}>
      <SelectTrigger className="rounded-lg bg-inputBg border-inputBorder">
        <SelectValue placeholder="Select calendar" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="lunar" isChecked={selectedYear === 'lunar'}>
            Hijri Calendar (Lunar)
          </SelectItem>
          <SelectItem value="solar" isChecked={selectedYear === 'solar'}>
            Gregorian Calendar (Solar)
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CalendarSelect;
