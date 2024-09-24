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
        <SelectValue placeholder="Select year" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="lunar">lunar</SelectItem>
          <SelectItem value="solar">solar</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CalendarDropdown;
