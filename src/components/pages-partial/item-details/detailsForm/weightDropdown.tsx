import React from 'react';
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

interface WeightDropdownProps {
  initialValue: string;
  onWeightChange: (weightVal: string) => void;
}

const WeightDropdown: React.FC<WeightDropdownProps> = ({
  initialValue,
  onWeightChange,
}) => {
  const [selectedWeight, setSelectedWeight] = React.useState<
    string | undefined
  >(initialValue);

  React.useEffect(() => {
    setSelectedWeight(initialValue);
  }, [initialValue]);

  const handleChange = (weight: string) => {
    setSelectedWeight(weight);
    onWeightChange(weight);
  };

  return (
    <Select
      onValueChange={handleChange}
      value={selectedWeight}
      defaultValue="Tola"
    >
      <SelectTrigger className="rounded-l-none h-[50px] rounded-r-lg">
        <SelectValue placeholder="Tola" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="Tola" isChecked={selectedWeight === 'Tola'}>
            Tola
          </SelectItem>
          <SelectItem value="Masha" isChecked={selectedWeight === 'Masha'}>
            Masha
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default WeightDropdown;
