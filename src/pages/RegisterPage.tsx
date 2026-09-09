import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

import { useRegisterUser } from "@/apis/auth.api";
import FormInput, { FormPasswordInput } from "@/components/shared/form-input";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/contexts/AuthContext";
import {
    registerUserSchema,
    type RegisterUserInput,
} from "@/validations/auth.validation";

const RegisterPage = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const form = useForm<RegisterUserInput>({
        resolver: zodResolver(registerUserSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });
    const { registerUserMutation, isLoading } = useRegisterUser();

    useEffect(() => {
        if (isAuthenticated) navigate("/events");
    }, [isAuthenticated, navigate]);

    async function onSubmit(data: RegisterUserInput) {
        await registerUserMutation(data);
        form.reset();
        navigate("/login");
    }

    return (
        <div className="w-full h-screen bg-[#F2F4F1] flex items-center justify-center">
            <Card className="w-full sm:max-w-md">
                <CardHeader>
                    <CardTitle className="text-md">
                        <h4 className="font-normal">New Account</h4>
                        <h1 className="text-2xl">Join Gather</h1>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        id="form-register"
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-5"
                    >
                        <FieldGroup>
                            <FormInput form={form} name="name" label="Name" />
                            <FormInput form={form} name="email" label="Email" />
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
                                form="form-register"
                                disabled={isLoading}
                            >
                                {isLoading ? <Spinner /> : "Submit"}
                            </Button>
                        </Field>
                    </form>
                </CardContent>
                <CardFooter>
                    <p className="mt-6 text-center text-sm text-[#1B1D23]/60">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-medium text-[#1B1D23] underline underline-offset-4"
                        >
                            Log in
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default RegisterPage;
