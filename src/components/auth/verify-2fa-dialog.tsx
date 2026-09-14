import { zodResolver } from "@hookform/resolvers/zod";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { useVerify2FA } from "@/apis/auth.api";
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
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/contexts/AuthContext";
import {
    verify2FASchema,
    type Verify2FAInput,
} from "@/validations/auth.validation";

interface Props {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    twoFactorToken: string;
}

const Verify2FADialog = ({ isOpen, setIsOpen, twoFactorToken }: Props) => {
    const navigate = useNavigate();

    const { user } = useAuth();

    const form = useForm<Verify2FAInput>({
        resolver: zodResolver(verify2FASchema),
        defaultValues: {
            code: "",
            twoFactorToken,
        },
    });

    const { verify2FAMutation, isLoading } = useVerify2FA();

    const onSubmit = async (data: Verify2FAInput) => {
        await verify2FAMutation(data);

        if (user?.role === "admin") {
            navigate("/admin/events");
            return;
        }

        navigate("/events");
        setIsOpen(false);
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Enter your authentication code
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Open your authenticator app and enter the 6-digit code
                        to complete the sign-in.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <form id="form-rsvp" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormInput form={form} label="Code" name="code" />
                </form>

                <AlertDialogFooter>
                    <AlertDialogCancel
                        disabled={isLoading}
                        onClick={() => form.reset()}
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        disabled={isLoading}
                        type="submit"
                        form="form-rsvp"
                    >
                        {isLoading ? <Spinner /> : "Continue"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default Verify2FADialog;
