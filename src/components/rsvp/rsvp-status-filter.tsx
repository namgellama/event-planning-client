import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useQueryStates } from "nuqs";
import { rsvpQueryState } from "./rsvp-list-content";

const items = [
    { label: "All", value: "all" },
    { label: "Going", value: "yes" },
    { label: "Not Going", value: "no" },
    { label: "Maybe", value: "maybe" },
];

const RSVPStatusFilter = () => {
    const [{ status }, setQuery] = useQueryStates(rsvpQueryState);

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
            <SelectTrigger className="w-40 h-10!">
                Status:
                <SelectValue className="font-medium" />
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

export default RSVPStatusFilter;
