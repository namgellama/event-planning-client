import { SearchX } from "lucide-react";

import { StatusState } from ".";

interface Props {
    title?: string;
    description?: string;
    action?: {
        label: string;
        onClick: () => void;
    };
}

const NotFoundState = ({
    title = "Not found",
    description = "This item may have been moved or deleted.",
    action,
}: Props) => {
    return (
        <StatusState
            icon={SearchX}
            title={title}
            description={description}
            iconClassName="bg-muted text-muted-foreground"
            action={action}
        />
    );
};

export default NotFoundState;
