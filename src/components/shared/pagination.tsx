import { getPageItems } from "@/utils/get-page-items";
import { createParser, parseAsInteger, useQueryStates } from "nuqs";
import {
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    Pagination as ShadcnPagination,
} from "../ui/pagination";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

const rows = [10, 25, 50, 100];

const limitParser = createParser({
    parse: (value) => {
        const parsed = Number(value);

        return rows.includes(parsed as (typeof rows)[number]) ? parsed : null;
    },

    serialize: (value) => String(value),
}).withDefault(10);

const paginationParsers = {
    page: parseAsInteger.withDefault(1),
    limit: limitParser,
};

interface Props {
    totalPages: number;
}

const Pagination = ({ totalPages }: Props) => {
    const [{ page, limit }, setQuery] = useQueryStates(paginationParsers);

    const currentPage = Math.min(Math.max(page, 1), totalPages);

    const pageItems = getPageItems(currentPage, totalPages);

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages || newPage === currentPage) {
            return;
        }

        setQuery({
            page: newPage,
        });
    };

    const handleLimitChange = async (value: string | null) => {
        if (value === null) return;

        setQuery({ limit: Number(value), page: 1 });
    };

    if (totalPages <= 0) return null;

    return (
        <div className="flex items-center justify-between">
            {/* Rows per page */}
            <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                    Rows per page
                </span>

                <Select value={String(limit)} onValueChange={handleLimitChange}>
                    <SelectTrigger className="w-20">
                        <SelectValue />
                    </SelectTrigger>

                    <SelectContent align="start">
                        <SelectGroup>
                            {rows.map((row) => (
                                <SelectItem key={row} value={String(row)}>
                                    {row}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            {/* Pagination */}
            <ShadcnPagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(event) => {
                                event.preventDefault();

                                handlePageChange(currentPage - 1);
                            }}
                            className={
                                currentPage === 1
                                    ? "pointer-events-none opacity-50"
                                    : ""
                            }
                        />
                    </PaginationItem>

                    {pageItems.map((item, index) => {
                        if (item === "ellipsis") {
                            return (
                                <PaginationItem key={`ellipsis-${index}`}>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            );
                        }

                        return (
                            <PaginationItem key={item}>
                                <PaginationLink
                                    href="#"
                                    isActive={item === page}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        handlePageChange(item);
                                    }}
                                >
                                    {item}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    })}

                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(event) => {
                                event.preventDefault();
                                handlePageChange(currentPage + 1);
                            }}
                            className={
                                currentPage === totalPages
                                    ? "pointer-events-none opacity-50"
                                    : ""
                            }
                        />
                    </PaginationItem>
                </PaginationContent>
            </ShadcnPagination>
        </div>
    );
};

export default Pagination;
