import {
    Calendar,
    Clock,
    MapPin,
    UserRoundCheck,
    UserRoundCog,
    UserRoundX,
} from "lucide-react";
import { useNavigate } from "react-router";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import type { EventListItem } from "@/types/event";
import { EventRsvpBadge, EventTagBadge, EventTypeBadge } from ".";

export default function EventCard({ event }: { event: EventListItem }) {
    const { user } = useAuth();

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

    return (
        <Card
            className="w-full max-w-md h-auto gap-4 flex flex-col cursor-pointer"
            onClick={() =>
                user?.role === "admin"
                    ? navigate(`/admin/events/${event.id}`)
                    : navigate(`/events/${event.id}`)
            }
        >
            <CardHeader className="flex flex-col gap-2">
                <div className="w-full flex items-center justify-between">
                    <h3 className="text-lg font-semibold leading-tight text-slate-900 line-clamp-1">
                        {event.title}
                    </h3>
                    <EventTypeBadge
                        type={event.type}
                        label={event.type === "public" ? "Public" : "Private"}
                    />
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
                        <span className="line-clamp-1">{event.location}</span>
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

            <CardFooter className="bg-inherit border-0 flex flex-col items-start gap-3 pt-0 mt-4">
                {event.tags.length > 0 && (
                    <div className="flex gap-1.5 overflow-hidden">
                        {event.tags.slice(0, 4).map((tag) => (
                            <EventTagBadge key={tag.id} title={tag.title} />
                        ))}
                    </div>
                )}

                <div className="w-full flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <EventRsvpBadge status="yes">
                            <UserRoundCheck className="size-4" />
                            {event.rsvp.yes}
                        </EventRsvpBadge>
                        <EventRsvpBadge status="no">
                            <UserRoundX className="size-4" />
                            {event.rsvp.no}
                        </EventRsvpBadge>
                        <EventRsvpBadge status="maybe">
                            <UserRoundCog />
                            {event.rsvp.yes}
                        </EventRsvpBadge>
                    </div>

                    {event.myRsvp && (
                        <EventRsvpBadge status={event.myRsvp}>
                            {event.myRsvp === "yes"
                                ? "Going"
                                : event.myRsvp === "no"
                                  ? "Not Going"
                                  : "Tentative"}
                        </EventRsvpBadge>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
}
