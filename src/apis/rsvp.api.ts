import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import type { ApiResponse } from "@/types/response";
import type { Rsvp, RsvpStatus } from "@/types/rsvp";
import api, { handleApiError, type ApiError } from ".";
import { useAuth } from "@/contexts/AuthContext";

export const useFetchMyRsvp = (eventId: string | undefined) => {
    const { user } = useAuth();

    const fetchEvent = async () => {
        const response = await api.get<ApiResponse<Rsvp | null>>(
            `/events/${eventId}/rsvps/me`,
        );
        return response.data;
    };

    const {
        data: rsvp,
        isLoading,
        error,
        refetch,
    } = useQuery<ApiResponse<Rsvp | null>, ApiError, Rsvp | null>({
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
        status: RsvpStatus;
    }) => {
        const response = await api.post<ApiResponse<Rsvp>>(
            `/events/${eventId}/rsvps`,
            { status },
        );
        return response.data;
    };

    const { mutateAsync: createRsvpMutation, isPending: isLoading } =
        useMutation<
            ApiResponse<Rsvp>,
            ApiError,
            { eventId: string; status: RsvpStatus }
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
