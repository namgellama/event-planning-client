import { useFetchAllTags } from "@/apis/tag.api";
import { EditDeleteActions, ErrorState } from "@/components/shared";
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
import { formatDate } from "@/utils/format-date";

const TagListContent = () => {
    const { tags, isLoading, error, refetch } = useFetchAllTags();

    if (isLoading && !tags) {
        return (
            <div className="w-full grid grid-cols-3 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                    <Skeleton key={i} className="w-full h-47 bg-gray-200" />
                ))}
            </div>
        );
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
        <div className="space-y-5 max-w-4xl mx-auto">
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
        </div>
    );
};

export default TagListContent;
