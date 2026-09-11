import { CalendarDays, LogOut, Tag as TagIcon } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";

import { useLogoutUser } from "@/apis/auth.api";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";

function initials(name: string) {
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("");
}

export default function AppSidebar() {
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const { logoutUserMutation, isLoading } = useLogoutUser();

    async function handleLogout() {
        await logoutUserMutation();
        navigate("/login");
    }

    const navItems = [
        {
            label: "Events",
            to: user?.role === "admin" ? "/admin/events" : "/events",
            icon: CalendarDays,
        },
        ...(user?.role === "admin"
            ? [
                  {
                      label: "Tags",
                      to: "/admin/tags",
                      icon: TagIcon,
                  },
              ]
            : []),
    ];

    return (
        <Sidebar className="font-sans">
            <SidebarHeader className="border-b border-dashed border-sidebar-border px-3 py-4">
                <span className="font-display px-3 text-xl font-medium tracking-tight text-sidebar-foreground">
                    Gather
                </span>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navItems.map((item) => {
                                const isActive = location.pathname === item.to;

                                return (
                                    <SidebarMenuItem
                                        key={item.to}
                                        className="mb-2"
                                    >
                                        <SidebarMenuButton
                                            isActive={isActive}
                                            render={
                                                <Link
                                                    to={item.to}
                                                    className="flex items-center gap-2"
                                                >
                                                    <item.icon
                                                        strokeWidth={1.75}
                                                    />
                                                    <span>{item.label}</span>
                                                </Link>
                                            }
                                        ></SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="px-3 pb-4">
                <Separator className="mb-3 bg-sidebar-border" />
                <div className="flex items-center gap-3 rounded-sm px-2 py-2">
                    <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-gray-300 text-sidebar-foreground text-xs">
                            {initials(user!.name)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-sidebar-foreground">
                            {user!.name}
                        </p>
                        <p className="truncate text-xs text-sidebar-foreground/50">
                            {user!.email}
                        </p>
                    </div>
                </div>

                <Separator className="bg-sidebar-border" />
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            disabled={isLoading}
                            onClick={handleLogout}
                            className="gap-3 text-sidebar-foreground/60"
                        >
                            <LogOut className="h-4 w-4" strokeWidth={1.75} />
                            <span>Log out</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
