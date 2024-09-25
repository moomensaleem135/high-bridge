import React, { useState } from 'react';
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

interface PurposeDropdownProps {
  initialValue: string;
  onYearChange: (yearVal: string) => void;
}

const PurposeDropdown: React.FC<PurposeDropdownProps> = ({
  initialValue,
  onYearChange,
}) => {
  const [selectedPurpose, setSelectedPurpose] = React.useState<
    string | undefined
  >(initialValue);

  React.useEffect(() => {
    setSelectedPurpose(initialValue);
  }, [initialValue]);

  const handleChange = (purpose: string) => {
    setSelectedPurpose(purpose);
    onYearChange(purpose);
  };

  return (
    <Select onValueChange={handleChange} value={selectedPurpose}>
      <SelectTrigger>
        <SelectValue placeholder="Select purpose" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="trade" isChecked={selectedPurpose === 'trade'}>
            Trade
          </SelectItem>
          <SelectItem
            value="personal"
            isChecked={selectedPurpose === 'personal'}
          >
            Personal
          </SelectItem>
          <SelectItem
            value="business"
            isChecked={selectedPurpose === 'business'}
          >
            Business
          </SelectItem>
          <SelectItem value="jewelry" isChecked={selectedPurpose === 'jewelry'}>
            Jewelry
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default PurposeDropdown;
