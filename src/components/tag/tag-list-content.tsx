import {
    parseAsInteger,
    parseAsString,
    parseAsStringEnum,
    useQueryStates,
} from "nuqs";

import { useFetchAllTags, type TagSortBy } from "@/apis/tag.api";
import { EditDeleteActions, ErrorState, Pagination } from "@/components/shared";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { SortOrder } from "@/types/request";
import { formatDate } from "@/utils/format-date";

export const tagQueryState = {
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(10),
    search: parseAsString.withDefault(""),
    sortBy: parseAsStringEnum<TagSortBy>(["createdAt", "title"]).withDefault(
        "createdAt",
    ),
    sortOrder: parseAsStringEnum<SortOrder>(["asc", "desc"]).withDefault(
        "desc",
    ),
};

const TagListContent = () => {
    const [{ page, limit, search, sortBy, sortOrder }] =
        useQueryStates(tagQueryState);

    const { tags, isLoading, error, refetch } = useFetchAllTags({
        page,
        limit,
        search,
        sortBy,
        sortOrder,
    });

    if (isLoading && !tags) {
        return <Skeleton className="h-150 bg-gray-200" />;
    }

    if (error && !tags) {
        return (
            <ErrorState
                title="Couldn't load tags"
                error={error}
                onRetry={refetch}
            />
        );
    }

    return (
        <div className="space-y-5">
            <Card>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-25">S.N.</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Created Date</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tags?.items.map((tag, index) => {
                                const date = formatDate(tag.createdAt);

                                return (
                                    <TableRow key={tag.id}>
                                        <TableCell className="font-medium">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell>{tag.title}</TableCell>
                                        <TableCell>{date.full}</TableCell>
                                        <TableCell className="text-right">
                                            <EditDeleteActions
                                                onEdit={() => {}}
                                                onDelete={() => {}}
                                                isLoading={false}
                                            />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            {tags && <Pagination totalPages={tags.pagination.totalPages} />}
        </div>
    );
};

export default TagListContent;
