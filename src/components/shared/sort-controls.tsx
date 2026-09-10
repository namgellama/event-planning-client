import { ArrowDownAZ, ArrowUpAZ } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Props {
    sortBy: string;
    sortOrder: string;
    items: { label: string; value: string }[];
    handleSortBy: (value: string | null) => void;
    handleSortOrder: () => void;
}

const SortControls = ({
    items,
    sortBy,
    sortOrder,
    handleSortBy,
    handleSortOrder,
}: Props) => {
    return (
        <div className="flex items-center gap-2">
            <Select items={items} value={sortBy} onValueChange={handleSortBy}>
                <SelectTrigger className="w-36 h-10!">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {items.map((item) => (
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

export default SortControls;
