export type SortOrder = "asc" | "desc";

export type ListQueryParams = {
    page: number;
    limit: number;
    search: string;
    sortOrder: SortOrder;
};
