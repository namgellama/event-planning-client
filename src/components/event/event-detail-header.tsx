import { Globe2, Lock } from "lucide-react";
import { useNavigate } from "react-router";

import { useDeleteEvent } from "@/apis/event.api";
import { EditDeleteActions } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import type { EventItem } from "@/types/event";
import { EventRsvpActions } from ".";

const EventDetailHeader = ({ event }: { event: EventItem }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { deleteEventMutation, isLoading } = useDeleteEvent();

    const isPublic = event.type === "public";

    const onDelete = async () => {
        await deleteEventMutation(event.id);
        navigate("/admin/events");
    };

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
                <h1 className="w-full font-serif text-3xl tracking-tight">
                    {event.title}
                </h1>
            </div>

            {user?.role === "admin" ? (
                <EditDeleteActions
                    onEdit={() => navigate(`/admin/events/${event.id}/edit`)}
                    onDelete={onDelete}
                    isLoading={isLoading}
                />
            ) : (
                <EventRsvpActions />
            )}
        </div>
    );
};

export default EventDetailHeader;
