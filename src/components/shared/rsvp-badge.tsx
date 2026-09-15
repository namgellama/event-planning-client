import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import type { RSVPStatus } from "@/types/rsvp";

interface Props {
    status: RSVPStatus;
    children: ReactNode;
}

const style: Record<RSVPStatus, string> = {
    yes: "border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400",
    no: "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400",
    maybe: "border-yellow-500/30 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
};

const RSVPBadge = ({ status, children }: Props) => {
    return (
        <Badge variant="outline" className={style[status]}>
            {children}
        </Badge>
    );
};

export default RSVPBadge;
