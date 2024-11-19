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
    if (initialValue !== '') {
      setSelectedQuality(initialValue);
      handleChange(initialValue);
    } else if (initialValue === '') {
      setSelectedQuality('');
      onQualityChange('');
    }
  }, [initialValue]);

  const handleChange = (quality: string) => {
    if (quality) {
      setSelectedQuality(quality);
      onQualityChange(quality);
    }
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
                {textConstants.goldPurityChoiceOneText}
              </SelectItem>
              <SelectItem
                value="08 Karat"
                isChecked={selectedQuality === '08 Karat'}
              >
                {textConstants.goldPurityChoiceTwoText}
              </SelectItem>
              <SelectItem
                value="09 Karat"
                isChecked={selectedQuality === '09 Karat'}
              >
                {textConstants.goldPurityChoiceThreeText}
              </SelectItem>
              <SelectItem
                value="10 Karat"
                isChecked={selectedQuality === '10 Karat'}
              >
                {textConstants.goldPurityChoiceFourText}
              </SelectItem>
              <SelectItem
                value="12 Karat"
                isChecked={selectedQuality === '12 Karat'}
              >
                {textConstants.goldPurityChoiceFiveText}
              </SelectItem>
              <SelectItem
                value="14 Karat"
                isChecked={selectedQuality === '14 Karat'}
              >
                {textConstants.goldPurityChoiceSixText}
              </SelectItem>
              <SelectItem
                value="15 Karat"
                isChecked={selectedQuality === '15 Karat'}
              >
                {textConstants.goldPurityChoiceSevenText}
              </SelectItem>
              <SelectItem
                value="18 Karat"
                isChecked={selectedQuality === '18 Karat'}
              >
                {textConstants.goldPurityChoiceEightText}
              </SelectItem>
              <SelectItem
                value="20 Karat"
                isChecked={selectedQuality === '20 Karat'}
              >
                {textConstants.golsPurityChoiceNineText}
              </SelectItem>
              <SelectItem
                value="21 Karat"
                isChecked={selectedQuality === '21 Karat'}
              >
                {textConstants.goldPurityChoiceTenText}
              </SelectItem>
              <SelectItem
                value="22 Karat"
                isChecked={selectedQuality === '22 Karat'}
              >
                {textConstants.goldPurityChoiceElevenText}
              </SelectItem>
              <SelectItem
                value="24 Karat"
                isChecked={selectedQuality === '24 Karat'}
              >
                {textConstants.goldPurityChoiceTwelveText}
              </SelectItem>
            </>
          ) : (
            <>
              <SelectItem value="Fine" isChecked={selectedQuality === 'Fine'}>
                {textConstants.silverPurityChoiceOneText}
              </SelectItem>
              <SelectItem
                value="Britannia"
                isChecked={selectedQuality === 'Britannia'}
              >
                {textConstants.silverPurityChoiceTwoText}
              </SelectItem>
              <SelectItem
                value="Sterling"
                isChecked={selectedQuality === 'Sterling'}
              >
                {textConstants.silverPurityChoiceThreeText}
              </SelectItem>
              <SelectItem
                value="Jewelery"
                isChecked={selectedQuality === 'Jewelery'}
              >
                {textConstants.silverPurityChoiceFourText}
              </SelectItem>
            </>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default QualityDropdown;
