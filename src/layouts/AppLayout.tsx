import AppSidebar from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Outlet } from "react-router";

const AppLayout = () => {
    const { user } = useAuth();

    return (
        <div>
            <SidebarProvider>
                <AppSidebar user={user!} onLogout={() => {}} />
                <main>
                    <Outlet />
                </main>
            </SidebarProvider>
        </div>
    );
};

export default AppLayout;
