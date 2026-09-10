import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

import { useLoginUser } from "@/apis/auth.api";
import { FormInput, FormPasswordInput } from "@/components/shared";
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
    loginUserSchema,
    type LoginUserInput,
} from "@/validations/auth.validation";

const LoginPage = () => {
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();
    const form = useForm<LoginUserInput>({
        resolver: zodResolver(loginUserSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const { loginUserMutation, isLoading } = useLoginUser();

    useEffect(() => {
        if (!isAuthenticated || !user) return;

        if (user.role === "user") {
            navigate("/events");
            return;
        }

        if (user.role === "admin") navigate("/admin/events");
    }, [isAuthenticated, navigate, user]);

    async function onSubmit(data: LoginUserInput) {
        await loginUserMutation(data);
        if (user?.role === "admin") {
            navigate("/admin/events");
            return;
        }
        navigate("/events");
    }

    return (
        <div className="w-full h-screen bg-[#F2F4F1] flex items-center justify-center">
            <Card className="w-full sm:max-w-md">
                <CardHeader>
                    <CardTitle className="text-md">
                        <h1 className="text-2xl">Login</h1>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        id="form-login"
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-5"
                    >
                        <FieldGroup>
                            <FormInput form={form} name="email" label="Email" />
                            <FormPasswordInput
                                form={form}
                                name="password"
                                label="Password"
                            />
                        </FieldGroup>

                        <Field>
                            <Button
                                type="submit"
                                form="form-login"
                                disabled={isLoading}
                            >
                                {isLoading ? <Spinner /> : "Submit"}
                            </Button>
                        </Field>
                    </form>
                </CardContent>
                <CardFooter>
                    <p className="mt-6 text-center text-sm text-[#1B1D23]/60">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="font-medium text-[#1B1D23] underline underline-offset-4"
                        >
                            Register
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default LoginPage;
