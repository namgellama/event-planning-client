import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
    const { user, isLoading } = useAuth();

    if (isLoading)
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <Spinner className="size-6" />
            </div>
        );

    if (!user) {
        return <Navigate to={"/login"} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
