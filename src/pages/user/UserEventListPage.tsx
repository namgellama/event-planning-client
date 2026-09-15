import { EventListContent, EventListHeader } from "@/components/event";

const UserEventListPage = () => {
    return (
        <div className="space-y-5">
            <EventListHeader />
            <EventListContent />
        </div>
    );
};

export default UserEventListPage;
