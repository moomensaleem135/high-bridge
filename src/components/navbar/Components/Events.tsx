import * as React from 'react';
import { IEvent } from '@/lib/types';
import EventCard from '@/components/common/EventCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetTodayEventsQuery } from '@/store/features/events/eventsApi';

export function Events() {
  const [events, setEvents] = React.useState<IEvent[]>([]);

  const { data, isLoading } = useGetTodayEventsQuery({});

  React.useEffect(() => {
    if (data) setEvents(data);
  }, [data]);

  return (
    <div className="flex flex-col gap-y-3">
      <p className="text-event-heading text-sm font-bold">
        Today&apos;s Events
      </p>
      <div className="grid grid-cols-12 gap-y-3">
        {events.map((event) => (
          <div className="col-span-12" key={event.id}>
            <EventCard event={event} />
          </div>
        ))}
        {isLoading ? (
          <div className="flex gap-2 col-span-12">
            <Skeleton className="w-14 h-14" />
            <div className="flex flex-col gap-1 w-full">
              <Skeleton className=" h-5" />
              <Skeleton className=" h-8" />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
