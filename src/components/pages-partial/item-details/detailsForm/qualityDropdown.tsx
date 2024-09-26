import React, { useState } from 'react';
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

interface QualityDropdownProps {
  initialValue: string;
  onQualityChange: (qualityVal: string) => void;
}

const QualityDropdown: React.FC<QualityDropdownProps> = ({
  initialValue,
  onQualityChange,
}) => {
  const [selectedQuality, setSelectedQuality] = React.useState<
    string | undefined
  >(initialValue);

  React.useEffect(() => {
    setSelectedQuality(initialValue);
  }, [initialValue]);

  const handleChange = (quality: string) => {
    setSelectedQuality(quality);
    onQualityChange(quality);
  };

  return (
    <Select onValueChange={handleChange} value={selectedQuality}>
      <SelectTrigger className="rounded-lg">
        <SelectValue placeholder="Select Quality" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem
            value="24 Karat"
            isChecked={selectedQuality === '24 Karat'}
          >
            24 Karat
          </SelectItem>
          <SelectItem
            value="22 Karat"
            isChecked={selectedQuality === '22 Karat'}
          >
            22 Karat
          </SelectItem>
          <SelectItem
            value="20 Karat"
            isChecked={selectedQuality === '20 Karat'}
          >
            20 Karat
          </SelectItem>
          <SelectItem
            value="18 Karat"
            isChecked={selectedQuality === '18 Karat'}
          >
            18 Karat
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default QualityDropdown;
