"use client";

import FormInput, { FormPasswordInput } from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import {
    registerSchema,
    type RegisterFormFields,
} from "@/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

const RegisterPage = () => {
    const form = useForm<RegisterFormFields>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    function onSubmit(data: RegisterFormFields) {
        console.log(data);
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
                            <Button type="submit" form="form-register">
                                Submit
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
