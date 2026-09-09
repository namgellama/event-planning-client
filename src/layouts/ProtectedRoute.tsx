import { Navigate, Outlet } from "react-router";

import { CenteredSpinner } from "@/components/shared";
import { useAuth } from "@/contexts/AuthContext";

const ProtectedRoute = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) return <CenteredSpinner />;

    if (!user) {
        return <Navigate to={"/login"} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
