import type { ApiError } from "@/apis";
import { AlertTriangle } from "lucide-react";
import NotFoundState from "./not-found-state";
import StatusState from "./status-state";

interface Props {
    title: string;
    error: ApiError;
    onRetry?: () => void;
    notFound?: {
        title?: string;
        description?: string;
    };
}

const ErrorState = ({ title, error, onRetry, notFound }: Props) => {
    const status = error.response?.status;

    if (status === 404) {
        return (
            <NotFoundState
                title={notFound?.title ?? "Not found"}
                description={
                    notFound?.description ??
                    error.response?.data.message ??
                    "This item may have been moved or deleted."
                }
            />
        );
    }

    const errorMessage =
        status && status >= 400 && status < 500
            ? (error.response?.data.message ??
              "Something went wrong. Please try again.")
            : "Something went wrong. Please try again.";

    return (
        <StatusState
            icon={AlertTriangle}
            title={title}
            description={errorMessage}
            iconClassName="bg-destructive/10 text-destructive"
            action={
                onRetry ? { label: "Try again", onClick: onRetry } : undefined
            }
        />
    );
};

export default ErrorState;
