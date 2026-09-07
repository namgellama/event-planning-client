import type { LucideIcon } from "lucide-react";

interface Props {
    icon: LucideIcon;
    title: string;
    description?: string;
}

const EmptyState = ({ icon: Icon, title, description }: Props) => {
    return (
        <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                <Icon className="size-6 text-muted-foreground" />
            </div>
            <div className="space-y-1">
                <p className="font-medium">{title}</p>
                {description && (
                    <p className="text-sm text-muted-foreground">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
};

export default EmptyState;
