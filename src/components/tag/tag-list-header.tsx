import { Plus } from "lucide-react";
import { useQueryStates } from "nuqs";

import type { TagSortBy } from "@/apis/tag.api";
import { SearchInput, SortControls } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { SortOrder } from "@/types/request";
import { useState } from "react";
import { tagQueryState } from "./tag-list-content";

const sortByItems = [
    { label: "Created Date", value: "createdAt" },
    { label: "Title", value: "title" },
];

const TagListHeader = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [{ search, sortBy, sortOrder }, setQuery] =
        useQueryStates(tagQueryState);

    const handleSortBy = (value: string | null) => {
        if (!value) return;
        setQuery({ sortBy: value as TagSortBy });
    };

    const handleSortOrder = () => {
        const value: SortOrder = sortOrder === "asc" ? "desc" : "asc";
        setQuery({ sortOrder: value });
    };

    return (
        <Card>
            <CardContent className="flex flex-col gap-4">
                <Button
                    size="lg"
                    className="px-4 cursor-pointer self-end"
                    onClick={() => setIsOpen(true)}
                >
                    <Plus /> Create New
                </Button>
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

export default TagListHeader;
