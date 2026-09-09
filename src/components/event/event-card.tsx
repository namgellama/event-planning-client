import { Calendar, Clock, Globe, Lock, MapPin } from "lucide-react";
import { useNavigate } from "react-router";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Event } from "@/types/event";

export default function EventCard({ event }: { event: Event }) {
    const navigate = useNavigate();

    const d = new Date(event.date);
    const dateLabel = d.toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
    });
    const timeLabel = d.toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "2-digit",
    });
    const isPublic = event.type === "public";

    return (
        <Card
            className="w-full max-w-md h-36"
            onClick={() => navigate(`/events/${event.id}`)}
        >
            <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
                <div className="space-y-1">
                    <h3 className="font-semibold leading-tight text-slate-900">
                        {event.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {dateLabel}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {timeLabel}
                        </span>
                    </div>
                </div>
                <Badge
                    variant="outline"
                    className={
                        isPublic
                            ? "flex items-center gap-1 border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "flex items-center gap-1 border-amber-200 bg-amber-50 text-amber-700"
                    }
                >
                    {isPublic ? (
                        <Globe className="h-3 w-3" />
                    ) : (
                        <Lock className="h-3 w-3" />
                    )}
                    {isPublic ? "Public" : "Private"}
                </Badge>
            </CardHeader>

            <CardContent className="space-y-3">
                <div className="flex items-center gap-1.5 text-sm text-slate-600">
                    <MapPin className="h-3.5 w-3.5" />
                    <span className="truncate">{event.location}</span>
                </div>

                {event.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                        {event.tags.map((tag) => (
                            <Badge
                                key={tag.id}
                                variant="secondary"
                                className="font-normal text-slate-600"
                            >
                                {tag.title}
                            </Badge>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
