import { zodResolver } from "@hookform/resolvers/zod";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

import { useCreateTag } from "@/apis/tag.api";
import { FormInput } from "@/components/shared";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner";
import {
    createTagSchema,
    type CreateTagInput,
} from "@/validations/tag.validation";

interface Props {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const TagFormDialog = ({ isOpen, setIsOpen }: Props) => {
    const form = useForm<CreateTagInput>({
        resolver: zodResolver(createTagSchema),
        defaultValues: {
            title: "",
        },
    });
    const { createTagMutation, isLoading } = useCreateTag();

    const onSubmit = async (data: CreateTagInput) => {
        await createTagMutation(data);
        setIsOpen(false);
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Create New Tag</AlertDialogTitle>
                </AlertDialogHeader>

                <form
                    id="form-tag"
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormInput form={form} name="title" label="Title" />
                </form>

                <AlertDialogFooter>
                    <AlertDialogCancel
                        disabled={isLoading}
                        onClick={() => {
                            form.reset();
                        }}
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        type="submit"
                        form="form-tag"
                        disabled={isLoading}
                    >
                        {isLoading ? <Spinner /> : "Submit"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default TagFormDialog;
