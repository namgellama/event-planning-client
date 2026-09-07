import { useFetchAllEvents } from "@/apis/event.api";
import { AlertTriangle, CalendarX } from "lucide-react";
import EventCard from "./EventCard";
import { Button } from "./ui/button";
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
        return (
            <div
                role="alert"
                className="flex flex-col items-center justify-center gap-3 py-16 text-center"
            >
                <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10">
                    <AlertTriangle className="size-6 text-destructive" />
                </div>
                <div className="space-y-1">
                    <p className="font-medium">Couldn't load events</p>
                    <p className="text-sm text-muted-foreground">
                        {error?.message ??
                            "Something went wrong. Please try again."}
                    </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => refetch()}>
                    Try again
                </Button>
            </div>
        );
    }

    if (true) {
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
