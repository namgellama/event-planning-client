import { zodResolver } from "@hookform/resolvers/zod";
import { useState, type Dispatch, type SetStateAction } from "react";
import { useForm } from "react-hook-form";

import { useSetup2FA, useVerify2FASetup } from "@/apis/auth.api";
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
import {
    verify2FASetupSchema,
    type Verify2FASetupInput,
} from "@/validations/auth.validation";

interface Props {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const TwoFactorAuthDialog = ({ isOpen, setIsOpen }: Props) => {
    const [step, setStep] = useState<"confirm" | "qr">("confirm");
    const [qrCode, setQrCode] = useState<string | null>(null);

    const { setup2FAMutation, isLoading } = useSetup2FA();
    const { verify2FASetupMutation, isLoading: verify2FASetupLoading } =
        useVerify2FASetup();

    const form = useForm<Verify2FASetupInput>({
        resolver: zodResolver(verify2FASetupSchema),
        defaultValues: {
            code: "",
        },
    });

    const onConfirm = async () => {
        const { data } = await setup2FAMutation();
        setQrCode(data.qrCode);
        setStep("qr");
    };

    const onSubmit = async (data: Verify2FASetupInput) => {
        await verify2FASetupMutation(data);
        setIsOpen(false);
    };

    return (
        <>
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogContent>
                    {step === "confirm" ? (
                        <>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Set up two-factor authentication?
                                </AlertDialogTitle>

                                <AlertDialogDescription>
                                    You'll scan a QR code with your
                                    authenticator app and enter the generated
                                    code to complete setup.
                                </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>

                                <AlertDialogAction
                                    type="button"
                                    onClick={onConfirm}
                                    disabled={isLoading}
                                >
                                    {isLoading ? <Spinner /> : "Continue"}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </>
                    ) : (
                        <>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Scan the QR code
                                </AlertDialogTitle>

                                <AlertDialogDescription>
                                    Scan this QR code using your authenticator
                                    app, then enter the 6-digit code.
                                </AlertDialogDescription>
                            </AlertDialogHeader>

                            {qrCode && (
                                <div className="flex justify-center py-4">
                                    <img
                                        src={qrCode}
                                        alt="2FA QR code"
                                        className="size-64"
                                    />
                                </div>
                            )}

                            <form
                                id="form-2fa-setup-verify"
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-5"
                            >
                                <FieldGroup>
                                    <FormInput
                                        form={form}
                                        label="Code"
                                        name="code"
                                    />
                                </FieldGroup>
                            </form>

                            <AlertDialogFooter>
                                <AlertDialogAction
                                    type="submit"
                                    form="form-2fa-setup-verify"
                                    disabled={verify2FASetupLoading}
                                >
                                    {verify2FASetupLoading ? (
                                        <Spinner />
                                    ) : (
                                        "Submit"
                                    )}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </>
                    )}
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default TwoFactorAuthDialog;
