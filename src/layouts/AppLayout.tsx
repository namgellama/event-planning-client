import { Outlet } from "react-router";

import AppSidebar from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";

const AppLayout = () => {
    const { user } = useAuth();

    return (
        <SidebarProvider>
            <AppSidebar user={user!} onLogout={() => {}} />
            <main className="w-full p-10">
                <Outlet />
            </main>
        </SidebarProvider>
    );
};

export default AppLayout;
