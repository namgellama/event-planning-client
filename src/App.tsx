import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";

import { CenteredSpinner } from "./components/shared";
import AdminRoute from "./layouts/AdminRoute";
import AppLayout from "./layouts/AppLayout";
import ProtectedRoute from "./layouts/ProtectedRoute";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const EventListPage = lazy(() => import("./pages/EventListPage"));
const EventDetailPage = lazy(() => import("./pages/EventDetailPage"));
const NewEventPage = lazy(() => import("./pages/NewEventPage"));
const EditEventPage = lazy(() => import("./pages/EditEventPage"));
const TagListPage = lazy(() => import("./pages/TagListPage"));

const UserEventsPage = lazy(() => import("./pages/user/UserEventsPage"));
const UserEventDetailPage = lazy(
    () => import("./pages/user/UserEventDetailPage"),
);
const UserProfilePage = lazy(() => import("./pages/user/UserProfilePage"));

function App() {
    return (
        <Suspense fallback={<CenteredSpinner />}>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route element={<ProtectedRoute />}>
                    <Route element={<AppLayout />}>
                        <Route element={<AdminRoute />}>
                            <Route
                                path="/admin/events"
                                element={<EventListPage />}
                            />
                            <Route
                                path="/admin/events/:id"
                                element={<EventDetailPage />}
                            />
                            <Route
                                path="/admin/events/new"
                                element={<NewEventPage />}
                            />
                            <Route
                                path="/admin/events/:id/edit"
                                element={<EditEventPage />}
                            />

                            <Route
                                path="/admin/tags"
                                element={<TagListPage />}
                            />
                        </Route>

                        <Route path="/events" element={<UserEventsPage />} />
                        <Route
                            path="/events/:id"
                            element={<UserEventDetailPage />}
                        />
                        <Route path="/profile" element={<UserProfilePage />} />
                    </Route>
                </Route>
            </Routes>
        </Suspense>
    );
}

export default App;
