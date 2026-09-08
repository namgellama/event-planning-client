import { useCreateEvent } from "@/apis/event.api";
import { EventForm } from "@/components/event";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    createEventSchema,
    type CreateEventInput,
} from "@/validations/event.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDays } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import type z from "zod";

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
        <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 lg:py-12">
            <Card className="shadow-sm">
                <CardHeader className="border-b">
                    <div className="flex items-start gap-4">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                            <CalendarDays className="size-5 text-primary" />
                        </div>

                        <div className="space-y-1">
                            <h1 className="text-xl font-semibold tracking-tight">
                                Create an event
                            </h1>

                            <p className="text-sm text-muted-foreground">
                                Create a new event and share the details with
                                your audience.
                            </p>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="pt-6">
                    <EventForm
                        form={form}
                        onSubmit={onSubmit}
                        isLoading={isLoading}
                        onCancel={() => navigate("/events")}
                        buttonText="Create event"
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default NewEventPage;
