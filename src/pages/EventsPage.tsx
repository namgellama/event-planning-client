import { EventListContent, EventListHeader } from "@/components/event";

const EventsPage = () => {
    return (
        <div className="space-y-5">
            <EventListHeader />
            <EventListContent />
        </div>
    );
};

export default EventsPage;
