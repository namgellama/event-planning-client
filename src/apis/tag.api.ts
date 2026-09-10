import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { type PaginatedResponse } from "@/types/pagination";
import type { ListQueryParams } from "@/types/request";
import type { ApiResponse } from "@/types/response";
import type { Tag } from "@/types/tag";
import type { CreateTagInput } from "@/validations/tag.validation";
import api, { handleApiError, type ApiError } from ".";

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

export const useCreateTag = () => {
    const queryClient = useQueryClient();

    const createTag = async (data: CreateTagInput) => {
        const response = await api.post<ApiResponse<Tag>>(`/tags`, data);
        return response.data;
    };

    const { mutateAsync: createTagMutation, isPending: isLoading } =
        useMutation<ApiResponse<Tag>, ApiError, CreateTagInput>({
            mutationFn: createTag,
            onSuccess: ({ message }) => {
                toast.success(message ?? "Tag created successfully");
                queryClient.invalidateQueries({ queryKey: ["tags"] });
            },
            onError: (error) => {
                handleApiError(error, "Unable to create tag. Please try again");
            },
        });

    return { createTagMutation, isLoading };
};
