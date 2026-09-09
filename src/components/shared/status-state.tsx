import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {
    icon: LucideIcon;
    title: string;
    description?: string;
    iconClassName?: string;
    action?: {
        label: string;
        onClick: () => void;
        variant?: "outline" | "default" | "secondary" | "ghost";
    };
}

const StatusState = ({
    icon: Icon,
    title,
    description,
    iconClassName = "bg-muted text-muted-foreground",
    action,
}: Props) => {
    return (
        <div
            role="alert"
            className="flex flex-col items-center justify-center gap-3 py-16 text-center"
        >
            <div
                className={`flex size-12 items-center justify-center rounded-full ${iconClassName}`}
            >
                <Icon className="size-6" />
            </div>
            <div className="space-y-1">
                <p className="font-medium">{title}</p>
                {description && (
                    <p className="text-sm text-muted-foreground max-w-sm">
                        {description}
                    </p>
                )}
            </div>
            {action && (
                <Button
                    variant={action.variant ?? "outline"}
                    size="sm"
                    onClick={action.onClick}
                >
                    {action.label}
                </Button>
            )}
        </div>
    );
};

export default StatusState;
