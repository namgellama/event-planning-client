import { Navigate, Outlet } from "react-router";

import { CenteredSpinner } from "@/components/shared";
import { useAuth } from "@/contexts/AuthContext";

const AdminRoute = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) return <CenteredSpinner />;

    if (user?.role !== "admin") {
        return <Navigate to={"/login"} replace />;
    }

    return <Outlet />;
};

export default AdminRoute;
