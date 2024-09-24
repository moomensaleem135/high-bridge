'use client';
import React, { useEffect, useState } from 'react';

import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

interface Prop {
  year: string;
  disabled: boolean;
  initialValue?: string;
  onMonthChange: (month: string) => void;
}
const MonthDropdown: React.FC<Prop> = ({
  year,
  disabled,
  initialValue,
  onMonthChange,
}) => {
  const [selectedmonth, setSelectedMonth] = React.useState<string | undefined>(
    initialValue
  );

  React.useEffect(() => {
    setSelectedMonth(initialValue);
  }, [initialValue]);

  const handleChange = (month: string) => {
    setSelectedMonth(month);
    onMonthChange(month);
  };

  return (
    <>
      {year && year === 'lunar' ? (
        <Select
          onValueChange={handleChange}
          disabled={disabled}
          value={selectedmonth}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Muharram">Muharram</SelectItem>
              <SelectItem value="Safar">Safar</SelectItem>
              <SelectItem value="Rabi' al-Awwal">Rabi' al-Awwal</SelectItem>
              <SelectItem value="Rabi' al-Thani">Rabi' al-Thani</SelectItem>
              <SelectItem value="Jumada al-Awwal">Jumada al-Awwal</SelectItem>
              <SelectItem value="Jumada al-Thani">Jumada al-Thani</SelectItem>
              <SelectItem value="Rajab">Rajab</SelectItem>
              <SelectItem value="Sha'ban">Sha'ban</SelectItem>
              <SelectItem value="Ramadan">Ramadan</SelectItem>
              <SelectItem value="Shawwal">Shawwal</SelectItem>
              <SelectItem value="Dhu al-Qa'dah">Dhu al-Qa'dah</SelectItem>
              <SelectItem value="Dhu al-Hijjah">Dhu al-Hijjah</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      ) : (
        <Select
          onValueChange={handleChange}
          disabled={disabled}
          value={selectedmonth}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="January">January</SelectItem>
              <SelectItem value="February">February</SelectItem>
              <SelectItem value="March">March</SelectItem>
              <SelectItem value="April">April</SelectItem>
              <SelectItem value="May">May</SelectItem>
              <SelectItem value="June">June</SelectItem>
              <SelectItem value="July">July</SelectItem>
              <SelectItem value="August">August</SelectItem>
              <SelectItem value="September">September</SelectItem>
              <SelectItem value="October">October</SelectItem>
              <SelectItem value="November">November</SelectItem>
              <SelectItem value="December">December</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    </>
  );
};

export default MonthDropdown;
