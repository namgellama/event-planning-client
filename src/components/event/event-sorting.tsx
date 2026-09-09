import { ArrowDownAZ, ArrowUpAZ } from "lucide-react";
import { Button } from "../ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

const sortByItems = [
    { label: "Created Date", value: "createdAt" },
    { label: "Date", value: "date" },
] as const;

interface Props {
    sortByValue: string;
    handleSortBy: (value: string | null) => void;
    sortOrderValue: string;
    handleSortOrder: () => void;
}

const EventSorting = ({
    sortByValue,
    handleSortBy,
    sortOrderValue,
    handleSortOrder,
}: Props) => {
    return (
        <div className="flex items-center gap-2">
            <Select
                items={sortByItems}
                value={sortByValue}
                onValueChange={handleSortBy}
            >
                <SelectTrigger className="w-45">
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
                {sortOrderValue === "asc" ? <ArrowDownAZ /> : <ArrowUpAZ />}
            </Button>
        </div>
    );
};

export default EventSorting;
