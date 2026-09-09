import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import {
    Controller,
    type FieldPath,
    type FieldValues,
    type UseFormReturn,
} from "react-hook-form";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface Props<T extends FieldValues> extends Omit<
    React.ComponentProps<"input">,
    "name" | "defaultValue" | "form"
> {
    form: UseFormReturn<T, any, any>;
    name: FieldPath<T>;
    label: string;
}

const FormInput = <T extends FieldValues>({
    form,
    name,
    label,
    ...inputProps
}: Props<T>) => {
    return (
        <Controller
            name={name}
            control={form.control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
                    <Input
                        {...field}
                        {...inputProps}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        autoComplete={inputProps.autoComplete ?? "off"}
                    />

                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                </Field>
            )}
        />
    );
};

export default FormInput;

export const FormPasswordInput = <T extends FieldValues>({
    form,
    name,
    label,
    ...inputProps
}: Omit<Props<T>, "type">) => {
    const [visible, setVisible] = useState(false);

    return (
        <Controller
            name={name}
            control={form.control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
                    <div className="relative">
                        <Input
                            {...field}
                            {...inputProps}
                            id={field.name}
                            type={visible ? "text" : "password"}
                            aria-invalid={fieldState.invalid}
                            autoComplete={
                                inputProps.autoComplete ?? "current-password"
                            }
                            className="pr-9"
                        />
                        <button
                            type="button"
                            tabIndex={-1}
                            onClick={() => setVisible((v) => !v)}
                            aria-label={
                                visible ? "Hide password" : "Show password"
                            }
                            aria-pressed={visible}
                            className="absolute inset-y-0 right-2 flex items-center text-muted-foreground hover:text-foreground"
                        >
                            {visible ? (
                                <EyeOff className="size-4" aria-hidden="true" />
                            ) : (
                                <Eye className="size-4" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                </Field>
            )}
        />
    );
};
