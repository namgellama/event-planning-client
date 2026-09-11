import { CalendarDays, Clock, MapPin } from "lucide-react";

import { Markdown } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import type { EventItem } from "@/types/event";
import { formatDate } from "@/utils/format-date";
import { EventRsvpBadge } from ".";

const EventDetailContent = ({ event }: { event: EventItem }) => {
    const { day, month, full, time } = formatDate(event.date);

    return (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-10">
            <div>
                {event.description ? (
                    <Markdown body={event.description} />
                ) : (
                    <p className="text-[15px] leading-7 italic">
                        No description has been added for this event yet.
                    </p>
                )}

                {event.tags.length > 0 && (
                    <div className="mt-8 flex flex-wrap gap-2">
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
            </div>

            <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
                <div className="px-5 pt-6 pb-5 text-center">
                    <div className="font-serif text-5xl">{day}</div>
                    <div className="mt-1 text-sm font-medium uppercase tracking-wide">
                        {month}
                    </div>
                </div>

                <div
                    className="mx-5 border-t border-dashed"
                    aria-hidden="true"
                />

                <div className="px-5 py-5 space-y-4">
                    <div className="flex items-start gap-3">
                        <CalendarDays className="h-4 w-4 mt-0.5 shrink-0" />
                        <span className="text-sm">{full}</span>
                    </div>
                    {time && (
                        <div className="flex items-start gap-3">
                            <Clock className="h-4 w-4 mt-0.5 shrink-0" />
                            <span className="text-sm">{time}</span>
                        </div>
                    )}
                    <div className="flex items-start gap-3">
                        <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                        <span className="text-sm">{event.location}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-6">
                        <EventRsvpBadge status="yes">
                            {event.rsvp.yes} Going
                        </EventRsvpBadge>
                        <EventRsvpBadge status="no">
                            {event.rsvp.no} Not Going
                        </EventRsvpBadge>
                        <EventRsvpBadge status="maybe">
                            {event.rsvp.maybe} Maybe
                        </EventRsvpBadge>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetailContent;
