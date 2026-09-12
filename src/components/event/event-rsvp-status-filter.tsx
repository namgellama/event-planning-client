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
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
    { label: "Maybe", value: "maybe" },
];

const EventRsvpStatusFilter = () => {
    const [{ rsvpStatus }, setQuery] = useQueryStates(eventQueryState);

    return (
        <Select
            items={items}
            value={rsvpStatus}
            onValueChange={(value) =>
                setQuery({
                    rsvpStatus: value,
                    page: 1,
                })
            }
        >
            <SelectTrigger className="w-32 h-10!">
                RSVP: <SelectValue className="font-medium" />
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

export default EventRsvpStatusFilter;
