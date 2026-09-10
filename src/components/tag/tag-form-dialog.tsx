import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import { useForm } from "react-hook-form";

import { useCreateTag, useFetchTag, useUpdateTag } from "@/apis/tag.api";
import { CenteredSpinner, ErrorState, FormInput } from "@/components/shared";
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
    isEdit?: boolean;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    tagId?: string | null;
}

const TagFormDialog = ({ isEdit = false, isOpen, setIsOpen, tagId }: Props) => {
    const form = useForm<CreateTagInput>({
        resolver: zodResolver(createTagSchema),
        defaultValues: {
            title: "",
        },
    });

    const {
        tag,
        isLoading: isTagLoading,
        error: tagError,
        refetch,
    } = useFetchTag(isEdit && tagId ? tagId : undefined);
    const { createTagMutation, isLoading: isCreateLoading } = useCreateTag();
    const { updateTagMutation, isLoading: isUpdateLoading } = useUpdateTag();

    const isSubmitting = isCreateLoading || isUpdateLoading;

    useEffect(() => {
        if (!tag) return;

        form.reset({
            title: tag.title,
        });
    }, [tag, form]);

    const onSubmit = async (data: CreateTagInput) => {
        if (isEdit && tag) {
            await updateTagMutation({ data, tagId: tag.id });
        } else await createTagMutation(data);
        setIsOpen(false);
        form.reset();
    };

    if (isEdit && isTagLoading && !tag) {
        return <CenteredSpinner />;
    }

    if (isEdit && tagError && !tag) {
        return (
            <ErrorState
                title="Couldn't load tag"
                error={tagError}
                onRetry={refetch}
                notFound={{
                    title: "Tag not found",
                    description: "This tag may have been deleted.",
                }}
            />
        );
    }

    return (
        <AlertDialog
            open={isOpen}
            onOpenChange={(open) => {
                if (!open) {
                    form.reset();
                }

                setIsOpen(open);
            }}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {isEdit ? "Edit Tag" : "Create New Tag"}{" "}
                    </AlertDialogTitle>
                </AlertDialogHeader>

                <form
                    id="form-tag"
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormInput form={form} name="title" label="Title" />
                </form>

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isSubmitting}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        type="submit"
                        form="form-tag"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? <Spinner /> : "Submit"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default TagFormDialog;
