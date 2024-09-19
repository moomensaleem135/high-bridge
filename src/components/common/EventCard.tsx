import React from 'react';
import { IEvent } from '@/lib/types';
import { cn } from '@/lib/cn';
import NextImage from '@/components/ui/next-image';

interface EventCardProps {
  event: IEvent | null;
  className?: string;
}

const EventCard = React.forwardRef<HTMLDivElement, EventCardProps>(
  ({ event, className, ...props }, ref) => {
    return (
      <div
        className={cn(
          'w-full rounded-xl grid grid-cols-[auto_1fr] gap-4 items-center mt-2',
          className
        )}
        {...props}
        ref={ref}
      >
        {/* Image Section */}
        {event?.image && (
          <NextImage
            src={event.image}
            alt={event.title}
            className="w-12 h-12 rounded-lg object-cover"
            width={48}
            height={48}
          />
        )}

        {/* Text Section */}
        <div className="flex flex-col">
          <p className="text-sm font-normal text-headingColor">
            {event?.title}
          </p>
          <p className="text-base font-medium text-subheadingColor">
            {event?.description}
          </p>
        </div>
      </div>
    );
  }
);

EventCard.displayName = 'EventCard';

export default EventCard;
