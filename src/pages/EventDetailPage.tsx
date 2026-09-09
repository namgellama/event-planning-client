import { CalendarDays, Clock, Globe2, Lock, MapPin } from "lucide-react";
import { useParams } from "react-router";

import { useFetchEvent } from "@/apis/event.api";
import { EventActions } from "@/components/event";
import { CenteredSpinner, ErrorState, Markdown } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Event } from "@/types/event";
import { formatDate } from "@/utils/format-date";

const EventDetailPage = () => {
    const { id } = useParams();

    const { event, isLoading, error, refetch } = useFetchEvent(id ?? "");

    if (isLoading && !event) {
        return <CenteredSpinner />;
    }

    if (error && !event) {
        return (
            <ErrorState
                title="Couldn't load event"
                error={error}
                onRetry={refetch}
                notFound={{
                    title: "Event not found",
                    description:
                        "This event may have been deleted or the link is incorrect.",
                }}
            />
        );
    }

    if (!event) {
        return <CenteredSpinner />;
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="min-h-screen px-6 py-12">
                <div className="mx-auto max-w-4xl">
                    <EventHeader event={event} />
                    <Separator className="my-4 bg-[#D8CFBC]" />
                    <EventContent event={event} />
                    <EventFooter event={event} />
                </div>
            </div>
        </div>
    );
};

export default EventDetailPage;

const EventHeader = ({ event }: { event: Event }) => {
    const isPublic = event.type === "public";

    return (
        <div className="flex items-end justify-between gap-4">
            <div className="w-full">
                <Badge
                    variant="outline"
                    className={
                        "mb-4 gap-1.5 rounded-full border px-3 py-1 text-xs font-medium " +
                        (isPublic
                            ? "border-[#2F6F62]/30 bg-[#2F6F62]/10 text-[#2F6F62]"
                            : "border-[#6B4E71]/30 bg-[#6B4E71]/10 text-[#6B4E71]")
                    }
                >
                    {isPublic ? (
                        <Globe2 className="h-3.5 w-3.5" />
                    ) : (
                        <Lock className="h-3.5 w-3.5" />
                    )}
                    {isPublic ? "Public event" : "Private event"}
                </Badge>
                <h1 className="w-full font-serif text-3xl leading-[1.05] tracking-tight text-[#1F2933]">
                    {event.title}
                </h1>
            </div>

            <EventActions event={event} />
        </div>
    );
};

const EventContent = ({ event }: { event: Event }) => {
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

const EventFooter = ({ event }: { event: Event }) => {
    return (
        <div className="mt-10 text-xs text-[#A39B8B]">
            Last updated{" "}
            {new Date(event.updatedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            })}
        </div>
    );
};
