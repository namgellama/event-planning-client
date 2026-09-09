import { useQueryStates } from "nuqs";

import type { EventType } from "@/apis/event.api";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { queryState } from "./event-list";

const tabs: { label: string; value: EventType }[] = [
    { label: "All", value: "all" },
    { label: "Public", value: "public" },
    { label: "Private", value: "private" },
];

const EventTypeFilter = () => {
    const [{}, setQuery] = useQueryStates(queryState);

    return (
        <Tabs defaultValue={tabs[0].value} className="w-100">
            <TabsList className="h-10!">
                {tabs.map((tab) => (
                    <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        onClick={async () => {
                            setQuery({
                                type: tab.value,
                                page: 1,
                            });
                        }}
                        className="w-20 data-active:bg-white"
                    >
                        {tab.label}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    );
};

export default EventTypeFilter;
