import { useQuery } from "@tanstack/react-query";

import { type PaginatedResponse } from "@/types/pagination";
import type { ListQueryParams } from "@/types/request";
import type { ApiResponse } from "@/types/response";
import type { Tag } from "@/types/tag";
import api, { type ApiError } from ".";

export type TagSortBy = "createdAt" | "title";

export type TagListQueryParams = ListQueryParams & {
    sortBy?: TagSortBy;
};

export const useFetchAllTags = ({
    page = 1,
    limit = 10,
    search,
    sortBy = "createdAt",
    sortOrder = "desc",
}: TagListQueryParams) => {
    const fetchAllTags = async () => {
        const response = await api.get<ApiResponse<PaginatedResponse<Tag>>>(
            "/tags",
            {
                params: {
                    page,
                    limit,
                    search: search?.trim() || undefined,
                    sortBy,
                    sortOrder,
                },
            },
        );
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
        queryKey: ["tags", page, limit, search, sortBy, sortOrder],
        select: ({ data }) => data,
    });

    return { tags, isLoading, error, refetch };
};
