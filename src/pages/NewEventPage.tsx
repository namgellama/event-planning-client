import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import type z from "zod";

import { useCreateEvent } from "@/apis/event.api";
import { EventForm } from "@/components/event";
import EventFormLayout from "@/layouts/EventFormLayout";
import {
    createEventSchema,
    type CreateEventInput,
} from "@/validations/event.validation";

const NewEventPage = () => {
    const navigate = useNavigate();

    const form = useForm<
        z.input<typeof createEventSchema>,
        any,
        z.output<typeof createEventSchema>
    >({
        resolver: zodResolver(createEventSchema),
        defaultValues: {
            title: "",
            description: "",
            date: "",
            location: "",
            type: "public",
            tags: [],
        },
    });

    const { createEventMutation, isLoading } = useCreateEvent();

    async function onSubmit(data: CreateEventInput) {
        const response = await createEventMutation(data);
        navigate(`/events/${response.data.id}`);
    }

    return (
        <EventFormLayout
            title="Create an event"
            description="Create a new event and share the details with your audience."
        >
            <EventForm
                form={form}
                onSubmit={onSubmit}
                isLoading={isLoading}
                buttonText="Create event"
            />
        </EventFormLayout>
    );
};

export default NewEventPage;
