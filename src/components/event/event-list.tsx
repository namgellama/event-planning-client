import { useFetchAllEvents, type EventType } from "@/apis/event.api";
import {
    EmptyState,
    ErrorState,
    Pagination,
    SearchInput,
} from "@/components/shared";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@/hooks/useDebounce";
import { CalendarX, Plus } from "lucide-react";
import {
    parseAsInteger,
    parseAsString,
    parseAsStringEnum,
    useQueryStates,
} from "nuqs";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import EventCard from "./event-card";
import EventTabs from "./event-tabs";

const EventList = () => {
    const navigate = useNavigate();

    const [{ page, limit, type, search }, setQuery] = useQueryStates({
        page: parseAsInteger.withDefault(1),
        limit: parseAsInteger.withDefault(10),
        type: parseAsStringEnum<EventType>([
            "all",
            "public",
            "private",
        ]).withDefault("all"),
        search: parseAsString.withDefault(""),
    });

    const debouncedSearch = useDebounce(search);

    const { events, isLoading, error, refetch } = useFetchAllEvents({
        page,
        limit,
        type,
        search: debouncedSearch,
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
            <div className="flex items-center justify-between">
                <EventTabs />
                <Button
                    size="lg"
                    className="px-4 cursor-pointer"
                    onClick={() => navigate("/events/new")}
                >
                    <Plus /> Create New
                </Button>
            </div>

            <div className="flex items-end justify-between">
                <SearchInput
                    value={search}
                    onChange={(e) =>
                        setQuery({
                            search: e.target.value,
                            page: 1,
                        })
                    }
                />

                {events && events.pagination.total > 0 && (
                    <p className="italic text-gray-400">
                        {events.pagination.total}{" "}
                        {events.pagination.total > 1 ? "results" : "result"}
                        found
                    </p>
                )}
            </div>

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
