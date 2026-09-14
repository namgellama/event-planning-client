import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAuth } from "@/contexts/AuthContext";
import type { LoginResponse, LoginSuccessful } from "@/types/auth";
import type { ApiResponse } from "@/types/response";
import type { User } from "@/types/user";
import type {
    LoginUserInput,
    RegisterUserInput,
    SendOtpInput,
    Verify2FAInput,
    Verify2FASetupInput,
    VerifyEmailInput,
} from "@/validations/auth.validation";

import { api, handleApiError, type ApiError } from ".";

export const useSendOtp = () => {
    const sendOtp = async (data: SendOtpInput) => {
        const response = await api.post<ApiResponse<null>>(
            "/auth/register/send-otp",
            data,
        );
        return response.data;
    };

    const { mutateAsync: sendOtpMutation, isPending: isLoading } = useMutation<
        ApiResponse<null>,
        ApiError,
        SendOtpInput
    >({
        mutationFn: sendOtp,
        onSuccess: ({ message }) => {
            toast.success(message ?? "OTP has been sent to your email");
        },
        onError: (error) => {
            handleApiError(error, "Unable to send otp. Please try again");
        },
    });

    return { sendOtpMutation, isLoading };
};

export const useVerifyEmail = () => {
    const verifyEmail = async (data: VerifyEmailInput) => {
        const response = await api.post<ApiResponse<null>>(
            "/auth/register/verify-email",
            data,
        );
        return response.data;
    };

    const { mutateAsync: verifyEmailMutation, isPending: isLoading } =
        useMutation<ApiResponse<null>, ApiError, VerifyEmailInput>({
            mutationFn: verifyEmail,
            onSuccess: ({ message }) => {
                toast.success(message ?? "Email verified successfully");
            },
            onError: (error) => {
                handleApiError(
                    error,
                    "Unable to verify email. Please try again",
                );
            },
        });

    return { verifyEmailMutation, isLoading };
};

export const useRegisterUser = () => {
    const registerUser = async (data: RegisterUserInput) => {
        const response = await api.post<ApiResponse<User>>(
            "/auth/register",
            data,
        );
        return response.data;
    };

    const { mutateAsync: registerUserMutation, isPending: isLoading } =
        useMutation<ApiResponse<User>, ApiError, RegisterUserInput>({
            mutationFn: registerUser,
            onSuccess: ({ message }) => {
                toast.success(message ?? "User registered successfully");
            },
            onError: (error) => {
                handleApiError(
                    error,
                    "Unable to create your account. Please try again",
                );
            },
        });

    return { registerUserMutation, isLoading };
};

export const useLoginUser = () => {
    const { setAccessToken, fetchMe } = useAuth();

    const loginUser = async (data: LoginUserInput) => {
        const response = await api.post<ApiResponse<LoginResponse>>(
            "/auth/login",
            data,
        );
        return response.data;
    };

    const { mutateAsync: loginUserMutation, isPending: isLoading } =
        useMutation<ApiResponse<LoginResponse>, ApiError, LoginUserInput>({
            mutationFn: loginUser,
            onSuccess: async ({ data, message }) => {
                if (data.requires2FA) {
                    toast.success(
                        message ?? "Authenticate using your authenticator app",
                    );

                    return;
                }

                setAccessToken(data.accessToken);
                await fetchMe();

                toast.success(message ?? "User logged in successfully");
            },
            onError: (error) => {
                handleApiError(
                    error,
                    "Unable to create your account. Please try again",
                );
            },
        });

    return { loginUserMutation, isLoading };
};

export const useLogoutUser = () => {
    const { setAccessToken, setUser } = useAuth();

    const logoutUser = async () => {
        const response = await api.post<ApiResponse<null>>(
            "/auth/logout",
            null,
        );
        return response.data;
    };

    const { mutateAsync: logoutUserMutation, isPending: isLoading } =
        useMutation<ApiResponse<null>, ApiError, void>({
            mutationFn: logoutUser,
            onSuccess: ({ message }) => {
                setAccessToken(null);
                setUser(null);
                toast.success(message ?? "User logged out successfully");
            },
            onError: (error) => {
                setAccessToken(null);
                setUser(null);
                handleApiError(
                    error,
                    "Unable to create your account. Please try again",
                );
            },
        });

    return { logoutUserMutation, isLoading };
};

export const useSetup2FA = () => {
    const setup2FA = async () => {
        const response = await api.post<ApiResponse<{ qrCode: string }>>(
            "/auth/2fa/setup",
            null,
        );
        return response.data;
    };

    const { mutateAsync: setup2FAMutation, isPending: isLoading } = useMutation<
        ApiResponse<{ qrCode: string }>,
        ApiError,
        void
    >({
        mutationFn: setup2FA,
        onSuccess: ({ message }) => {
            toast.success(message ?? "2FA setup initiated successfully");
        },
        onError: (error) => {
            handleApiError(
                error,
                "Unable to initiate 2FA setup. Please try again",
            );
        },
    });

    return { setup2FAMutation, isLoading };
};

export const useVerify2FASetup = () => {
    const verify2FASetup = async (data: Verify2FASetupInput) => {
        const response = await api.post<ApiResponse<{ qrCode: string }>>(
            "/auth/2fa/verify-setup",
            data,
        );
        return response.data;
    };

    const { mutateAsync: verify2FASetupMutation, isPending: isLoading } =
        useMutation<
            ApiResponse<{ qrCode: string }>,
            ApiError,
            Verify2FASetupInput
        >({
            mutationFn: verify2FASetup,
            onSuccess: ({ message }) => {
                toast.success(message ?? "2FA enabled successfully");
            },
            onError: (error) => {
                handleApiError(
                    error,
                    "Unable to verify 2FA setup. Please try again",
                );
            },
        });

    return { verify2FASetupMutation, isLoading };
};

export const useVerify2FA = () => {
    const { setAccessToken, fetchMe } = useAuth();

    const verify2FA = async (data: Verify2FAInput) => {
        const response = await api.post<ApiResponse<LoginSuccessful>>(
            "/auth/2fa/verify",
            data,
        );
        return response.data;
    };

    const { mutateAsync: verify2FAMutation, isPending: isLoading } =
        useMutation<ApiResponse<LoginSuccessful>, ApiError, Verify2FAInput>({
            mutationFn: verify2FA,
            onSuccess: async ({ message, data }) => {
                toast.success(message ?? "2FA verified successfully");
                setAccessToken(data.accessToken);
                await fetchMe();
            },
            onError: (error) => {
                handleApiError(error, "Unable to verify 2FA. Please try again");
            },
        });

    return { verify2FAMutation, isLoading };
};
