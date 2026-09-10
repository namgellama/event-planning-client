import { Plus } from "lucide-react";
import { useQueryStates } from "nuqs";
import { useNavigate } from "react-router";

import type { EventSortBy } from "@/apis/event.api";
import { SearchInput, SortControls } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { SortOrder } from "@/types/request";
import { EventTagsFilter, EventTypeFilter } from ".";
import { eventQueryState } from "./event-list-content";

const sortByItems = [
    { label: "Created Date", value: "createdAt" },
    { label: "Date", value: "date" },
];

const EventListHeader = () => {
    const [{ search, sortBy, sortOrder }, setQuery] =
        useQueryStates(eventQueryState);
    const navigate = useNavigate();

    const handleSortBy = (value: string | null) => {
        if (!value) return;
        setQuery({ sortBy: value as EventSortBy });
    };

    const handleSortOrder = () => {
        const value: SortOrder = sortOrder === "asc" ? "desc" : "asc";
        setQuery({ sortOrder: value });
    };

    return (
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
                    <SearchInput
                        value={search}
                        onChange={(e) =>
                            setQuery({
                                search: e.target.value,
                                page: 1,
                            })
                        }
                        className="flex-1 w-full h-10"
                        onReset={() => setQuery({ search: "" })}
                    />
                    <EventTagsFilter />
                    <SortControls
                        items={sortByItems}
                        sortBy={sortBy}
                        sortOrder={sortOrder}
                        handleSortBy={handleSortBy}
                        handleSortOrder={handleSortOrder}
                    />
                </div>
            </CardContent>
        </Card>
    );
};

export default EventListHeader;
