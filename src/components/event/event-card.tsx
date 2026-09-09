import { Calendar, Clock, Globe, Lock, MapPin } from "lucide-react";
import { useNavigate } from "react-router";

import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
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
            className="w-full max-w-md h-47 gap-3 flex flex-col cursor-pointer"
            onClick={() => navigate(`/events/${event.id}`)}
        >
            <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
                <div className="w-full space-y-1.5">
                    <div className="w-full flex items-center justify-between">
                        <h3 className="text-lg font-semibold leading-tight text-slate-900 line-clamp-1">
                            {event.title}
                        </h3>
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
                    </div>

                    <div className="w-full flex items-center justify-between gap-3 text-sm text-slate-500">
                        <div className="w-full flex items-center gap-4">
                            <span className="flex items-center gap-1">
                                <Calendar className="size-3.5" />
                                {dateLabel}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock className="size-3.5" />
                                {timeLabel}
                            </span>
                        </div>

                        <div className="w-2/3 flex items-center gap-1.5 text-sm text-slate-600">
                            <MapPin className="h-3.5 w-3.5" />
                            <span className="line-clamp-1">
                                {event.location}
                            </span>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="flex-1">
                <p className="italic line-clamp-2">
                    {event.description
                        ? event.description
                        : "No description provided"}
                </p>
            </CardContent>

            <CardFooter className="bg-inherit border-0">
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
            </CardFooter>
        </Card>
    );
}
