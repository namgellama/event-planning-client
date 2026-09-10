import { EventListContent, EventListHeader } from "@/components/event";

const UserEventsPage = () => {
    return (
        <div className="space-y-5">
            <EventListHeader />
            <EventListContent />
        </div>
    );
};

export default UserEventsPage;
