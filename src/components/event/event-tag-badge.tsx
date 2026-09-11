import { Badge } from "@/components/ui/badge";

const EventTagBadge = ({ title }: { title: string }) => {
    return (
        <Badge
            variant="secondary"
            className="font-normal bg-slate-200 border-slate-300 text-slate-800"
        >
            {title}
        </Badge>
    );
};

export default EventTagBadge;
