import {
    useFetchAllEvents,
    type EventSortBy,
    type EventType,
} from "@/apis/event.api";
import { useFetchAllTags } from "@/apis/tag.api";
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
    parseAsArrayOf,
    parseAsInteger,
    parseAsString,
    parseAsStringEnum,
    useQueryStates,
} from "nuqs";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { MultiSelect } from "../ui/multi-select";
import EventCard from "./event-card";
import EventSorting from "./event-sorting";
import EventTabs from "./event-tabs";
import type { SortOrder } from "@/types/request";

const EventList = () => {
    const navigate = useNavigate();

    const [{ page, limit, type, search, tags, sortBy, sortOrder }, setQuery] =
        useQueryStates({
            page: parseAsInteger.withDefault(1),
            limit: parseAsInteger.withDefault(10),
            type: parseAsStringEnum<EventType>([
                "all",
                "public",
                "private",
            ]).withDefault("all"),
            search: parseAsString.withDefault(""),
            tags: parseAsArrayOf(parseAsString).withDefault([]),
            sortBy: parseAsStringEnum<EventSortBy>([
                "createdAt",
                "date",
            ]).withDefault("createdAt"),
            sortOrder: parseAsStringEnum<SortOrder>([
                "asc",
                "desc",
            ]).withDefault("desc"),
        });
    const { tags: tagsData, isLoading: isTagsLoading } = useFetchAllTags();

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

    const handleSortBy = (value: string | null) => {
        if (!value) return;
        setQuery({ sortBy: value as EventSortBy });
    };

    const handleSortOrder = () => {
        const value: SortOrder = sortOrder === "asc" ? "desc" : "asc";
        setQuery({ sortOrder: value });
    };

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
                <div className="w-fit flex items-center gap-4">
                    <SearchInput
                        value={search}
                        onChange={(e) =>
                            setQuery({
                                search: e.target.value,
                                page: 1,
                            })
                        }
                        className="min-w-md h-10"
                    />
                </div>

                {events && events.pagination.total > 0 && (
                    <p className="italic text-gray-400">
                        {events.pagination.total}{" "}
                        {events.pagination.total > 1 ? "results" : "result"}{" "}
                        found
                    </p>
                )}
            </div>

            <div>
                {isTagsLoading ? (
                    <Skeleton className="w-md h-10" />
                ) : (
                    tagsData && (
                        <MultiSelect
                            defaultValue={tags}
                            options={
                                tagsData.items.map((item) => ({
                                    label: item.title,
                                    value: item.id,
                                })) ?? []
                            }
                            onValueChange={(value) => {
                                setQuery({ tags: value });
                            }}
                            placeholder="Filter by tags"
                            className="w-md!"
                        />
                    )
                )}
                <EventSorting
                    sortByValue={sortBy}
                    handleSortBy={handleSortBy}
                    sortOrderValue={sortOrder}
                    handleSortOrder={handleSortOrder}
                />
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
