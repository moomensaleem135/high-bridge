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
  item: string;
}

const QualityDropdown: React.FC<QualityDropdownProps> = ({
  initialValue,
  onQualityChange,
  item,
}) => {
  const [selectedQuality, setSelectedQuality] = React.useState<
    string | undefined
  >(initialValue);

  React.useEffect(() => {
    setSelectedQuality('');
    onQualityChange('');
  }, [item]);

  React.useEffect(() => {
    setSelectedQuality(initialValue);
  }, [initialValue]);

  const handleChange = (quality: string) => {
    setSelectedQuality(quality);
    onQualityChange(quality);
  };

  return (
    <Select onValueChange={handleChange} value={selectedQuality}>
      <SelectTrigger className="rounded-lg bg-inputBg border-inputBorder">
        <SelectValue placeholder="Select Quality" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {item === 'Gold' ? (
            <>
              <SelectItem
                value="06 Karat"
                isChecked={selectedQuality === '06 Karat'}
              >
                06 Karat
              </SelectItem>
              <SelectItem
                value="08 Karat"
                isChecked={selectedQuality === '08 Karat'}
              >
                08 Karat
              </SelectItem>
              <SelectItem
                value="09 Karat"
                isChecked={selectedQuality === '09 Karat'}
              >
                09 Karat
              </SelectItem>
              <SelectItem
                value="10 Karat"
                isChecked={selectedQuality === '10 Karat'}
              >
                10 Karat
              </SelectItem>
              <SelectItem
                value="12 Karat"
                isChecked={selectedQuality === '12 Karat'}
              >
                12 Karat
              </SelectItem>
              <SelectItem
                value="14 Karat"
                isChecked={selectedQuality === '14 Karat'}
              >
                14 Karat
              </SelectItem>
              <SelectItem
                value="15 Karat"
                isChecked={selectedQuality === '15 Karat'}
              >
                15 Karat
              </SelectItem>
              <SelectItem
                value="18 Karat"
                isChecked={selectedQuality === '18 Karat'}
              >
                18 Karat
              </SelectItem>
              <SelectItem
                value="20 Karat"
                isChecked={selectedQuality === '20 Karat'}
              >
                20 Karat
              </SelectItem>
              <SelectItem
                value="21 Karat"
                isChecked={selectedQuality === '21 Karat'}
              >
                21 Karat
              </SelectItem>
              <SelectItem
                value="22 Karat"
                isChecked={selectedQuality === '22 Karat'}
              >
                22 Karat
              </SelectItem>
              <SelectItem
                value="24 Karat"
                isChecked={selectedQuality === '24 Karat'}
              >
                24 Karat
              </SelectItem>
            </>
          ) : (
            <>
              <SelectItem value="Fine" isChecked={selectedQuality === 'Fine'}>
                Fine
              </SelectItem>
              <SelectItem
                value="Britannia"
                isChecked={selectedQuality === 'Britannia'}
              >
                Britannia
              </SelectItem>
              <SelectItem
                value="Sterling"
                isChecked={selectedQuality === 'Sterling'}
              >
                Sterling
              </SelectItem>
              <SelectItem
                value="Jewelery"
                isChecked={selectedQuality === 'Jewelery'}
              >
                Jewelery
              </SelectItem>
            </>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default QualityDropdown;
