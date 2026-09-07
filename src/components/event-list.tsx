import { useFetchAllEvents } from "@/apis/event.api";
import { CalendarX } from "lucide-react";
import EmptyState from "./empty-state";
import ErrorState from "./error-state";
import EventCard from "./event-card";
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
            <EmptyState
                icon={CalendarX}
                title="No events found"
                description="Create a new event to get started."
            />
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
