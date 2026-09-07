import { useAuth } from "@/contexts/AuthContext";
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
        const response = await api.post("/auth/register", data);
        return response.data.data;
    };

    const { mutateAsync: registerUserMutation, isPending: isLoading } =
        useMutation<User, ApiError, RegisterUserInput>({
            mutationFn: registerUser,
            onSuccess: () => {
                toast.success("User registered successfully");
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
        const response = await api.post("/auth/login", data);
        return response.data.data;
    };

    const { mutateAsync: loginUserMutation, isPending: isLoading } =
        useMutation<{ accessToken: string }, ApiError, LoginUserInput>({
            mutationFn: loginUser,
            onSuccess: async (data) => {
                setAccessToken(data.accessToken);
                await fetchMe();
                toast.success("User logged in successfully");
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
        await api.post("/auth/logout", null);
    };

    const { mutateAsync: logoutUserMutation, isPending: isLoading } =
        useMutation<void, ApiError, void>({
            mutationFn: logoutUser,
            onSuccess: () => {
                setAccessToken(null);
                setUser(null);
                toast.success("User logged out successfully");
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
