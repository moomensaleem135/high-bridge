'use client';

import React from 'react';

import timezones from '@/lib/timezones.json';
import { ITimezone } from '@/lib/types';
import { GlobeIcon } from '@/assets/svgs';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';

interface TimezoneSelectProps {
  onTimezoneChange: (timezone: string) => void;
  initialTimezone?: string | undefined;
}

const TimezoneSelect: React.FC<TimezoneSelectProps> = ({
  onTimezoneChange,
  initialTimezone,
}) => {
  const [selectedTimezone, setSelectedTimezone] = React.useState<
    string | undefined
  >(initialTimezone);

  React.useEffect(() => {
    setSelectedTimezone(initialTimezone);
  }, [initialTimezone]);

  const handleChange = (timezone: string) => {
    setSelectedTimezone(timezone);
    onTimezoneChange(timezone);
  };

  return (
    <Select onValueChange={handleChange} value={selectedTimezone}>
      <SelectTrigger
        iconColor="fill-border stroke-border ml-3"
        className="bg-accent"
        data-cy="event-timezone"
      >
        <div className="flex w-full items-center flex-row gap-x-2 ">
          <GlobeIcon className="h-4 w-4 max-w-4 text-headingColor" />
          <div className="truncate  overflow-hidden">
            <SelectValue placeholder="Select Timezone" />
          </div>
        </div>
      </SelectTrigger>
      <SelectContent className="overflow-y-auto h-[400px]">
        {timezones.map((timezone: ITimezone, i) => (
          <SelectItem
            key={timezone.value}
            value={timezone.value}
            data-cy="event-timezone-list"
          >
            <span>{timezone.text}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TimezoneSelect;
