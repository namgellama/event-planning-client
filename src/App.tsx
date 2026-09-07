import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));

function App() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/sign-up" element={<RegisterPage />} />
            </Routes>
        </Suspense>
    );
}

export default App;
