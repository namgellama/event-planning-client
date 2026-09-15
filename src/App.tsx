import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";

import { CenteredSpinner } from "./components/shared";
import AdminRoute from "./layouts/AdminRoute";
import AppLayout from "./layouts/AppLayout";
import ProtectedRoute from "./layouts/ProtectedRoute";

const RegisterPage = lazy(() => import("./pages/shared/RegisterPage"));
const LoginPage = lazy(() => import("./pages/shared/LoginPage"));

const AdminEventListPage = lazy(
    () => import("./pages/admin/AdminEventListPage"),
);
const AdminEventDetailsPage = lazy(
    () => import("./pages/admin/AdminEventDetailsPage"),
);
const AdminNewEventPage = lazy(() => import("./pages/admin/AdminNewEventPage"));
const AdminEditEventPage = lazy(
    () => import("./pages/admin/AdminEditEventPage"),
);
const AdminTagListPage = lazy(() => import("./pages/admin/AdminTagListPage"));
const AdminRsvpListPage = lazy(() => import("./pages/admin/AdminRsvpListPage"));

const UserEventListPage = lazy(() => import("./pages/user/UserEventListPage"));
const UserEventDetailsPage = lazy(
    () => import("./pages/user/UserEventDetailsPage"),
);
const UserProfilePage = lazy(() => import("./pages/user/UserProfilePage"));

function App() {
    return (
        <Suspense fallback={<CenteredSpinner />}>
            <Routes>
                {/* Shared routes */}
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />

                <Route element={<ProtectedRoute />}>
                    <Route element={<AppLayout />}>
                        {/* User routes */}
                        <Route path="/events" element={<UserEventListPage />} />
                        <Route
                            path="/events/:id"
                            element={<UserEventDetailsPage />}
                        />
                        <Route path="/profile" element={<UserProfilePage />} />

                        {/* Admin routes */}
                        <Route element={<AdminRoute />}>
                            <Route
                                path="/admin/events"
                                element={<AdminEventListPage />}
                            />
                            <Route
                                path="/admin/events/:id"
                                element={<AdminEventDetailsPage />}
                            />
                            <Route
                                path="/admin/events/new"
                                element={<AdminNewEventPage />}
                            />
                            <Route
                                path="/admin/events/:id/edit"
                                element={<AdminEditEventPage />}
                            />
                            <Route
                                path="/admin/events/:id/rsvps"
                                element={<AdminRsvpListPage />}
                            />
                            <Route
                                path="/admin/tags"
                                element={<AdminTagListPage />}
                            />
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </Suspense>
    );
}

export default App;
