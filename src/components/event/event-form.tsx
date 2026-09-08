import { useFetchAllTags } from "@/apis/tag.api";
import type {
    CreateEventInput,
    createEventSchema,
} from "@/validations/event.validation";
import { Tags } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import type z from "zod";
import {
    FormDateTimePicker,
    FormInput,
    FormMarkdownEditor,
    FormMultipleCombobox,
    FormSelect,
} from "../shared";
import { Button } from "../ui/button";
import { FieldGroup } from "../ui/field";
import { Separator } from "../ui/separator";
import { Spinner } from "../ui/spinner";

interface Props {
    form: UseFormReturn<
        z.input<typeof createEventSchema>,
        any,
        z.output<typeof createEventSchema>
    >;
    onSubmit: (data: CreateEventInput) => void;
    isLoading: boolean;
    onCancel: () => void;
    buttonText: string;
}

const eventTypes = ["Public", "Private"];

const EventForm = ({
    form,
    onSubmit,
    isLoading,
    onCancel,
    buttonText,
}: Props) => {
    const { tags } = useFetchAllTags();

    const data =
        tags?.items.map((item) => ({
            label: item.title,
            value: item.id,
        })) ?? [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return (
        <form
            id="form-event"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
        >
            {/* Basic information */}
            <section className="space-y-4">
                <div>
                    <h2 className="text-sm font-semibold">Basic information</h2>
                    <p className="text-sm text-muted-foreground">
                        Give your event a name and description.
                    </p>
                </div>

                <FieldGroup className="gap-5">
                    <FormInput form={form} name="title" label="Title" />

                    <FormMarkdownEditor
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
                    <h2 className="text-sm font-semibold">Event details</h2>
                    <p className="text-sm text-muted-foreground">
                        When and where will your event take place?
                    </p>
                </div>

                <FieldGroup className="gap-5">
                    <FormDateTimePicker
                        form={form}
                        name="date"
                        label="Date"
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
                        <h2 className="text-sm font-semibold">Tags</h2>

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

            <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
                <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={onCancel}
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
                    {isLoading ? <Spinner /> : buttonText}
                </Button>
            </div>
        </form>
    );
};

export default EventForm;
