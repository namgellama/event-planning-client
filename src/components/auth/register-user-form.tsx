import { zodResolver } from "@hookform/resolvers/zod";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

import { useRegisterUser } from "@/apis/auth.api";
import { FormInput, FormPasswordInput } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import {
    registerUserSchema,
    type RegisterUserInput,
} from "@/validations/auth.validation";
import type { PendingData } from "@/pages/shared/RegisterPage";
import { useNavigate } from "react-router";

interface Props {
    pendingData: PendingData;
    setPendingData: Dispatch<SetStateAction<PendingData>>;
    setStep: Dispatch<SetStateAction<number>>;
}

const RegisterUserForm = ({ pendingData, setPendingData, setStep }: Props) => {
    const navigate = useNavigate();

    const form = useForm<RegisterUserInput>({
        resolver: zodResolver(registerUserSchema),
        defaultValues: {
            name: "",
            email: pendingData.email ?? "",
            password: "",
            confirmPassword: "",
        },
    });

    const { registerUserMutation, isLoading } = useRegisterUser();

    const onSubmit = async (data: RegisterUserInput) => {
        await registerUserMutation(data);
        setPendingData({ email: "", isVerified: false });
        navigate("/login");
        form.reset();
    };

    return (
        <form
            id="form-register-user"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5"
        >
            <FieldGroup>
                <FormInput form={form} name="name" label="Name" />
                <FormPasswordInput
                    form={form}
                    name="password"
                    label="Password"
                />
                <FormPasswordInput
                    form={form}
                    name="confirmPassword"
                    label="Confirm Password"
                />
            </FieldGroup>

            <Field>
                <Button
                    type="submit"
                    form="form-register-user"
                    disabled={isLoading}
                >
                    {isLoading ? <Spinner /> : "Create Account"}
                </Button>
            </Field>

            <div className="flex items-center justify-between text-sm">
                <button
                    type="button"
                    onClick={() => setStep((prev) => prev - 1)}
                    className="text-[#1B1D23]/60 underline underline-offset-4"
                >
                    Back
                </button>
            </div>
        </form>
    );
};

export default RegisterUserForm;
