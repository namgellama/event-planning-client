import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";

import { CenteredSpinner } from "./components/shared";
import AdminRoute from "./layouts/AdminRoute";
import AppLayout from "./layouts/AppLayout";
import ProtectedRoute from "./layouts/ProtectedRoute";
import UserLayout from "./layouts/UserLayout";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const EventsPage = lazy(() => import("./pages/EventsPage"));
const EventDetailPage = lazy(() => import("./pages/EventDetailPage"));
const NewEventPage = lazy(() => import("./pages/NewEventPage"));
const EditEventPage = lazy(() => import("./pages/EditEventPage"));
const TagsPage = lazy(() => import("./pages/TagsPage"));

const UserEventsPage = lazy(() => import("./pages/user/UserEventsPage"));

function App() {
    return (
        <Suspense fallback={<CenteredSpinner />}>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route element={<ProtectedRoute />}>
                    <Route element={<AdminRoute />}>
                        <Route element={<AppLayout />}>
                            <Route
                                path="/admin/events"
                                element={<EventsPage />}
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
                            <Route path="/admin/tags" element={<TagsPage />} />
                        </Route>
                    </Route>

                    <Route element={<UserLayout />}>
                        <Route path="/events" element={<UserEventsPage />} />
                    </Route>
                </Route>
            </Routes>
        </Suspense>
    );
}

export default App;
