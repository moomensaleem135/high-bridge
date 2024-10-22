import React, { useState } from 'react';
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

interface ReligionDropdownProps {
  initialValue: string;
  onReligionChange: (religionVal: string) => void;
  className?: string;
}

const ReligionDropdown: React.FC<ReligionDropdownProps> = ({
  initialValue,
  onReligionChange,
  className,
}) => {
  const [selectedReligion, setSelectedReligion] = React.useState<
    string | undefined
  >(initialValue);

  React.useEffect(() => {
    setSelectedReligion(initialValue);
    if (initialValue !== '') {
      handleChange(initialValue);
    }
  }, [initialValue]);

  const handleChange = (religion: string) => {
    setSelectedReligion(religion);
    onReligionChange(religion);
  };

  return (
    <Select onValueChange={handleChange} value={selectedReligion}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Select madhab" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="Hanafi" isChecked={selectedReligion === 'Hanafi'}>
            Hanafi
          </SelectItem>
          <SelectItem value="Maliki" isChecked={selectedReligion === 'Maliki'}>
            Maliki
          </SelectItem>
          <SelectItem
            value="Shafi'i"
            isChecked={selectedReligion === `Shafi'i`}
          >
            Shafi'i
          </SelectItem>
          <SelectItem
            value="Hanbali"
            isChecked={selectedReligion === 'Hanbali'}
          >
            Hanbali
          </SelectItem>
          <SelectItem
            value="Islamic Fiqh Council"
            isChecked={selectedReligion === 'Islamic Fiqh Council'}
          >
            Islamic Fiqh Council
          </SelectItem>
          <SelectItem
            value="Assembly of Muslim Jurists of America"
            isChecked={
              selectedReligion === 'Assembly of Muslim Jurists of America'
            }
          >
            Assembly of Muslim Jurists of America
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ReligionDropdown;
