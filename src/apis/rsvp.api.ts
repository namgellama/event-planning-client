import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAuth } from "@/contexts/AuthContext";
import type { PaginatedResponse } from "@/types/pagination";
import type { ListQueryParams } from "@/types/request";
import type { ApiResponse } from "@/types/response";
import type { RSVP, RSVPListItem, RSVPStatus } from "@/types/rsvp";
import api, { handleApiError, type ApiError } from ".";

export type RSVPSortBy = "createdAt" | "updatedAt";

export type RSVPListQueryParams = ListQueryParams & {
    status?: RSVPStatus | "all";
    sortBy?: RSVPSortBy;
};

export const useFetchAllRSVPs = (
    query: RSVPListQueryParams,
    eventId: string | undefined,
) => {
    const { page = 1, limit = 10, status, search, sortBy, sortOrder } = query;

    const fetchAllRSVPs = async () => {
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
        queryFn: fetchAllRSVPs,
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

export const useFetchMyRSVP = (eventId: string | undefined) => {
    const { user } = useAuth();

    const fetchMyRSVP = async () => {
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
        queryFn: fetchMyRSVP,
        queryKey: ["rsvps", eventId, user?.id],
        select: ({ data }) => data,
        enabled: !!eventId,
    });

    return { rsvp, isLoading, error, refetch };
};

export const useCreateRSVP = () => {
    const queryClient = useQueryClient();

    const createRSVP = async ({
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

    const { mutateAsync: createRSVPMutation, isPending: isLoading } =
        useMutation<
            ApiResponse<RSVP>,
            ApiError,
            { eventId: string; status: RSVPStatus }
        >({
            mutationFn: createRSVP,
            onSuccess: ({ message }) => {
                toast.success(message ?? "RSVP created successfully");
                queryClient.invalidateQueries({ queryKey: ["rsvps"] });
            },
            onError: (error) => {
                handleApiError(
                    error,
                    "Unable to create RSVP. Please try again",
                );
            },
        });

    return { createRSVPMutation, isLoading };
};

export const useUpdateRSVP = () => {
    const queryClient = useQueryClient();

    const updateRSVP = async ({
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

    const { mutateAsync: updateRSVPMutation, isPending: isLoading } =
        useMutation<
            ApiResponse<RSVP>,
            ApiError,
            { eventId: string; status: RSVPStatus }
        >({
            mutationFn: updateRSVP,
            onSuccess: ({ message, data }) => {
                toast.success(message ?? "RSVP updated successfully");
                queryClient.setQueryData(
                    ["rsvps", data.eventId, data.userId],
                    data,
                );
                queryClient.invalidateQueries({ queryKey: ["rsvps"] });
            },
            onError: (error) => {
                handleApiError(
                    error,
                    "Unable to update RSVP. Please try again",
                );
            },
        });

    return { updateRSVPMutation, isLoading };
};
