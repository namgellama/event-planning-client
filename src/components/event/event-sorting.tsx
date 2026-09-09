import type { EventSortBy } from "@/apis/event.api";
import type { SortOrder } from "@/types/request";
import { ArrowDownAZ, ArrowUpAZ } from "lucide-react";
import { useQueryStates } from "nuqs";
import { Button } from "../ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { queryState } from "./event-list";

const sortByItems = [
    { label: "Created Date", value: "createdAt" },
    { label: "Date", value: "date" },
] as const;

const EventSorting = () => {
    const [{ sortBy, sortOrder }, setQuery] = useQueryStates(queryState);

    const handleSortBy = (value: string | null) => {
        if (!value) return;
        setQuery({ sortBy: value as EventSortBy });
    };

    const handleSortOrder = () => {
        const value: SortOrder = sortOrder === "asc" ? "desc" : "asc";
        setQuery({ sortOrder: value });
    };

    return (
        <div className="flex items-center gap-2">
            <Select
                items={sortByItems}
                value={sortBy}
                onValueChange={handleSortBy}
            >
                <SelectTrigger className="w-36 h-10!">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {sortByItems.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                                {item.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Button
                variant="outline"
                size="icon"
                aria-label="Submit"
                onClick={handleSortOrder}
            >
                {sortOrder === "asc" ? <ArrowDownAZ /> : <ArrowUpAZ />}
            </Button>
        </div>
    );
};

export default EventSorting;
