import { useCreateEvent } from "@/apis/event.api";
import { useFetchAllTags } from "@/apis/tag.api";
import {
    FormDateTimePicker,
    FormInput,
    FormMultipleCombobox,
    FormSelect,
} from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import {
    createEventSchema,
    type CreateEventInput,
} from "@/validations/event.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDays, Tags } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import type z from "zod";

const eventTypes = ["Public", "Private"];

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

    const { tags } = useFetchAllTags();
    const { createEventMutation, isLoading } = useCreateEvent();

    const data =
        tags?.items.map((item) => ({
            label: item.title,
            value: item.id,
        })) ?? [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

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
                    <form
                        id="form-event"
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        {/* Basic information */}
                        <section className="space-y-4">
                            <div>
                                <h2 className="text-sm font-semibold">
                                    Basic information
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    Give your event a name and description.
                                </p>
                            </div>

                            <FieldGroup className="gap-5">
                                <FormInput
                                    form={form}
                                    name="title"
                                    label="Event title"
                                />

                                <FormInput
                                    form={form}
                                    name="description"
                                    label="Description"
                                />
                            </FieldGroup>
                        </section>

                        <Separator />

                        {/* Date and location */}
                        <section className="space-y-4">
                            <div>
                                <h2 className="text-sm font-semibold">
                                    Event details
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    When and where will your event take place?
                                </p>
                            </div>

                            <FieldGroup className="gap-5">
                                <FormDateTimePicker
                                    form={form}
                                    name="date"
                                    label="Date & time"
                                    disabled={{ before: today }}
                                />

                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div className="pl-0 sm:pl-0">
                                        <FormInput
                                            form={form}
                                            name="location"
                                            label="Location"
                                        />
                                    </div>

                                    <FormSelect
                                        form={form}
                                        name="type"
                                        label="Visibility"
                                        orientation="vertical"
                                        data={eventTypes.map((type) => ({
                                            label: type,
                                            value: type.toLowerCase(),
                                        }))}
                                    />
                                </div>
                            </FieldGroup>
                        </section>

                        <Separator />

                        {/* Tags */}
                        <section className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted">
                                    <Tags className="size-4 text-muted-foreground" />
                                </div>

                                <div>
                                    <h2 className="text-sm font-semibold">
                                        Tags
                                    </h2>

                                    <p className="text-sm text-muted-foreground">
                                        Add tags to help organize your event.
                                    </p>
                                </div>
                            </div>

                            <FormMultipleCombobox
                                form={form}
                                name="tags"
                                label="Event tags"
                                data={data}
                            />
                        </section>

                        {/* Actions */}
                        <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
                            <Button
                                type="button"
                                variant="outline"
                                size="lg"
                                onClick={() => navigate("/events")}
                                disabled={isLoading}
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                size="lg"
                                className="min-w-32"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Spinner />
                                        Creating...
                                    </>
                                ) : (
                                    "Create event"
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default NewEventPage;
