import MDEditor from "@uiw/react-md-editor";
import {
    Controller,
    type FieldPath,
    type FieldValues,
    type UseFormReturn,
} from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";

interface Props<T extends FieldValues> {
    form: UseFormReturn<T, any, any>;
    name: FieldPath<T>;
    label: string;
}

const FormMarkdownEditor = <T extends FieldValues>({
    form,
    name,
    label,
}: Props<T>) => {
    return (
        <Controller
            name={name}
            control={form.control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>{label}</FieldLabel>

                    <div data-color-mode="light">
                        <MDEditor
                            value={field.value ?? ""}
                            onChange={(value) => field.onChange(value ?? "")}
                            preview="edit"
                            height={250}
                        />
                    </div>

                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                </Field>
            )}
        />
    );
};

export default FormMarkdownEditor;
