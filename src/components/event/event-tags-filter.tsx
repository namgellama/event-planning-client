import { useQueryStates } from "nuqs";

import { useFetchAllTags } from "@/apis/tag.api";
import { MultiSelect } from "@/components/ui/multi-select";
import { Skeleton } from "@/components/ui/skeleton";
import { eventQueryState } from "./event-list-content";

const EventTagsFilter = () => {
    const [{ tags }, setQuery] = useQueryStates(eventQueryState);
    const { tags: tagsData, isLoading } = useFetchAllTags({});

    if (isLoading) return <Skeleton className="w-xs h-10" />;

    if (!tagsData) return null;

    return (
        <MultiSelect
            defaultValue={tags}
            singleLine
            options={
                tagsData.items.map((item) => ({
                    label: item.title,
                    value: item.id,
                })) ?? []
            }
            onValueChange={(value) => {
                setQuery({ tags: value });
            }}
            placeholder="Filter by tags"
            className="flex-1 h-10"
        />
    );
};

export default EventTagsFilter;
