import { useFetchAllTags } from "@/apis/tag.api";
import { Tags } from "lucide-react";
import type {
    FieldValues,
    Path,
    SubmitHandler,
    UseFormReturn,
} from "react-hook-form";
import { useNavigate } from "react-router";
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

interface EventFormFields {
    title?: unknown;
    description?: unknown;
    date?: unknown;
    location?: unknown;
    type?: unknown;
    tags?: unknown;
}

interface Props<
    TFieldValues extends FieldValues & EventFormFields,
    TContext = any,
    TTransformedValues extends FieldValues = TFieldValues,
> {
    form: UseFormReturn<TFieldValues, TContext, TTransformedValues>;
    onSubmit: SubmitHandler<TTransformedValues>;
    isLoading: boolean;
    buttonText: string;
}

const eventTypes = ["Public", "Private"];

const EventForm = <
    TFieldValues extends FieldValues & EventFormFields,
    TContext = any,
    TTransformedValues extends FieldValues = TFieldValues,
>({
    form,
    onSubmit,
    isLoading,
    buttonText,
}: Props<TFieldValues, TContext, TTransformedValues>) => {
    const { tags } = useFetchAllTags();
    const navigate = useNavigate();

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
                    <FormInput
                        form={form}
                        name={"title" as Path<TFieldValues>}
                        label="Title"
                    />

                    <FormMarkdownEditor
                        form={form}
                        name={"description" as Path<TFieldValues>}
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
                        name={"date" as Path<TFieldValues>}
                        label="Date"
                        disabled={{ before: today }}
                    />

                    <div className="grid gap-5 sm:grid-cols-2">
                        <FormInput
                            form={form}
                            name={"location" as Path<TFieldValues>}
                            label="Location"
                        />

                        <FormSelect
                            form={form}
                            name={"type" as Path<TFieldValues>}
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
                    name={"tags" as Path<TFieldValues>}
                    label="Event tags"
                    data={data}
                />
            </section>

            <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
                <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => navigate(-1)}
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
