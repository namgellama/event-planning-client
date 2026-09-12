import { useQueryStates } from "nuqs";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { eventQueryState } from "./event-list-content";

const items = [
    { label: "All", value: "all" },
    { label: "Upcoming", value: "upcoming" },
    { label: "Completed", value: "completed" },
];

const EventStatusFilter = () => {
    const [{ status }, setQuery] = useQueryStates(eventQueryState);

    return (
        <Select
            items={items}
            value={status}
            onValueChange={(value) =>
                setQuery({
                    status: value,
                    page: 1,
                })
            }
        >
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
    );
};

export default EventStatusFilter;
