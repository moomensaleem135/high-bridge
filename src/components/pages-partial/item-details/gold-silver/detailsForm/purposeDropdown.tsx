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
  onPurposeChange: (purposeVal: string) => void;
  setReason: (reason: string) => void;
}

const PurposeDropdown: React.FC<PurposeDropdownProps> = ({
  initialValue,
  onPurposeChange,
  setReason,
}) => {
  const [selectedPurpose, setSelectedPurpose] = React.useState<
    string | undefined
  >(initialValue);

  React.useEffect(() => {
    if (initialValue !== '') {
      setSelectedPurpose(initialValue);
      console.log({ initialValue });
    }
  }, [initialValue]);

  const handleChange = (purpose: string) => {
    if (purpose) {
      setSelectedPurpose(purpose);
      onPurposeChange(purpose);
      setReason(purpose);
    }
  };

  return (
    <Select onValueChange={handleChange} value={selectedPurpose}>
      <SelectTrigger className="rounded-lg bg-inputBg border-inputBorder">
        <SelectValue placeholder="Select purpose" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
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
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default PurposeDropdown;
