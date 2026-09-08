import {
    Controller,
    type FieldPath,
    type FieldValues,
    type UseFormReturn,
} from "react-hook-form";
import { Field, FieldContent, FieldError, FieldLabel } from "../ui/field";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

interface Props<T extends FieldValues> {
    form: UseFormReturn<T>;
    name: FieldPath<T>;
    label: string;
    data: { label: string; value: string }[];
}

const FormSelect = <T extends FieldValues>({
    form,
    name,
    label,
    data,
}: Props<T>) => {
    return (
        <Controller
            name={name}
            control={form.control}
            render={({ field, fieldState }) => (
                <Field
                    orientation="responsive"
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
