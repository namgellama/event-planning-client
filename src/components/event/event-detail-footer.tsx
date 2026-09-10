import type { Event } from "@/types/event";

const EventDetailFooter = ({ event }: { event: Event }) => {
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

export default EventDetailFooter;
