import React, { useState } from 'react';
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { textConstants } from '@/configs/textConstants';

interface CalendarDropdownProps {
  setYear: (value: string) => void; // Accepting the onValueChange prop
  initialValue: string;
  onYearChange: (yearVal: string) => void;
}

const CalendarDropdown: React.FC<CalendarDropdownProps> = ({
  setYear,
  initialValue,
  onYearChange,
}) => {
  const [selectedYear, setSelectedYear] = React.useState<string | undefined>(
    initialValue
  );

  React.useEffect(() => {
    setSelectedYear(initialValue);
  }, [initialValue]);

  const handleChange = (year: string) => {
    setSelectedYear(year);
    onYearChange(year);
    setYear(year);
  };

  return (
    <Select onValueChange={handleChange} value={selectedYear}>
      <SelectTrigger>
        <SelectValue placeholder="Select calendar" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="lunar" isChecked={selectedYear === 'lunar'}>
            {textConstants.hijriSelectionText}
          </SelectItem>
          <SelectItem value="solar" isChecked={selectedYear === 'solar'}>
            {textConstants.GregorianSelectionText}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CalendarDropdown;
