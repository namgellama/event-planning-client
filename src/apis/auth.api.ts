import type { User } from "@/types/user";
import type {
    LoginUserInput,
    RegisterUserInput,
} from "@/validations/auth.validation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { api, type ApiError } from ".";

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
                const status = error.response?.status || error.status;
                const message = error.response?.data?.message;

                if (status === 409) {
                    toast.error(message ?? "Email already exists");
                    return;
                }

                toast.error(message ?? "Unexpected error occurred");
            },
        });

    return { registerUserMutation, isLoading };
};

export const useLoginUser = () => {
    const loginUser = async (data: LoginUserInput) => {
        const response = await api.post("/auth/login", data);
        return response.data.data;
    };

    const { mutateAsync: loginUserMutation, isPending: isLoading } =
        useMutation<User, ApiError, LoginUserInput>({
            mutationFn: loginUser,
            onSuccess: () => {
                toast.success("User logged in successfully");
            },
            onError: (error) => {
                const message = error.response?.data?.message;
                toast.error(message ?? "Unexpected error occurred");
            },
        });

    return { loginUserMutation, isLoading };
};
