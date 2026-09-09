import { CalendarX, Plus } from "lucide-react";
import {
    parseAsArrayOf,
    parseAsInteger,
    parseAsString,
    parseAsStringEnum,
    useQueryStates,
} from "nuqs";
import { useNavigate } from "react-router";

import {
    useFetchAllEvents,
    type EventSortBy,
    type EventType,
} from "@/apis/event.api";
import { EmptyState, ErrorState, Pagination } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@/hooks/useDebounce";
import type { SortOrder } from "@/types/request";
import {
    EventCard,
    EventSearch,
    EventSorting,
    EventTagsFilter,
    EventTypeFilter,
} from ".";

export const queryState = {
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

const EventList = () => {
    const navigate = useNavigate();

    const [{ page, limit, type, search, tags, sortBy, sortOrder }] =
        useQueryStates(queryState);

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

    return (
        <div className="space-y-5">
            <Card>
                <CardContent className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <EventTypeFilter />
                        <Button
                            size="lg"
                            className="px-4 cursor-pointer"
                            onClick={() => navigate("/events/new")}
                        >
                            <Plus /> Create New
                        </Button>
                    </div>
                    <div className="flex justify-between gap-4">
                        <EventSearch />
                        <EventTagsFilter />
                        <EventSorting />
                    </div>
                </CardContent>
            </Card>

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

export default EventList;
