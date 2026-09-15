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
const EventDetailsPage = lazy(() => import("./pages/EventDetailsPage"));
const NewEventPage = lazy(() => import("./pages/NewEventPage"));
const EditEventPage = lazy(() => import("./pages/EditEventPage"));
const TagListPage = lazy(() => import("./pages/TagListPage"));
const RsvpListPage = lazy(() => import("./pages/RsvpListPage"));

const UserEventsPage = lazy(() => import("./pages/user/UserEventsPage"));
const UserEventDetailsPage = lazy(
    () => import("./pages/user/UserEventDetailsPage"),
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
                                element={<EventDetailsPage />}
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
                                path="/admin/events/:id/rsvps"
                                element={<RsvpListPage />}
                            />
                            <Route
                                path="/admin/tags"
                                element={<TagListPage />}
                            />
                        </Route>

                        <Route path="/events" element={<UserEventsPage />} />
                        <Route
                            path="/events/:id"
                            element={<UserEventDetailsPage />}
                        />
                        <Route path="/profile" element={<UserProfilePage />} />
                    </Route>
                </Route>
            </Routes>
        </Suspense>
    );
}

export default App;
