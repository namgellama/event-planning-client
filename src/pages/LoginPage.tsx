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

const GatherMark = () => (
    <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        aria-hidden="true"
    >
        <circle cx="13" cy="13" r="9" fill="#2F3B2E" fillOpacity="0.85" />
        <circle cx="21" cy="13" r="9" fill="#2F3B2E" fillOpacity="0.55" />
        <circle cx="17" cy="21" r="9" fill="#2F3B2E" fillOpacity="0.7" />
    </svg>
);

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
        <div
            className="w-full min-h-screen flex items-center justify-center px-4 py-12"
            style={{
                backgroundImage:
                    "radial-gradient(circle, rgba(47,59,46,0.08) 1px, transparent 1px)",
                backgroundSize: "18px 18px",
            }}
        >
            <div className="w-full sm:max-w-md">
                {/* Brand lockup */}
                <div className="flex items-center gap-3 mb-8 px-1">
                    <GatherMark />
                    <div>
                        <p className="font-serif text-2xl leading-none text-black">
                            Gather
                        </p>
                        <p className="text-sm text-black/55 mt-1">
                            Discover and track events. Show up.
                        </p>
                    </div>
                </div>

                <Card className="border-[#E3E6E0] shadow-sm rounded-2xl">
                    <CardHeader className="pb-2">
                        <CardTitle>
                            <h1 className="font-serif text-2xl text-[#1B1D23]">
                                Welcome back
                            </h1>
                            <p className="text-sm font-normal text-black/55 mt-1.5">
                                Log in to see what's happening near you.
                            </p>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <form
                            id="form-login"
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <FieldGroup>
                                <FormInput
                                    form={form}
                                    name="email"
                                    label="Email"
                                />
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
                                    className="w-full hover:bg-black/70 text-white"
                                >
                                    {isLoading ? <Spinner /> : "Log in"}
                                </Button>
                            </Field>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <p className="text-center w-full text-sm text-black/60">
                            Don't have an account?{" "}
                            <Link
                                to="/register"
                                className="font-medium text-black underline underline-offset-4"
                            >
                                Register
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default LoginPage;
