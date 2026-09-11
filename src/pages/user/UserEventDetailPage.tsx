import { useParams } from "react-router";

import { useFetchEvent } from "@/apis/event.api";
import {
    EventDetailContent,
    EventDetailFooter,
    EventDetailHeader,
} from "@/components/event";
import { CenteredSpinner, ErrorState } from "@/components/shared";
import { Separator } from "@/components/ui/separator";

const UserEventDetailPage = () => {
    const { id } = useParams();

    const { event, isLoading, error, refetch } = useFetchEvent(id);

    if (isLoading && !event) {
        return <CenteredSpinner />;
    }

    if (error && !event) {
        return (
            <ErrorState
                title="Couldn't load event"
                error={error}
                onRetry={refetch}
                notFound={{
                    title: "Event not found",
                    description:
                        "This event may have been deleted or the link is incorrect.",
                }}
            />
        );
    }

    if (!event) {
        return <CenteredSpinner />;
    }

    return (
        <div className="mx-auto max-w-4xl py-12">
            <EventDetailHeader event={event} />
            <Separator className="my-4" />
            <EventDetailContent event={event} />
            <EventDetailFooter event={event} />
        </div>
    );
};

export default UserEventDetailPage;
