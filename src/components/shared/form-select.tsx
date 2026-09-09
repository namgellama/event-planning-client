import {
    Controller,
    type FieldPath,
    type FieldValues,
    type UseFormReturn,
} from "react-hook-form";

import {
    Field,
    FieldContent,
    FieldError,
    FieldLabel,
} from "@/components/ui/field";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Props<T extends FieldValues> {
    form: UseFormReturn<T, any, any>;
    name: FieldPath<T>;
    label: string;
    data: { label: string; value: string }[];
    orientation?: "vertical" | "horizontal" | "responsive";
}

const FormSelect = <T extends FieldValues>({
    form,
    name,
    label,
    data,
    orientation = "responsive",
}: Props<T>) => {
    return (
        <Controller
            name={name}
            control={form.control}
            render={({ field, fieldState }) => (
                <Field
                    orientation={orientation}
                    data-invalid={fieldState.invalid}
                >
                    <FieldContent>
                        <FieldLabel htmlFor={field.name}>{label}</FieldLabel>

                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </FieldContent>
                    <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                    >
                        <SelectTrigger
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            className="min-w-30"
                        >
                            <SelectValue className="capitalize" />
                        </SelectTrigger>
                        <SelectContent>
                            {data.map(({ label, value }) => (
                                <SelectItem key={value} value={value}>
                                    {label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </Field>
            )}
        />
    );
};

export default FormSelect;
