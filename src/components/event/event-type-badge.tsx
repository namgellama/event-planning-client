import { Globe, Lock, type LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { EventType } from "@/types/event";

interface Props {
    type: EventType;
    label: string;
}

const style: Record<EventType, string> = {
    public: "flex items-center gap-1 border-emerald-200 bg-emerald-50 text-emerald-700",
    private:
        "flex items-center gap-1 border-amber-200 bg-amber-50 text-amber-700",
};

const icon: Record<EventType, LucideIcon> = {
    public: Globe,
    private: Lock,
};

const EventTypeBadge = ({ type, label }: Props) => {
    const Icon = icon[type];

    return (
        <Badge variant="outline" className={style[type]}>
            <Icon className="h-3 w-3" />

            {label}
        </Badge>
    );
};

export default EventTypeBadge;
