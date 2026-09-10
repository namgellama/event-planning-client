import { CalendarX } from "lucide-react";
import {
    parseAsArrayOf,
    parseAsInteger,
    parseAsString,
    parseAsStringEnum,
    useQueryStates,
} from "nuqs";

import {
    useFetchAllEvents,
    type EventSortBy,
    type EventType,
} from "@/apis/event.api";
import { EmptyState, ErrorState, Pagination } from "@/components/shared";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@/hooks/useDebounce";
import type { SortOrder } from "@/types/request";
import { EventCard } from ".";

export const eventQueryState = {
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(10),
    type: parseAsStringEnum<EventType>([
        "all",
        "public",
        "private",
    ]).withDefault("all"),
    search: parseAsString.withDefault(""),
    tags: parseAsArrayOf(parseAsString).withDefault([]),
    sortBy: parseAsStringEnum<EventSortBy>(["createdAt", "date"]).withDefault(
        "createdAt",
    ),
    sortOrder: parseAsStringEnum<SortOrder>(["asc", "desc"]).withDefault(
        "desc",
    ),
};

const EventListContent = () => {
    const [{ page, limit, type, search, tags, sortBy, sortOrder }] =
        useQueryStates(eventQueryState);

    const debouncedSearch = useDebounce(search);

    const { events, isLoading, error, refetch } = useFetchAllEvents({
        page,
        limit,
        type,
        search: debouncedSearch,
        tags,
        sortBy,
        sortOrder,
    });

    if (isLoading && !events) {
        return (
            <div className="w-full grid grid-cols-3 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                    <Skeleton key={i} className="w-full h-47 bg-gray-200" />
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

    return (
        <div className="space-y-5">
            {events?.pagination.total === 0 ? (
                <EmptyState
                    icon={CalendarX}
                    title={search ? "No matching events" : "No events found"}
                    description={
                        search
                            ? "Try a different search term."
                            : "Create a new event to get started."
                    }
                />
            ) : (
                <div className="w-full grid grid-cols-3 gap-6">
                    {events?.items.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            )}

            {events && <Pagination totalPages={events.pagination.totalPages} />}
        </div>
    );
};

export default EventListContent;
