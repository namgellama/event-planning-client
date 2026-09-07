import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NuqsAdapter } from "nuqs/adapters/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";
import App from "./App";
import { TooltipProvider } from "./components/ui/tooltip";
import { AuthProvider } from "./contexts/AuthContext";
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
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
