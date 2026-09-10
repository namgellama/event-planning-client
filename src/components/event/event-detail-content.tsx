import { CalendarDays, Clock, MapPin } from "lucide-react";

import { Markdown } from "@/components/shared";
import type { Event } from "@/types/event";
import { formatDate } from "@/utils/format-date";

const EventDetailContent = ({ event }: { event: Event }) => {
    const { day, month, full, time } = formatDate(event.date);

    return (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-10">
            <div>
                {event.description ? (
                    <Markdown body={event.description} />
                ) : (
                    <p className="text-[15px] leading-7 text-[#8B8378] italic">
                        No description has been added for this event yet.
                    </p>
                )}

                {event.tags.length > 0 && (
                    <div className="mt-8 flex flex-wrap gap-2">
                        {event.tags.map((tag) => (
                            <span
                                key={tag.id}
                                className="rounded-full border border-[#D8CFBC] bg-white px-3 py-1 text-sm text-[#4A4238]"
                            >
                                {tag.title}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className="relative">
                <div
                    className="relative rounded-2xl border border-[#D8CFBC] bg-white shadow-sm overflow-hidden"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 0 116px, transparent 6px, white 7px), radial-gradient(circle at 260px 116px, transparent 6px, white 7px)",
                    }}
                >
                    <div className="px-5 pt-6 pb-5 text-center">
                        <div className="font-serif text-5xl leading-none text-[#B8862B]">
                            {day}
                        </div>
                        <div className="mt-1 text-sm font-medium uppercase tracking-wide text-[#8B8378]">
                            {month}
                        </div>
                    </div>

                    <div
                        className="mx-5 border-t border-dashed border-[#D8CFBC]"
                        aria-hidden="true"
                    />

                    <div className="px-5 py-5 space-y-4">
                        <div className="flex items-start gap-3">
                            <CalendarDays className="h-4 w-4 mt-0.5 text-[#8B8378] shrink-0" />
                            <span className="text-sm text-[#3D4650]">
                                {full}
                            </span>
                        </div>
                        {time && (
                            <div className="flex items-start gap-3">
                                <Clock className="h-4 w-4 mt-0.5 text-[#8B8378] shrink-0" />
                                <span className="text-sm text-[#3D4650]">
                                    {time}
                                </span>
                            </div>
                        )}
                        <div className="flex items-start gap-3">
                            <MapPin className="h-4 w-4 mt-0.5 text-[#8B8378] shrink-0" />
                            <span className="text-sm text-[#3D4650]">
                                {event.location}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetailContent;
