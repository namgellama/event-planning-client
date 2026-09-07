import type { User } from "@/types/user";
import type { RegisterFormFields } from "@/validations/auth.validation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { api, type ApiError } from ".";

export const useRegisterUser = () => {
    const registerUser = async (data: RegisterFormFields) => {
        const response = await api.post("/auth/register", data);
        return response.data.data;
    };

    const { mutateAsync: registerUserMutation, isPending: isLoading } =
        useMutation<User, ApiError, RegisterFormFields>({
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
