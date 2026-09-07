import { AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";

interface Props {
    title: string;
    message?: string;
    onRetry?: () => void;
}

const ErrorState = ({ title, message, onRetry }: Props) => {
    return (
        <div
            role="alert"
            className="flex flex-col items-center justify-center gap-3 py-16 text-center"
        >
            <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10">
                <AlertTriangle className="size-6 text-destructive" />
            </div>
            <div className="space-y-1">
                <p className="font-medium">{title}</p>
                <p className="text-sm text-muted-foreground">
                    {message ?? "Something went wrong. Please try again."}
                </p>
            </div>
            {onRetry && (
                <Button variant="outline" size="sm" onClick={onRetry}>
                    Try again
                </Button>
            )}
        </div>
    );
};

export default ErrorState;
