import { useAuth } from "@/contexts/AuthContext";
import type { ApiResponse } from "@/types/response";
import type { User } from "@/types/user";
import type {
    LoginUserInput,
    RegisterUserInput,
} from "@/validations/auth.validation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { api, handleApiError, type ApiError } from ".";

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
        const response = await api.post<ApiResponse<{ accessToken: string }>>(
            "/auth/login",
            data,
        );
        return response.data;
    };

    const { mutateAsync: loginUserMutation, isPending: isLoading } =
        useMutation<
            ApiResponse<{ accessToken: string }>,
            ApiError,
            LoginUserInput
        >({
            mutationFn: loginUser,
            onSuccess: async ({ data, message }) => {
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
