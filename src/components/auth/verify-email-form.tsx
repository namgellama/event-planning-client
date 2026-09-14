import { zodResolver } from "@hookform/resolvers/zod";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

import { useSendOtp, useVerifyEmail } from "@/apis/auth.api";
import { FormInput } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import type { PendingData } from "@/pages/RegisterPage";
import {
    verifyEmailSchema,
    type VerifyEmailInput,
} from "@/validations/auth.validation";

interface Props {
    setStep: Dispatch<SetStateAction<number>>;
    pendingData: PendingData;
    setPendingData: Dispatch<SetStateAction<PendingData>>;
}

const VerifyEmailForm = ({ setStep, pendingData, setPendingData }: Props) => {
    const form = useForm<VerifyEmailInput>({
        resolver: zodResolver(verifyEmailSchema),
        defaultValues: {
            otp: "",
            email: pendingData.email ?? "",
        },
    });

    console.log("errors", form.formState.errors);

    const { sendOtpMutation, isLoading: isSendOtpLoading } = useSendOtp();
    const { verifyEmailMutation, isLoading: isVerifyEmailLoading } =
        useVerifyEmail();

    const onSubmit = async (data: VerifyEmailInput) => {
        console.log("🚀 ~ onSubmit ~ data:", data);
        if (pendingData.email && pendingData.isVerified) {
            setStep(3);
            return;
        }

        await verifyEmailMutation(data);
        setPendingData({
            email: data.email,
            isVerified: true,
        });
        setStep(3);
    };

    const handleResendOtp = async () => {
        if (!pendingData.email) return;

        await sendOtpMutation({ email: pendingData.email });
    };

    return (
        <form
            id="form-verify-email"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5"
        >
            <p className="text-sm text-[#1B1D23]/60">
                We sent a 6-digit code to{" "}
                <span className="font-medium text-[#1B1D23]">
                    {pendingData.email}
                </span>
                .
            </p>
            <FieldGroup>
                <FormInput
                    form={form}
                    name="otp"
                    label="OTP"
                    maxLength={6}
                    inputMode="numeric"
                />
            </FieldGroup>

            <Field>
                <Button
                    type="submit"
                    form="form-verify-email"
                    disabled={isVerifyEmailLoading}
                >
                    {isVerifyEmailLoading ? <Spinner /> : "Verify Email"}
                </Button>
            </Field>

            <div className="flex items-center justify-between text-sm">
                <Button
                    variant="link"
                    type="button"
                    onClick={() => setStep((prev) => prev - 1)}
                    className="text-[#1B1D23]/60 underline underline-offset-4"
                >
                    Back
                </Button>
                <Button
                    variant="link"
                    type="button"
                    onClick={handleResendOtp}
                    disabled={isSendOtpLoading}
                    className="underline underline-offset-4 disabled:opacity-50 self-end my-0"
                >
                    {isSendOtpLoading ? "Sending..." : "Resend code"}
                </Button>
            </div>
        </form>
    );
};

export default VerifyEmailForm;
