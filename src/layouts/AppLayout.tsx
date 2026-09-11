import { Outlet } from "react-router";

import AppSidebar from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const AppLayout = () => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full p-10">
                <Outlet />
            </main>
        </SidebarProvider>
    );
};

export default AppLayout;
