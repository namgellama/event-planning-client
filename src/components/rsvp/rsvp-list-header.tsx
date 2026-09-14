import { useQueryStates } from "nuqs";

import type { RsvpSortBy } from "@/apis/rsvp.api";
import { SearchInput, SortControls } from "@/components/shared";
import { Card, CardContent } from "@/components/ui/card";
import type { SortOrder } from "@/types/request";
import { RsvpStatusFilter } from ".";
import { rsvpQueryState } from "./rsvp-list-content";

const sortByItems = [
    { label: "Created Date", value: "createdAt" },
    { label: "Updated Date", value: "updatedAt" },
];

const RsvpListHeader = () => {
    const [{ search, sortBy, sortOrder }, setQuery] =
        useQueryStates(rsvpQueryState);

    const handleSortBy = (value: string | null) => {
        if (!value) return;
        setQuery({ sortBy: value as RsvpSortBy, page: 1 });
    };

    const handleSortOrder = () => {
        const value: SortOrder = sortOrder === "asc" ? "desc" : "asc";
        setQuery({ sortOrder: value, page: 1 });
    };

    return (
        <Card>
            <CardContent className="flex items-center gap-4 justify-between">
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
                <RsvpStatusFilter />
                <SortControls
                    items={sortByItems}
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    handleSortBy={handleSortBy}
                    handleSortOrder={handleSortOrder}
                />
            </CardContent>
        </Card>
    );
};

export default RsvpListHeader;
