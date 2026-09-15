import { RSVPListContent, RSVPListHeader } from "@/components/rsvp";

const AdminRSVPListPage = () => {
    return (
        <div className="space-y-5 max-w-5xl mx-auto">
            <RSVPListHeader />
            <RSVPListContent />
        </div>
    );
};

export default AdminRSVPListPage;
