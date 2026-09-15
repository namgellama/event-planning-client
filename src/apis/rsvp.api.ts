import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAuth } from "@/contexts/AuthContext";
import type { PaginatedResponse } from "@/types/pagination";
import type { ListQueryParams } from "@/types/request";
import type { ApiResponse } from "@/types/response";
import type { RSVP, RSVPListItem, RSVPStatus } from "@/types/rsvp";
import api, { handleApiError, type ApiError } from ".";

export type RsvpSortBy = "createdAt" | "updatedAt";

export type RsvpListQueryParams = ListQueryParams & {
    status?: RSVPStatus | "all";
    sortBy?: RsvpSortBy;
};

export const useFetchAllRsvps = (
    query: RsvpListQueryParams,
    eventId: string | undefined,
) => {
    const { page = 1, limit = 10, status, search, sortBy, sortOrder } = query;

    const fetchAllRsvps = async () => {
        const response = await api.get<
            ApiResponse<PaginatedResponse<RSVPListItem>>
        >(`/events/${eventId}/rsvps`, {
            params: {
                page,
                limit,
                status: status === "all" ? undefined : status,
                search: search?.trim() || undefined,
                sortBy,
                sortOrder,
            },
        });
        return response.data;
    };

    const {
        data: rsvps,
        isLoading,
        error,
        refetch,
    } = useQuery<
        ApiResponse<PaginatedResponse<RSVPListItem>>,
        ApiError,
        PaginatedResponse<RSVPListItem>
    >({
        queryFn: fetchAllRsvps,
        queryKey: [
            "rsvps",
            eventId,
            page,
            limit,
            status,
            search,
            sortBy,
            sortOrder,
        ],
        select: ({ data }) => data,
        enabled: !!eventId,
    });

    return { rsvps, isLoading, error, refetch };
};

export const useFetchMyRsvp = (eventId: string | undefined) => {
    const { user } = useAuth();

    const fetchEvent = async () => {
        const response = await api.get<ApiResponse<RSVP | null>>(
            `/events/${eventId}/rsvps/me`,
        );
        return response.data;
    };

    const {
        data: rsvp,
        isLoading,
        error,
        refetch,
    } = useQuery<ApiResponse<RSVP | null>, ApiError, RSVP | null>({
        queryFn: fetchEvent,
        queryKey: ["rsvps", eventId, user?.id],
        select: ({ data }) => data,
        enabled: !!eventId,
    });

    return { rsvp, isLoading, error, refetch };
};

export const useCreateRsvp = () => {
    const queryClient = useQueryClient();

    const createRsvp = async ({
        eventId,
        status,
    }: {
        eventId: string;
        status: RSVPStatus;
    }) => {
        const response = await api.post<ApiResponse<RSVP>>(
            `/events/${eventId}/rsvps`,
            { status },
        );
        return response.data;
    };

    const { mutateAsync: createRsvpMutation, isPending: isLoading } =
        useMutation<
            ApiResponse<RSVP>,
            ApiError,
            { eventId: string; status: RSVPStatus }
        >({
            mutationFn: createRsvp,
            onSuccess: ({ message }) => {
                toast.success(message ?? "Rsvp created successfully");
                queryClient.invalidateQueries({ queryKey: ["rsvps"] });
            },
            onError: (error) => {
                handleApiError(
                    error,
                    "Unable to create rsvp. Please try again",
                );
            },
        });

    return { createRsvpMutation, isLoading };
};

export const useUpdateRsvp = () => {
    const queryClient = useQueryClient();

    const updateRsvp = async ({
        eventId,
        status,
    }: {
        eventId: string;
        status: RSVPStatus;
    }) => {
        const response = await api.patch<ApiResponse<RSVP>>(
            `/events/${eventId}/rsvps`,
            { status },
        );
        return response.data;
    };

    const { mutateAsync: updateRsvpMutation, isPending: isLoading } =
        useMutation<
            ApiResponse<RSVP>,
            ApiError,
            { eventId: string; status: RSVPStatus }
        >({
            mutationFn: updateRsvp,
            onSuccess: ({ message, data }) => {
                toast.success(message ?? "Rsvp updated successfully");
                queryClient.setQueryData(
                    ["rsvps", data.eventId, data.userId],
                    data,
                );
                queryClient.invalidateQueries({ queryKey: ["rsvps"] });
            },
            onError: (error) => {
                handleApiError(
                    error,
                    "Unable to update rsvp. Please try again",
                );
            },
        });

    return { updateRsvpMutation, isLoading };
};
