import {
    Controller,
    type FieldPath,
    type FieldValues,
    type UseFormReturn,
} from "react-hook-form";

import {
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxItem,
    ComboboxList,
    ComboboxValue,
} from "@/components/ui/combobox";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

type Option = {
    label: string;
    value: string;
};

interface Props<T extends FieldValues, N extends FieldPath<T>> {
    form: UseFormReturn<T, any, any>;
    name: N;
    label: string;
    data: Option[];
}

const FormMultipleCombobox = <T extends FieldValues, N extends FieldPath<T>>({
    form,
    label,
    name,
    data,
}: Props<T, N>) => {
    return (
        <Controller
            name={name}
            control={form.control}
            render={({ field, fieldState }) => {
                const value = (field.value ?? []) as string[];

                return (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>{label}</FieldLabel>

                        <Combobox
                            items={data}
                            multiple
                            value={value}
                            onValueChange={field.onChange}
                        >
                            <ComboboxChips>
                                <ComboboxValue>
                                    {value.map((item) => {
                                        const option = data.find(
                                            (option) => option.value === item,
                                        );

                                        return (
                                            <ComboboxChip key={item}>
                                                {option?.label ?? item}
                                            </ComboboxChip>
                                        );
                                    })}
                                </ComboboxValue>
                                <ComboboxChipsInput placeholder="Select..." />
                            </ComboboxChips>
                            <ComboboxContent>
                                <ComboboxEmpty>No items found.</ComboboxEmpty>
                                <ComboboxList>
                                    {data.map((item) => (
                                        <ComboboxItem
                                            key={item.value}
                                            value={item.value}
                                        >
                                            {item.label}
                                        </ComboboxItem>
                                    ))}
                                </ComboboxList>
                            </ComboboxContent>
                        </Combobox>

                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                );
            }}
        />
    );
};

export default FormMultipleCombobox;
