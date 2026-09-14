import { zodResolver } from "@hookform/resolvers/zod";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

import { useSendOtp } from "@/apis/auth.api";
import { FormInput } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import type { PendingData } from "@/pages/RegisterPage";
import {
    sendOtpSchema,
    type SendOtpInput,
} from "@/validations/auth.validation";

interface Props {
    pendingData: PendingData;
    setStep: Dispatch<SetStateAction<number>>;
    setPendingData: Dispatch<SetStateAction<PendingData>>;
}

const SendOtpForm = ({ setStep, pendingData, setPendingData }: Props) => {
    const form = useForm<SendOtpInput>({
        resolver: zodResolver(sendOtpSchema),
        defaultValues: {
            email: pendingData.email || "",
        },
    });

    const { sendOtpMutation, isLoading } = useSendOtp();

    const onSubmit = async (data: SendOtpInput) => {
        await sendOtpMutation(data);
        setPendingData((prev) => ({ ...prev, email: data.email }));
        setStep(2);
    };

    return (
        <form
            id="form-send-otp"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5"
        >
            <FieldGroup>
                <FormInput form={form} label="Email" name="email" />
            </FieldGroup>

            <Field>
                <Button type="submit" form="form-send-otp" disabled={isLoading}>
                    {isLoading ? <Spinner /> : "Send OTP"}
                </Button>
            </Field>
        </form>
    );
};

export default SendOtpForm;
