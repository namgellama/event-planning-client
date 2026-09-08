import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import * as React from "react";
import type { Matcher } from "react-day-picker";
import {
    Controller,
    type FieldPath,
    type FieldValues,
    type UseFormReturn,
} from "react-hook-form";

interface Props<T extends FieldValues> {
    form: UseFormReturn<T>;
    name: FieldPath<T>;
    label: string;
    disabled?: Matcher | Matcher[];
}

const FormDateTimePicker = <T extends FieldValues>({
    form,
    name,
    label,
    disabled,
}: Props<T>) => {
    const [open, setOpen] = React.useState(false);

    return (
        <Controller
            name={name}
            control={form.control}
            render={({ field, fieldState }) => {
                const value = field.value as string | undefined;

                const date = value ? new Date(value) : undefined;

                const time = date ? format(date, "HH:mm:ss") : "";

                const handleDateChange = (newDate: Date | undefined) => {
                    if (!newDate) {
                        field.onChange("");
                        return;
                    }

                    if (date) {
                        newDate.setHours(
                            date.getHours(),
                            date.getMinutes(),
                            date.getSeconds(),
                        );
                    }

                    field.onChange(newDate.toISOString());
                    setOpen(false);
                };

                const handleTimeChange = (
                    event: React.ChangeEvent<HTMLInputElement>,
                ) => {
                    const [hours, minutes, seconds = "00"] =
                        event.target.value.split(":");

                    const newDate = date ?? new Date();

                    newDate.setHours(
                        Number(hours),
                        Number(minutes),
                        Number(seconds),
                    );

                    field.onChange(newDate.toISOString());
                };

                return (
                    <FieldSet className="gap-2">
                        <FieldGroup className="flex-row">
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={`${field.name}-date`}>
                                    {label}
                                </FieldLabel>

                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger
                                        render={
                                            <Button
                                                variant="outline"
                                                id={`${field.name}-date`}
                                                className="w-40 justify-between font-normal"
                                            >
                                                {date
                                                    ? format(date, "PPP")
                                                    : "Select date"}

                                                <ChevronDownIcon data-icon="inline-end" />
                                            </Button>
                                        }
                                    />
                                    <PopoverContent
                                        className="w-auto overflow-hidden p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            defaultMonth={date}
                                            captionLayout="dropdown"
                                            disabled={disabled}
                                            onSelect={handleDateChange}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </Field>

                            <Field
                                className="w-32"
                                data-invalid={fieldState.invalid}
                            >
                                <FieldLabel htmlFor={`${field.name}-time`}>
                                    Time
                                </FieldLabel>

                                <Input
                                    type="time"
                                    id={`${field.name}-time`}
                                    step="1"
                                    value={time}
                                    onChange={handleTimeChange}
                                    className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                />
                            </Field>
                        </FieldGroup>

                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </FieldSet>
                );
            }}
        />
    );
};

export default FormDateTimePicker;
