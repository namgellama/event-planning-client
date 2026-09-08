import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { toast } from "sonner";

export const BASE_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

export type ApiError = AxiosError<{
    success?: boolean;
    message?: string;
}>;

export default api;

export interface InternalAxiosRequestConfigWithRetry extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

export function handleApiError(error: ApiError, fallbackMessage: string) {
    const status = error.response?.status;
    const errorMessage =
        status && status >= 400 && status < 500
            ? (error.response?.data.message ?? fallbackMessage)
            : fallbackMessage;

    toast.error(errorMessage);
}
