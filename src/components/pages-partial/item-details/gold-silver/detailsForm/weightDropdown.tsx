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

interface WeightDropdownProps {
  initialValue: string;
  onWeightChange: (weightVal: string) => void;
}

const WeightDropdown: React.FC<WeightDropdownProps> = ({
  initialValue,
  onWeightChange,
}) => {
  const [selectedWeight, setSelectedWeight] = useState(initialValue || 'Grams');

  React.useEffect(() => {
    if (initialValue !== '') {
      setSelectedWeight(initialValue);
      handleChange(initialValue);
    }
  }, [initialValue]);

  const handleChange = (weight: string) => {
    if (weight) {
      setSelectedWeight(weight);
      onWeightChange(weight);
    }
  };

  return (
    <Select
      onValueChange={handleChange}
      defaultValue="Grams"
      value={selectedWeight}
    >
      <SelectTrigger className="rounded-l-none h-[45px] rounded-r-lg bg-inputBg border-inputBorder">
        <SelectValue placeholder="Grams" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="Grams" isChecked={selectedWeight === 'Grams'}>
            {textConstants.weightChoiceOne}
          </SelectItem>
          <SelectItem value="Tola" isChecked={selectedWeight === 'Tola'}>
            {textConstants.weightChoiceTwo}
          </SelectItem>
          <SelectItem value="Masha" isChecked={selectedWeight === 'Masha'}>
            {textConstants.weightChoiceThree}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default WeightDropdown;
