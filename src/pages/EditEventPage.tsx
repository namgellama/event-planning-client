import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";

import { useFetchEvent, useUpdateEvent } from "@/apis/event.api";
import { EventForm } from "@/components/event";
import { CenteredSpinner, ErrorState } from "@/components/shared";
import EventFormLayout from "@/layouts/EventFormLayout";
import type { EventItem } from "@/types/event";
import {
    updateEventSchema,
    type UpdateEventInput,
} from "@/validations/event.validation";

const EditEventPage = () => {
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

    return <EditEventForm event={event} />;
};

export default EditEventPage;

const EditEventForm = ({ event }: { event: EventItem }) => {
    const form = useForm<UpdateEventInput>({
        resolver: zodResolver(updateEventSchema),
        defaultValues: {
            title: event.title,
            description: event.description ?? "",
            date: event.date,
            location: event.location,
            type: event.type,
            tags: event.tags.map((tag) => tag.id),
        },
    });

    const { updateEventMutation, isLoading: isUpdateLoading } =
        useUpdateEvent();

    const navigate = useNavigate();

    async function onSubmit(data: UpdateEventInput) {
        const response = await updateEventMutation({ data, eventId: event.id });
        navigate(`/admin/events/${response.data.id}`);
    }

    return (
        <EventFormLayout
            title="Edit an event"
            description="Update your event details and keep your audience informed."
        >
            <EventForm
                form={form}
                onSubmit={onSubmit}
                isLoading={isUpdateLoading}
                buttonText="Update event"
            />
        </EventFormLayout>
    );
};
