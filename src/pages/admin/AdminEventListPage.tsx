import { EventListContent, EventListHeader } from "@/components/event";

const AdminEventListPage = () => {
    return (
        <div className="space-y-5">
            <EventListHeader />
            <EventListContent />
        </div>
    );
};

export default AdminEventListPage;
