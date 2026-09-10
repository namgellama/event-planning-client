import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NuqsAdapter } from "nuqs/adapters/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import "./index.css";
import ScrollToTop from "./ScrollToTop";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <ScrollToTop />
                <NuqsAdapter>
                    <AuthProvider>
                        <TooltipProvider>
                            <App />
                            <Toaster />
                        </TooltipProvider>
                    </AuthProvider>
                </NuqsAdapter>
            </BrowserRouter>
            <ReactQueryDevtools />
        </QueryClientProvider>
    </StrictMode>,
);
