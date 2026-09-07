import type { TypeValue } from "@/components/event/event-tabs";
import type { Event } from "@/types/event";
import type { PaginatedResponse } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";
import { parseAsStringEnum, useQueryState } from "nuqs";
import api, { type ApiError } from ".";

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
    } = useQuery<void, ApiError, PaginatedResponse<Event>>({
        queryFn: fetchAllEvents,
        queryKey: ["events", type],
    });

    return { events, isLoading, error, refetch };
};
