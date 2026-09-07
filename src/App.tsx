import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import { Spinner } from "./components/ui/spinner";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));

function App() {
    return (
        <Suspense
            fallback={
                <div className="w-full h-screen flex items-center justify-center">
                    <Spinner className="size-6" />
                </div>
            }
        >
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </Suspense>
    );
}

export default App;
