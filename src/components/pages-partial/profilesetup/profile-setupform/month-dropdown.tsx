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
              <SelectItem
                value="Muharram"
                isChecked={selectedmonth === 'Muharram'}
              >
                Muharram
              </SelectItem>
              <SelectItem value="Safar" isChecked={selectedmonth === 'Safar'}>
                Safar
              </SelectItem>
              <SelectItem
                value="Rabi' al-Awwal"
                isChecked={selectedmonth === "Rabi' al-Awwal"}
              >
                Rabi' al-Awwal
              </SelectItem>
              <SelectItem
                value="Rabi' al-Thani"
                isChecked={selectedmonth === "Rabi' al-Thani"}
              >
                Rabi' al-Thani
              </SelectItem>
              <SelectItem
                value="Jumada al-Awwal"
                isChecked={selectedmonth === 'Jumada al-Awwal'}
              >
                Jumada al-Awwal
              </SelectItem>
              <SelectItem
                value="Jumada al-Thani"
                isChecked={selectedmonth === 'Jumada al-Thani'}
              >
                Jumada al-Thani
              </SelectItem>
              <SelectItem value="Rajab" isChecked={selectedmonth === 'Rajab'}>
                Rajab
              </SelectItem>
              <SelectItem
                value="Sha'ban"
                isChecked={selectedmonth === "Sha'ban"}
              >
                Sha'ban
              </SelectItem>
              <SelectItem
                value="Ramadan"
                isChecked={selectedmonth === 'Ramadan'}
              >
                Ramadan
              </SelectItem>
              <SelectItem
                value="Shawwal"
                isChecked={selectedmonth === 'Shawwal'}
              >
                Shawwal
              </SelectItem>
              <SelectItem
                value="Dhu al-Qa'dah"
                isChecked={selectedmonth === "Dhu al-Qa'dah"}
              >
                Dhu al-Qa'dah
              </SelectItem>
              <SelectItem
                value="Dhu al-Hijjah"
                isChecked={selectedmonth === 'Dhu al-Hijjah'}
              >
                Dhu al-Hijjah
              </SelectItem>
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
              <SelectItem
                value="January"
                isChecked={selectedmonth === 'January'}
              >
                January
              </SelectItem>
              <SelectItem
                value="February"
                isChecked={selectedmonth === 'February'}
              >
                February
              </SelectItem>
              <SelectItem value="March" isChecked={selectedmonth === 'March'}>
                March
              </SelectItem>
              <SelectItem value="April" isChecked={selectedmonth === 'April'}>
                April
              </SelectItem>
              <SelectItem value="May" isChecked={selectedmonth === 'May'}>
                May
              </SelectItem>
              <SelectItem value="June" isChecked={selectedmonth === 'June'}>
                June
              </SelectItem>
              <SelectItem value="July" isChecked={selectedmonth === 'July'}>
                July
              </SelectItem>
              <SelectItem value="August" isChecked={selectedmonth === 'August'}>
                August
              </SelectItem>
              <SelectItem
                value="September"
                isChecked={selectedmonth === 'September'}
              >
                September
              </SelectItem>
              <SelectItem
                value="October"
                isChecked={selectedmonth === 'October'}
              >
                October
              </SelectItem>
              <SelectItem
                value="November"
                isChecked={selectedmonth === 'November'}
              >
                November
              </SelectItem>
              <SelectItem
                value="December"
                isChecked={selectedmonth === 'December'}
              >
                December
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    </>
  );
};

export default MonthDropdown;
