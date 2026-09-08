import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import { CenteredSpinner } from "./components/shared";
import AppLayout from "./layouts/AppLayout";
import ProtectedRoute from "./layouts/ProtectedRoute";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const EventsPage = lazy(() => import("./pages/EventsPage"));
const EventDetailPage = lazy(() => import("./pages/EventDetailPage"));

function App() {
    return (
        <Suspense fallback={<CenteredSpinner />}>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route element={<ProtectedRoute />}>
                    <Route element={<AppLayout />}>
                        <Route path="/events" element={<EventsPage />} />
                        <Route
                            path="/events/:id"
                            element={<EventDetailPage />}
                        />
                    </Route>
                </Route>
            </Routes>
        </Suspense>
    );
}

export default App;
