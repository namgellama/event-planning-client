import { useFetchAllEvents } from "@/apis/event.api";
import { CalendarX } from "lucide-react";
import ErrorState from "./ErrorState";
import EventCard from "./EventCard";
import { Skeleton } from "./ui/skeleton";

const EventList = () => {
    const { events, isLoading, error, refetch } = useFetchAllEvents();

    if (isLoading && !events) {
        return (
            <div className="w-full grid grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <Skeleton key={i} className="w-full h-36" />
                ))}
            </div>
        );
    }

    if (error && !events) {
        return <ErrorState title="Couldn't load events" onRetry={refetch} />;
    }

    if (events && events.items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                    <CalendarX className="size-6 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                    <p className="font-medium">No events found</p>
                    <p className="text-sm text-muted-foreground">
                        Create a new event to get started.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full grid grid-cols-4 gap-4">
            {events?.items.map((event) => (
                <EventCard key={event.id} event={event} />
            ))}
        </div>
    );
};

export default EventList;
