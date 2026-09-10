import { Outlet } from "react-router";

const UserLayout = () => {
    return (
        <main className="max-w-6xl mx-auto p-4">
            <Outlet />
        </main>
    );
};

export default UserLayout;
