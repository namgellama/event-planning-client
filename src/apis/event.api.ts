import type { TypeValue } from "@/components/event/event-tabs";
import type { Event } from "@/types/event";
import type { PaginatedResponse } from "@/types/pagination";
import { useMutation, useQuery } from "@tanstack/react-query";
import { parseAsStringEnum, useQueryState } from "nuqs";
import { toast } from "sonner";
import api, { handleApiError, type ApiError } from ".";

export const useFetchAllEvents = () => {
    const [type] = useQueryState(
        "type",
        parseAsStringEnum<TypeValue>(["all", "public", "private"]).withDefault(
            "all",
        ),
    );

    const fetchAllEvents = async () => {
        const response = await api.get("/events", {
            params: {
                type: type === "all" ? undefined : type,
            },
        });
        return response.data.data;
    };

    const {
        data: events,
        isLoading,
        error,
        refetch,
    } = useQuery<PaginatedResponse<Event>, ApiError>({
        queryFn: fetchAllEvents,
        queryKey: ["events", type],
    });

    return { events, isLoading, error, refetch };
};

export const useFetchEvent = (eventId: string) => {
    const fetchEvent = async () => {
        const response = await api.get(`/events/${eventId}`);
        return response.data.data;
    };

    const {
        data: event,
        isLoading,
        error,
        refetch,
    } = useQuery<Event, ApiError>({
        queryFn: fetchEvent,
        queryKey: ["events", eventId],
    });

    return { event, isLoading, error, refetch };
};

export const useDeleteEvent = () => {
    const deleteEvent = async (eventId: string) => {
        await api.delete(`/events/${eventId}`);
    };

    const { mutateAsync: deleteEventMutation, isPending: isLoading } =
        useMutation<void, ApiError, string>({
            mutationFn: deleteEvent,
            onSuccess: () => {
                toast.success("Event deleted successfully");
            },
            onError: (error) => {
                handleApiError(
                    error,
                    "Unable to delete event. Please try again",
                );
            },
        });

    return { deleteEventMutation, isLoading };
};
