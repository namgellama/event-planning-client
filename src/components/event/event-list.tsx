import { useFetchAllEvents } from "@/apis/event.api";
import { EmptyState, ErrorState } from "@/components/shared";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarX } from "lucide-react";
import EventCard from "./event-card";
import EventTabs from "./event-tabs";

const EventList = () => {
    const { events, isLoading, error, refetch } = useFetchAllEvents();

    if (isLoading && !events) {
        return (
            <div className="w-full grid grid-cols-3 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                    <Skeleton key={i} className="w-full h-36" />
                ))}
            </div>
        );
    }

    if (error && !events) {
        return (
            <ErrorState
                title="Couldn't load events"
                error={error}
                onRetry={refetch}
            />
        );
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
        <div className="space-y-5">
            <EventTabs />

            <div className="w-full grid grid-cols-3 gap-6">
                {events?.items.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
        </div>
    );
};

export default EventList;
