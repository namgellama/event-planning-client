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

export const useFetchTag = (tagId: string | undefined) => {
    const fetchTag = async () => {
        const response = await api.get<ApiResponse<Tag>>(`/tags/${tagId}`);
        return response.data;
    };

    const {
        data: tag,
        isLoading,
        error,
        refetch,
    } = useQuery<ApiResponse<Tag>, ApiError, Tag>({
        queryFn: fetchTag,
        queryKey: ["tags", tagId],
        select: ({ data }) => data,
        enabled: !!tagId,
    });

    return { tag, isLoading, error, refetch };
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

export const useUpdateTag = () => {
    const queryClient = useQueryClient();

    const updateTag = async ({
        data,
        tagId,
    }: {
        data: CreateTagInput;
        tagId: string;
    }) => {
        const response = await api.patch<ApiResponse<Tag>>(
            `/tags/${tagId}`,
            data,
        );
        return response.data;
    };

    const { mutateAsync: updateTagMutation, isPending: isLoading } =
        useMutation<
            ApiResponse<Tag>,
            ApiError,
            { data: CreateTagInput; tagId: string }
        >({
            mutationFn: updateTag,
            onSuccess: ({ message, data }) => {
                toast.success(message ?? "Tag updated successfully");
                queryClient.setQueryData(["tags", data.id], data);
                queryClient.invalidateQueries({ queryKey: ["tags"] });
            },
            onError: (error) => {
                handleApiError(error, "Unable to update tag. Please try again");
            },
        });

    return { updateTagMutation, isLoading };
};

export const useDeleteTag = () => {
    const queryClient = useQueryClient();

    const deleteTag = async (tagId: string) => {
        await api.delete(`/tags/${tagId}`);
    };

    const { mutateAsync: deleteTagMutation, isPending: isLoading } =
        useMutation<void, ApiError, string>({
            mutationFn: deleteTag,
            onSuccess: () => {
                toast.success("Tag deleted successfully");
                queryClient.invalidateQueries({ queryKey: ["tags"] });
            },
            onError: (error) => {
                handleApiError(error, "Unable to delete tag. Please try again");
            },
        });

    return { deleteTagMutation, isLoading };
};
