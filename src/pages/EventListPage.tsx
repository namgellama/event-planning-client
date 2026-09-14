import { EventListContent, EventListHeader } from "@/components/event";

const EventListPage = () => {
    return (
        <div className="space-y-5">
            <EventListHeader />
            <EventListContent />
        </div>
    );
};

export default EventListPage;
