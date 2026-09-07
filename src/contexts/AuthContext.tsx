import {
    api,
    BASE_URL,
    type InternalAxiosRequestConfigWithRetry,
} from "@/apis";
import type { User } from "@/types/user";
import {
    createContext,
    useContext,
    useEffect,
    useLayoutEffect,
    useState,
    type Dispatch,
    type ReactNode,
    type SetStateAction,
} from "react";
import { useNavigate } from "react-router";

interface AuthContextValue {
    accessToken: string | null;
    setAccessToken: Dispatch<SetStateAction<string | null>>;
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
    isAuthenticated: boolean;
    isLoading: boolean;
    fetchMe: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    const isAuthenticated = !!user;

    const fetchMe = async () => {
        try {
            const response = await api.get(`${BASE_URL}/auth/me`);
            setUser(response.data.data);
        } catch {
            setUser(null);
        }
    };

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                await fetchMe();
            } finally {
                setIsLoading(false);
            }
        };

        initializeAuth();
    }, []);

    useLayoutEffect(() => {
        const authInterceptor = api.interceptors.request.use((config) => {
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }

            return config;
        });

        return () => {
            api.interceptors.request.eject(authInterceptor);
        };
    }, [accessToken]);

    useLayoutEffect(() => {
        const refreshInterceptor = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest =
                    error.config as InternalAxiosRequestConfigWithRetry;

                const isRefreshTokenRequest = originalRequest.url?.includes(
                    `${BASE_URL}/auth/refresh-token`,
                );

                if (
                    error.response?.status === 401 &&
                    !isRefreshTokenRequest &&
                    !originalRequest._retry
                ) {
                    originalRequest._retry = true;

                    try {
                        const response = await api.post(
                            `${BASE_URL}/auth/refresh-token`,
                        );
                        const token = response.data.data;

                        setAccessToken(token);

                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        originalRequest._retry = true;

                        return api(originalRequest);
                    } catch {
                        setAccessToken(null);
                        setUser(null);
                        navigate("/login");

                        throw error;
                    }
                }

                throw error();
            },
        );

        return () => {
            api.interceptors.response.eject(refreshInterceptor);
        };
    }, []);

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                setAccessToken,
                user,
                setUser,
                isAuthenticated,
                isLoading,
                fetchMe,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }

    return context;
}
