import type { Event } from "@/types/event";
import type { PaginatedResponse } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";
import api, { type ApiError } from ".";

export const useFetchAllEvents = () => {
    const fetchAllEvents = async () => {
        const response = await api.get("/events");
        return response.data.data;
    };

    const {
        data: events,
        isLoading,
        error,
        refetch,
    } = useQuery<void, ApiError, PaginatedResponse<Event>>({
        queryFn: fetchAllEvents,
        queryKey: ["events"],
    });

    return { events, isLoading, error, refetch };
};
