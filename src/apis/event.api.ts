import type {
    EventItem,
    EventListItem,
    EventStatus,
    EventType,
    EventWithTagIds,
} from "@/types/event";
import type { PaginatedResponse } from "@/types/pagination";
import type { ListQueryParams } from "@/types/request";
import type { ApiResponse } from "@/types/response";
import type { RsvpStatus } from "@/types/rsvp";
import type {
    CreateEventInput,
    UpdateEventInput,
} from "@/validations/event.validation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api, { handleApiError, type ApiError } from ".";

export type EventSortBy = "createdAt" | "date" | "title" | "popularity";

export type EventListQueryParams = ListQueryParams & {
    type?: EventType | "all";
    status?: EventStatus | "all";
    rsvpStatus: RsvpStatus | "all";
    tags?: string[];
    sortBy?: EventSortBy;
};

export const useFetchAllEvents = ({
    page = 1,
    limit = 10,
    type,
    status,
    search,
    tags = [],
    rsvpStatus,
    sortBy = "createdAt",
    sortOrder = "desc",
}: EventListQueryParams) => {
    const fetchAllEvents = async () => {
        const response = await api.get<
            ApiResponse<PaginatedResponse<EventListItem>>
        >("/events", {
            params: {
                page,
                limit,
                type: type === "all" ? undefined : type,
                status: status === "all" ? undefined : status,
                search: search?.trim() || undefined,
                tags: tags.length > 0 ? tags.join(",") : undefined,
                sortBy,
                sortOrder,
                rsvpStatus: rsvpStatus === "all" ? undefined : rsvpStatus,
            },
        });
        return response.data;
    };

    const {
        data: events,
        isLoading,
        error,
        refetch,
    } = useQuery<
        ApiResponse<PaginatedResponse<EventListItem>>,
        ApiError,
        PaginatedResponse<EventListItem>
    >({
        queryFn: fetchAllEvents,
        queryKey: [
            "events",
            page,
            limit,
            type,
            status,
            rsvpStatus,
            search,
            tags,
            sortBy,
            sortOrder,
        ],
        select: ({ data }) => data,
    });

    return { events, isLoading, error, refetch };
};

export const useFetchEvent = (eventId: string | undefined) => {
    const fetchEvent = async () => {
        const response = await api.get<ApiResponse<EventItem>>(
            `/events/${eventId}`,
        );
        return response.data;
    };

    const {
        data: event,
        isLoading,
        error,
        refetch,
    } = useQuery<ApiResponse<EventItem>, ApiError, EventItem>({
        queryFn: fetchEvent,
        queryKey: ["events", eventId],
        select: ({ data }) => data,
        enabled: !!eventId,
    });

    return { event, isLoading, error, refetch };
};

export const useCreateEvent = () => {
    const queryClient = useQueryClient();

    const createEvent = async (data: CreateEventInput) => {
        const response = await api.post<ApiResponse<EventWithTagIds>>(
            `/events`,
            data,
        );
        return response.data;
    };

    const { mutateAsync: createEventMutation, isPending: isLoading } =
        useMutation<ApiResponse<EventWithTagIds>, ApiError, CreateEventInput>({
            mutationFn: createEvent,
            onSuccess: ({ message }) => {
                toast.success(message ?? "Event created successfully");
                queryClient.invalidateQueries({ queryKey: ["events"] });
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

export const useUpdateEvent = () => {
    const queryClient = useQueryClient();

    const updateEvent = async ({
        data,
        eventId,
    }: {
        data: UpdateEventInput;
        eventId: string;
    }) => {
        const response = await api.patch<ApiResponse<EventWithTagIds>>(
            `/events/${eventId}`,
            data,
        );
        return response.data;
    };

    const { mutateAsync: updateEventMutation, isPending: isLoading } =
        useMutation<
            ApiResponse<EventWithTagIds>,
            ApiError,
            { data: UpdateEventInput; eventId: string }
        >({
            mutationFn: updateEvent,
            onSuccess: ({ message, data }) => {
                toast.success(message ?? "Event updated successfully");
                queryClient.setQueryData(["events", data.id], data);
                queryClient.invalidateQueries({ queryKey: ["events"] });
            },
            onError: (error) => {
                handleApiError(
                    error,
                    "Unable to update event. Please try again",
                );
            },
        });

    return { updateEventMutation, isLoading };
};

export const useDeleteEvent = () => {
    const queryClient = useQueryClient();

    const deleteEvent = async (eventId: string) => {
        await api.delete(`/events/${eventId}`);
    };

    const { mutateAsync: deleteEventMutation, isPending: isLoading } =
        useMutation<void, ApiError, string>({
            mutationFn: deleteEvent,
            onSuccess: () => {
                toast.success("Event deleted successfully");
                queryClient.invalidateQueries({ queryKey: ["events"] });
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
