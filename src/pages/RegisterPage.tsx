import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

import {
    RegisterUserForm,
    SendOtpForm,
    VerifyEmailForm,
} from "@/components/auth";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

export type PendingData = { email: string; isVerified: boolean };

const RegisterPage = () => {
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();
    const [step, setStep] = useState<number>(1);
    const [pendingData, setPendingData] = useState<PendingData>({
        email: "",
        isVerified: false,
    });

    useEffect(() => {
        if (!isAuthenticated || !user) return;

        if (user.role === "user") {
            navigate("/events");
            return;
        }

        if (user.role === "admin") navigate("/admin/events");
    }, [isAuthenticated, navigate, user]);

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <Card className="w-full sm:max-w-md">
                <CardHeader>
                    <CardTitle className="text-md">
                        <h4 className="font-normal">
                            {step === 1
                                ? "Create your account"
                                : step === 2
                                  ? "Verify your email"
                                  : "Complete your profile"}
                        </h4>
                        <h1 className="text-2xl">
                            {step === 1
                                ? "Join Gather"
                                : step === 2
                                  ? "Enter the code"
                                  : "Set up your account"}
                        </h1>
                    </CardTitle>
                    <div className="flex items-center gap-2 pt-2">
                        <span className="h-1.5 flex-1 rounded-full bg-black" />
                        <span
                            className={`h-1.5 flex-1 rounded-full ${
                                step === 2 || step === 3
                                    ? "bg-black"
                                    : "bg-black/15"
                            }`}
                        />
                        <span
                            className={`h-1.5 flex-1 rounded-full ${
                                step === 3 ? "bg-black" : "bg-black/15"
                            }`}
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    {step === 1 ? (
                        <SendOtpForm
                            setStep={setStep}
                            pendingData={pendingData}
                            setPendingData={setPendingData}
                        />
                    ) : step === 2 ? (
                        <VerifyEmailForm
                            setStep={setStep}
                            pendingData={pendingData}
                            setPendingData={setPendingData}
                        />
                    ) : (
                        <RegisterUserForm
                            pendingData={pendingData}
                            setPendingData={setPendingData}
                            setStep={setStep}
                        />
                    )}
                </CardContent>
                <CardFooter className="bg-inherit">
                    <p className="mt-6 text-center text-sm text-black/60">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-medium text-black underline underline-offset-4"
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
