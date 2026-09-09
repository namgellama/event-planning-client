import { Plus } from "lucide-react";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EventSearch, EventSort, EventTagsFilter, EventTypeFilter } from ".";

const EventListHeader = () => {
    const navigate = useNavigate();

    return (
        <Card>
            <CardContent className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <EventTypeFilter />
                    <Button
                        size="lg"
                        className="px-4 cursor-pointer"
                        onClick={() => navigate("/events/new")}
                    >
                        <Plus /> Create New
                    </Button>
                </div>
                <div className="flex justify-between gap-4">
                    <EventSearch />
                    <EventTagsFilter />
                    <EventSort />
                </div>
            </CardContent>
        </Card>
    );
};

export default EventListHeader;
