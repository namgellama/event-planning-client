import type { TypeValue } from "@/components/event/event-tabs";
import type { Event } from "@/types/event";
import type { PaginatedResponse } from "@/types/pagination";
import type { ApiResponse } from "@/types/response";
import type { CreateEventInput } from "@/validations/event.validation";
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
        const response = await api.get<ApiResponse<PaginatedResponse<Event>>>(
            "/events",
            {
                params: {
                    type: type === "all" ? undefined : type,
                },
            },
        );
        return response.data;
    };

    const {
        data: events,
        isLoading,
        error,
        refetch,
    } = useQuery<
        ApiResponse<PaginatedResponse<Event>>,
        ApiError,
        PaginatedResponse<Event>
    >({
        queryFn: fetchAllEvents,
        queryKey: ["events", type],
        select: ({ data }) => data,
    });

    return { events, isLoading, error, refetch };
};

export const useFetchEvent = (eventId: string) => {
    const fetchEvent = async () => {
        const response = await api.get<ApiResponse<Event>>(
            `/events/${eventId}`,
        );
        return response.data;
    };

    const {
        data: event,
        isLoading,
        error,
        refetch,
    } = useQuery<ApiResponse<Event>, ApiError, Event>({
        queryFn: fetchEvent,
        queryKey: ["events", eventId],
        select: ({ data }) => data,
    });

    return { event, isLoading, error, refetch };
};

export const useCreateEvent = () => {
    const createEvent = async (data: CreateEventInput) => {
        const response = await api.post<ApiResponse<Event>>(`/events/`, data);
        return response.data;
    };

    const { mutateAsync: createEventMutation, isPending: isLoading } =
        useMutation<ApiResponse<Event>, ApiError, CreateEventInput>({
            mutationFn: createEvent,
            onSuccess: ({ message }) => {
                toast.success(message ?? "Event created successfully");
            },
            onError: (error) => {
                handleApiError(
                    error,
                    "Unable to create event. Please try again",
                );
            },
        });

    return { createEventMutation, isLoading };
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
