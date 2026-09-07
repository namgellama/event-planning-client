import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

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
