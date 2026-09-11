import type { EventItem } from "@/types/event";

const EventDetailFooter = ({ event }: { event: EventItem }) => {
    return (
        <div className="mt-10 text-xs">
            Last updated{" "}
            {new Date(event.updatedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            })}
        </div>
    );
};

export default EventDetailFooter;
