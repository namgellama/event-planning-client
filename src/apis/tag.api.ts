import { type PaginatedResponse } from "@/types/pagination";
import type { ApiResponse } from "@/types/response";
import type { Tag } from "@/types/tag";
import { useQuery } from "@tanstack/react-query";
import api, { type ApiError } from ".";

export const useFetchAllTags = () => {
    const fetchAllTags = async () => {
        const response =
            await api.get<ApiResponse<PaginatedResponse<Tag>>>("/tags");
        return response.data;
    };

    const {
        data: tags,
        isLoading,
        error,
        refetch,
    } = useQuery<
        ApiResponse<PaginatedResponse<Tag>>,
        ApiError,
        PaginatedResponse<Tag>
    >({
        queryFn: fetchAllTags,
        queryKey: ["tags"],
        select: ({ data }) => data,
    });

    return { tags, isLoading, error, refetch };
};
