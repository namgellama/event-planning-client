import { useNavigate } from "react-router";

import { useDeleteEvent } from "@/apis/event.api";
import { EditDeleteActions } from "@/components/shared";
import { useAuth } from "@/contexts/AuthContext";
import type { EventItem } from "@/types/event";
import { EventRsvpActions, EventStatusBadge, EventTypeBadge } from ".";

const EventDetailHeader = ({ event }: { event: EventItem }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { deleteEventMutation, isLoading } = useDeleteEvent();

    const onDelete = async () => {
        await deleteEventMutation(event.id);
        navigate("/admin/events");
    };

    return (
        <div className="flex items-end justify-between gap-4">
            <div className="w-full flex flex-col gap-4">
                <EventTypeBadge
                    type={event.type}
                    label={
                        event.type === "public"
                            ? "Public event"
                            : "Private event"
                    }
                />

                <h1 className="w-full font-serif text-3xl tracking-tight">
                    {event.title}
                </h1>
            </div>

            <div className="flex items-center gap-1">
                <EventStatusBadge status={event.status} />

                {user?.role === "admin" ? (
                    <EditDeleteActions
                        onEdit={() =>
                            navigate(`/admin/events/${event.id}/edit`)
                        }
                        onDelete={onDelete}
                        isLoading={isLoading}
                    />
                ) : (
                    <EventRsvpActions />
                )}
            </div>
        </div>
    );
};

export default EventDetailHeader;
