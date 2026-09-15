import { CalendarX } from "lucide-react";
import {
    parseAsInteger,
    parseAsString,
    parseAsStringEnum,
    useQueryStates,
} from "nuqs";
import { useParams } from "react-router";

import { useFetchAllRsvps, type RsvpSortBy } from "@/apis/rsvp.api";
import {
    EmptyState,
    ErrorState,
    Pagination,
    RsvpBadge,
} from "@/components/shared";
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
import type { RSVPStatus } from "@/types/rsvp";
import { formatDate } from "@/utils/format-date";

export const rsvpQueryState = {
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(10),
    search: parseAsString.withDefault(""),
    status: parseAsStringEnum<RSVPStatus | "all">([
        "all",
        "yes",
        "no",
        "maybe",
    ]).withDefault("all"),
    sortBy: parseAsStringEnum<RsvpSortBy>([
        "createdAt",
        "updatedAt",
    ]).withDefault("createdAt"),
    sortOrder: parseAsStringEnum<SortOrder>(["asc", "desc"]).withDefault(
        "desc",
    ),
};

const RsvpListContent = () => {
    const { id } = useParams();

    const [{ page, limit, status, search, sortBy, sortOrder }] =
        useQueryStates(rsvpQueryState);

    const { rsvps, isLoading, error, refetch } = useFetchAllRsvps(
        {
            page,
            limit,
            search,
            status,
            sortBy,
            sortOrder,
        },
        id,
    );

    if (isLoading && !rsvps) {
        return <Skeleton className="h-150 bg-gray-200" />;
    }

    if (error && !rsvps) {
        return (
            <ErrorState
                title="Couldn't load rsvps"
                error={error}
                onRetry={refetch}
            />
        );
    }

    return (
        <div className="space-y-5">
            {rsvps?.pagination.total === 0 ? (
                <EmptyState
                    icon={CalendarX}
                    title={search ? "No matching RSVPs" : "No RSVPs found"}
                    description={
                        search
                            ? "Try a different search term."
                            : "No one has RSVP'd to this event."
                    }
                />
            ) : (
                <Card>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-25">S.N.</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Created Date</TableHead>
                                    <TableHead>Updated Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {rsvps?.items.map((rsvp, index) => {
                                    const createdDate = formatDate(
                                        rsvp.createdAt.toString(),
                                    );
                                    const updatedDate = formatDate(
                                        rsvp.updatedAt.toString(),
                                    );

                                    const badgeText =
                                        rsvp?.status === "yes"
                                            ? "Going"
                                            : rsvp?.status === "no"
                                              ? "Not Going"
                                              : "Maybe";

                                    return (
                                        <TableRow key={rsvp.userId}>
                                            <TableCell className="font-medium">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell>
                                                {rsvp.user.name}
                                            </TableCell>
                                            <TableCell>
                                                {rsvp.user.email}
                                            </TableCell>
                                            <TableCell>
                                                <RsvpBadge status={rsvp.status}>
                                                    {badgeText}
                                                </RsvpBadge>
                                            </TableCell>
                                            <TableCell>
                                                {createdDate.full}
                                            </TableCell>
                                            <TableCell>
                                                {updatedDate.full}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}
            {rsvps && <Pagination totalPages={rsvps.pagination.totalPages} />}
        </div>
    );
};

export default RsvpListContent;
