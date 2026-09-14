import { zodResolver } from "@hookform/resolvers/zod";
import { type Dispatch, type SetStateAction } from "react";
import { useForm } from "react-hook-form";

import { useDisable2FA } from "@/apis/auth.api";
import { FormInput } from "@/components/shared";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/contexts/AuthContext";
import {
    disable2FASchema,
    type Disable2FAInput,
} from "@/validations/auth.validation";

interface Props {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Disable2FADialog = ({ isOpen, setIsOpen }: Props) => {
    const form = useForm<Disable2FAInput>({
        resolver: zodResolver(disable2FASchema),
        defaultValues: {
            code: "",
        },
    });

    const { disable2FAMutation, isLoading } = useDisable2FA();

    const onSubmit = async (data: Disable2FAInput) => {
        await disable2FAMutation(data);
        setIsOpen(false);
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Disable two-factor authentication?
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        Disabling two-factor authentication will remove the
                        extra security layer from your account. You’ll need to
                        enter your current authenticator code to confirm.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <form
                    id="form-2fa-disable"
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5"
                >
                    <FieldGroup>
                        <FormInput form={form} label="Code" name="code" />
                    </FieldGroup>
                </form>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>

                    <AlertDialogAction
                        type="submit"
                        form="form-2fa-disable"
                        disabled={isLoading}
                    >
                        {isLoading ? <Spinner /> : "Disable"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default Disable2FADialog;
