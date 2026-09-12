import { Badge } from "@/components/ui/badge";
import type { EventStatus } from "@/types/event";

const statusStyle: Record<EventStatus, string> = {
    upcoming:
        "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400",
    completed:
        "border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400",
};

interface Props {
    status: EventStatus;
}

const EventStatusBadge = ({ status }: Props) => {
    return (
        <Badge
            variant="outline"
            className={`ml-auto capitalize ${statusStyle[status]}`}
        >
            {status} event
        </Badge>
    );
};

export default EventStatusBadge;
