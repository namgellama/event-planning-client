import { EventListContent, EventListHeader } from ".";

const EventList = () => {
    return (
        <div className="space-y-5">
            <EventListHeader />
            <EventListContent />
        </div>
    );
};

export default EventList;
